import { page } from 'yss-biz/utils/util/constant';

export default {
  /**List*/
  /**交易指令列表*/
  dealInstructionsList: {
    list: [],
    total: 0
  },
  /**交易指令列表头部信息*/

  dealInstructionsCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    // {
    //   title: '管理人名称',
    //   dataIndex: 'managerName',
    //   key: 'managerName',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
      ellipsis: true
    },
    // {
    //   title: '产品名称',
    //   dataIndex: 'productName',
    //   key: 'productName',
    //   width: 120,
    //   ellipsis: true
    // },
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
    // {
    //   title: '分销价格(元)',
    //   dataIndex: 'distributionPrice',
    //   key: 'distributionPrice',
    //   width: 120,
    //   ellipsis: true,
    //   align: 'right'
    // },
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
    // {
    //   title: '对手方名称',
    //   dataIndex: 'sellerSettleBankCode',
    //   key: 'sellerSettleBankCode',
    //   width: 120,
    //   ellipsis: true,
    //   align: 'right'
    // },
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
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   width: 160,
    //   ellipsis: true
    // }
  ],

  /*点击行进行保存*/
  rowed: {},
  productList: [],
  currentTradeDate: '',
  allBondList: [],
  detailMsgFX: [],
  /*划款指令详情*/
  // dealInstructionsInfo:{},
  /*分销参数*/
  queryDistributionElement: {
    ...page
  },

  // 交易指令编号
  getInsterIds: []
};
