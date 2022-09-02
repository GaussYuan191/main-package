import { page } from 'yss-biz/utils/util/constant';

export default {
  /**现券买卖List*/
  outrightRepoList: {
    list: [],
    total: 0
  },
  /**资金表格列信息*/
  outrightRepoCol: [
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
      dataIndex: 'totalFaceValue',
      key: 'totalFaceValue',
      width: 140,
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
    //   title: '有无保证品',
    //   dataIndex: 'collateralIndicatorName',
    //   key: 'collateralIndicatorName',
    //   width: 120,
    //   ellipsis: true
    // },
    {
      title: '首期结算金额(元)',
      dataIndex: 'firstSettleAmount',
      key: 'firstSettleAmount',
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
    {
      title: '成交时间',
      dataIndex: 'execTime',
      key: 'execTime',
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
      width: 120,
      ellipsis: true
    },

    // {
    //   title: '单个券券面总额',
    //   dataIndex: 'singleFaceValue',
    //   key: 'singleFaceValue',
    //   width: 120,
    //   ellipsis: true,
    //   align: 'right'
    // },

    {
      title: '首次净价(元)',
      dataIndex: 'firstNetPrice',
      key: 'firstNetPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '到期净价(元)',
      dataIndex: 'secondNetPrice',
      key: 'secondNetPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    // {
    //   title: '待偿期',
    //   dataIndex: 'termToMaturity',
    //   key: 'termToMaturity',
    //   width: 120,
    //   ellipsis: true
    // },

    {
      title: '首次应计利息(元)',
      dataIndex: 'firstAccuredInterest',
      key: 'firstAccuredInterest',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '到期应计利息(元)',
      dataIndex: 'secondAccuredInterest',
      key: 'secondAccuredInterest',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '首次全价(元)',
      dataIndex: 'firstDirtyPrice',
      key: 'firstDirtyPrice',
      width: 140,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '到期全价(元)',
      dataIndex: 'secondDirtyPrice',
      key: 'secondDirtyPrice',
      width: 140,
      ellipsis: true,
      align: 'right'
    },

    // {
    //   title: '首次收益率',
    //   dataIndex: 'firstYield',
    //   key: 'firstYield',
    //   width: 120,
    //   ellipsis: true
    // },
    // {
    //   title: '到期收益率',
    //   dataIndex: 'secondYield',
    //   key: 'secondYield',
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
          title: '资金账户',
          dataIndex: 'repoAssetAccount',
          key: 'repoAssetAccount',
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
          title: '托管账号',
          dataIndex: 'repoCustodianAccount',
          key: 'repoCustodianAccount',
          width: 200,
          ellipsis: true
        },
        // {
        //   title: '托管账户户名',
        //   dataIndex: 'repoBondAccountName',
        //   key: 'repoBondAccountName',
        //   width: 200,
        //   ellipsis: true
        // },
        {
          title: '资金开户行',
          dataIndex: 'repoSettleBankName',
          key: 'repoSettleBankName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管机构',
          dataIndex: 'repoCustodianName',
          key: 'repoCustodianName',
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
          title: '资金账户',
          dataIndex: 'reverseAssetAccount',
          key: 'reverseAssetAccount',
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
          title: '托管账号',
          dataIndex: 'reverseCustodianAccount',
          key: 'reverseCustodianAccount',
          width: 200,
          ellipsis: true
        },
        // {
        //   title: '托管账户户名',
        //   dataIndex: 'reverseBondAccountName',
        //   key: 'reverseBondAccountName',
        //   width: 200,
        //   ellipsis: true
        // },
        {
          title: '资金开户行',
          dataIndex: 'reverseSettleBankName',
          key: 'reverseSettleBankName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管机构',
          dataIndex: 'reverseCustodianName',
          key: 'reverseCustodianName',
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

  /**担保信息*/
  aboutguarantee: {
    guaranteeCol: [
      // {
      //   title: '回购方向',
      //   dataIndex: 'ecrRepurchaseDirection',
      //   key: 'ecrRepurchaseDirection',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '保证方式',
      //   dataIndex: 'execCode1',
      //   key: 'execCode1',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '保证金金额（元）',
      //   dataIndex: 'ecrCollateralCashAmount',
      //   key: 'ecrCollateralCashAmount',
      //   width: 200,
      //   ellipsis: true
      // },
      // {
      //   title: '保证金保管地',
      //   dataIndex: 'ecrCollateralCashBankName',
      //   key: 'ecrCollateralCashBankName',
      //   width: 200,
      //   ellipsis: true
      // },
      {
        title: '保证劵代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 200,
        ellipsis: true
      },

      {
        title: '保证券简称',
        dataIndex: 'bondName',
        key: 'bondName',
        width: 200,
        ellipsis: true
      },

      {
        title: '保证券券面总额（万元）',
        dataIndex: 'totalFaceValue',
        key: 'totalFaceValue',
        width: 200,
        ellipsis: true
      }

      // {
      //   title: '备注',
      //   dataIndex: 'reverseTraderName1',
      //   key: 'reverseTraderName1',
      //   width: 200,
      //   ellipsis: true
      // }
    ],
    guaranteeList: []
  },

  mdRowed: {},

  /**成交编号*/
  outrightRepoNumberList: [],

  /**现卷买卖模糊查询条件*/
  queryOutrightRepoElement: {
    ...page,
    bondCode: '', //债券代码
    execCode: '', //成交编号
    tradeDirection: '', //交易方向
    clearingStatus: 3 //清分状态（1、未清分，3、所有指令）
  },

  // 债券名称
  bondNameList: []
};
