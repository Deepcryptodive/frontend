import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { getViewableGameStats } from "./../sections/GameStats";
import Loading from "./../../assets/loading.svg";
import { JoinError } from "./../elements/Errors";
import { daiLink, ethLink } from "./../../utils/utilities";

export default (props) => {
  const gameInfo = getViewableGameStats(props.gameInfo);
  return (
    <Modal show={props.show} handleClose={props.close}>
      {!props.success && <h3>Join our saving pool</h3>}
      {props.errors.joinGame && !props.success && <JoinError />}
      {props.success && (
        <div>
          <h4>
            Congrats you have joined the pool!{" "}
            <span role="img" aria-label="swimmer">
              🥳
            </span>{" "}
          </h4>
        </div>
      )}
      {!props.success && (
        <>
          <p>Click join below to join the pool, and make your first deposit.</p>
          <p>
            You will need the deposit amount in{" "}
            <a
              href={daiLink}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              DAI
            </a>{" "}
            and some{" "}
            <a
              href={ethLink}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              ETH
            </a>{" "}
            for gas in your wallet.{" "}
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
              <span>{gameInfo[2].confirmLabel}:</span>{" "}
              <span className="code">{gameInfo[2].data}</span>
            </div>
          </div>
          <Button tag="a" color="primary" onClick={props.joinGame}>
            {props.loadingState.joinGame ? (
              <>
                Loading{" "}
                <img
                  src={Loading}
                  alt="loading"
                  className="loading-img-button"
                  style={{
                    width: "28px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
              </>
            ) : (
              "Join the Pool"
            )}
          </Button>
        </>
      )}
    </Modal>
  );
};
