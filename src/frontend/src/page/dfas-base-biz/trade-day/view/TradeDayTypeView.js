/**
 * 市场交易日所属类型 View
 * @author
 */

import React from 'react';
// import { Tabs } from "antd";
import TradeDayTypeMainView from './TradeDayTypeMainView';
import TradeDayTypeController from '../controller/TradeDayTypeController';

class TradeDayTypeView extends TradeDayTypeController {
  render() {
    return (
      // <Tabs type="card" tabPosition="left" defaultActiveKey="1">
      //     <Tabs.TabPane tab="债券" key="1" id="1">
      //         <TradeDayTypeMainView {...this.props} category="1" />
      //     </Tabs.TabPane>
      //     <Tabs.TabPane tab="股票" key="2" id="1">
      //         <TradeDayTypeMainView {...this.props} category="2" />
      //     </Tabs.TabPane>
      // </Tabs>
      <div>
        <TradeDayTypeMainView {...this.props} category="1" />
      </div>
    );
  }
}

export default TradeDayTypeView;
