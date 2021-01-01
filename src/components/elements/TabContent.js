import React from "react";

const TabContent = (props) => (
  <div
    header={props.header}
    className="container"
    style={{
      backgroundColor: "white",
      textAlign: "left",
      maxWidth: "80vw",
      paddingTop: "8px",
      marginBottom: "10%",
    }}
  >
    {props.children}
  </div>
);

export default TabContent;
