import React from "react";
import { daiLink, ethLink } from "./../../utils/utilities";

export const NoWeb3 = () => (
  <>
    <h2>Our prototype requires MetaMask to run.</h2>
    <p>
      Install{" "}
      <a
        href="https://metamask.io/"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        MetaMask
      </a>{" "}
      and refresh your browser*.
    </p>
    <p style={{ fontStyle: "italic", fontSize: "0.7rem" }}>
      *Works best on chrome.
    </p>
  </>
);

export const NotKovan = () => (
  <>
    {" "}
    <h2>Our prototype runs on Kovan.</h2>
    <p>Switch networks in MetaMask* and refresh your browser</p>
    <p style={{ fontStyle: "italic", fontSize: "0.7rem" }}>
      *We will be integrating with other wallets soon.
    </p>
  </>
);

export const JoinError = () => (
  <div className="sans_serif" style={{ color: "red", fontWeight: "900" }}>
    <p style={{ marginBottom: 0 }}>
      Something went wrong.{" "}
      <span role="img" aria-label="sad">
        😢
      </span>
    </p>
    <p style={{ marginBottom: 0 }}>
      Make sure you have enough{" "}
      <a
        className="kovan-link"
        style={{ textDecoration: "none" }}
        href={daiLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        DAI
      </a>{" "}
      and{" "}
      <a
        className="kovan-link"
        style={{ textDecoration: "none" }}
        href={ethLink}
        target="blank"
        rel="noopener noreferrer nofollow"
      >
        ETH
      </a>
    </p>
  </div>
);
