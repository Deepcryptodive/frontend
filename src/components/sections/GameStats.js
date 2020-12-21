import React from "react";
import PropTypes from "prop-types";
import { displaySegment, weiToERC20 } from "./../../utils/utilities";
import web3 from "web3";
import dayjs from "dayjs";

class GameStats extends React.Component {
  getPricingData = (values, set) => {
    return set !== undefined
      ? values[this.state.priceChangerValue][set]
      : values[this.state.priceChangerValue];
  };

  totalPoolAmount() {
    const BN = web3.utils.BN;
    let gamePrincipal = new BN(this.props.gameInfo.totalGamePrincipal);
    return web3.utils.fromWei(gamePrincipal);
  }

  render() {
    const { ...props } = this.props;

    const numberOfPlayers = (status) => {
      const conditions = {
        dead: (player) =>
          parseInt(player.mostRecentSegmentPaid) <
          parseInt(props.gameInfo.currentSegment) - 2,
        alive: (player) =>
          parseInt(player.mostRecentSegmentPaid) >
          parseInt(props.gameInfo.currentSegment) - 2,
      };
      const deadPlayers = props.players.filter((player) =>
        conditions[status](player)
      );
      return deadPlayers.length;
    };

    const roundsLengthsSecs = props.gameInfo.segmentLengthInSecs;
    const numberOfPayableRounds = parseInt(props.gameInfo.lastSegment);
    const numberOfRounds = numberOfPayableRounds + 1;
    const gameLength = numberOfPayableRounds * roundsLengthsSecs;
    const gameData = [
      {
        label: "🕒 Game Duration",
        data: `${
          process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
            ? dayjs.duration(gameLength, "seconds").asWeeks()
            : dayjs.duration(gameLength, "seconds").asDays()
        } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
      },
      {
        label: "🎯 Recurring Deposit",
        data: `${web3.utils.fromWei(
          this.props.gameInfo.rawSegmentPayment
        )} DAI every ${
          process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
            ? dayjs.duration(roundsLengthsSecs, "seconds").asWeeks()
            : dayjs.duration(roundsLengthsSecs, "seconds").asDays()
        } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
      },
      {
        label: "⏳ Current Round",
        data: !this.props.gameInfo.isGameCompleted
          ? `${displaySegment(
              this.props.gameInfo.currentSegment
            )} out of ${displaySegment(this.props.gameInfo.lastSegment - 1)}`
          : "Game Completed ✔️",
      },
      {
        label: "👻 Players Status",
        data: `${numberOfPlayers("alive")} Alive and ${numberOfPlayers(
          "dead"
        )} Dead`,
        //condition: !props.hidePlayersStatus,  //🚨 defaults to false so is not shown (see JoinableGame.js); not sure why you'd want to hide this?? because it is loading slowly?
      },
      {
        label: "🏦 Total Pool Funds",
        data: `${
          this.props.gameInfo &&
          weiToERC20(this.props.gameInfo.totalGamePrincipal)
        } DAI`,
      },
      {
        label: "💸 Total Pool Interest",
        data: `${
          this.props.gameInfo && weiToERC20(this.props.totalGameInterest)
        } DAI`, //🚨 would be nice if this can show more decimals!
      },
      {
        label: "💸 Pool APY",
        data: `${
          Math.round((this.props.gameInfo.poolAPY + Number.EPSILON) * 100) / 100
        }%`,
      },
    ];

    const valueStyle = {
      backgroundColor: "#F6F8FE",
      marginLeft: "18px",
      paddingLeft: "10px",
      paddingRight: "4px",
      borderRadius: "3px",
      fontFamily: "monospace",
      fontSize: "14pt",
    };
    return (
      <section>
        <div className="container">
          <div>
            <h3 style={{ marginTop: "5px" }}>
              Game Stats{" "}
              <span role="img" aria-label="game emoji">
                👾
              </span>
            </h3>
            {gameData.map((item, i) => {
              if (item.hasOwnProperty("condition") && !item.condition) {
                return null;
              }
              return (
                <div key={i}>
                  <span style={{ fontWeight: "600", fontSize: "0.85rem" }}>
                    {item.label} : {"  "}
                  </span>
                  <span style={valueStyle}>{item.data}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default GameStats;
