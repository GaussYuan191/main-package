// 相关信息-数据
export default {
  //债券明细
  zjTable: {
    col: [
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 150
      },
      {
        title: '债券简称',
        dataIndex: 'bondName',
        key: 'bondName',
        width: 150
      },
      {
        title: '应计利息(元/百元面值)',
        dataIndex: 'accruedInterest',
        width: 160
      },
      {
        title: '转让净价价格(元)',
        dataIndex: 'netPrice',
        key: 'netPrice',
        width: 120
      },
      {
        title: '转让全价价格(元)',
        dataIndex: 'dirtyPrice',
        key: 'dirtyPrice',
        width: 120
      }
      // {
      //   title: '转让券面总额(万元)',
      //   dataIndex: 'faceValue',
      //   key: 'faceValue',
      //   width: 120
      // }
    ],
    list: []
  },
  // 买卖方信息
  mmfInfo: {},

  // /**划款指令信息*/
  drawMoneyTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '批次号',
        dataIndex: 'batchNo',
        width: 200,
        key: 'batchNo'
      },
      {
        title: '划款指令编号',
        dataIndex: 'transferInstructCode',
        width: 200,
        key: 'transferInstructCode'
      },
      {
        title: '交易指令编号',
        dataIndex: 'tradeOrderNo',
        width: 200,
        key: 'tradeOrderNo'
      },
      // {
      //   title: '结算指令/合同编号',
      //   dataIndex: 'instrId',
      //   key: 'instrId',
      //   width: 200
      // },
      {
        title: '产品代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 160
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 160
      },
      {
        title: '管理人',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 160
      },
      {
        title: '划款指令类型',
        dataIndex: 'transferTypeName',
        key: 'transferTypeName',
        width: 120
      },
      {
        title: '划款状态',
        dataIndex: 'transferStateName',
        key: 'transferStateName',
        width: 120
      },
      {
        title: '划款指令状态',
        dataIndex: 'transferCommandStateName',
        key: 'transferCommandStateName',
        width: 120
      },
      {
        title: '收付款方向',
        dataIndex: 'transferDirectionName',
        key: 'transferDirectionName',
        width: 120
      },
      {
        title: '划款金额',
        dataIndex: 'transferAmount',
        key: 'transferAmount',
        width: 120
      },
      {
        title: '付款账号',
        dataIndex: 'paymentAccount',
        key: 'paymentAccount',
        width: 160
      },
      {
        title: '付款账号名称',
        dataIndex: 'paymentAccountName',
        key: 'paymentAccountName',
        width: 160
      },
      {
        title: '付款账号开户行名称',
        dataIndex: 'paymentBankName',
        key: 'paymentBankName',
        width: 160
      },
      {
        title: '收款账号',
        dataIndex: 'beneficiaryAccount',
        key: 'beneficiaryAccount',
        width: 160
      },
      {
        title: '收款账号户名',
        dataIndex: 'beneficiaryAccountName',
        key: 'beneficiaryAccountName',
        width: 160
      },
      {
        title: '收款账号开户行名称',
        dataIndex: 'beneficiaryBankName',
        key: 'beneficiaryBankName',
        width: 160
      },
      {
        title: '收款账号开户行联行号',
        dataIndex: 'beneficiaryBankCode',
        key: 'beneficiaryBankCode',
        width: 160
      },
      // {
      //   title: '归集户账号',
      //   dataIndex: 'momAccount',
      //   key: 'momAccount',
      //   width: 160
      // },
      // {
      //   title: '归集户户名',
      //   dataIndex: 'momAccountName',
      //   key: 'momAccountName',
      //   width: 160
      // },
      // {
      //   title: '归集户开户行名称',
      //   dataIndex: 'momBankName',
      //   key: 'momBankName',
      //   width: 160
      // },
      // {
      //   title: '归集户账号开户行联行号',
      //   dataIndex: 'momBankCode',
      //   key: 'momBankCode',
      //   width: 160
      // },
      {
        title: '币种代码',
        dataIndex: 'currency',
        key: 'currency',
        width: 120
      },
      {
        title: '划款日期',
        dataIndex: 'transferDate',
        key: 'transferDate',
        width: 150
      },
      {
        title: '划款事由',
        dataIndex: 'transferCauseName',
        key: 'transferCauseName',
        width: 150
      },
      {
        title: '附言',
        dataIndex: 'postscript',
        key: 'postscript',
        width: 150
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 160
      }

      // {
      //   title: '创建人',
      //   dataIndex: 'createUserName',
      //   key: 'createUserName',
      //   width: 150
      // }
    ],
    dataSource: [],
    allData: true,
  },

  // /**担保信息*/
  dbTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 120
      },
      {
        title: '回购方向',
        dataIndex: 'pledgeType',
        key: 'pledgeType',
        width: 120
      },
      {
        title: '保证方式',
        dataIndex: 'guaranteeModeName',
        key: 'guaranteeModeName',
        width: 120
      },
      {
        title: '保证券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 120
      },
      {
        title: '保证券简称',
        dataIndex: 'productName',
        key: 'productName',
        width: 120
      },
      {
        title: '保证券券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120
      }
    ],
    list: [
      {
        faceValue: '100.90'
      }
    ]
  },

  /**源结算指令/合同信息*/
  contractMessageTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '管理人',
        dataIndex: 'consignorName',
        key: 'consignorName',
        width: 100
      },
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 100
      },
      {
        title: '资产单元',
        dataIndex: 'productName',
        key: 'productName',
        width: 100
      },
      {
        title: '结算指令编号',
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
        width: 120
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '交易方向',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '全额结算指令类型',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 120
      },
      {
        title: '结算方式',
        dataIndex: 'settlementTypeName',
        key: 'settlementTypeName',
        width: 120
      },
      {
        title: '系统合同状态',
        dataIndex: 'amountStatus',
        key: 'amountStatus',
        width: 140
      },
      {
        title: '全额结算指令状态',
        dataIndex: 'settlementValue',
        key: 'settlementValue',
        width: 120
      },
      {
        title: '资金结算状态',
        dataIndex: 'grossOrderStatusName',
        key: 'grossOrderStatusName',
        width: 120
      },
      {
        title: '债券结算状态',
        dataIndex: 'fundSettleStatusName',
        key: 'fundSettleStatusName',
        width: 120
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'bondSettleStatusName',
        key: 'bondSettleStatusName',
        width: 120
      },
      {
        title: '结算金额',
        dataIndex: 'ourAccount',
        key: 'ourAccount',
        width: 120
      },
      {
        title: '全额结算指令类型',
        dataIndex: 'ourAccountShortName',
        key: 'ourAccountShortName',
        width: 120
      },
      {
        title: '本方账户',
        dataIndex: 'offsetAccount',
        key: 'offsetAccount',
        width: 120
      },
      {
        title: '本方账户简称',
        dataIndex: 'financeGracePeriod',
        key: 'financeGracePeriod',
        width: 120
      },
      {
        title: '对手方账户',
        dataIndex: 'bondGracePeriod',
        key: 'bondGracePeriod',
        width: 120
      },
      {
        title: '对手方账户简称',
        dataIndex: 'currency',
        key: 'currency',
        width: 120
      },
      {
        title: '资金宽限期',
        dataIndex: 'participateType',
        key: 'participateType',
        width: 120
      },
      {
        title: '债券宽限期',
        dataIndex: 'tradeId',
        key: 'tradeId',
        width: 120
      },
      {
        title: '币种',
        dataIndex: 'createUserName1',
        key: 'createUserName',
        width: 160
      },
      {
        title: '参与方式',
        dataIndex: 'createUserName1',
        key: 'createUserName',
        width: 160
      },
      {
        title: '源成交编号',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200
      },
      {
        title: '结算指令生成日期',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '结算指令生成时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '创建时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      }
    ],
    dataSource: [{}]
  }
};
