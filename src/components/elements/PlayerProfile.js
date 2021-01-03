import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "./Image";
import { displayAddress } from "./../../utils/utilities";

export default (props) => (
  <Col className="show-desktop-only">
    <div
      style={{
        backgroundColor: "white",
        marginTop: "24px",
        height: "413px",
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
        <Row>
          <Col lg={8}>
            <span>👀Status</span>
          </Col>
          <Col lg={4}>
            <span>Alive</span>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <span>💰Deposits Made</span>
          </Col>
          <Col lg={4}>
            <span>1/4</span>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <span>💸Total Deposited </span>
          </Col>
          <Col lg={4}>
            <span>Status</span>
          </Col>
        </Row>
      </div>
    </div>
  </Col>
);
