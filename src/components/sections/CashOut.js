import React from "react";
import { HashLink } from "react-router-hash-link";
import CheckBox from "react-animated-checkbox";
import LoadingDark from "./../../assets/loading-dark.svg";
import LoadingButton from "../elements/LoadingButton";

const CashOut = (props) => {
  return (
    <>
      <div
        className="container"
        style={{ backgroundColor: "white", maxWidth: "80vw" }}
      >
        <h1 style={{ paddingTop: "24px" }}>The game is completed!🥳</h1>
        <p className="cardo">Claim your rewards!</p>

        <div style={{ textAlign: "center" }}>
          <ButtonAndTick
            isActive={props.gameInfo.redeemed}
            isLoading={props.loadingState.redeem}
            description="Allocate Pool's Funds"
            // onClickFunc={props.redeem}
          />
          <ButtonAndTick
            isActive={props.playerInfo.withdrawn}
            isLoading={props.loadingState.withdraw}
            description="Withdraw your funds"
            // onClickFunc={props.withdraw}
          />
        </div>
        {!props.playerInfo.withdrawn && (
          <div style={{ paddingBottom: "20px" }}>
            <LoadingButton
              text="Withdraw"
              onClick={props.withdraw}
              loading={props.loadingState.withdraw}
            />
          </div>
        )}
      </div>
    </>
  );
};

const ButtonAndTick = (props) => (
  <>
    <p style={{ lineHeight: "69px", marginBottom: "0px", textAlign: "center" }}>
      <span
        style={{
          marginRight: "25px",
          fontFamily: "Montserrat",
        }}
        // className={!props.isActive ? "button-tick-hooverable" : ""}
        // onClick={() => {
        //   if (!props.isActive) {
        //     props.onClickFunc();
        //   }
        // }}
      >
        {props.description}
      </span>
      {!props.isLoading && (
        <span className="hidePointer">
          <CheckBox
            checked={props.isActive}
            checkBoxStyle={{
              checkedColor: "#8E79FC",
              size: 20,
              unCheckedColor: "#b8b8b8",
              cursor: "default !important",
            }}
            // onClick={() => {
            //   if (!props.isActive) {
            //     props.onClickFunc();
            //   }
            // }}
            duration={400}
          />
        </span>
      )}
      {props.isLoading && (
        <img
          src={LoadingDark}
          alt="loading"
          style={{ width: "28px", paddingLeft: "10px", display: "inline" }}
        />
      )}
    </p>
  </>
);

export default CashOut;
