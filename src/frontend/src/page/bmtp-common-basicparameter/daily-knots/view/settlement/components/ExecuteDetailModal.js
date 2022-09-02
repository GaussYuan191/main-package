// 执行详情
import React, { Component } from 'react';

import { ConfigableTable, setTableInfo } from 'yss-biz';

export default class ExecuteDetail extends Component {
  componentDidMount() {}

  render() {
    const { detailList } = this.props;

    const col = [
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 180
        // render: text => {
        //   return text.split(' ')[0];
        // }
      },
      {
        title: '执行时间',
        dataIndex: 'executeTime',
        key: 'executeTime',
        width: 180
        // render: text => {
        //   return text.split(' ')[1];
        // }
      },
      {
        title: '操作内容',
        dataIndex: 'description',
        key: 'description'
      }
    ];

    /***表格分页***/
    // const pagination = {
    //   onChange: (page, pageSize) => {
    //     this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
    //   },
    //   onShowSizeChange: (current, size) => {
    //     this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
    //   },
    //   showTotal: (total, range) => {
    //     return <span>{`共${total}条`}</span>;
    //   },
    //   pageSize: queryDetailElement.reqPageSize
    // };

    return (
      <div>
        <ConfigableTable
          style={{ marginTop: '10px' }}
          {...setTableInfo({
            columns: col,
            dataSource: detailList
          })}
        />
      </div>
    );
  }

  // 分页
  searchAccountByCondition = ({ ele, value }) => {
    const { changeQueryElement, asyncHttpDailyKnotsOptDetail } = this.props;
    changeQueryElement({ type: 'queryDetailElement', value: { [ele]: value } });
    asyncHttpDailyKnotsOptDetail({});
  };
}
