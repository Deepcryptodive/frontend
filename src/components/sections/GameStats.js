import React from "react";
import { displaySegment, weiToERC20, round } from "./../../utils/utilities";
import web3 from "web3";
import dayjs from "dayjs";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const getRound = (gameInfo) => {
  if (gameInfo.isGameCompleted) {
    return "Game Completed";
  }
  if (gameInfo.isWaitingRound) {
    return "Waiting round";
  }
  return `${displaySegment(gameInfo.currentSegment)} / ${displaySegment(
    gameInfo.lastSegment - 1
  )}`;
};
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
    )} days`,
  },
  {
    label: "⏳ Current Round",
    data: getRound(gameInfo),
    confirmLabel: "Game status",
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
        ? round(
            dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asWeeks()
          )
        : round(
            dayjs.duration(gameInfo.segmentLengthInSecs, "seconds").asDays()
          )
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

    const totalInterest = 0;

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
              <Row>
                <Col sm={6}>
                  <div key={0}>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          How long the game runs, from start to finish
                        </Tooltip>
                      }
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
                          The current round (out of total rounds in the game)
                        </Tooltip>
                      }
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
                          The amount you need to deposit each round to stay in
                          the game
                        </Tooltip>
                      }
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
                          The time between two deposits deadlines
                        </Tooltip>
                      }
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
                  <br />
                </span>
              </Row>
              <Row>
                <CircleData
                  label="Pool APY"
                  data={Math.round(props.gameInfo.poolAPY * 10) / 10}
                  measure="%"
                  tooltipText="The current interest rate that is being earned by the
                    savings pool"
                />

                <CircleData
                  label="Interest Earned"
                  data={
                    props.gameInfo.currentSegment === "0"
                      ? "Available next round"
                      : "WIP"
                  }
                  measure={
                    props.gameInfo.currentSegment === "0" ? false : "DAI"
                  }
                  tooltipText="The total interest earned by the savings pool thus far.
                    This will be given to all winning players!"
                />
                {/* Might be nice to include in the players view:
                <CircleData
                  label="Winners"
                  data={props.players.length}
                  measure="players"
                />*/}

                <CircleData
                  label="Total Pool Funds"
                  data={weiToERC20(props.gameInfo.totalGamePrincipal)}
                  measure="DAI"
                  tooltipText="  The sum of all deposits into the savings pool (excluding interest)"
                />
              </Row>
              {props.children}
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
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip-2">{props.tooltipText}</Tooltip>}
    >
      <div
        style={{
          height: "150px",
          borderColor: "#6EB0FC",
          borderWidth: "11px",
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
          {props.data}
        </p>
        {props.measure && <p>{props.measure}</p>}
      </div>
    </OverlayTrigger>
  </Col>
);

export default GameStats;
