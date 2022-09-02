import React, { Component } from 'react';
import { setTableInfo, ConfigableTable } from 'yss-biz';

export default class BatchFailModal extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 150,
        ellipsis: true
      },
      {
        title: '结算指令/成交编号',
        dataIndex: 'instrId',
        key: 'instrId',
        width: 200,
        ellipsis: true
      },
      {
        title: '确认状态',
        dataIndex: 'stateName',
        key: 'stateName',
        width: 150,
        ellipsis: true
      },
      {
        title: '失败原因',
        dataIndex: 'errorMsg',
        key: 'errorMsg',
        width: 300,
        ellipsis: true
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 150,
        ellipsis: true
      },
      {
        title: '交易方向',
        dataIndex: 'tradeDirectionName',
        key: 'tradeDirectionName',
        width: 150,
        ellipsis: true
      }
    ];

    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            columns: columns,
            dataSource: this.props.selltefailList || [],
            pagination: { hideOnSinglePage: false }
          })}
        />
      </>
    );
  }
  handleSubmit = () => {
    const { openFormModal } = this.props;
    openFormModal({ status: false });
  };
}
