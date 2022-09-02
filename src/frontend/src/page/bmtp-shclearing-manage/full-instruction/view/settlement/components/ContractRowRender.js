import React, { Component } from 'react';
import { ConfigableTable, setTableInfo, fontColor } from 'yss-biz';

export default class ContractRowRender extends Component {
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

  // handleSelectRows = row => {
  //   console.log('row=',row);
  //   const { selectRows } = this.props;
  //   let rows = Array.isArray(row) ? row.map(item => item) : [row];
  //   this.props.setRowChecked([...selectRows,...rows]);
  // };

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

    // let rowSelection = rowSelectionFunc.call(this);
    return (
      <ConfigableTable
        {...setTableInfo({
          rowKey: 'id',
          columns: columns,
          dataSource: this.state.dataSource,
          pagination: { hideOnSinglePage: true }
          // rowSelection: rowSelection
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

// const contractRowRender = (props, row) => {
//   const columns = [
//     { title: '产品', dataIndex: 'date', key: 'date' },
//     { title: '资产单元', dataIndex: 'name', key: 'name' },
//     { title: '交易方向', dataIndex: 'name', key: 'name' },
//     { title: '券面总额', dataIndex: 'name', key: 'name' },
//     { title: '结算金额/首期结算金额', dataIndex: 'name', key: 'name' },
//     { title: '到期结算金额', dataIndex: 'name', key: 'name' },
//     { title: '应计利息总额', dataIndex: 'name', key: 'name' },
//     { title: 'DVP资金账户', dataIndex: 'name', key: 'name' },
//     { title: 'DVP资金账户名称', dataIndex: 'name', key: 'name' },
//     { title: 'DVP资金账户可用余额', dataIndex: 'name', key: 'name' }
//   ];

//   let data = [];
//   // for (let i = 0; i < 3; ++i) {
//   //   data.push({
//   //     key: row.consignorName,
//   //     date: '2014-12-24 23:12:00',
//   //     name: row.consignorName,
//   //     upgradeNum: 'Upgraded: 56',
//   //   })
//   // }
//   return <Table columns={columns} dataSource={data} pagination={false} />;
// };

// export default contractRowRender;
