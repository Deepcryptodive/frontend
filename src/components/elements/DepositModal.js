import React from "react";
import Modal from "./Modal";
import Button from "./Button";
// import { getViewableGameStats } from "../sections/GameStats";
import Loading from "./../../assets/loading.svg";
import { JoinError } from "./Errors";
import { daiLink, ethLink } from "../../utils/utilities";

export default (props) => {
  // const gameInfo = getViewableGameStats(props.gameInfo);
  return (
    <Modal show={props.show} handleClose={props.close}>
      {!props.success && <h3>Deposit this round</h3>}
      {/* {props.errors.makeDeposit && !props.success && <JoinError />} */}
      {props.success && (
        <div>
          <h4>
            Congrats your deposit has gone through!{" "}
            <span role="img" aria-label="swimmer">
              🥳
            </span>{" "}
          </h4>
        </div>
      )}
      {!props.success && (
        <>
          <p>Make your regular deposit.</p>
          <h5>{props.amount} DAI</h5>
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

          <Button tag="a" color="primary" onClick={() => console.log("hi")}>
            {props.loadingState.makeDeposit ? (
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
              "Make your deposit"
            )}
          </Button>
        </>
      )}
    </Modal>
  );
};
