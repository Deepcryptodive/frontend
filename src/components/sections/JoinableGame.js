import React, { useState } from "react";
import Button from "./../elements/Button";
import PlayersPrint from "./../elements/PrintPlayers";
import { status, isNotEmptyObj, brandColors } from "../../utils/utilities";
import PlayerInfo from "../elements/PlayerInfo";
import dayjs from "dayjs";
import Alert from "./../elements/Alert";
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
import PlayerProfile from "./../elements/PlayerProfile";
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
      {props.success.joinGame && (
        <Alert text={"Success you joined the Pool! 🥳"} />
      )}
      <ConfirmModal
        show={showConfirmModal}
        close={() => setShowConfirmModal(false)}
        gameInfo={props.gameInfo}
        joinGame={props.joinGame}
        success={props.success.joinGame}
        loadingState={props.loadingState}
        errors={props.errors}
      />
      <Welcome
        connectToWallet={props.connectToWallet}
        usersAddress={props.usersAddress}
        getAddressFromMetaMask={props.getAddressFromMetaMask}
      />
      {unRegisteredPlayer && (
        <Join
          openModal={() => setShowConfirmModal(true)}
          errors={props.errors}
          success={props.success}
          loadingState={props.loadingState}
        />
      )}
      <div className="container">
        <Row>
          {console.log(
            "registeredPlayer",
            registeredPlayer,
            "playInfo",
            isNotEmptyObj(props.playerInfo)
          )}
          {registeredPlayer && isNotEmptyObj(props.playerInfo) && (
            <PlayerProfile />
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
      {props.errors.joinGame && <JoinError />}
      <KovanFaucet />
    </div>
  );
};
export default JoinableGame;
