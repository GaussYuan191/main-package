import React, { Component } from 'react';
import { ConfigableTable } from 'yss-biz';
export default class ContractRowRender extends Component {
  state = {
    dataSource: []
  };
  componentDidMount() {
    const { asyncHttpQueryZJDListQf, row } = this.props;
    let params = {
      // ...page,
      depositOrganVal: '2', //托管机构1.上清 2.中债 3.托管行
      bizCategory: row.bizCategory, //业务类型
      execCode: row.execCode, //成交编号
      tradeDirection: row.entrustSide == 3 ? 3 : row.entrustSide == 4 ? 4 : row.entrustSide //交易方向
    };
    asyncHttpQueryZJDListQf({
      params,
      cb: data => {
        this.setState({
          dataSource: data || []
        });
      }
    });
  }

  render() {
    // const { asyncHttpQueryZJDListQf, qfTable } = this.props;
    const columns = [
      { title: '产品', dataIndex: 'productName', key: 'productName', width: 150 },
      { title: '交易方向', dataIndex: 'tradeDirectionName', key: 'tradeDirectionName', width: 150 },
      { title: '券面总额(万元)', dataIndex: 'faceValue', key: 'faceValue', width: 150 },
      {
        title: '结算金额/首期结算金额(元)',
        dataIndex: 'firstSettleAmount',
        key: 'firstSettleAmount',
        width: 150
      },
      {
        title: '到期结算金额(元)',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 150
      },
      { title: 'DVP资金账户', dataIndex: 'dvpAccount', key: 'dvpAccount', width: 150 },
      { title: 'DVP资金账户名称', dataIndex: 'dvpAccountName', key: 'dvpAccountName', width: 150 },
      {
        title: 'DVP资金账户可用余额(元)',
        dataIndex: 'dvpAccountAvailableBalance',
        key: 'dvpAccountAvailableBalance',
        width: 150
      },
      {
        title: '债券可用余额(万元)',
        dataIndex: 'bondAvailableBalance',
        key: 'bondAvailableBalance',
        width: 150
      }
    ];
    return (
      <ConfigableTable
        columns={columns}
        dataSource={this.state.dataSource}
        // scroll={{ x: 100 }}
        pagination={{ hideOnSinglePage: true }}
      />
    );
  }
}

// const contractRowRender = (props, row) => {
//   const columns = [
//     { title: '产品', dataIndex: 'productName', key: 'productName', width: 80 },
//     { title: '交易方向', dataIndex: 'tradeDirectionName', key: 'tradeDirectionName', width: 80 },
//     { title: '券面总额', dataIndex: 'faceValue', key: 'faceValue', width: 120 },
//     {
//       title: '结算金额/首期结算金额',
//       dataIndex: 'firstSettleAmount',
//       key: 'firstSettleAmount',
//       width: 180
//     },
//     {
//       title: '到期结算金额',
//       dataIndex: 'secondSettleAmount',
//       key: 'secondSettleAmount',
//       width: 120
//     },
//     { title: '应计利息总额', dataIndex: 'accruedInterest', key: 'accruedInterest', width: 120 },
//     { title: 'DVP资金账户', dataIndex: 'dvpAccount', key: 'dvpAccount', width: 120 },
//     { title: 'DVP资金账户名称', dataIndex: 'dvpAccountName', key: 'dvpAccountName', width: 120 },
//     {
//       title: '债券可用余额',
//       dataIndex: 'dvpAccountAvailableBalance',
//       key: 'dvpAccountAvailableBalance',
//       width: 120
//     }
//   ];

//   let data = [];
//   // for (let i = 0; i < 3; ++i) {
//   //   data.push({
//   //     key: row.consignorName,
//   //     date: '2014-12-24 23:12:00',
//   //     name: row.consignorName,
//   //     upgradeNum: 'Upgraded: 56'
//   //   });
//   // }
//   return <Table columns={columns} dataSource={data} pagination={false} />;
// };

// export default contractRowRender;
