import React, { Component } from 'react';
import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';
const { TabPane } = Tabs;

export default class CollateralisedRepoAbout extends Component {
  render() {
    const { aboutHypothecation } = this.props;
    return (
      <Tabs>
        <TabPane tab="质押劵信息" key="1">
          <div style={{ marginTop: '8px' }}></div>
          <ConfigableTable
            {...setTableInfo({
              columns: aboutHypothecation.hypothecationCol,
              dataSource: aboutHypothecation.hypothecationList,
              // rowSelection,
              pagination: { hideOnSinglePage: true },
              height: 260
            })}
          ></ConfigableTable>
        </TabPane>
      </Tabs>
    );
  }
}
