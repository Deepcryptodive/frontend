import React, { useState } from "react";
import { status, displaySegment, isNotEmptyObj } from "../../utils/utilities";
import PlayersPrint from "./../elements/PrintPlayers";
import Button from "./../elements/Button";
import GameStats from "./GameStats";

import EmergencyWithdraw from "./../elements/EmergencyWithdraw";
import KovanFaucet from "./../elements/KovanFaucet";
import Schedule from "./../elements/Schedule";
import SuccessModal from "./../elements/SuccessModal";
import Tabs from "./../elements/Tabs";
import Welcome from "./Welcome";
import TabContent from "./../elements/TabContent";
import { Row, Col } from "react-bootstrap";
import Image from "./../elements/Image";
import PlayerProfile from "./../elements/PlayerProfile";
import GameAdmin from "./partials/GameAdmin";
import DepositModal from "../elements/DepositModal";
import Alert from "./../elements/Alert";
import CashOut from "./CashOut";

export default (props) => {
  const { playerInfo } = props;
  const [showDepositModal, setShowDepsitModal] = useState(false);
  const registeredPlayer =
    props.usersAddress && props.userStatus === status.registered;
  const unRegisteredPlayer =
    props.usersAddress && props.userStatus === status.unregistered;
  return (
    <>
      {props.success.depositIntoExternalPool && (
        <Alert text="Deposit into Aave completed" />
      )}
      {props.success.makeDeposit && (
        <Alert text="Congrats, your deposit completed! 🥳 Keep up the good work!" />
      )}
      {props.success.redeem && (
        <Alert text="Funds allocated successfully. Individual players can now withdraw their funds." />
      )}
      {props.errors.redeem ||
        (props.errors.depositIntoExternalPool && (
          <Alert color="#FF7272" text="Something went wrong, try again." />
        ))}

      <DepositModal
        success={props.success.makeDeposit}
        errors={props.errors}
        loadingState={props.loadingState}
        show={showDepositModal}
        close={() => setShowDepsitModal(false)}
        amount={props.gameInfo.segmentPayment}
        makeDeposit={props.makeDeposit}
      />
      <Welcome
        connectToWallet={props.connectToWallet}
        usersAddress={props.usersAddress}
      />
      {props.gameInfo.isGameCompleted &&
        props.userStatus === status.registered && (
          <CashOut
            gameInfo={props.gameInfo}
            loadingState={props.loadingState}
            redeem={props.redeemed}
            withdraw={props.withdraw}
            playerInfo={props.playerInfo}
          />
        )}
      <div className="container">
        <Row>
          {registeredPlayer && isNotEmptyObj(playerInfo) && (
            <PlayerProfile
              playerInfo={playerInfo}
              gameInfo={props.gameInfo}
              makeDeposit={props.makeDeposit}
              showButton={props.playerInfo.isLive}
              succes={props.success}
              buttonClick={() => setShowDepsitModal(true)}
            />
          )}
          <Col lg={registeredPlayer ? 9 : 12}>
            <Tabs>
              <TabContent
                header={"Game Stats"}
                style={props.playerInfo.isLive ? { padding: "30px 0" } : {}}
              >
                <GameStats
                  gameInfo={props.gameInfo}
                  players={props.players}
                ></GameStats>
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
                <GameAdmin
                  liveGame={true}
                  depositIntoExternalPool={props.depositIntoExternalPool}
                  loadingState={props.loadingState}
                  isLoggedIn={!!props.usersAddress}
                  isGameCompleted={props.gameInfo.isGameCompleted}
                  redeem={props.redeem}
                />
              </TabContent>
            </Tabs>
          </Col>
        </Row>
        {props.userStatus === status.unregistered && <UnRegisteredPlayer />}
      </div>

      <>
        <KovanFaucet />
      </>
    </>
  );
};

const UnRegisteredPlayer = (props) => (
  <>
    <p>
      <span role="img">🙁</span>
      <span
        style={{
          fontWeight: "800",
          fontSize: "1.9rem",
          color: "black",
        }}
      >
        {" "}
        Sadly you are too late to join the game!
      </span>
    </p>
    <p>
      Keep an eye on our{" "}
      <a href="https://discord.com/invite/AWvcTFP" rel="noopener noreferrer">
        Discord server
      </a>{" "}
      to get notified when the next game starts
      <span role="img">👀</span>
    </p>
  </>
);
