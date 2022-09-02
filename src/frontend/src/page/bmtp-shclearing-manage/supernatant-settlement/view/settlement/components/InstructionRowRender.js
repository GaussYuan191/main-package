import React, { Component } from 'react';
import { ConfigableTable, setTableInfo, fontColor } from 'yss-biz';

export default class ExpandedRowRender extends Component {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpQueryZLQf, row } = this.props;

    let params = {
      // ...page,
      depositOrganVal: '1',
      bizCategory: row.bizCategory, //业务类型
      execCode: row.srcTradeId, //成交编号
      tradeInstrId: row.tradeInstrId, //交易指令编号
      tradeDirection: row.entrustSide == 3 ? 3 : row.entrustSide == 4 ? 4 : row.entrustSide //交易方向
    };
    asyncHttpQueryZLQf({
      params,
      cb: data => {
        this.setState({
          dataSource: data.list || [],
          isShowData: data.isAllData
        });
      }
    });
  }

  render() {
    // const { asyncHttpQueryZLQf, qfTable } = this.props;

    const columns = [
      { title: '产品', dataIndex: 'productName', key: 'productName', width: 150, ellipsis: true },
      {
        title: '交易方向',
        dataIndex: 'tradeDirectionName',
        key: 'tradeDirectionName',
        width: 150,
        ellipsis: true
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150,
        ellipsis: true
      },
      {
        title: '结算金额/首期结算金额(元)',
        dataIndex: 'firstSettleAmount',
        key: 'firstSettleAmount',
        width: 150,
        ellipsis: true
      },
      {
        title: '到期结算金额(元)',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 150,
        ellipsis: true
      },
      {
        title: 'DVP资金账户',
        dataIndex: 'dvpAccount',
        key: 'dvpAccount',
        width: 150,
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
        width: 150,
        ellipsis: true
      },
      {
        title: '债券可用余额(万元)',
        dataIndex: 'bondAvailableBalance',
        key: 'bondAvailableBalance',
        width: 150,
        ellipsis: true
      }
    ];
    return (
      <ConfigableTable
        {...setTableInfo({
          columns: columns,
          dataSource: this.state.dataSource,
          pagination: { hideOnSinglePage: true }
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
