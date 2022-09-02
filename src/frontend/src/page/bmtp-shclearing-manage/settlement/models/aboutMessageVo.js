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
        key: 'createTime',
        width: 60
      },
      {
        title: '确认时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150
      },
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 150
      },
      {
        title: 'ISIN代码',
        dataIndex: 'bondIsin',
        key: 'bondIsin',
        width: 150
      },
      {
        title: '债券简称',
        dataIndex: 'bondShortName',
        key: 'bondShortName',
        width: 150
      },
      {
        title: '净价价格(元)',
        dataIndex: 'bondNetPrice',
        key: 'bondNetPrice',
        width: 150
      },
      {
        title: '全价价格(元)',
        dataIndex: 'bondFullPrice',
        key: 'bondFullPrice',
        width: 150
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'bondAmount',
        key: 'bondAmount',
        width: 150
      },
      {
        title: '债券质押率',
        dataIndex: 'bondPledgeRate',
        key: 'bondPledgeRate',
        width: 150
      },
      {
        title: '应计利息(元)',
        dataIndex: 'bondAccruedInterest',
        key: 'bondAccruedInterest',
        width: 150
      },
      {
        title: '计息日',
        dataIndex: 'bondValueDate',
        key: 'bondValueDate',
        width: 150
      }
      // {
      //   title: '债券可用数量',
      //   dataIndex: 'bondUsableNum',
      //   key: 'bondUsableNum',
      //   width: 150
      // },
      // {
      //   title: '状态 ',
      //   dataIndex: 'bondStatus',
      //   key: 'bondStatus',
      //   width: 150
      // }
    ],
    list: []
  },
  // 资金明细
  zjInfo: {},

  // /**担保信息*/
  guaranteeInformation: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '回购方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '保证方式',
        dataIndex: 'guaranteeModeName',
        key: 'guaranteeModeName',
        width: 140
      },
      {
        title: '保证券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 140
      },
      {
        title: '保证券简称',
        dataIndex: 'bondShortName',
        key: 'bondShortName',
        width: 150
      },
      {
        title: '保证券券面总额（万元）',
        dataIndex: 'bondAmount',
        key: 'bondAmount',
        width: 150
      },
      {
        title: '保证金金额(元)',
        dataIndex: 'depositAmount',
        key: 'depositAmount',
        width: 150
      },
      {
        title: '保证金保管地',
        dataIndex: 'depositPlaceName',
        key: 'depositPlaceName',
        width: 150
      }
    ],
    dataSource: []
  },

  // /**成交流水*/
  runningWaterTable: {
    // columns已废弃
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
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200
      },
      {
        title: '交易员代码',
        dataIndex: 'managerCode-------------------',
        key: 'managerCode',
        width: 150
      },
      {
        title: '本方名称',
        dataIndex: 'managerName------------',
        key: 'managerName',
        width: 150
      },
      {
        title: '对手方名称',
        dataIndex: 'peerTraderName-----------',
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
        dataIndex: 'bondKind------------',
        key: 'bondKind',
        width: 140
      },
      {
        title: '清分状态',
        dataIndex: 'clarifyState----------',
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
        dataIndex: 'closingCost------------',
        key: 'closingCost',
        width: 150
      },
      // {
      //   title: '应计利息',
      //   dataIndex: 'accruedInterest',
      //   key: 'accruedInterest',
      //   width: 150
      // },
      {
        title: '结算价格(元)',
        dataIndex: 'settleAmount-------------',
        key: 'settleAmount',
        width: 150
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      },
      {
        title: '成交金额(元)',
        dataIndex: 'tradeAmount--------',
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
        dataIndex: 'clearDate-------------',
        key: 'clearDate',
        width: 150
      }
    ],
    dataSource: []
  },

  /**合同信息*/
  contractMessageTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 150
      },
      {
        title: '结算合同编号',
        dataIndex: 'contractId',
        key: 'contractId',
        width: 200
      },
      {
        title: '结算指令编号',
        dataIndex: 'instrId',
        key: 'instrId',
        width: 200
      },
      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '结算对手方简称',
        dataIndex: 'counterAccountName',
        key: 'counterAccountName',
        width: 150
      },
      {
        title: '合同处理状态',
        dataIndex: 'contractStatusName',
        key: 'contractStatusName',
        width: 120
      },
      // {
      //   title: '合同债券状态',
      //   dataIndex: 'bondStatus',
      //   key: 'bondStatus'
      // },
      // {
      //   title: '合同金额状态',
      //   dataIndex: 'amountStatus',
      //   key: 'amountStatus'
      // },
      {
        title: '合同冻结状态',
        dataIndex: 'frozenStatusName',
        key: 'frozenStatusName',
        width: 120
      },
      {
        title: '结算方式',
        dataIndex: 'settleTypeName',
        key: 'settleTypeName',
        width: 150
      },
      {
        title: '原结算合同编号',
        dataIndex: 'orgContractId',
        key: 'orgContractId',
        width: 200
      },
      {
        title: '原结算指令编号',
        dataIndex: 'orgInstructId',
        key: 'orgInstructId',
        width: 200
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 150
      }
    ],
    dataSource: []
  }
};
