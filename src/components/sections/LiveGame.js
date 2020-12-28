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

export default (props) => (
  <>
    <SuccessModal
      close={props.toggleSuccess.bind(null, "makeDeposit")}
      show={props.success.makeDeposit}
    />
    <Welcome
      connectToWallet={props.connectToWallet}
      usersAddress={props.usersAddress}
    />
    <Tabs>
      <TabContent header={"Game Stats"}>
        <GameStats gameInfo={props.gameInfo} players={props.players} />
        {props.userStatus === status.unregistered && <UnRegisteredPlayer />}
      </TabContent>
      {/* {props.userStatus === status.registered && (
        <RegisteredPlayer
          gameInfo={props.gameInfo}
          playerInfo={props.playerInfo}
          makeDeposit={props.makeDeposit}
          players={props.players}
          withdraw={props.withdraw}
          loadingState={props.loadingState}
          redeem={props.redeem}
          emergencyWithdraw={props.emergencyWithdraw}
          header="Player Info"
        />
      )} */}
      <TabContent header="Timeline">
        <Schedule gameInfo={props.gameInfo} header="Timeline" topDivider />
      </TabContent>
      <TabContent header={"Players"}>
        {props.players && PlayersPrint(props.players)}
      </TabContent>
      <TabContent header={"Admin"}>
        <h1>This is the admin content</h1>
        <p>
          You shouldn't need to call these functions, as the GoodGhosting team
          will do. However for transparency we have made them open.
        </p>
      </TabContent>
    </Tabs>

    {/* <div style={{ justifyContent: "center", marginTop: "3em " }}>
      {props.connectToWallet()}
    </div> */}
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
          {props.players &&
            PlayersPrint(props.players, props.playerInfo.address)}
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

const RegisteredPlayer = (props) => {
  const hasNotPaidThisSegment =
    props.playerInfo.mostRecentSegmentPaid !== props.gameInfo.currentSegment;
  const didNotMissPreviousSegment =
    props.playerInfo.mostRecentSegmentPaid > props.gameInfo.currentSegment - 2;

  return (
    <div>
      {isNotEmptyObj(props.playerInfo) && (
        <PlayerInfo
          playerInfo={props.playerInfo}
          players={props.players}
          isGameCompleted={props.gameInfo.isGameCompleted}
          lastSegment={props.gameInfo.lastSegment}
        />
      )}
      {/* <AddEmail addr={props.playerInfo.address} /> */}
      {hasNotPaidThisSegment &&
        didNotMissPreviousSegment &&
        !props.gameInfo.isGameCompleted && (
          <div style={{ marginTop: "20px" }}>
            <Button
              tag="a"
              color="primary"
              wideMobile
              onClick={props.makeDeposit}
            >
              {props.loadingState.makeDeposit ? (
                <>
                  {" "}
                  Loading{" "}
                  <img
                    src={Loading}
                    alt="loading"
                    className="loading-img-button"
                    style={{ width: "28px", paddingLeft: "10px" }}
                  />
                </>
              ) : (
                ` Deposit ${props.gameInfo.segmentPayment} DAI`
              )}
            </Button>
          </div>
        )}
      {!props.gameInfo.isGameCompleted && !props.playerInfo.withdrawn && (
        <EmergencyWithdraw
          emergencyWithdraw={props.emergencyWithdraw}
          loadingState={props.loadingState}
        />
      )}
      {props.gameInfo.isGameCompleted && (
        <>
          <ButtonAndTick
            isActive={props.gameInfo.redeemed}
            isLoading={props.loadingState.redeem}
            description="Allocate Pool's Funds"
            onClickFunc={props.redeem}
          />
          <ButtonAndTick
            isActive={props.playerInfo.withdrawn}
            isLoading={props.loadingState.withdraw}
            description="Withdraw your funds"
            onClickFunc={props.withdraw}
          />
        </>
      )}

      {/* {!props.gameInfo.isGameCompleted && (
        <p>
          Time to next payment interval{" "}
          {dayjs().to(props.gameInfo.nextSegmentEnd)}
        </p>
      )} */}
    </div>
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
