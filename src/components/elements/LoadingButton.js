import React from "react";
import Button from "./Button";
import Loading from "./../../assets/loading.svg";

const LoadingButton = (props) => (
  <Button tag="a" color="primary" onClick={props.onClick}>
    {props.loading ? (
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
      props.text
    )}
  </Button>
);

export default LoadingButton;
