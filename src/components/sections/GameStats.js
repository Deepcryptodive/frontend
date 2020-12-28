import React from "react";
import PropTypes from "prop-types";
import { displaySegment, weiToERC20 } from "./../../utils/utilities";
import web3 from "web3";
import dayjs from "dayjs";
import { Container, Row, Col } from "react-bootstrap";
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
        label: "🕐Round",
        data: `${displaySegment(
          this.props.gameInfo.currentSegment
        )} of ${displaySegment(this.props.gameInfo.lastSegment)}`,
      },
      {
        label: "🕒 Round Length",
        data: `${
          process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
            ? dayjs
                .duration(this.props.gameInfo.segmentLengthInSecs, "seconds")
                .asWeeks()
            : dayjs
                .duration(this.props.gameInfo.segmentLengthInSecs, "seconds")
                .asDays()
        } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
      },
      {
        label: "🎯 Deposit Amount",
        data: `${weiToERC20(this.props.gameInfo.rawSegmentPayment)} DAI`,
      },
      {
        label: `🏁 Game Length`,
        data: `${dayjs
          .duration(
            this.props.gameInfo.segmentLengthInSecs *
              displaySegment(this.props.gameInfo.lastSegment),
            "seconds"
          )
          .asDays()} Days`,
      },
      // {
      //   label: "🎯 Recurring Deposit",
      //   data: `${web3.utils.fromWei(
      //     this.props.gameInfo.rawSegmentPayment
      //   )} DAI every ${
      //     process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
      //       ? dayjs.duration(roundsLengthsSecs, "seconds").asWeeks()
      //       : dayjs.duration(roundsLengthsSecs, "seconds").asDays()
      //   } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
      // },
      // {
      //   label: "⏳ Current Round",
      //   data: !this.props.gameInfo.isGameCompleted
      //     ? `${displaySegment(
      //         this.props.gameInfo.currentSegment
      //       )} out of ${displaySegment(this.props.gameInfo.lastSegment - 1)}`
      //     : "Game Completed ✔️",
      // },
      // {
      //   label: "👻 Players Status",
      //   data: `${numberOfPlayers("alive")} Alive and ${numberOfPlayers(
      //     "dead"
      //   )} Dead`,
      //   //condition: !props.hidePlayersStatus,  //🚨 defaults to false so is not shown (see JoinableGame.js); not sure why you'd want to hide this?? because it is loading slowly?
      // },
      // {
      //   label: "🏦 Total Pool Funds",
      //   data: `${
      //     this.props.gameInfo &&
      //     weiToERC20(this.props.gameInfo.totalGamePrincipal)
      //   } DAI`,
      // },
      // {
      //   label: "💸 Total Pool Interest",
      //   data: `${
      //     this.props.gameInfo && weiToERC20(this.props.totalGameInterest)
      //   } DAI`, //🚨 would be nice if this can show more decimals!
      // },
      // {
      //   label: "💸 Pool APY",
      //   data: `${
      //     Math.round((this.props.gameInfo.poolAPY + Number.EPSILON) * 100) / 100
      //   }%`,
      // },
    ];

    const valueStyle = {
      backgroundColor: "#F6F8FE",
      marginLeft: "18px",
      paddingLeft: "10px",
      paddingRight: "4px",
      borderRadius: "3px",
      fontSize: "0.7rem",
    };
    return (
      <section>
        <div>
          <div>
            <h3
              className="show-mobile-only animate__fadeIn"
              style={{ marginTop: "5px" }}
            >
              Game Stats
            </h3>
            <Container style={{ paddingBottom: "24px" }}>
              {/* {gameData.map((item, i) => {
                if (item.hasOwnProperty("condition") && !item.condition) {
                  return null;
                }
                return (
                  <>

                    <div key={i}>
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "0.7rem",
                          color: "black",
                        }}
                      >
                        {item.label} : {"  "}
                      </span>
                      <span style={valueStyle}>{item.data}</span>
                    </div>
                  </>
                );
              })} */}
              <Row>
                <Col sm={6}>
                  <div key={0}>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.7rem",
                        color: "black",
                      }}
                    >
                      {gameData[0].label} : {"  "}
                    </span>
                    <span style={valueStyle}>{gameData[0].data}</span>
                  </div>
                </Col>
                <Col sm={6}>
                  <div key={1}>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.7rem",
                        color: "black",
                      }}
                    >
                      {gameData[1].label} : {"  "}
                    </span>
                    <span style={valueStyle}>{gameData[1].data}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.7rem",
                        color: "black",
                      }}
                    >
                      {gameData[2].label} : {"  "}
                    </span>
                    <span style={valueStyle}>{gameData[2].data}</span>
                  </div>
                </Col>
                <Col sm={6}>
                  <div key={3}>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.7rem",
                        color: "black",
                      }}
                    >
                      {gameData[3].label} : {"  "}
                    </span>
                    <span style={valueStyle}>{gameData[3].data}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <CircleData
                  label="Pool APY"
                  data={Math.round(props.gameInfo.poolAPY * 10) / 10}
                  measure="%"
                />
                <CircleData label="Interest Earned" data={8} measure="DAI" />
                <CircleData label="Total Pooled" data={39} measure="DAI" />
              </Row>
            </Container>
          </div>
        </div>
      </section>
    );
  }
}
const CircleData = (props) => (
  <Col sm={4}>
    <h5 style={{ textAlign: "center" }}>{props.label}</h5>
    <div
      style={{
        height: "150px",
        borderColor: "#6EB0FC",
        borderWidth: "12px",
        width: "150px",
        borderStyle: "solid",
        borderRadius: "50%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "2em",
          marginBottom: "0px",
          marginTop: "1.5rem",
          lineHeight: "1.7rem",
        }}
      >
        {props.data}
      </p>
      <p>{props.measure}</p>
    </div>
  </Col>
);

export default GameStats;
