import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "./Image";
import {
  displayAddress,
  weiToERC20,
  displaySegment,
} from "./../../utils/utilities";
import Button from "./../elements/Button";

export default (props) => {
  const hasPaid =
    props.playerInfo.mostRecentSegmentPaid === props.gameInfo.currentSegment ||
    props.success.makeDeposit;
  return (
    <Col className="show-desktop-only">
      <div
        style={{
          backgroundColor: "white",
          marginTop: "24px",
          height: props.showButton ? "465px" : "413px",
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
            fontFamily: "Monsterrat",
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
            <Col lg={8}>
              <span>✅ Deposits Made</span>
            </Col>
            <Col lg={4}>
              <span>{`${displaySegment(
                props.playerInfo.mostRecentSegmentPaid
              )} / ${displaySegment(props.gameInfo.lastSegment)}`}</span>  {/* 🚨 TO CHECK: shouldn't this be 'lastSegment' minus one*/}
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <span>💸 Total Deposited </span>
            </Col>
            <Col lg={4}>
              <span>{weiToERC20(props.playerInfo.amountPaid)}</span>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <span>💰 Potential Gains</span>
            </Col>
            <Col lg={4}>
              <span> +XX.XX DAI </span>  {/* 🚨 Feature request: add how much a user stands to gain if the completes the game - see https://github.com/Good-Ghosting/frontend/issues/28*/}
            </Col>
          </Row>
        </div>
        {props.showButton && !hasPaid && (
          <div style={{ paddingTop: "16px" }}>
            <Button onClick={props.buttonClick} color="primary">
              Make your deposit
            </Button>
          </div>
        )}
      </div>
    </Col>
  );
};
