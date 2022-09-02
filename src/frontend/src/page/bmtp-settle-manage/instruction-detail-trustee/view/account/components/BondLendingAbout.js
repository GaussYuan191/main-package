import React, { Component } from 'react';
import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';
const { TabPane } = Tabs;

export default class BondLendingAbout extends Component {
  render() {
    const { abouteroPledgeRef } = this.props;
    return (
      <Tabs>
        <TabPane tab="抵押券信息" key="1">
          <div style={{ marginTop: '8px' }}></div>
          <ConfigableTable
            {...setTableInfo({
              columns: abouteroPledgeRef.eroPledgeRefCol,
              dataSource: abouteroPledgeRef.eroPledgeRefList,
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
