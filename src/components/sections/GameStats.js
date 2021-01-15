import React from "react";
import PropTypes from "prop-types";
import { displaySegment, weiToERC20, round } from "./../../utils/utilities";
import web3 from "web3";
import dayjs from "dayjs";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

export const getViewableGameStats = (gameInfo) => [
  {
    label: `🕒 Game Duration`,
    confirmLabel: "Game Duration",
    data: `${round(
      dayjs
        .duration(
          gameInfo.segmentLengthInSecs * displaySegment(gameInfo.lastSegment),
          "seconds"
        )
        .asDays()
    )} Days`,
  },
  {
    label: "⏳ Current Round",
    data: `${displaySegment(gameInfo.currentSegment)} out of ${displaySegment(
      gameInfo.lastSegment
    )}`,
    confirmLabel: "Current Round",
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
    label: "🎯 Recurring Deposit",
    confirmLabel: "Recurring Deposit",
    data: `${weiToERC20(gameInfo.rawSegmentPayment)} DAI every ${
          process.env.REACT_APP_WEEKS_OR_DAYS === "weeks"
            ? dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asWeeks()
            : dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asDays()
        } ${process.env.REACT_APP_WEEKS_OR_DAYS}`,
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

    const totalInterest = props.gameInfo.totalGameInterest;

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
      fontSize: "0.95rem",
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
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          The time the game runs, from start to finish
                        </Tooltip>}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "0.8rem",
                          color: "black",
                        }}
                      >
                        {gameData[0].label} : {"  "}
                      </span>
                    </OverlayTrigger>
                    <span className="code" style={valueStyle}>
                      {gameData[0].data}
                    </span>
                  </div>
                </Col>

                <Col sm={6}>
                  <div key={1}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Example content for tooltip item 2
                      </Tooltip>}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        color: "black",
                      }}
                    >
                      {gameData[1].label} : {"  "}
                    </span>
                    </OverlayTrigger>
                    <span className="code" style={valueStyle}>
                      {gameData[1].data}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <div>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The amount you need to deposit each round to stay in the game
                      </Tooltip>}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        color: "black",
                      }}
                    >
                      {gameData[3].label} : {"  "}
                    </span>
                    </OverlayTrigger>
                    <span className="code" style={valueStyle}>
                      {gameData[3].data}
                    </span>
                  </div>
                </Col>
                <Col sm={6}>
                  <div key={3}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The time between two deposits.
                      </Tooltip>}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        color: "black",
                      }}
                    >
                      {gameData[2].label} : {"  "}
                    </span>
                    </OverlayTrigger>
                    <span className="code" style={valueStyle}>
                      {gameData[2].data}
                    </span>
                  </div>
                </Col>
              </Row>
             <Row>
               <span>
                 </br>
               </span>
             </Row>
              <Row>
                <CircleData
                  label="Pool APY"
                  data={Math.round(props.gameInfo.poolAPY * 10) / 10}
                  measure="%"
                />
                <CircleData
                  label="Interest Earned"
                  data={totalInterest}
                  measure="DAI"
                />
                <CircleData
                  label="Winners"
                  data={props.players.length}
                  measure="DAI"
                />
                <CircleData
                  label="Total Pool Funds"
                  data={weiToERC20(props.gameInfo.totalGamePrincipal)}
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
          fontSize: props.data.length > 3 ? "1em" : "2em",
          marginBottom: "0px",
          marginTop: "1.5rem",
          lineHeight: "1.7rem",
        }}
      >
        {console.log("data", props.data, props.data.length)}
        {props.data}
      </p>
      <p>{props.measure}</p>
    </div>
  </Col>
);

export default GameStats;
