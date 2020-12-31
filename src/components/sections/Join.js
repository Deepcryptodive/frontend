import React from "react";
import { HashLink } from "react-router-hash-link";
import Button from "./../elements/Button";
import Loading from "./../../assets/loading.svg";
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
          <Button color="primary" onClick={props.joinGame}>
            Join us
          </Button>

          <>
            {console.log("join props :", props)}
            {/* {props.usersAddress && props.userStatus !== status.registered && ( */}
            {false && (
              <>
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  onClick={props.joinGame}
                >
                  {props.loadingState.joinGame ? (
                    <>
                      Loading{" "}
                      <img
                        src={Loading}
                        alt="loading"
                        className="loading-img-button"
                        style={{ width: "28px", paddingLeft: "10px" }}
                      />
                    </>
                  ) : (
                    "Click to join the Game *"
                  )}
                </Button>
                <p
                  style={{
                    maxWidth: "300px",
                    margin: "auto",
                    marginTop: "10px",
                    fontSize: "0.9rem",
                  }}
                >
                  *You will need Kovan{" "}
                  <a
                    className="kovan-link"
                    style={{ textDecoration: "none" }}
                    href="https://kovan.faucet.enjin.io/"
                    target="blank"
                    rel="noopener noreferrer nofollow"
                  >
                    ETH
                  </a>{" "}
                  and{" "}
                  <a
                    className="kovan-link"
                    style={{ textDecoration: "none" }}
                    href="https://testnet.aave.com/faucet"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    DAI
                  </a>
                  . Requires two signatures from your wallet.
                </p>
              </>
            )}
            {props.errors.joinGame && <JoinError />}
            {props.success.joinGame && <h1>🎉 Success</h1>}
          </>
        </div>
      )}
    </>
  );
};

export default Join;
