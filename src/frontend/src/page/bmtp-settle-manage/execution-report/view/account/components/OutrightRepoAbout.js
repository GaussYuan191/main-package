import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';
const { TabPane } = Tabs;

export default class OutrightRepoAbout extends PureComponent {
  render() {
    const { guaranteeList, guaranteeCol } = this.props;
    /***表格分页***/
    const pagination = {
      // total: outrightRepoList.total,
      // pageSize: queryOutrightRepoElement.reqPageSize,
      onChange: (page, pageSize) => {
        // this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        // this.searchAccountByCondition(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      hideOnSinglePage: true
    };
    return (
      <Tabs>
        <TabPane tab="担保券信息" key="1">
          <div style={{ marginTop: '8px' }}></div>
          <ConfigableTable
            {...setTableInfo({
              columns: guaranteeCol,
              dataSource: guaranteeList,
              pagination: pagination,
              rowKey: 'id',
              bordered: true,
              height: 260
            })}
          ></ConfigableTable>
        </TabPane>
      </Tabs>
    );
  }
}
