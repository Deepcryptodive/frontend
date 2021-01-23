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
          href="https://thegraph.com/explorer/subgraph/good-ghosting/goodghostingnov"
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
            {
              "https://thegraph.com/explorer/subgraph/good-ghosting/goodghostingnov"
            }
          </span>
        </a>
      </p>
      {props.liveGame && props.isLoggedIn && (
        <div>
          {/* {!props.isGameCompleted && ( */}
          <div style={{ padding: "10px" }}>
            <LoadingButton
              text="depositIntoExternalPool"
              loading={props.loadingState.depositIntoExternalPool}
              onClick={props.depositIntoExternalPool}
            />
          </div>
          {/* )} */}
          {props.isGameCompleted && (
            <div style={{ padding: "10px" }}>
              <LoadingButton
                text="Allocate the funds to enable users to cash out "
                loading={props.loadingState.redeem}
                onClick={props.redeem}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameAdmin;
