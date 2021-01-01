import React from "react";
import { HashLink } from "react-router-hash-link";
import Button from "./../elements/Button";
import Loading from "./../../assets/loading-dark.svg";
import { JoinError } from "./../elements/Errors";
import { status } from "../../utils/utilities";

// import Logo from "./../../assets/images/gg-logo-no-text.png";

const Join = (props) => {
  return (
    <>
      {!props.usersAddress && (
        <div
          className="container"
          style={{
            backgroundColor: "white",
            maxWidth: "80vw",
            paddingBottom: "20px",
          }}
        >
          <h1 style={{ paddingTop: "24px" }}>Unregistered</h1>
          <p> Time to get started with the coolest way to save! </p>
          {!props.loadingState.joinGame && (
            <Button color="primary" onClick={props.openModal}>
              Join us
            </Button>
          )}
          {props.loadingState.joinGame && (
            <div>
              <p>
                We are processing your transactions. Keep an eye on your wallet
              </p>
              <img src={Loading} style={{ color: "red", height: "72px" }} />
            </div>
          )}

          <>{props.success.joinGame && <h1>🎉 Success</h1>}</>
        </div>
      )}
    </>
  );
};

export default Join;
