import React from "react";
import { status, isNotEmptyObj, displaySegment } from "../../utils/utilities";
import PlayersPrint from "./../elements/PrintPlayers";
import Button from "./../elements/Button";
import PlayerInfo from "../elements/PlayerInfo";
import GameStats from "./GameStats";
import Loading from "./../../assets/loading.svg";
import LoadingDark from "./../../assets/loading-dark.svg";
import CheckBox from "react-animated-checkbox";
import EmergencyWithdraw from "./../elements/EmergencyWithdraw";
import KovanFaucet from "./../elements/KovanFaucet";
import KovanFauctet from "./../elements/KovanFaucet";
import Schedule from "./../elements/Schedule";
import SuccessModal from "./../elements/SuccessModal";
import Tabs from "./../elements/Tabs";
import Welcome from "./Welcome";
import TabContent from "./../elements/TabContent";
import { Row, Col } from "react-bootstrap";
import Image from "./../elements/Image";
import PlayerProfile from "./../elements/PlayerProfile";

export default (props) => {
  const { playerInfo } = props;
  const registeredPlayer =
    props.usersAddress && props.userStatus === status.registered;
  const unRegisteredPlayer =
    props.usersAddress && props.userStatus === status.unregistered;
  return (
    <>
      <SuccessModal
        close={props.toggleSuccess.bind(null, "makeDeposit")}
        show={props.success.makeDeposit}
      />
      <Welcome
        connectToWallet={props.connectToWallet}
        usersAddress={props.usersAddress}
      />
      <div className="container">
        <Row>
          {registeredPlayer && isNotEmptyObj(playerInfo) && (
            <PlayerProfile playerInfo={playerInfo} gameInfo={props.gameInfo} />
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
        {props.userStatus === status.unregistered && <UnRegisteredPlayer />}
      </div>

      <>
        {!props.gameInfo.isGameCompleted && (
          <div style={{ justifyContent: "center", marginTop: "3em " }}>
            {props.playerInfo.address && <h4> The Competition</h4>}
            {props.userStatus !== status.unregistered &&
              props.players &&
              PlayersPrint(props.players, props.playerInfo.address).length <
                1 && (
                <p>
                  Your have elimated the competition
                  <span role="img" aria-label="muscle emoji">
                    💪
                  </span>
                </p>
              )}
          </div>
        )}
        {props.gameInfo.isGameCompleted && (
          <div style={{ justifyContent: "center", marginTop: "3em " }}>
            {props.playerInfo.address && <h4>The Winners! 🥳</h4>}
            {props.players && PlayersPrint(props.players)}
          </div>
        )}
        <KovanFauctet />
      </>
    </>
  );
};

const UnRegisteredPlayer = (props) => (
  <>
    <p>
      <span role="img">🙁</span>Too late to join!
    </p>
    <p>
      Keep an eye on our{" "}
      <a href="https://discord.com/invite/AWvcTFP" rel="noopener noreferrer">
        discord
      </a>{" "}
      for news of the next game.
      <span role="img">👀</span>
    </p>
  </>
);

const ButtonAndTick = (props) => (
  <>
    <p style={{ lineHeight: "69px", marginBottom: "0px" }}>
      <span
        style={{
          marginRight: "25px",
          fontFamily: "Montserrat",
          fontWeight: "900",
        }}
        className={!props.isActive ? "button-tick-hooverable" : ""}
        onClick={() => {
          if (!props.isActive) {
            props.onClickFunc();
          }
        }}
      >
        {props.description}
      </span>
      {!props.isLoading && (
        <CheckBox
          checked={props.isActive}
          checkBoxStyle={{
            checkedColor: "#8E79FC",
            size: 20,
            unCheckedColor: "#b8b8b8",
          }}
          onClick={() => {
            if (!props.isActive) {
              props.onClickFunc();
            }
          }}
          duration={400}
        />
      )}
      {props.isLoading && (
        <img
          src={LoadingDark}
          alt="loading"
          // className="loading-img-button"
          style={{ width: "28px", paddingLeft: "10px", display: "inline" }}
        />
      )}
      {/* <Button
        style={{ margin: "20px" }}
        tag="a"
        color={props.gameInfo.redeemed ? "hjsdgf" : "secondary"}
        onClick={props.redeem}
        disabled={true}
      >
        Redeem
      </Button> */}
    </p>
  </>
);
