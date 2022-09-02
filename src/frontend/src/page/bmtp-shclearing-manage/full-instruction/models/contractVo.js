import { page } from 'yss-biz';
// 全额指令-数据
export default {
  // 全额指令
  contractTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 100
      },
      {
        title: '管理人',
        dataIndex: 'consignorName',
        key: 'consignorName',
        width: 150
      },
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
        title: '源成交编号',
        dataIndex: 'srcTradeId',
        key: 'srcTradeId',
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
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 150
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
        width: 150
      },
      {
        title: '系统交割状态',
        dataIndex: 'systemContractStatusName',
        key: 'systemContractStatusName',
        width: 120
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
        title: '券面总额（万元）',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      },

      {
        title: '结算金额(元)',
        dataIndex: 'settlementValue',
        key: 'settlementValue',
        width: 150
      },

      {
        title: '全额结算指令类型',
        dataIndex: 'fullOrderTypeName',
        key: 'fullOrderTypeName',
        width: 150
      },
      {
        title: '本方账户',
        dataIndex: 'ourAccount',
        key: 'ourAccount',
        width: 160
      },
      {
        title: '本方账户简称',
        dataIndex: 'ourAccountShortName',
        key: 'ourAccountShortName',
        width: 160
      },
      {
        title: '对手方账户',
        dataIndex: 'offsetAccount',
        key: 'offsetAccount',
        width: 160
      },
      {
        title: '对手方账户简称',
        dataIndex: 'offsetAccountShortName',
        key: 'offsetAccountShortName',
        width: 160
      },
      // {
      //   title: '资金宽限期',
      //   dataIndex: 'financeGracePeriod',
      //   key: 'financeGracePeriod',
      //   width: 180
      // },
      // {
      //   title: '债券宽限期',
      //   dataIndex: 'bondGracePeriod',
      //   key: 'bondGracePeriod',
      //   width: 180
      // },
      // {
      //   title: '币种',
      //   dataIndex: 'currency',
      //   key: 'currency',
      //   width: 120
      // },
      // {
      //   title: '参与方式',
      //   dataIndex: 'participateType',
      //   key: 'participateType',
      //   width: 140
      // },

      // {
      //   title: '结算指令生成日期',
      //   dataIndex: 'settlementCreateTime',
      //   key: 'settlementCreateTime1',
      //   width: 160
      // },
      // {
      //   title: '结算指令生成时间',
      //   dataIndex: 'settlementCreateTime',
      //   key: 'settlementCreateTime2',
      //   width: 160
      // },
      {
        title: '借贷费用(元)',
        dataIndex: 'loanAmount',
        key: 'loanAmount',
        width: 180
      },
      {
        title: '借贷费率',
        dataIndex: 'loanRate',
        key: 'loanRate',
        width: 180
      },
      {
        title: '借贷期限',
        dataIndex: 'term',
        key: 'term',
        width: 180
      },
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
    data: [],
    total: 0,

    // rowSelection objects indicates the need for row selection
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      }
    }
  },
  /**指令状态列表*/
  instructionStateList: [
    {
      code: 1,
      value: '正常'
    },
    {
      code: 2,
      value: '失效'
    }
  ],
  // 业务类型列表
  businessTypeList: [
    {
      type: 0,
      value: '类型一'
    },
    {
      type: 1,
      value: '类型二'
    },
    {
      type: 2,
      value: '类型三'
    }
  ],
  // 交易方向列表
  entrustDirectionList: [
    {
      type: 0,
      value: '方向一'
    },
    {
      type: 1,
      value: '方向二'
    },
    {
      type: 2,
      value: '方向三'
    }
  ],
  // 结算方式列表
  settlementTypeList: [
    {
      type: 0,
      value: '现金结算'
    },
    {
      type: 1,
      value: '转账汇款'
    }
  ],
  // 成交匹配状态列表
  clinchDealStateList: [
    {
      type: 0,
      value: '已成交'
    },
    {
      type: 1,
      value: '未成交'
    }
  ],
  // 划款匹配状态列表
  paymentSatateList: [
    {
      type: 0,
      value: '已划款'
    },
    {
      type: 1,
      value: '未划款'
    }
  ],
  // 对手方
  counterpartyList: [
    {
      type: 0,
      value: '对手方一'
    },
    {
      type: 1,
      value: '对手方二'
    }
  ],
  counterpartyAccountList: [
    {
      type: 0,
      value: '账户一'
    },
    {
      type: 1,
      value: '账户二'
    }
  ],
  // 对手方状态列表
  counterpartyStateList: [
    {
      type: 0,
      value: '状态一'
    },
    {
      type: 1,
      value: '状态二'
    }
  ],
  // 结算合同编号列表
  settlementContractNoList: [
    {
      type: 0,
      value: '100101068'
    },
    {
      type: 1,
      value: '100102031'
    }
  ],

  // 合同处理状态列表
  contractStateList: [
    {
      type: 0,
      value: '正常'
    },
    {
      type: 1,
      value: '失效'
    }
  ],

  // 交割状态列表
  deliveryStateList: [
    {
      type: 0,
      value: '已交割'
    },
    {
      type: 1,
      value: '未交割'
    }
  ],
  // 合同债券状态列表
  contractBondList: [
    {
      type: 0,
      value: '状态一'
    },
    {
      type: 1,
      value: '状态二'
    },
    {
      type: 2,
      value: '状态三'
    }
  ],
  // 合同金额状态列表
  contractAmountStateList: [
    {
      type: 0,
      value: '状态一'
    },
    {
      type: 1,
      value: '状态二'
    },
    {
      type: 2,
      value: '状态三'
    }
  ],

  /**指令模糊查询条件*/
  instructionQueryForm: {
    ...page
    // instrId: '', // 指令编号
    // instructStatus: '', //指令状态
    // instructionDate: '', //指令日期
    // settleDate: '', //结算日期无
    // execCode: '', //成交编号
    // businessType: '', //业务类型无
    // entrustSide: '', //交易方向
    // settleType: '', //结算方式
    // execMatchStatus: '', //成交匹配状态
    // paymentSatate: '', //划款匹配状态无
    // counterAccountCode: '', //对手方编码
    // counterAccountName: '', //对手方账户
    // counterStatus: '' //对手方状态
  },

  contractQueryForm: {
    ...page
    // settlementContractNo: '', //结算合同编号
    // contractState: '', //合同状态
    // deliveryState: '', //系统交割状态
    // settlementNo: '', //结算指令编号
    // entrustDirection: '', //交易方向
    // businessType: '', //业务类型
    // contractBond: '', //合同债权状态
    // contractAmountState: '', //合同金额状态
    // counterparty: '', //对手方
    // counterpartyAccount: '', //对手方账户
    // clinchDealNo: '', //成交编号
    // entryDate: '', //确认时间
    // settlementDate: '' //结算日期
  },
  selectRows: []
};
