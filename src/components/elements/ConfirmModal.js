import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { getViewableGameStats } from "./../sections/GameStats";

export default (props) => {
  const gameInfo = getViewableGameStats(props.gameInfo);
  return (
    <Modal show={props.show} handleClose={props.close}>
      <h3>Join our saving pool</h3>
      <p>Click join below to join the pool, and make your first deposit.</p>
      <p>
        You will need the deposit amount in DAI and some ETH for gas in your
        wallet.{" "}
      </p>

      <h4>
        Pool Rules{" "}
        <span role="img" aria-label="swimmer">
          🏊‍♀️
        </span>
      </h4>
      <div style={{ fontFamily: "Montserrat", paddingBottom: "24px" }}>
        <div>
          <span>{gameInfo[3].confirmLabel}:</span>{" "}
          <span className="code">{gameInfo[3].data}</span>
        </div>
        <div>
          <span>{gameInfo[1].confirmLabel}:</span>{" "}
          <span className="code">{gameInfo[1].data}</span>
        </div>
        <div>
          <span>{gameInfo[2].confirmLabel}:</span>{" "}
          <span className="code">{gameInfo[2].data}</span>
        </div>
      </div>
      <Button color="primary" onClick={props.close}>
        Close
      </Button>
    </Modal>
  );
};
