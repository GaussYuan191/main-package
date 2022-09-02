import React from 'react';
import { page } from 'yss-biz/utils/util/constant';

export default {
  bondSaleBackList: {
    list: [],
    total: 0
  },

  // 表头字段
  bondSaleBackColum: [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      width: 50
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
      width: 120,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 120,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 180,
      ellipsis: true
    },
    {
      title: '清分状态',
      dataIndex: 'clearingStatusName',
      key: 'clearingStatusName',
      width: 120,
      ellipsis: true,
      render: () => {
        return '已清分';
      }
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
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
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 120,
      ellipsis: true
    },
    {
      title: '净价(元)',
      dataIndex: 'netPrice',
      key: 'netPrice',
      width: 120,
      ellipsis: true
    },
    {
      title: '全价(元)',
      dataIndex: 'dirtyPrice',
      key: 'dirtyPrice',
      width: 120,
      ellipsis: true
    },
    {
      title: '应计利息(元)',
      dataIndex: 'accruedInterest',
      key: 'accruedInterest',
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
      title: '结算日期',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '买入方',
      children: [
        {
          title: '买入方交易员名称',
          dataIndex: 'buyerTraderName',
          key: 'buyerTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '买入方资金开户行',
          dataIndex: 'buyerSettleBankName',
          key: 'buyerSettleBankName',
          width: 200,
          ellipsis: true
        },
        {
          title: '买入方托管账户户名',
          dataIndex: 'buyerBondAccountName',
          key: 'buyerBondAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '买入方托管账户',
          dataIndex: 'buyerCustodianAccount',
          key: 'buyerCustodianAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '买入方资金账户',
          dataIndex: 'buyerAssetAccount',
          key: 'buyerAssetAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '买入方资金账户户名',
          dataIndex: 'buyerAssetAccountName',
          key: 'buyerAssetAccountName',
          width: 200,
          ellipsis: true
        }
      ]
    },
    {
      title: '卖出方',
      children: [
        {
          title: '卖出方交易员名称',
          dataIndex: 'sellerTraderName',
          key: 'sellerTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '卖出方资金开户行',
          dataIndex: 'sellerSettleBankCode',
          key: 'sellerSettleBankCode',
          width: 200,
          ellipsis: true
        },
        {
          title: '卖出方托管账户户名',
          dataIndex: 'sellerBondAccountName',
          key: 'sellerBondAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '卖出方托管账户',
          dataIndex: 'sellerCustodianAccount',
          key: 'sellerCustodianAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '卖出方资金账户',
          dataIndex: 'sellerAssetAccount',
          key: 'sellerAssetAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '卖出方资金账户户名',
          dataIndex: 'sellerAssetAccountName',
          key: 'sellerAssetAccountName',
          width: 200,
          ellipsis: true
        }
      ]
    },
    {
      title: '审核状态',
      dataIndex: 'checkStatusName',
      key: 'checkStatusName',
      width: 120,
      ellipsis: true
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      key: 'checkTime',
      width: 120,
      ellipsis: true
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      key: 'checkUserName',
      width: 120,
      ellipsis: true
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 120,
      ellipsis: true
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      key: 'updateUserName',
      width: 120,
      ellipsis: true
    }
  ],
  // bondNameListBondSaleBack: [],
  // InstrIdListBondSaleBack: [],

  // 查询条件
  queryBondSaleBackElement: {
    ...page
  }
};
