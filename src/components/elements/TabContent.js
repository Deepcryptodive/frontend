import React from "react";

const TabContent = (props) => (
  <div
    header={props.header}
    className="container"
    style={{
      ...{
        backgroundColor: "white",
        textAlign: "left",
        maxWidth: "80vw",
        padding: "8px 0 0 0",
        marginBottom: "10%",
      },
      ...props.style,
    }}
  >
    {props.children}
  </div>
);

export default TabContent;
