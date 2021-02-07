import React from "react";
import { HashLink } from "react-router-hash-link";
import Logo from "./../../assets/images/gg-logo-no-text.png";

const Welcome = (props) => {
  return (
    <>
      {!props.usersAddress && (
        <div
          className="container"
          style={{ backgroundColor: "white", maxWidth: "80vw" }}
        >
          <h1 style={{ paddingTop: "24px" }}>Welcome</h1>
          <img src={Logo} style={{ height: "100px" }} />
          <p className="cardo">
            Simply connect your wallet to join and start saving.
          </p>
          <p>
            First time? Click <HashLink to="/2#faqs">here</HashLink> to learn
            how GoodGhosting works.
          </p>
          <div style={{ justifyContent: "center" }}>
            {props.connectToWallet()}
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
