import React, { useState } from "react";
import Button from "./../elements/Button";
import PrintPlayers from "./../elements/PrintPlayers";
import { status, isNotEmptyObj } from "../../utils/utilities";
import Alert from "./../elements/Alert";
import GameStats from "./GameStats";
import EmergencyWithdraw from "./../elements/EmergencyWithdraw";
import KovanFaucet from "./../elements/KovanFaucet";
import Schedule from "./../elements/Schedule";
import { JoinError } from "./../elements/Errors";
import ConfirmModal from "./../elements/ConfirmModal";
import Tabs from "./../elements/Tabs";
import Welcome from "./Welcome";
import TabContent from "./../elements/TabContent";
import Join from "./Join";
import PlayerProfile from "./../elements/PlayerProfile";
import GameAdmin from "./partials/GameAdmin";
import { Col, Row } from "react-bootstrap";

// import CountdownContainer from "./../elements/countdown-container";

const JoinableGame = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const registeredPlayer =
    props.usersAddress && props.userStatus === status.registered;
  const unRegisteredPlayer =
    props.usersAddress && props.userStatus === status.unregistered;
  const { playerInfo } = props;
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
          {registeredPlayer && isNotEmptyObj(playerInfo) && (
            <PlayerProfile playerInfo={playerInfo} gameInfo={props.gameInfo} />
          )}
          <Col sm={registeredPlayer ? 9 : 12}>
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
                {props.players && PrintPlayers(props.players)}
              </TabContent>
              <TabContent header={"Admin"}>
                <GameAdmin />
              </TabContent>
            </Tabs>
          </Col>
        </Row>
      </div>
      {props.errors.joinGame && !props.success.joinGame && <JoinError />}
      <KovanFaucet />
    </div>
  );
};
export default JoinableGame;
