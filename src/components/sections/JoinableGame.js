import React, { useState } from "react";
import Button from "./../elements/Button";
import PlayersPrint from "./../elements/PrintPlayers";
import { status, isNotEmptyObj, brandColors } from "../../utils/utilities";
import PlayerInfo from "../elements/PlayerInfo";
import dayjs from "dayjs";
import AddEmail from "./../elements/AddEmail";
import GameStats from "./GameStats";
import Loading from "./../../assets/loading.svg";
import EmergencyWithdraw from "./../elements/EmergencyWithdraw";
import KovanFaucet from "./../elements/KovanFaucet";
import Schedule from "./../elements/Schedule";
import classNames from "classnames";
import { JoinError } from "./../elements/Errors";
import SuccessModal from "./../elements/SuccessModal";
import ConfirmModal from "./../elements/ConfirmModal";
import Tabs from "./../elements/Tabs";
import Welcome from "./Welcome";
import TabContent from "./../elements/TabContent";
import Image from "./../elements/Image";
import Join from "./Join";

import { Col, Row } from "react-bootstrap";
// import CountdownContainer from "./../elements/countdown-container";

const JoinableGame = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const registeredPlayer =
    props.usersAddress && props.userStatus === status.registered;
  const unRegisteredPlayer =
    props.usersAddress && props.userStatus === status.unregistered;
  return (
    <div>
      <SuccessModal
        close={props.toggleSuccess.bind(null, "joinGame")}
        // show={props.success.joinGame}
        show={false}
      />
      <ConfirmModal
        show={showConfirmModal}
        close={() => setShowConfirmModal(false)}
        gameInfo={props.gameInfo}
        joinGame={props.joinGame}
        success={props.success.joinGame}
        loadingState={props.loadingState}
      />
      <Welcome
        connectToWallet={props.connectToWallet}
        usersAddress={props.usersAddress}
        getAddressFromMetaMask={props.getAddressFromMetaMask}
      />
      {unRegisteredPlayer && (
        <Join
          joinGame={() => setShowConfirmModal(true)}
          errors={props.errors}
          success={props.success}
        />
      )}
      <div className="container">
        <Row>
          {registeredPlayer && (
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
          )}
          <Col lg={registeredPlayer ? 9 : 12}>
            <Tabs>
              <TabContent header={"Game Stats"}>
                <GameStats gameInfo={props.gameInfo} players={props.players} />
              </TabContent>
              <TabContent header="Timeline">
                <Schedule
                  gameInfo={props.gameInfo}
                  header="Timeline"
                  topDivider
                />
              </TabContent>
              <TabContent header={"Players"}>
                {props.players && PlayersPrint(props.players)}
              </TabContent>
              <TabContent header={"Admin"}>
                <h1>This is the admin content</h1>
                <p className="Cardo">
                  You shouldn't need to call these functions, as the
                  GoodGhosting team will do. However for transparency we have
                  made them open.
                </p>
                <p>
                  Contract Address:{" "}
                  <a
                    href={`https://kovan.etherscan.io/address/${process.env.REACT_APP_GG_CONTRACT}`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <span
                      style={{
                        backgroundColor: "rgb(246, 248, 254)",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      {process.env.REACT_APP_GG_CONTRACT}
                    </span>
                  </a>
                </p>
                <p>
                  The Graph URL:{" "}
                  <a
                    href={process.env.REACT_APP_GRAPH_URL}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <span
                      style={{
                        backgroundColor: "rgb(246, 248, 254)",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      {process.env.REACT_APP_GRAPH_URL}
                    </span>
                  </a>
                </p>
              </TabContent>
            </Tabs>
          </Col>
        </Row>
      </div>

      <KovanFaucet />
    </div>
  );
};
export default JoinableGame;
