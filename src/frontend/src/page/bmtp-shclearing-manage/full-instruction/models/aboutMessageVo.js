import { page } from 'yss-biz';
// 相关信息-数据
export default {
  /**指令相关信息*/
  instructionInfo: {},

  //债券明细
  zjTable: {
    col: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 100
      },
      {
        title: '交易日期',
        dataIndex: 'tradeDate',
        key: 'tradeDate',
        width: 150
      },
      {
        title: '持有人账户',
        dataIndex: 'holderAccount',
        key: 'holderAccount',
        width: 150
      },
      {
        title: '持有人简称',
        dataIndex: 'holderShortname',
        key: 'holderShortname',
        width: 150
      },
      {
        title: '债券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 150
      },
      {
        title: '债券简称',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      // {
      //   title: '净价价格',
      //   dataIndex: 'cleanPrice',
      //   key: 'cleanPrice',
      //   width: 150
      // },
      // {
      //   title: '全价价格',
      //   dataIndex: 'fullPrice',
      //   key: 'fullPrice',
      //   width: 150
      // },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      }
      // {
      //   title: '质押比例',
      //   dataIndex: 'pledgeRate',
      //   key: 'pledgeRate',
      //   width: 150
      // }
      // {
      //   title: '债券可用金额',
      //   dataIndex: 'bondValueDate1',
      //   key: 'bondValueDate',
      //   width: 150
      // },
      // {
      //   title: '状态 ',
      //   dataIndex: 'bondStatusName',
      //   key: 'bondStatusName',
      //   width: 150
      // }
    ],
    list: []
  },
  // 资金明细
  zjInfo: {},

  // /**担保信息*/
  dbTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '回购方向',
        dataIndex: 'pledgeType',
        key: 'pledgeType',
        width: 140
      },
      {
        title: '保证方式',
        dataIndex: 'guaranteeModeName',
        key: 'guaranteeModeName',
        width: 140
      },
      {
        title: '保证券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 140
      },
      {
        title: '保证券简称',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      {
        title: '保证券券面总额（万元）',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      }
    ],
    list: []
  },

  // /**成交流水*/
  runningWaterTable: {
    // 已废弃
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '成交日期',
        dataIndex: 'execDate',
        key: 'execDate',
        width: 150
      },
      {
        title: '指令编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200
      },
      {
        title: '交易员代码',
        dataIndex: 'bondTrader',
        key: 'bondTrader',
        width: 140
      },
      {
        title: '本方名称',
        dataIndex: 'sysTraderName',
        key: 'sysTraderName',
        width: 150
      },
      {
        title: '对手方名称',
        dataIndex: 'peerTraderName',
        key: 'peerTraderName',
        width: 150
      },
      {
        title: '交易方向',
        dataIndex: 'tradeDirectionName',
        key: 'tradeDirectionName',
        width: 120
      },
      {
        title: '债券种类',
        dataIndex: 'bondKind',
        key: 'bondKind',
        width: 120
      },
      {
        title: '清分状态',
        dataIndex: 'clarifyState',
        key: 'clarifyState',
        width: 120
      },
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 150
      },
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 140
      },
      {
        title: '成交价格(元)',
        dataIndex: 'netPrice',
        key: 'netPrice',
        width: 140
      },
      {
        title: '应计利息(元)',
        dataIndex: 'accruedInterest',
        key: 'accruedInterest',
        width: 140
      },
      {
        title: '结算价格(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 140
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 140
      },
      {
        title: '成交金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 150
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 150
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 150
      },
      {
        title: '清算日',
        dataIndex: 'clearDate',
        key: 'clearDate',
        width: 150
      }
    ],
    dataSource: [],
    isShowData: true
  },

  /**全额指令信息*/
  contractMessageTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '管理人',
        dataIndex: 'consignorName',
        key: 'consignorName',
        width: 150
      },
      // {
      //   title: '产品',
      //   dataIndex: 'productName',
      //   key: 'productName',
      //   width: 150
      // },
      {
        title: '全额结算指令编号',
        dataIndex: 'settlementOrderCode',
        key: 'settlementOrderCode',
        width: 200
      },
      {
        title: '成交编号',
        dataIndex: 'tradeId',
        key: 'tradeId',
        width: 200
      },
      {
        title: '结算日期',
        dataIndex: 'settlementDate',
        key: 'settlementDate',
        width: 150
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 120
      },
      {
        title: '债券简称',
        dataIndex: 'bondShortName',
        key: 'bondShortName',
        width: 150
      },
      {
        title: '结算方式',
        dataIndex: 'settlementTypeName',
        key: 'settlementTypeName',
        width: 120
      },
      // {
      //   title: '总额（万元)',
      //   dataIndex: 'amountStatus',
      //   key: 'amountStatus',
      //   width: 140
      // },
      {
        title: '结算金额(元)',
        dataIndex: 'settlementValue',
        key: 'settlementValue',
        width: 140
      },
      {
        title: '全额结算指令状态',
        dataIndex: 'grossOrderStatusName',
        key: 'grossOrderStatusName',
        width: 120
      },
      // {
      //   title: '资金结算状态',
      //   dataIndex: 'fundSettleStatusName',
      //   key: 'fundSettleStatusName',
      //   width: 120
      // },
      // {
      //   title: '债券结算状态',
      //   dataIndex: 'bondSettleStatusName',
      //   key: 'bondSettleStatusName',
      //   width: 120
      // },
      {
        title: '本方状态',
        dataIndex: 'buyerSettleConfirmStatusName',
        key: 'buyerSettleConfirmStatusName',
        width: 120
      },
      {
        title: '对手方状态',
        dataIndex: 'sellerSettleConfirmStatusName',
        key: 'sellerSettleConfirmStatusName',
        width: 120
      },
      {
        title: '付款确认状态',
        dataIndex: 'payConfirmStatusName',
        key: 'payConfirmStatusName',
        width: 120
      },
      {
        title: '收款确认状态',
        dataIndex: 'recvConfirmStatusName',
        key: 'recvConfirmStatusName',
        width: 120
      },
      {
        title: '资金排序标识',
        dataIndex: 'cashSortFlag',
        key: 'cashSortFlag',
        width: 120
      },
      {
        title: '资金排序状态',
        dataIndex: 'cashSortStatus',
        key: 'cashSortStatus',
        width: 120
      },
      {
        title: '本方账户',
        dataIndex: 'ourAccount',
        key: 'ourAccount',
        width: 150
      },
      {
        title: '本方账户简称',
        dataIndex: 'ourAccountShortName',
        key: 'ourAccountShortName',
        width: 150
      },
      {
        title: '对手方账户',
        dataIndex: 'offsetAccount',
        key: 'offsetAccount',
        width: 150
      },
      // {
      //   title: '资金宽限期',
      //   dataIndex: 'financeGracePeriod',
      //   key: 'financeGracePeriod',
      //   width: 150
      // },
      // {
      //   title: '债券宽限期',
      //   dataIndex: 'bondGracePeriod',
      //   key: 'bondGracePeriod',
      //   width: 150
      // },
      {
        title: '币种',
        dataIndex: 'currency',
        key: 'currency',
        width: 120
      },
      // {
      //   title: '参与方式',
      //   dataIndex: 'participateType',
      //   key: 'participateType',
      //   width: 120
      // },
      {
        title: '源成交编号',
        dataIndex: 'srcTradeId',
        key: 'srcTradeId',
        width: 200
      },
      // {
      //   title: '结算指令生成日期',
      //   dataIndex: 'createUserName1',
      //   key: 'createUserName',
      //   width: 150
      // },
      // {
      //   title: '结算指令生成时间',
      //   dataIndex: 'createUserName1',
      //   key: 'createUserName',
      //   width: 160
      // },
      {
        title: '确认时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '指令备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 150
      }
    ],
    dataSource: []
  },
  // 选种行指令
  rowed: {},
  active: '1',
  // 清分列表
  qfTable: [],
  // 对手方信息
  counterAccountInfo: [],
  queryDetails: undefined,
  businessTypes: [],
  bondCodes: [],
  bondCodesList: [],
  /**指令模糊查询条件*/
  instructionQueryForm: {
    ...page
  }
};
