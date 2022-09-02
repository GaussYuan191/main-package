import React, { Component } from 'react';
import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';
const { TabPane } = Tabs;

export default class OutrightRepoAbout extends Component {
  render() {
    const { aboutguarantee } = this.props;
    return (
      <Tabs>
        <TabPane tab="担保券信息" key="1">
          <div style={{ marginTop: '8px' }}></div>
          <ConfigableTable
            {...setTableInfo({
              columns: aboutguarantee.guaranteeCol,
              dataSource: aboutguarantee.guaranteeList,
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
