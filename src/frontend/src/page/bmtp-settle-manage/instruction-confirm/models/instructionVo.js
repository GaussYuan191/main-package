import { page } from 'yss-biz';
// 上清所, 合同管理-数据
export default {
  // 指令表格
  instructionTable: {
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
        title: '结算指令/成交编号',
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
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 150
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 100
      },
      {
        title: '成交匹配状态',
        dataIndex: 'dealMatchingStatusName',
        key: 'dealMatchingStatusName',
        width: 150
      },
      {
        title: '系统指令状态',
        dataIndex: 'systemLocalcurrencyStatusName',
        key: 'systemLocalcurrencyStatusName',
        width: 150
      },
      {
        title: '系统划款状态',
        dataIndex: 'transferStateName', // dataSource获取时需做处理
        key: 'transferStateName',
        width: 150
      },
      {
        title: '本方状态',
        dataIndex: 'ourTradeStatusName',
        key: 'ourTradeStatusName',
        width: 100
      },
      // {
      //   title: '本方资金状态',
      //   dataIndex: 'ownFundStatus',
      //   key: 'ownFundStatus',
      //   width: 160
      // },
      // {
      //   title: '本方债券状态',
      //   dataIndex: 'ownBondStatus',
      //   key: 'ownBondStatus',
      //   width: 160
      // },
      {
        title: '对手方账号',
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
      {
        title: '对手方状态',
        dataIndex: 'offsetTradeStatusName',
        key: 'offsetTradeStatusName',
        width: 120
      },
      {
        title: '结算日期/首次结算日期',
        dataIndex: 'firstSettleDate',
        key: 'firstSettleDate',
        width: 180
      },
      {
        title: '到期结算日期',
        dataIndex: 'dueSettleDate',
        key: 'dueSettleDate',
        width: 150
      },

      {
        title: '成交日期',
        dataIndex: 'tradeDate',
        key: 'tradeDate',
        width: 150
      },
      {
        title: '结算机构',
        dataIndex: 'settleInstitutionName',
        key: 'settleInstitutionName',
        width: 100,
        render: () => '上清所'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150
      },
      {
        title: '确认时间',
        dataIndex: 'confirmTime',
        key: 'confirmTime',
        width: 180
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 120
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 180
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: 180
      }
    ],
    data: [],
    dataTotal: 0,
    innerData: [],
    modalData: []
  },
  // 指令详情
  instructionInfo: {},
  // 分页请求参数
  pageReqParm: { ...page },
  //债券明细
  zjTable: {
    col: [
      {
        title: '创建时间',
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
        title: '净价价格',
        dataIndex: 'bondNetPrice',
        key: 'bondNetPrice',
        width: 150
      },
      {
        title: '全价价格',
        dataIndex: 'bondFullPrice',
        key: 'bondFullPrice',
        width: 150
      },
      {
        title: '券面总额',
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
        title: '应计利息',
        dataIndex: 'bondAccruedInterest',
        key: 'bondAccruedInterest',
        width: 150
      },
      {
        title: '计息日',
        dataIndex: 'bondValueDate',
        key: 'bondValueDate',
        width: 150
      },
      {
        title: '债券可用数量',
        dataIndex: 'bondUsableNum',
        key: 'bondUsableNum',
        width: 150
      },
      {
        title: '状态',
        dataIndex: 'bondStatus',
        key: 'bondStatus',
        width: 150
      }
    ],
    list: []
  },

  //  点击手工匹配modal展示的网上分销成交数据表格
  onlineExecutTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'serialNumber'
      },

      {
        title: '交易指令编号',
        dataIndex: 'tradeInstrId',
        key: 'tradeInstrId',
        width: 200,
        ellipsis: true
      },

      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 180,
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
        width: 180,
        ellipsis: true
      },
      {
        title: '成交日期',
        dataIndex: 'execDate',
        key: 'execDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '清分状态',
        dataIndex: 'clearingStatusName',
        key: 'clearingStatusName',
        width: 120,
        ellipsis: true
      },

      {
        title: '分销面额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交割日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算方式',
        dataIndex: 'settleTypeName',
        key: 'settleTypeName',
        width: 120,
        ellipsis: true,
        align: 'right'
      },

      {
        title: '对手方债券账号',
        dataIndex: 'sellerCustodianAccount',
        key: 'sellerCustodianAccount',
        width: 150,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '对手方资金账号',
        dataIndex: 'sellerAssetAccount',
        key: 'sellerAssetAccount',
        width: 150,
        ellipsis: true
      },
      {
        title: '卖出方资金账户名称',
        dataIndex: 'sellerAssetAccountName',
        key: 'sellerAssetAccountName',
        width: 150,
        ellipsis: true
      },
      {
        title: '卖出方资金账户开户行名称',
        dataIndex: 'sellerSettleBankName',
        key: 'sellerSettleBankName',
        width: 150,
        ellipsis: true
      },
      {
        title: '卖出方资金账户开户行联行号',
        dataIndex: 'sellerSettleAccountNumber',
        key: 'sellerSettleAccountNumber',
        width: 150,
        ellipsis: true
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
      },
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 120,
        ellipsis: true
      }
    ],
    data: [],
    dataTotal: 0,
    tradeId: ''
  },

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
  /***保存指令编号查询关联 */
  instrId: '',

  /**指令模糊查询条件*/
  instructionQueryForm: {
    consignorCode: '',
    instructionId: '',
    systemInstructionStatus: '',
    settleDate: '',
    execCode: '',
    execMatchStatus: '',
    ourTradeStatusName: '',
    counterPartyStatus: ''
  },

  instructionquery: '',
  dataDetail: {}, //数据详情

  /***弹框status*/
  isOpenFormModal: {
    //affirm结算确认  fail确认失败  handleMatch手工匹配
    type: '',
    status: false
  },

  // 上清质押信息
  SQPledgeInfo: [],
  // 上清担保信息
  SQDBInfo: [],

  /***公共状态 */

  //保存当前关联切换到哪一个tab上
  active: 1,

  // 交易日期
  currentTradeDate: ''
};
