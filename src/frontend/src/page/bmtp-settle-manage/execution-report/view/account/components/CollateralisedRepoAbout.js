import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';
const { TabPane } = Tabs;

export default class CollateralisedRepoAbout extends PureComponent {
  render() {
    const { erpBondRefCol, erpBondRefList } = this.props;
    /***表格分页***/
    const pagination = {
      // total: erpBondRefList.total,
      // pageSize: queryCollateralisedRepoElement.reqPageSize,
      onChange: (page, pageSize) => {
        // this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        // this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      hideOnSinglePage: true
    };
    return (
      <Tabs>
        <TabPane tab="抵押劵信息" key="1">
          <div style={{ marginTop: '8px' }}></div>
          <ConfigableTable
            {...setTableInfo({
              columns: erpBondRefCol,
              dataSource: erpBondRefList,
              pagination: pagination,
              rowKey: 'id',
              height: 260
            })}
          ></ConfigableTable>
        </TabPane>
      </Tabs>
    );
  }
}
