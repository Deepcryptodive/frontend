import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "./Image";
import dayjs from "dayjs";
import {
  displayAddress,
  weiToERC20,
  displaySegment,
} from "./../../utils/utilities";
import Button from "./../elements/Button";

export default (props) => {
  const hasPaid =
    props.playerInfo.mostRecentSegmentPaid == props.gameInfo.currentSegment;

  return (
    <Col xs={12} sm={3}>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "24px",
          // height: props.showButton ? "465px" : "413px",
          paddingTop: "16px",
        }}
      >
        <Image
          style={{
            borderRadius: "50%",
            width: "200px",
            borderColor: "#A0CBFD",
            borderStyle: "solid",
            borderWidth: "6px",
            fontFamily: "Montserrat",
            maxHeight: "200px",
          }}
          width={100}
          height={100}
          src={
            props.playerInfo.threeBoxAvatar
              ? props.playerInfo.threeBoxAvatar
              : `https://robohash.org/${props.playerInfo.address}`
          }
        />
        <h5>
          {props.playerInfo.threeBoxName
            ? props.playerInfo.threeBoxName
            : displayAddress(props.playerInfo.address)}
        </h5>
        <div
          className="container"
          style={{
            textAlign: "left",
            fontFamily: "Montserrat",
            fontSize: "0.7rem",
            lineHeight: "1.5rem",
            padding: "0 10px",
          }}
        >
          <Row style={hasPaid ? { paddingTop: "30px" } : {}}>
            <Col lg={8}>
              <span>👀 Status</span>
            </Col>
            <Col lg={4}>
              <span>{props.playerInfo.isLive ? "Alive" : "Ghost"}</span>
              {/* 🚨 TO DO: check if we can add a tooltip with what this means*/}
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <span>✅ Deposits Made</span>
            </Col>
            <Col xs={4}>
              <span>{`${displaySegment(
                props.playerInfo.mostRecentSegmentPaid
              )} / ${
                displaySegment(props.gameInfo.lastSegment) - 1
              }`}</span>{" "}
              {/* 🚨 TO CHECK: shouldn't this be 'lastSegment' minus one*/}
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <span>💸 Total Deposited </span>
            </Col>
            <Col xs={4}>
              <span>{weiToERC20(props.playerInfo.amountPaid)}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <span>💰 Potential Gains</span>
            </Col>
            <Col xs={4}>
              <span> +XX.XX DAI </span>{" "}
              {/* 🚨 Feature request: add how much a user stands to gain if the completes the game - see https://github.com/Good-Ghosting/frontend/issues/28*/}
            </Col>
          </Row>
        </div>
        {props.showButton && !hasPaid && !props.gameInfo.isWaitingRound && (
          <div style={{ paddingTop: "16px" }}>
            <Button
              style={{ marginBottom: "12px" }}
              onClick={props.buttonClick}
              color="primary"
            >
              Make your deposit
            </Button>
          </div>
        )}
        {props.gameInfo.isWaitingRound && !props.gameInfo.isGameCompleted && (
          <div>
            {" "}
            <h5>⏱Waiting Round</h5>
            {console.log(
              "🥳",
              props.gameInfo.nextSegmentEnd
                .add(props.gameInfo.segmentLengthInSecs, "second")
                .format("HH:mm ddd D MMM")
            )}
            {/* <p>Ends at: {props.gameInfo.nextSegmentEnd.dateData.format("HH:mm ddd D MMM")}</p> */}
          </div>
        )}
      </div>
    </Col>
  );
};
