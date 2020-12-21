import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./../../assets/scss/react-tabs.css";

const TabsGroup = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  console.log(props.children);
  return (
    <div className="cointainer">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          {props.children.map((children, i) => (
            <Tab key={`header${i}`}>{children.props.header}</Tab>
          ))}
        </TabList>

        {props.children.map((Children, i) => (
          <TabPanel key={`tab${i}`}>{Children}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsGroup;
