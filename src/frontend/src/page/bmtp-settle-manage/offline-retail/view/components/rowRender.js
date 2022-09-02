import React, { PureComponent } from 'react';
// import { Table } from 'antd';
import { ConfigableTable, setTableInfo, setColumns, fontColor } from 'yss-biz';

class DetailedRowRender extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true       // 判断是否有权限显示产品数据
  };

  componentDidMount() {
    const { asyncHttpQueryZLQf, row } = this.props;
    let params = {
      // ...page,
      bondCode: row.bondCode,
      execCode: row.tradeOrderId
    };
    asyncHttpQueryZLQf({
      params,
      cb: data => {
        this.setState({
          dataSource: data.onlineDistributionList || [],
          isShowData: data.allData
        });
      }
    });
  }

  render() {
    const columns = [
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 150,
        ellipsis: true
      },
      {
        title: '分销面额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true
      },
      {
        title: '分销金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 120,
        ellipsis: true
      },
      {
        title: 'DVP资金账号',
        dataIndex: 'dvpAccount',
        key: 'dvpAccount',
        width: 180,
        ellipsis: true
      },
      {
        title: 'DVP资金账户名称',
        dataIndex: 'dvpAccountName',
        key: 'dvpAccountName',
        width: 150,
        ellipsis: true
      },
      {
        title: 'DVP资金账户可用余额(元)',
        dataIndex: 'dvpAccountAvailableBalance',
        key: 'dvpAccountAvailableBalance',
        width: 120,
        ellipsis: true
      },
      // {
      //   title: '债券托管账号',
      //   dataIndex: 'bondTrusteeshipAccount',
      //   key: 'bondTrusteeshipAccount',
      //   width: 180,
      //   ellipsis: true
      // },
      // {
      //   title: '债券托管账户名称',
      //   dataIndex: 'bondTrusteeshipName',
      //   key: 'bondTrusteeshipName',
      //   width: 150,
      //   ellipsis: true
      // },
      {
        title: '债券托管账户可用余额(万元)',
        dataIndex: 'bondAvailableBalance',
        key: 'bondAvailableBalance',
        width: 120,
        ellipsis: true,
        align: 'right'
      }
    ];
    const col = setColumns(columns);
    return (
      <ConfigableTable
        {...setTableInfo({
          columns: col,
          dataSource: this.state.dataSource,
          pagination: { hideOnSinglePage: true },
          rowKey: 'id'
        })}
        scroll={{ x: 0 }}
        locale={{
          emptyText: <span></span>
        }}
        footer={
          !this.state.isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null
        }
      />
    );
  }
}

export default DetailedRowRender;
