// 成交流水
import React, { Component } from 'react';
import { setTableInfo, setColumns, ConfigableTable, fontColor } from 'yss-biz';

export default class RunningWater extends Component {
  render() {
    const { runningWaterTable, rowed } = this.props;
    const { dataSource, isShowData } = runningWaterTable;
    //现券
    let columns1 = [
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
    ];
    //质押式
    let columns2 = [
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
      {
        title: '首期结算金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '到期结算金额',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交易费用',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算费用',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      }
    ];
    //买断式
    let columns3 = [
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
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 120,
        ellipsis: true
      },
      {
        title: '债券名称',
        dataIndex: 'bondName',
        key: 'bondName',
        width: 120,
        ellipsis: true
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'totalFaceValue',
        key: 'totalFaceValue',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '首次结算金额',
        dataIndex: 'firstSettleAmount',
        key: 'firstSettleAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '到期结算金额',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '首次应计利息',
        dataIndex: 'firstTotalAccruedInterest',
        key: 'firstTotalAccruedInterest',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '到期应计利息',
        dataIndex: 'secondTotalAccruedInterest',
        key: 'secondTotalAccruedInterest',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交易费用',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算费用',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      }
    ];
    //分销
    //分销
    let columns4 = [
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 160,
        ellipsis: true
      },
      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 150,
        ellipsis: true
      },
      // {
      //   title: '资产单元',
      //   dataIndex: 'assetUnitName',
      //   key: 'assetUnitName',
      //   width: 120,
      //   ellipsis: true
      // },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120,
        ellipsis: true
      },
      {
        title: '交易指令编号',
        dataIndex: 'tradeInstrId',
        key: 'tradeInstrId',
        width: 150,
        ellipsis: true
      },
      {
        title: '交易方向',
        dataIndex: 'tradeDirectionName',
        key: 'tradeDirectionName',
        width: 120,
        ellipsis: true
      },

      // {
      //   title: '债券代码',
      //   dataIndex: 'bondCode',
      //   key: 'bondCode',
      //   width: 150,
      //   ellipsis: true
      // },
      // {
      //   title: '债券名称',
      //   dataIndex: 'boneName',
      //   key: 'boneName',
      //   width: 160,
      //   ellipsis: true
      // },
      {
        title: '管理人名称',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 160,
        ellipsis: true
      },
      // {
      //   title: '成交日期',
      //   dataIndex: 'execDate',
      //   key: 'execDate',
      //   width: 150,
      //   ellipsis: true
      // },
      {
        title: '应计利息总额(万元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算金额(万元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交易金额(万元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '分销面额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      // {
      //   title: '交割日期',
      //   dataIndex: 'settleDate',
      //   key: 'settleDate',
      //   width: 150,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方名称',
      //   dataIndex: 'sellerSettleBankCode',
      //   key: 'sellerSettleBankCode',
      //   width: 160,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方债券账号',
      //   dataIndex: 'sellerCustodianAccount',
      //   key: 'sellerCustodianAccount',
      //   width: 160,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方资金账号',
      //   dataIndex: 'sellerAssetAccount',
      //   key: 'sellerAssetAccount',
      //   width: 160,
      //   ellipsis: true
      // },
      // {
      //   title: '录入人',
      //   dataIndex: 'createUser',
      //   key: 'createUser',
      //   width: 150,
      //   ellipsis: true
      // },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        ellipsis: true
      }
    ];

    //债券借贷
    // let columns8 = [
    //   {
    //     title: '成交日期',
    //     dataIndex: 'execDate',
    //     key: 'execDate',
    //     width: 120,
    //     ellipsis: true
    //   },

    //   {
    //     title: '成交编号',
    //     dataIndex: 'execCode',
    //     key: 'execCode',
    //     width: 200,
    //     ellipsis: true
    //   },
    //   {
    //     title: '融入方名称',
    //     dataIndex: 'repoTraderName',
    //     key: 'repoTraderName',
    //     width: 200,
    //     ellipsis: true
    //   },
    //   {
    //     title: '借出方名称',
    //     dataIndex: 'reverseTraderName',
    //     key: 'reverseTraderName',
    //     width: 200,
    //     ellipsis: true
    //   },
    //   {
    //     title: '交易方向',
    //     dataIndex: 'tradeDirectionName',
    //     key: 'tradeDirectionName',
    //     width: 120,
    //     ellipsis: true
    //   },
    //   {
    //     title: '清分状态',
    //     dataIndex: 'clearingStatusName',
    //     key: 'clearingStatusName',
    //     width: 120,
    //     ellipsis: true
    //   },
    //   {
    //     title: '数据来源',
    //     dataIndex: 'dataSourceName',
    //     key: 'dataSourceName',
    //     width: 120,
    //     ellipsis: true
    //   },
    //   {
    //     title: '债券代码',
    //     dataIndex: 'bondCode',
    //     key: 'bondCode',
    //     width: 120,
    //     ellipsis: true
    //   },
    //   {
    //     title: '应计利息',
    //     dataIndex: 'totalAccruedInterest',
    //     key: 'totalAccruedInterest',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '借贷费用',
    //     dataIndex: 'lendingRate',
    //     key: 'lendingRate',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '券面总额',
    //     dataIndex: 'totalFaceValue',
    //     key: 'totalFaceValue',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '应计利息总额',
    //     dataIndex: 'totalAccruedInterest',
    //     key: 'totalAccruedInterest',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '首期结算方式',
    //     dataIndex: 'firstSettleMethodName',
    //     key: 'firstSettleMethodName',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '到期结算方式',
    //     dataIndex: 'secondSettleMethodName',
    //     key: 'secondSettleMethodName',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '交易费用',
    //     dataIndex: 'tradeFee',
    //     key: 'tradeFee',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   },
    //   {
    //     title: '结算费用',
    //     dataIndex: 'settleFee',
    //     key: 'settleFee',
    //     width: 120,
    //     ellipsis: true,
    //     align: 'right'
    //   }
    // ];

    let columns8 = [
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
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true
      },
      {
        title: '借贷费用',
        dataIndex: 'lendingRate',
        key: 'lendingRate',
        width: 120,
        ellipsis: true
      },
      {
        title: '应计利息总额',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 120,
        ellipsis: true
      },
      // {
      //   title: '管理人编码',
      //   dataIndex: 'managerCode',
      //   key: 'managerCode',
      //   width: 140,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '管理人名称',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 120,
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
        title: '结算费用',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 120,
        ellipsis: true
      },
      {
        title: '交易方向',
        dataIndex: 'tradeDirectionName',
        key: 'tradeDirectionName',
        width: 120,
        ellipsis: true
      },
      {
        title: '交易费用',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 120,
        ellipsis: true
      },
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 120,
        ellipsis: true
      }
    ];

    return (
      <div>
        {rowed.bizCategory == '1' ? (
          <ConfigableTable
            key={rowed.bizCategory}
            style={{ marginTop: '10px' }}
            {...setTableInfo({
              columns: setColumns(columns1),
              dataSource: dataSource,
              pagination: { hideOnSinglePage: true },
              height: 220
            })}
            scroll={{ x: 0 }}
            locale={{
              emptyText: <span></span>
            }}
            footer={!isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
          ></ConfigableTable>
        ) : rowed.bizCategory == '2' ? (
          <ConfigableTable
            key={rowed.bizCategory}
            style={{ marginTop: '10px' }}
            {...setTableInfo({
              columns: setColumns(columns2),
              dataSource: dataSource,
              pagination: { hideOnSinglePage: true },
              height: 220
            })}
            scroll={{ x: 0 }}
            locale={{
              emptyText: <span></span>
            }}
            footer={!isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
          ></ConfigableTable>
        ) : rowed.bizCategory == '3' ? (
          <ConfigableTable
            key={rowed.bizCategory}
            style={{ marginTop: '10px' }}
            {...setTableInfo({
              columns: setColumns(columns3),
              dataSource: dataSource,
              pagination: { hideOnSinglePage: true },
              height: 220
            })}
            scroll={{ x: 0 }}
            locale={{
              emptyText: <span></span>
            }}
            footer={!isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
          ></ConfigableTable>
        ) : rowed.bizCategory == '8' ? (
          <ConfigableTable
            key={rowed.bizCategory}
            style={{ marginTop: '10px' }}
            {...setTableInfo({
              columns: setColumns(columns8),
              dataSource: dataSource,
              pagination: { hideOnSinglePage: true },
              height: 220
            })}
            scroll={{ x: 0 }}
            locale={{
              emptyText: <span></span>
            }}
            footer={!isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
          ></ConfigableTable>
        ) : (
          <ConfigableTable
            key={rowed.bizCategory}
            style={{ marginTop: '10px' }}
            {...setTableInfo({
              columns: setColumns(columns4),
              dataSource: dataSource,
              pagination: { hideOnSinglePage: true },
              height: 220
            })}
            scroll={{ x: 0 }}
            locale={{
              emptyText: <span></span>
            }}
            footer={!isShowData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
          ></ConfigableTable>
        )}
      </div>
    );
  }
}
