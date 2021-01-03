import React from "react";
import { PlayerImage } from "./../elements/PrintPlayers";
import AddEmail from "./AddEmail";
import { weiToERC20 } from "./../../utils/utilities";

const PlayerInfo = (props) => {
  const humanMostRecentSegmentPaid =
    parseInt(props.playerInfo.mostRecentSegmentPaid) + 1;
  const humanTotalDepositsNeeded = parseInt(props.lastSegment);
  const getPlayerFromPlayers = () =>
    props.players.filter((player) => {
      return (
        player.address.toLowerCase() === props.playerInfo.address.toLowerCase()
      );
    });
  const valueStyle = {
    backgroundColor: "white",
    marginLeft: "20px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "3px",
    fontFamily: "monospace, monospace",
    fontSize: "0.85rem",
    marginLeft: "0px",
    color: "#333366",
  };
  return (
    <div
      className="tiles-item-inner"
      style={{
        flexBasis: "500px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "left",
        fontFamily: "monserrat !important",
        backgroundColor: "#F6F8FE",
        padding: "28px",
        position: "relative",
        // boxShadow: "0 32px 64px rgba(43,43,82,0.24)",
      }}
    >
      <h3>Your Profile</h3>
      <div
        style={{
          height: "100px",
          position: "absolute",
          right: "26px",
          top: "0px",
          zIndex: "0",
        }}
        className="illustration-element-05 gg-image"
      >
        {getPlayerFromPlayers()[0] && (
          <PlayerImage
            i={1}
            player={getPlayerFromPlayers()[0]}
            style={{
              backgroundColor: "white",
              boxShadow: "0 32px 64px rgba(43, 43, 82, 0.24)",
            }}
          />
        )}
      </div>
      <div>
        <div>
          <span
            className="sans_serif"
            style={{ fontWeight: "600", fontSize: "0.85rem" }}
          >
            Status:
          </span>{" "}
          {!props.isGameCompleted && (
            <span style={valueStyle}>
              {props.playerInfo.isStillInGame
                ? "Alive 🎉 you made all deposits so far - keep up the good work!"
                : "Dead 😢 sorry you missed a deposit"}
            </span>
          )}
          {props.isGameCompleted && (
            <span style={valueStyle}>
              {parseInt(props.lastSegment) - 1 ===
              parseInt(props.playerInfo.mostRecentSegmentPaid)
                ? "WINNER 🥳 you made all deposits and earned a slice of the interest"
                : "DEFEATED 😢 you missed a deposit and did not earn a slice of the interest this time"}
            </span>
          )}
        </div>
        <div>
          <span
            className="sans_serif"
            style={{ fontWeight: "600", fontSize: "0.85rem" }}
          >
            Deposits made:
          </span>{" "}
          <span style={valueStyle}>
            {humanMostRecentSegmentPaid} (out of {humanTotalDepositsNeeded})
          </span>
        </div>
        <div>
          <span
            className="sans_serif"
            style={{ fontWeight: "600", fontSize: "0.85rem" }}
          >
            Total Deposited:
          </span>{" "}
          <span style={valueStyle}>
            {weiToERC20(props.playerInfo.amountPaid)} DAI
          </span>
        </div>
        <div>
          <span
            className="sans_serif"
            style={{ fontWeight: "600", fontSize: "0.85rem" }}
          >
            {" "}
            ETH address{" "}
          </span>{" "}
          : <span style={valueStyle}>{props.playerInfo.address}</span>
        </div>
      </div>

      {/* <AddEmail addr={props.playerInfo.addr} buttonStyle={true} /> */}
    </div>
  );
};

export default PlayerInfo;
