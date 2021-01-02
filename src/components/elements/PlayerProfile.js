import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "./Image";

export default () => (
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
          // props.player.threeBoxAvatar
          // ? `https://ipfs.infura.io/ipfs/${props.player.threeBoxAvatar}`
          // :
          `https://robohash.org/${0x2f4ce4f714c68a3fc871d1f543ffc24b9b3c2386}`
        }
      />
      <h5>Fake Name</h5>
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
