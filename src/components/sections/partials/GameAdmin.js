import React from "react";
import Button from "./../../elements/Button";
import LoadingButton from "./../../elements/LoadingButton";

const GameAdmin = (props) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>This is the admin content</h1>
      <p className="Cardo">
        You shouldn't need to call these functions, as the GoodGhosting team
        will do. However for transparency we have made them open.
      </p>
      <p>
        Contract Address:{" "}
        <a
          href={`https://kovan.etherscan.io/address/${process.env.REACT_APP_GG_CONTRACT}`}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <span
            style={{
              backgroundColor: "rgb(246, 248, 254)",
              borderRadius: "3px",
            }}
          >
            {" "}
            {process.env.REACT_APP_GG_CONTRACT}
          </span>
        </a>
      </p>
      <p>
        The Graph URL:{" "}
        <a
          href={process.env.REACT_APP_GRAPH_URL}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <span
            style={{
              backgroundColor: "rgb(246, 248, 254)",
              borderRadius: "3px",
            }}
          >
            {" "}
            {process.env.REACT_APP_GRAPH_URL}
          </span>
        </a>
      </p>
      {props.liveGame && props.isLoggedIn && (
        <div>
          <LoadingButton
            text="depositIntoExternalPool"
            loading={props.loadingState.depositIntoExternalPool}
            onClick={props.depositIntoExternalPool}
          />
        </div>
      )}
    </div>
  );
};

export default GameAdmin;
