import React, { Component } from 'react';
// import { Tabs } from 'antd';
import { ConfigableTable, setTableInfo } from 'yss-biz';

export default class LogDetail extends Component {
  render() {
    const { detailList } = this.props;

    const col = [
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        width: 180
      },
      {
        title: '执行时间',
        dataIndex: 'executeTime',
        width: 180
      },
      {
        title: '操作内容',
        dataIndex: 'description'
      }
    ];
    return (
      <div>
        <ConfigableTable
          {...setTableInfo({
            columns: col,
            dataSource: detailList
          })}
        />
      </div>
    );
  }
}
