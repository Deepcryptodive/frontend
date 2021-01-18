import React, { useState, useEffect } from "react";
import GoodGhostingABI from "../ABIs/ABI-goodghosting";
import DaiABI from "../ABIs/ABI-dai";
import lendingPoolAddressProviderABI from "./../ABIs/ABI-aave-lending-pool-provider";
import lendingPoolABI from "./../ABIs/ABI-aave-lendingPool.js";
import Web3 from "web3";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import toArray from "dayjs/plugin/toArray";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "./../components/elements/Button";
import { useAlert } from "react-alert";
import { gameNumber, gqlErrors } from "./../utils/utilities";
import { NotKovan, NoWeb3 } from "./../components/elements/Errors";
import Alert from "./../components/elements/Alert";
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
  aaveLendingPoolProvider,
} from "../utils/utilities";
import RoboHashCredit from "../components/elements/RoboHashCredit";
import { request, gql } from "graphql-request";

// import getRevertReason from "eth-revert-reason";

const GamePage = () => {
  const [players, setPlayers] = useState([]);
  const [usersAddress, setUsersAddress] = useState("");
  const [goodGhostingContract, setGoodGhostingContract] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [success, setSuccessState] = useState({});
  const [userStatus, setUserStatus] = useState(status.unloaded);
  const [playerInfo, setPlayerInfo] = useState({});
  const [getPlayersStatus, setGetPlayersStatus] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [web3, setWeb3] = useState({});
  const [netId, setNetId] = useState(null);
  const [errors, setErrors] = useState({});
  const [theGraphDown, setTheGraphDown] = useState(false);

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

      const res = await request(process.env.REACT_APP_GRAPH_URL, query);
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
            // isLive:
            // parseInt(gameInfo.currentSegment) - 1 >=
            // parseInt(players.players[key].mostRecentSegmentPaid),
            threeBoxAvatar: data.image
              ? `https://ipfs.infura.io/ipfs/${data.image[0].contentUrl["/"]}`
              : null,
          };
          playersArr.push(player);
        });
    }
    setPlayers(playersArr);
    setGetPlayersStatus(true);
  };

  const getGameInfo = async () => {
    if (typeof goodGhostingContract == undefined) {
      return;
    }
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

      const res = await request(process.env.REACT_APP_GRAPH_URL, query);
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

    const isGameCompleted = await goodGhostingContract.methods
      .isGameCompleted()
      .call();

    //get lending pool address from lending pool address provider
    const providerInstance = new web3.eth.Contract(
      lendingPoolAddressProviderABI,
      aaveLendingPoolProvider
    );

    const lendingPoolAddress = await providerInstance.methods
      .getLendingPool()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });

    // load lending pool instance to query APY
    const lendingPoolInstance = new web3.eth.Contract(
      lendingPoolABI,
      lendingPoolAddress
    );

    const lendingPoolData = await lendingPoolInstance.methods
      .getReserveData(daiAddress)
      .call();
    const rawADaiAPY = new web3.utils.BN(lendingPoolData.currentLiquidityRate);

    // const interest = await lendingPoolInstance.methods
    //   .getUserAccountData(process.env.REACT_APP_GG_CONTRACT)
    //   .call();

    const aDaiAPY = (rawADaiAPY / 10 ** 27) * 100;
    const lastSegment = await goodGhostingContract.methods.lastSegment().call();
    const gameInfo = {
      firstSegmentStart: dayjs.unix(firstSegmentStart),
      firstSegmentStartArr: dayjs.unix(firstSegmentStart).toArray(),
      segmentPayment: segmentPayment / 10 ** 18,
      rawSegmentPayment: segmentPayment,
      //cumulativeSegmentPayments: String(segmentPayment * lastSegment), TODO: FIX WHY THIS RETURNS INVALID_ARGUMENT WHEN >1000
      segmentLengthInSecs: segmentLength,
      segmentLength: dayjs.duration(segmentLength * 1000),
      currentSegment,
      lastSegment,
      poolAPY: aDaiAPY,
      isGameCompleted,
      // interest,
      isWaitingRound: lastSegment === currentSegment,
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
      .then((res) => {
        const newPlayerInfo = Object.assign({}, playerInfo, {
          mostRecentSegmentPaid: parseInt(playerInfo.mostRecentSegmentPaid) + 1,
          amountPaid:
            parseInt(playerInfo.amountPaid) +
            parseInt(gameInfo.rawSegmentPayment),
        });
        setSuccessState({ makeDeposit: true });
        setPlayerInfo(newPlayerInfo);
        getGameInfo();
        setLoadingState({ makeDeposit: false });
      })
      .catch(async (err) => {
        // TODO return error reason
        setErrors({ makeDeposit: err }); // 🚨 TODO display in FE
        setLoadingState({ makeDeposit: false });
        setSuccessState({ makeDeposit: false }); // const reason = await parseRevertError(error);
        //   alert.show(reason);
      });
    //🚨 TODO Debugg why this is not updating properly -newPlayerInfo is correct -
    // try next time without the additional calling of getPlayerInfo() - could this be slowing it down?
  };
  const redeem = async () => {
    setLoadingState({ redeem: true });
    await goodGhostingContract.methods
      .redeemFromExternalPool()
      .send({
        from: usersAddress,
      })
      .then(() => {
        const newGameInfo = Object.assign({}, gameInfo, { redeemed: true });
        setGameInfo(newGameInfo);
        setSuccessState({ redeem: true });
        setLoadingState({ redeem: false });
      })
      .catch(async (error) => {
        const reason = await parseRevertError(error);
        //   alert.show(reason);
        setLoadingState({ redeem: false });
        setErrors({ redeem: true });
      });
  };

  const withdraw = async () => {
    setLoadingState({ withdraw: true });
    await goodGhostingContract.methods.withdraw().send({ from: usersAddress });
    const newPlayerInfo = Object.assign({}, playerInfo, { withdrawn: true });
    setPlayerInfo(newPlayerInfo);
    setLoadingState({ withdraw: false });
  };

  const setUp = () => {
    checkTheGraph();
    if (typeof window.ethereum == "undefined") {
      setErrors({ needToAWeb3Browser: true });
      return;
    }
    const web3 = new Web3(window.ethereum);
    const goodGhostingContract = new web3.eth.Contract(
      GoodGhostingABI,
      goodGhostingAdress
    );
    web3.eth.net.getId().then((netId) => setNetId(netId));
    setGoodGhostingContract(goodGhostingContract);
    setWeb3(web3);
  };

  useEffect(() => {
    if (isNotEmptyObj(goodGhostingContract)) {
      getGameInfo();
      getPlayers();
    }
  }, [goodGhostingContract]);

  // TODO find away to make this always call with out trigger an infinit loop
  useEffect(() => {
    console.log("getPlayersStatus", getPlayersStatus);
    if (isNotEmptyObj(gameInfo) && getPlayersStatus) {
      console.log("in calculater triggers");
      return calculateIsLive();
    }
    // return false;
  }, [gameInfo, getPlayersStatus]);

  const checkTheGraph = () => {
    // axios
    //   .get(
    //     "https://api.thegraph.com/subgraphs/name/good-ghosting/goodghostingsept/graphql"
    //   )
    //   .then(setTheGraphDown(false))
    //   .catch(setTheGraphDown(true));
  };

  const calculateIsLive = () => {
    return setPlayers(
      players.map((player) => {
        let newPlayer = player;
        newPlayer.isLive =
          parseInt(player.mostRecentSegmentPaid) + 1 >=
          parseInt(gameInfo.currentSegment);
        return newPlayer;
      })
    );
  };

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setUserStatus(checkUserStatus());
  }, [usersAddress, players, getPlayersStatus]);

  // useEffect(() => {
  //   getPlayerInfo();
  // }, [userStatus]);

  useEffect(() => {
    if (success.joinGame) {
      const fetchData = async () => {
        await getPlayers();
        await getGameInfo();
        calculateIsLive();
      };
      fetchData();
    }
  }, [success]);

  useEffect(() => {
    lookForProfile();
  }, [players, usersAddress, gameInfo]);

  const lookForProfile = () => {
    if (players && players.length > 0) {
      if (
        usersAddress &&
        !isNotEmptyObj(playerInfo) &&
        !!players.find((player) => player.address === usersAddress)
      ) {
        setPlayerInfo(
          players.find((player) => player.address === usersAddress)
        );
      }
    }
  };

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
        setErrors({ joinGame: err }); // 🚨 TODO display in FE
        setLoadingState({ joinGame: false });
      });

    await goodGhostingContract.methods
      .joinGame()
      .send({ from: usersAddress })
      .then(() => {
        setSuccessState({ joinGame: true });
        setLoadingState({ joinGame: false });
        setUserStatus(status.registered);
      })
      .catch((err) => {
        console.log("err", err);
        setErrors({ joinGame: true }); // 🚨 TODO display in FE
        setLoadingState({ joinGame: false });
        return;
      });

    // setTimeout(() => {
    //   setSuccessState({ joinGame: false });
    // }, 5000);
  };

  const depositIntoExternalPool = async () => {
    // if (!isNotEmptyObj(web3)) {
    //   const web3 = new Web3(window.ethereum);
    //   setWeb3(web3);
    // }
    setLoadingState({ depositIntoExternalPool: true });
    await goodGhostingContract.methods
      .depositIntoExternalPool()
      .send({ from: usersAddress })
      .then((res) => {
        setLoadingState({ depositIntoExternalPool: false });
        setSuccessState({ depositIntoExternalPool: true });
      })
      .catch((err) => {
        setErrors({ depositIntoExternalPool: true });
        setLoadingState({ depositIntoExternalPool: false });
      });
    //put inside then and catch
  };

  const toggleSuccess = (attribute) => {
    setSuccessState({ [attribute]: !success[attribute] });
  };

  const getPlayerInfo = async () => {
    if (!usersAddress) {
      return;
    }
    const playerReq = async () => {
      const hex = web3.utils.toHex(usersAddress);
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

      const res = await request(process.env.REACT_APP_GRAPH_URL, query);
      return res;
    };

    const players2 = await playerReq()
      .then((data) => {
        const player = data.player;
        setPlayerInfo(player);
      })
      .catch((err) => {
        console.error(err);
        return gqlErrors.players;
      });
  };

  //🚨TODO replace this with portis or alternative wallet connection
  const getAddressFromMetaMask = async () => {
    if (typeof window.ethereum == "undefined") {
      setErrors({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      const address = accounts[0];
      setUsersAddress(address);
    }
  };

  const emergencyWithdraw = async () => {
    setLoadingState({ emergencyWithdraw: true });
    await goodGhostingContract.methods
      .emergencyWithdraw()
      .send({ from: usersAddress });
    setLoadingState({ emergencyWithdraw: false });
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
      <>
        <Button
          tag="a"
          color="primary"
          wideMobile
          onClick={getAddressFromMetaMask}
        >
          Connect Wallet *
        </Button>
        <p style={{ fontSize: "0.7rem" }}>
          * additional wallets will be added soon.
        </p>
      </>
    );

  const isFirstSegment = () => {
    return gameInfo.firstSegmentEnd.valueOf() > Date.now();
  };
  const isNotOnKovan = netId && netId !== 42;
  return (
    <main className="site-content">
      <div
        className="section center-content"
        style={{ backgroundColor: "rgb(246, 248, 254)", minHeight: "100vh" }}
      >
        {theGraphDown && (
          <Alert text="Unfortunately The Graph is down, there may be inconsistencies." />
        )}
        {!isNotEmptyObj(gameInfo) &&
          !isNotOnKovan &&
          !errors.needToAWeb3Browser && (
            <div style={{ paddingTop: "25vh" }}>
              <Loading />
            </div>
          )}
        {isNotOnKovan && <NotKovan />}
        {errors.needToAWeb3Browser && <NoWeb3 />}
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
                emergencyWithdraw={emergencyWithdraw}
                errors={errors}
                toggleSuccess={toggleSuccess}
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
                redeem={redeem}
                emergencyWithdraw={emergencyWithdraw}
                toggleSuccess={toggleSuccess}
                success={success}
                depositIntoExternalPool={depositIntoExternalPool}
                errors={errors}
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
