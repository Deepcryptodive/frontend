import React, { useState } from "react";

export default (props) => {
  const [visibiliy, setVisibility] = useState(true);

  return (
    <div
      className="sans_serif"
      style={{
        width: "100vw",
        position: "absolute",
        top: "80px",
        backgroundColor: props.color ? props.color : "#FE88E4",
        color: "#2B2C52",
        padding: "8px",
        display: visibiliy ? "block" : "none",
        zIndex: visibiliy ? 10 : 0,
      }}
    >
      <span>
        {props.text}
        <span
          onClick={() => {
            props.action();
            setVisibility(false);
          }}
          className="alert-action-text"
          style={{ fontWeight: "900", paddingLeft: "3px" }}
        >
          {props.actionText}
        </span>
      </span>
      <span
        className="alert-close"
        style={{
          position: "absolute",
          top: "3px",
          right: "18px",
          fontSize: "0.8rem",
          color: "white",
        }}
        onClick={() => {
          setVisibility(false);
        }}
      >
        X
      </span>
    </div>
  );
};
