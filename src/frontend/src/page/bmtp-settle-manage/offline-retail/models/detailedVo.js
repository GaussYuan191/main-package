import { page } from 'yss-biz';

export default {
  /**List*/
  /**网下分销列表*/
  retailList: {
    list: [],
    total: 0
  },
  /**网下分销头部信息*/

  retailCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '管理人',
      dataIndex: 'managerName',
      key: 'managerName',
      width: 160,
      ellipsis: true
    },
    // {
    //   title: '产品',
    //   dataIndex: 'productName',
    //   key: 'productName',
    //   width: 160,
    //   ellipsis: true
    // },
    // {
    //   title: '资产单元',
    //   dataIndex: 'assetUnitName',
    //   key: 'assetUnitName',
    //   width: 100,
    //   ellipsis: true
    // },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 140,
      ellipsis: true
    },
    {
      title: '债券简称',
      dataIndex: 'bondShortName',
      key: 'bondShortName',
      width: 160,
      ellipsis: true
    },
    {
      title: '分销价格(元)',
      dataIndex: 'distributionPrice',
      key: 'distributionPrice',
      width: 140,
      ellipsis: true
    },
    {
      title: '分销面额(万元)',
      dataIndex: 'distributionFacevalue',
      key: 'distributionFacevalue',
      width: 140,
      ellipsis: true
    },
    {
      title: '分销金额(元)',
      dataIndex: 'distributionAmount',
      key: 'distributionAmount',
      width: 140,
      ellipsis: true
    },
    {
      title: '对手方名称',
      dataIndex: 'counterName',
      key: 'counterName',
      width: 150,
      ellipsis: true
    },
    {
      title: '对手方托管账号',
      dataIndex: 'counterBondAccount',
      key: 'counterBondAccount',
      width: 120,
      ellipsis: true
    },
    {
      title: '对手方资金账号',
      dataIndex: 'counterFundAccount',
      key: 'counterFundAccount',
      width: 120,
      ellipsis: true
    },
    {
      title: '系统合同状态',
      dataIndex: 'systemContractStatusName',
      key: 'systemContractStatusName',
      width: 100,
      ellipsis: true
    },
    // {
    //   title: '划款指令状态',
    //   dataIndex: 'transferInstructStatusName',
    //   key: 'transferInstructStatusName',
    //   width: 120,
    //   ellipsis: true
    // },
    // {
    //   title: '网下分销状态',
    //   dataIndex: 'systemContractStatus',
    //   key: 'systemContractStatus',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '交易指令编号',
      dataIndex: 'tradeOrderId',
      key: 'tradeOrderId',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算机构',
      dataIndex: 'settleInstitutionName',
      key: 'settleInstitutionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settlementTypeName',
      key: 'settlementTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易日期',
      dataIndex: 'tradeDate',
      key: 'tradeDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '结算日期',
      dataIndex: 'settlementDate',
      key: 'settlementDate',
      width: 120,
      ellipsis: true
    },
    // {
    //   title: '下达人',
    //   dataIndex: 'transmitUser',
    //   key: 'transmitUser',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      ellipsis: true
    }
    // {
    //   title: '下达备注',
    //   dataIndex: 'transmitRemark',
    //   key: 'transmitRemark',
    //   width: 150,
    //   ellipsis: true
    // },
    // {
    //   title: '复核人',
    //   dataIndex: 'checkUser',
    //   key: 'checkUser',
    //   width: 120,
    //   ellipsis: true
    // },
    // {
    //   title: '复核时间',
    //   dataIndex: 'checkDate',
    //   key: 'checkDate',
    //   width: 160,
    //   ellipsis: true
    // },
    // {
    //   title: '复核备注',
    //   dataIndex: 'checkRemark',
    //   key: 'checkRemark',
    //   width: 150,
    //   ellipsis: true
    // }
  ],

  /*列表业务查询*/
  queryElement: {
    ...page
  },

  /**是否加载成功*/
  isSpinning: true,

  //关联业务查询
  // aboutElement: {
  //   ...page,
  // },
  /**关联*/
  relationCol: [
    {
      title: '批次号',
      dataIndex: 'batchNo',
      key: 'batchNo',
      ellipsis: true,
      width: 150
    },
    {
      title: '划款指令编号',
      dataIndex: 'transferInstructCode',
      key: 'transferInstructCode',
      ellipsis: true,
      width: 200
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      ellipsis: true,
      width: 200
    },
    {
      title: '结算机构指令编号',
      dataIndex: 'instrId',
      key: 'instrId',
      ellipsis: true,
      width: 200
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeOrderNo',
      key: 'tradeOrderNo',
      ellipsis: true,
      width: 200
    },
    {
      title: '划款金额',
      dataIndex: 'transferAmount',
      key: 'transferAmount',
      ellipsis: true,
      width: 150
    },
    {
      title: '管理人',
      dataIndex: 'managerName',
      key: 'managerName',
      ellipsis: true,
      width: 100
    },
    // {
    //   title: '划款状态',
    //   dataIndex: 'transferStateName',
    //   key: 'transferStateName',
    //   ellipsis: true,
    //   width: 180
    // },
    // {
    //   title: '划款指令状态',
    //   dataIndex: 'transferCommandStateName',
    //   key: 'transferCommandStateName',
    //   ellipsis: true,
    //   width: 120
    // },
    // {
    //   title: '划款类型',
    //   dataIndex: 'transferTypeName',
    //   key: 'transferTypeName',
    //   ellipsis: true,
    //   width: 100
    // },

    {
      title: '币种代码',
      dataIndex: 'currency',
      key: 'currency',
      ellipsis: true,
      width: 160
    },
    {
      title: '划款日期',
      dataIndex: 'transferDate',
      key: 'transferDate',
      ellipsis: true,
      width: 150
    },
    {
      title: '划款事由',
      dataIndex: 'transferCauseName',
      key: 'transferCauseName',
      ellipsis: true,
      width: 160
    },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      width: 100
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      width: 160
    },
    {
      title: '指令来源',
      dataIndex: 'orginName',
      key: 'orginName',
      ellipsis: true,
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      key: 'createUserName',
      ellipsis: true,
      width: 150
    },
    {
      title: '撤销人',
      dataIndex: 'revokeUserName',
      key: 'revokeUserName',
      ellipsis: true,
      width: 180
    },
    {
      title: '撤销时间',
      dataIndex: 'revokeTime',
      key: 'revokeTime',
      ellipsis: true,
      width: 150
    },
    {
      title: '附言',
      dataIndex: 'postscript',
      key: 'postscript',
      ellipsis: true,
      width: 150
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      width: 180
    }
  ],

  /**关联列表*/
  relationList: [],

  /***是否弹框 */
  isOpenFormModal: {
    sign: ''
  },
  /***选择的当前行 */
  rowed: {},
  // 对手方信息
  counterpartyInfoList: []
};
