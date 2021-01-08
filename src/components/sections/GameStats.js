import React from "react";
import PropTypes from "prop-types";
import { displaySegment, weiToERC20, round } from "./../../utils/utilities";
import web3 from "web3";
import dayjs from "dayjs";
import { Container, Row, Col } from "react-bootstrap";

export const getViewableGameStats = (gameInfo) => [
  {
    label: "🕐Round",
    data: `${displaySegment(gameInfo.currentSegment)} of ${displaySegment(
      gameInfo.lastSegment
    )}`,
    confirmLabel: "Number of Rounds",
    confirmData: displaySegment(gameInfo.lastSegment),
  },
  {
    label: "🕒 Round Length",
    confirmLabel: "Round Length",
    data: `${
      process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
        ? round(
            dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asWeeks()
          )
        : round(
            dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asDays()
          )
    } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
  },
  {
    label: "🎯 Deposit Amount",
    confirmLabel: "Deposit Amount",
    data: `${weiToERC20(gameInfo.rawSegmentPayment)} DAI`,
  },
  {
    label: `🏁 Game Length`,
    confirmLabel: "Game Length",
    data: `${round(
      dayjs
        .duration(
          gameInfo.segmentLengthInSecs * displaySegment(gameInfo.lastSegment),
          "seconds"
        )
        .asDays()
    )} Days`,
  },
];

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

    const personalInterest =
      props.gameInfo.totalGameInterest > 0
        ? props.gameInfo.totalGameInterest / props.players.length
        : 0;
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

    const gameData = getViewableGameStats(this.props.gameInfo);

    const valueStyle = {
      // backgroundColor: "#F6F8FE",
      marginLeft: "18px",
      paddingLeft: "10px",
      paddingRight: "4px",
      // borderRadius: "3px",
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
                    <span className="code" style={valueStyle}>
                      {gameData[0].data}
                    </span>
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
                    <span className="code" style={valueStyle}>
                      {gameData[1].data}
                    </span>
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
                    <span className="code" style={valueStyle}>
                      {gameData[2].data}
                    </span>
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
                    <span className="code" style={valueStyle}>
                      {gameData[3].data}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <CircleData
                  label="Pool APY"
                  data={Math.round(props.gameInfo.poolAPY * 10) / 10}
                  measure="%"
                />
                <CircleData
                  label="Interest Earned"
                  data={personalInterest}
                  measure="DAI"
                />
                <CircleData
                  label="Total Pooled"
                  data={props.gameInfo.totalGameInterest}
                  measure="DAI"
                />
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
