import { page } from 'yss-biz/utils/util/constant';

export default {
  /**现券买卖List*/
  collateralisedRepoCol: [
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
    //   title: '管理人名称',
    //   dataIndex: 'managerName',
    //   key: 'managerName',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 120,
      ellipsis: true
    },
    {
      title: '券面总额合计(万元)',
      dataIndex: 'sumTotalFaceValue',
      key: 'sumTotalFaceValue',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '回购利率(%)',
      dataIndex: 'repoRate',
      key: 'repoRate',
      width: 120,
      ellipsis: true
    },

    {
      title: '交易品种',
      dataIndex: 'tradingProduct',
      key: 'tradingProduct',
      width: 120,
      ellipsis: true
    },
    {
      title: '首次结算日',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期结算日',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '首次结算方式',
      dataIndex: 'firstSettleMethodName',
      key: 'firstSettleMethodName',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'secondSettleMethodName',
      key: 'secondSettleMethodName',
      width: 120,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '实际占款天数',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 120,
      ellipsis: true
    },

    // {
    //   title: '清算方式',
    //   dataIndex: 'clearingMethodName',
    //   key: 'clearingMethodName',
    //   width: 120,
    //   ellipsis: true
    // },
    // {
    //   title: '续作标识',
    //   dataIndex: 'sequelIndicatorName',
    //   key: 'sequelIndicatorName',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '到期结算金额(元)',
      dataIndex: 'secondSettleAmount',
      key: 'secondSettleAmount',
      width: 140,
      ellipsis: true,
      align: 'right'
    },

    // {
    //   title: '回购期限',
    //   dataIndex: 'repoTerm',
    //   key: 'repoTerm',
    //   width: 120,
    //   ellipsis: true
    // },
    // {
    //   title: '成交时间',
    //   dataIndex: 'execTime',
    //   key: 'execTime',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '正回购方',

      children: [
        {
          title: '交易员名称',
          dataIndex: 'repoTraderName',
          key: 'repoTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金清算账户',
          dataIndex: 'repoClearingAccount',
          key: 'repoClearingAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金账户户名',
          dataIndex: 'repoAssetAccountName',
          key: 'repoAssetAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管机构名称',
          dataIndex: 'repoCustodianName',
          key: 'repoCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管账户',
          dataIndex: 'repoCustodianAccount',
          key: 'repoCustodianAccount',
          width: 200,
          ellipsis: true
        }
      ]
    },
    {
      title: '逆回购方',
      children: [
        {
          title: '交易员名称',
          dataIndex: 'reverseTraderName',
          key: 'reverseTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金清算账户',
          dataIndex: 'reverseClearingAccount',
          key: 'reverseClearingAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金账户户名',
          dataIndex: 'reverseAssetAccountName',
          key: 'reverseAssetAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管机构名称',
          dataIndex: 'reverseCustodianName',
          key: 'reverseCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管账户',
          dataIndex: 'reverseCustodianAccount',
          key: 'reverseCustodianAccount',
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
    },
    {
      title: '数据来源',
      dataIndex: 'dataSourceName',
      key: 'dataSourceName',
      width: 120,
      ellipsis: true
    }
  ],
  collateralisedRepoList: {
    list: [],
    total: 0
  },

  /**抵押券信息*/
  aboutHypothecation: {
    hypothecationCol: [
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
        width: 200,
        ellipsis: true
      },

      {
        title: '券面总额（万元）',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true
      },
      // {
      //   title: '抵押金额（万元）',
      //   dataIndex: 'reverseTraderName1',
      //   key: 'reverseTraderName',
      //   width: 200,
      //   ellipsis: true
      // },
      {
        title: '折算比例',
        dataIndex: 'conversionProportion',
        key: 'conversionProportion',
        width: 120,
        ellipsis: true
      }

      // {
      //   title: '可抵押数量',
      //   dataIndex: 'reverseTraderName1',
      //   key: 'reverseTraderName',
      //   width: 200,
      //   ellipsis: true
      // },

      // {
      //   title: '可抵押天数',
      //   dataIndex: 'reverseTraderName',
      //   key: 'reverseTraderName',
      //   width: 200,
      //   ellipsis: true
      // },
      // {
      //   title: '持仓数量',
      //   dataIndex: 'reverseTraderName',
      //   key: 'reverseTraderName',
      //   width: 200,
      //   ellipsis: true
      // },
      // {
      //   title: '备注',
      //   dataIndex: 'reverseTraderName',
      //   key: 'reverseTraderName',
      //   width: 200,
      //   ellipsis: true
      // }
    ],
    hypothecationList: []
  },
  ZYAbout: [],

  /**点击行进行保存*/
  zyRowed: {},

  /**成交编号*/
  // collateralisedRepoNumberList: [],

  /**现卷买卖模糊查询条件*/
  queryCollateralisedRepoElement: {
    ...page,
    bondCode: '', //债券代码
    execCode: '', //成交编号
    tradeDirection: '', //交易方向
    clearingStatus: 3 //清分状态（1、未清分，3、所有指令）
  }
};
