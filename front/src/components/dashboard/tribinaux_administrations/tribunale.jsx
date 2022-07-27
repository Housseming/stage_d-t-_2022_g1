import {Radio, Space, Tabs} from "antd";
import React, { useState } from "react";
import Tableau from "./service";
const {TabPane} = Tabs;
const Tribunale = () => {
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 50,
        }}>
        Tab position:
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          <Tableau/>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Tableau/>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
         <Tableau/>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Tribunale;
