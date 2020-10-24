import React, { useState, useEffect } from "react";
import GoodGhostingABI from "../ABIs/ABI-goodghosting";
import DaiABI from "../ABIs/ABI-dai";
import Web3 from "web3";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import toArray from "dayjs/plugin/toArray";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "./../components/elements/Button";
import { useAlert } from "react-alert";
import { gameNumber, gqlErrors } from "./../utils/utilities";
// import parseErr  from 'parse-err';
// import ErrorStackParser from 'error-stack-parser';

import JoinableGame from "./../components/sections/JoinableGame";
import Loading from "../components/elements/Loading";
import LiveGame from "../components/sections/LiveGame";
import {
  status,
  isNotEmptyObj,
  goodGhostingAdress,
  daiAddress,
  getRevertReason,
  parseRevertError,
} from "../utils/utilities";
import RoboHashCredit from "../components/elements/RoboHashCredit";
import { request, gql } from "graphql-request";

// import getRevertReason from "eth-revert-reason";

const GamePage = () => {
  const [players, setPlayers] = useState([]);
  const [usersAddress, setUsersAddress] = useState(false);
  const [goodGhostingContract, setGoodGhostingContract] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [success, setSuccessState] = useState({});
  const [userStatus, setUserStatus] = useState(status.unloaded);
  const [playerInfo, setPlayerInfo] = useState({});
  const [getPlayersStatus, setGetPlayersStatus] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [web3, setWeb3] = useState({});
  const [errors, setErrors] = useState({});

  const getPlayers = async () => {
    // const alert = useAlert(); // 🚨 TODO fix
    const playerReq = async () => {
      const query = gql`
        {
          players {
            id
            address
            mostRecentSegmentPaid
            amountPaid
            withdrawn
          }
        }
      `;

      const res = await request(
        "https://api.thegraph.com/subgraphs/name/good-ghosting/goodghostingsept",
        query
      );
      return res;
    };
    const players = await playerReq().catch((err) => {
      console.error(err);
      return gqlErrors.players;
    });
    if (players === gqlErrors.players) {
      //🚨TODO add an alert in UI
      return;
    }
    var playersArr = [];
    for (let key in players.players) {
      await fetch(
        `https://ipfs.3box.io/profile?address=${players.players[key].id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const player = {
            id: players.players[key].id,
            address: players.players[key].address,
            mostRecentSegmentPaid: players.players[key].mostRecentSegmentPaid,
            amountPaid: players.players[key].amountPaid,
            threeBoxName: data.name,
            withdrawn: players.players[key].withdrawn,
            isLive:
              gameInfo.currentSegment - 1 >=
              players.players[key].mostRecentSegmentPaid,
            threeBoxAvatar: data.image ? data.image[0].contentUrl["/"] : null,
          };
          playersArr.push(player);
        });
    }
    setGetPlayersStatus(true);
    setPlayers(playersArr);
  };

  const getGameInfo = async () => {
    const gameReq = async () => {
      const query = gql`
        {
          games {
            id
            totalGamePrincipal
            totalGameInterest
            redeemed
          }
        }
      `;

      const res = await request(
        "https://api.thegraph.com/subgraphs/name/good-ghosting/goodghostingsept",
        query
      );
      return res;
    };
    const glqGameData = await gameReq().catch((err) => {
      console.error(err);
      return gqlErrors.game;
    });
    if (glqGameData === gqlErrors.game) {
      //🚨TODO add an alert in UI
      return;
    }

    const firstSegmentStart = await goodGhostingContract.methods
      .firstSegmentStart()
      .call();
    const segmentLength = await goodGhostingContract.methods
      .segmentLength()
      .call();
    dayjs.extend(duration);
    dayjs.duration(segmentLength, "d");
    const segmentPayment = await goodGhostingContract.methods
      .segmentPayment()
      .call();
    dayjs.extend(relativeTime);
    dayjs.extend(toArray);

    const currentSegment = await goodGhostingContract.methods
      .getCurrentSegment()
      .call();

    const lastSegment = await goodGhostingContract.methods.lastSegment().call();
    const gameInfo = {
      firstSegmentStart: dayjs.unix(firstSegmentStart),
      firstSegmentStartArr: dayjs.unix(firstSegmentStart).toArray(),
      segmentPayment: segmentPayment / 10 ** 18,
      rawSegmentPayment: segmentPayment,
      segmentLengthInSecs: segmentLength,
      segmentLength: dayjs.duration(segmentLength * 1000),
      currentSegment,
      lastSegment,
      isGameCompleted: currentSegment > lastSegment - 1,
      firstSegmentEnd: dayjs.unix(firstSegmentStart).add(segmentLength, "s"),
      nextSegmentEnd: dayjs
        .unix(firstSegmentStart)
        .add(segmentLength * (currentSegment + 1), "s"),
      // currentSegmentEnd : dayjs.unix(firstSegmentStart).add(segmentLength * , "s")
    };

    setGameInfo(Object.assign(gameInfo, glqGameData.games[gameNumber]));
  };

  const makeDeposit = async () => {
    setLoadingState({ makeDeposit: true });
    if (!isNotEmptyObj(web3)) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
    const daiContract = new web3.eth.Contract(DaiABI, daiAddress);
    await daiContract.methods
      .approve(goodGhostingAdress, gameInfo.rawSegmentPayment)
      .send({ from: usersAddress });

    await goodGhostingContract.methods
      .makeDeposit()
      .send({ from: usersAddress })
      .catch(async (error) => {
        console.log(error);
        // const reason = await parseRevertError(error);
        //   alert.show(reason);
      });
    getPlayerInfo();
    setLoadingState({ makeDeposit: false });
  };

  const withdraw = async () => {
    setLoadingState({ withdraw: true });
    if (!gameInfo.redeemed) {
      const redeeem = await goodGhostingContract.methods
        .redeemFromExternalPool()
        .send({
          from: usersAddress,
        })
        .catch(async (error) => {
          const reason = await parseRevertError(error);
          //   alert.show(reason);
          console.log("reason", reason);
        });
      const allocateWithdrawAmounts = await goodGhostingContract.methods
        .allocateWithdrawAmounts()
        .send({ from: usersAddress });
      await goodGhostingContract.methods
        .withdraw()
        .send({ from: usersAddress });
      setLoadingState({ withdraw: false });
    } else {
      await goodGhostingContract.methods
        .withdraw()
        .send({ from: usersAddress });
      setLoadingState({ withdraw: false });
    }
  };

  const setUp = () => {
    const web3 = new Web3(window.ethereum);
    const goodGhostingContract = new web3.eth.Contract(
      GoodGhostingABI,
      goodGhostingAdress
    );
    setGoodGhostingContract(goodGhostingContract);
    setWeb3(web3);
  };

  useEffect(() => {
    if (isNotEmptyObj(goodGhostingContract)) {
      getPlayers();
      getGameInfo();
    }
  }, [goodGhostingContract]);

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setUserStatus(checkUserStatus());
  }, [usersAddress, players, getPlayersStatus]);

  useEffect(() => {
    getPlayerInfo();
  }, [userStatus]);

  const joinGame = async () => {
    setLoadingState({ joinGame: true });
    if (!isNotEmptyObj(web3)) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }

    const daiContract = new web3.eth.Contract(DaiABI, daiAddress);
    const approve = await daiContract.methods
      .approve(goodGhostingAdress, gameInfo.rawSegmentPayment)
      .send({ from: usersAddress })
      .then((res) => console.log("res", res))
      .catch((err) => {
        setErrors({ joinGameApprove: err }); // 🚨 TODO display in FE
        setLoadingState({ joinGame: false });
      });
    console.log("approve", approve);

    await goodGhostingContract.methods.joinGame().send({ from: usersAddress });
    setSuccessState({ joinGame: true });
    setLoadingState({ joinGame: false });
    setUserStatus(status.registered);

    setTimeout(() => {
      getPlayers();
      setSuccessState({ joinGame: false });
    }, 2000);
  };

  const getPlayerInfo = async () => {
    const playerReq = async () => {
      const hex = web3.utils.toHex(usersAddress);
      console.log("hex", hex);
      const query = gql`
        {
          player(id: "${hex}") {
            id
            address
            mostRecentSegmentPaid
            amountPaid
            withdrawn
          }
        }
      `;

      const res = await request(
        "https://api.thegraph.com/subgraphs/name/good-ghosting/goodghostingsept",
        query
      );
      return res;
    };

    const players2 = await playerReq()
      .then((data) => {
        const player = data.player;
        player.isLive =
          gameInfo.currentSegment - 1 >= player.mostRecentSegmentPaid;
        player.isStillInGame =
          parseInt(player.mostRecentSegmentPaid) >
          parseInt(gameInfo.currentSegment) - 2;
        setPlayerInfo(player);
      })
      .catch((err) => {
        console.error(err);
        return gqlErrors.players;
      });
    // if (goodGhostingContract && userStatus == status.registered) {
    //   if (!players) {
    //     await getPlayers();
    //   }
    //   const player = players.filter(
    //     (player) => player.address.toLowerCase() === usersAddress.toLowerCase()
    //   )[0];

    //   // const playerInfo = await goodGhostingContract.methods
    //   //   .players(usersAddress)
    //   //   .call();

    //   player.isStillInGame =
    //     parseInt(player.mostRecentSegmentPaid) >
    //     parseInt(gameInfo.currentSegment) - 2;
    //   setPlayerInfo(player);
    // }
  };

  //🚨TODO replace this with portis or alternative wallet connection
  const getAddressFromMetaMask = async () => {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      const address = accounts[0];
      setUsersAddress(address);
    }
  };

  const checkUserStatus = () => {
    if (!usersAddress) {
      return status.unloaded;
    }
    if (!getPlayersStatus) {
      return status.unloaded;
    }
    const isInGame = !!players.filter((player) => player.id === usersAddress)
      .length;
    return isInGame ? status.registered : status.unregistered;
  };

  const connectToWallet = () =>
    !usersAddress && (
      <Button
        tag="a"
        color="primary"
        wideMobile
        onClick={getAddressFromMetaMask}
      >
        Connect MetaMask
      </Button>
    );

  const isFirstSegment = () => {
    return gameInfo.firstSegmentEnd.valueOf() > Date.now();
  };

  return (
    <main className="site-content">
      <div className="section center-content illustration-section-04">
        {!isNotEmptyObj(gameInfo) && (
          <div style={{ paddingTop: "25vh" }}>
            <Loading />
          </div>
        )}
        {isNotEmptyObj(gameInfo) && (
          <>
            {isFirstSegment() && (
              <JoinableGame
                usersAddress={usersAddress}
                getAddressFromMetaMask={getAddressFromMetaMask}
                players={players}
                loadingState={loadingState}
                joinGame={joinGame}
                success={success}
                userStatus={userStatus}
                connectToWallet={connectToWallet}
                playerInfo={playerInfo}
                gameInfo={gameInfo}
              />
            )}
            {!isFirstSegment() && (
              <LiveGame
                usersAddress={usersAddress}
                players={players}
                loadingState={loadingState}
                userStatus={userStatus}
                connectToWallet={connectToWallet}
                playerInfo={playerInfo}
                gameInfo={gameInfo}
                makeDeposit={makeDeposit}
                withdraw={withdraw}
              />
            )}
            <RoboHashCredit />
          </>
        )}
      </div>
    </main>
  );
};

export default GamePage;
