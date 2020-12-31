import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { getViewableGameStats } from "./../sections/GameStats";

export default (props) => {
  const gameInfo = getViewableGameStats(props.gameInfo);
  return (
    <Modal show={props.show} handleClose={props.close}>
      <h3>
        Confirm Modal{" "}
        <span role="img" aria-label="celebrate">
          🎉
        </span>
      </h3>
      {gameInfo.map((item, i) => (
        <div key={i}>
          {item.label} {item.data}
        </div>
      ))}
      <Button color="primary" onClick={props.close}>
        Close
      </Button>
    </Modal>
  );
};
