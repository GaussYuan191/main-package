import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, setColumns, fontColor } from 'yss-biz';
// import CashSaleRowRender from './CashSaleRowRender';
class CashSale extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpSearchQfList, row } = this.props;
    const me = this;
    asyncHttpSearchQfList({
      params: row,
      type: 'erbPageList',
      cb: data => {
        me.setState({
          dataSource: data.cashBondExecutionReportDistributionRepPageInfo.list || [],
          isShowData: data.isAllData
        });
      }
    });
  }

  render() {
    /***查询Input按钮 */
    const cashSaleCol = [
      {
        title: '序号',
        dataIndex: 'serialNumber'
      },

      {
        title: '成交日期',
        dataIndex: 'execDate',
        key: 'execDate',
        width: 120,
        ellipsis: true
      },

      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200,
        ellipsis: true
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 120,
        ellipsis: true
      },
      {
        title: '管理人名称',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 120,
        ellipsis: true
      },
      // {
      //   title: '债券代码',
      //   dataIndex: 'bondCode',
      //   key: 'bondCode',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '债券名称',
      //   dataIndex: 'bondName',
      //   key: 'bondName',
      //   width: 120,
      //   ellipsis: true
      // },

      // {
      //   title: '业务品种',
      //   dataIndex: 'bizCategoryName',
      //   key: 'bizCategoryName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '交易方向',
      //   dataIndex: 'tradeDirectionName',
      //   key: 'tradeDirectionName',
      //   width: 120,
      //   ellipsis: true
      // },

      // {
      //   title: '债券种类',
      //   dataIndex: 'erbNetPrice==============================================',
      //   key: 'erbNetPrice',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '数据来源',
      //   dataIndex: 'dataSourceName',
      //   key: 'dataSourceName',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '净价(元)',
      //   dataIndex: 'erbTradeAmount======================================',
      //   key: 'erbTradeAmount',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '全价',
      //   dataIndex: 'erbSettleAmount=========================================',
      //   key: 'erbSettleAmount',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '应计利息',
      //   dataIndex: 'totalAccruedInterest=============================',
      //   key: 'totalAccruedInterest',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true
      },
      {
        title: '交易金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 120,
        ellipsis: true
      },

      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 120,
        ellipsis: true
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 120,
        ellipsis: true
      },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      }
      // {
      //   title: '结算日',
      //   dataIndex: 'remark========================================',
      //   key: 'remark',
      //   width: 120,
      //   ellipsis: true
      // }
    ];
    const columns = setColumns(cashSaleCol);

    return (
      <div style={{ margin: '10px 0' }}>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: this.state.dataSource,
            rowKey: 'id',
            pagination: { hideOnSinglePage: true }
          })}
          bordered={true}
          scroll={{ x: 0 }}
          locale={{
            emptyText: <span></span>
          }}
          footer={
            !this.state.isShowData
              ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d')
              : null
          }
        />
      </div>
    );
  }
}

export default CashSale;
