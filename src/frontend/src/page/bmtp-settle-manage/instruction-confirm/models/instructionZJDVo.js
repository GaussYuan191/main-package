import { page } from 'yss-biz';
// 中债登, 合同管理-数据
export default {
  // 指令表格
  instructionZJDTable: {
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
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      {
        title: '结算指令/成交编号',
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
        dataIndex: 'execMatchStatusName',
        key: 'execMatchStatusName',
        width: 150
      },
      {
        title: '系统指令状态',
        dataIndex: 'innerStatusName',
        key: 'innerStatusName',
        width: 150
      },
      {
        title: '系统划款状态',
        dataIndex: ['transferCommandStatusDTO', 'transferStateName'],
        key: 'transferStateName',
        width: 150
      },
      {
        title: '本方状态',
        dataIndex: 'ownStatusName',
        key: 'ownStatusName',
        width: 100
      },
      {
        title: '本方资金状态',
        dataIndex: 'ownFundStatus',
        key: 'ownFundStatus',
        width: 160
      },
      {
        title: '本方债券状态',
        dataIndex: 'ownBondStatus',
        key: 'ownBondStatus',
        width: 160
      },
      {
        title: '对手方账号',
        dataIndex: 'counterAccountCode',
        key: 'counterAccountCode',
        width: 160
      },
      {
        title: '对手方账户简称',
        dataIndex: 'counterAccountName',
        key: 'counterAccountName',
        width: 160
      },
      {
        title: '对手方状态',
        dataIndex: 'counterStatusName',
        key: 'counterStatusName',
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
        dataIndex: 'expireSettleDate',
        key: 'expireSettleDate',
        width: 150
      },

      {
        title: '成交日期',
        dataIndex: 'instrDate',
        key: 'instrDate',
        width: 150
      },
      {
        title: '结算机构',
        dataIndex: 'settleInstitutionName',
        key: 'settleInstitutionName',
        width: 100,
        render: () => '中债登'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150
      },
      {
        title: '确认时间',
        dataIndex: 'affirmTime',
        key: 'affirmTime',
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
        dataIndex: 'remark',
        key: 'remark',
        width: 180
      }
    ],
    data: [],
    dataTotal: 0,
    innerData: [],
    modalData: []
  },
  // 指令详情
  // instructionInfo: {},
  // 分页请求参数
  pageReqParmZJD: { ...page },
  //债券明细, 没用到
  zjTableZJD: {
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

  // 结算合同编号列表
  // settlementContractNoList: [
  //   {
  //     type: 0,
  //     value: '100101068'
  //   },
  //   {
  //     type: 1,
  //     value: '100102031'
  //   }
  // ],
  /***保存指令编号查询关联 */
  // instrId: '',

  /**指令模糊查询条件*/
  instructionZJDQueryForm: {
    consignorCode: '',
    instructionId: '',
    systemInstructionStatus: '',
    settleDate: '',
    execCode: '',
    execMatchStatus: '',
    ownStatus: '',
    counterPartyStatus: ''
  },

  // instructionquery: '',
  dataDetailZJD: {}, //数据详情

  /***弹框status*/
  isOpenFormModalZJD: {
    //affirm结算确认  fail确认失败
    type: '',
    status: false
  },

  // 中债质押信息
  ZJPledgeInfo: [],
  // 中债担保信息
  ZJDBInfo: [],
};
