import { page } from 'yss-biz/utils/util/constant';

export default {
  /**现券买卖List*/
  bondLendingList: {
    list: [],
    total: 0
  },
  /**资金表格列信息*/
  bondLendingCol: [
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
    {
      title: '交易品种',
      dataIndex: 'tradingProduct',
      key: 'tradingProduct',
      width: 120,
      ellipsis: true
    },
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
      title: '借贷费率(%)',
      dataIndex: 'repoRate',
      key: 'repoRate',
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
    {
      title: '借贷期限',
      dataIndex: 'term',
      key: 'term',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '借贷费用(元)',
      dataIndex: 'lendingRate',
      key: 'lendingRate',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '实际占券天数',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '融入方',

      children: [
        {
          title: '融入方交易员名称',
          dataIndex: 'repoTraderName',
          key: 'repoTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融入方资金开户行',
          dataIndex: 'repoSettleBankName',
          key: 'repoSettleBankName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融入方托管账户户名',
          dataIndex: 'repoCustodianName',
          key: 'repoCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融入方托管账户',
          dataIndex: 'repoCustodianAccount',
          key: 'repoCustodianAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '融入方资金账户',
          dataIndex: 'repoAssetAccount',
          key: 'repoAssetAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '融入方资金账户户名',
          dataIndex: 'repoAssetAccountName',
          key: 'repoAssetAccountName',
          width: 200,
          ellipsis: true
        }
      ]
    },
    {
      title: '融出方',
      children: [
        {
          title: '融出方交易员名称',
          dataIndex: 'reverseTraderName',
          key: 'reverseTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融出方资金开户行',
          dataIndex: 'reverseSettleBankName',
          key: 'reverseSettleBankName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融出方托管账户户名',
          dataIndex: 'reverseCustodianName',
          key: 'reverseCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '融出方托管账户',
          dataIndex: 'reverseCustodianAccount',
          key: 'reverseCustodianAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '融出方资金账户',
          dataIndex: 'reverseAssetAccount',
          key: 'reverseAssetAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '融出方资金账户户名',
          dataIndex: 'reverseAssetAccountName',
          key: 'reverseAssetAccountName',
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
  abouteroPledgeRef: {
    eroPledgeRefCol: [
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 200
      },
      {
        title: '债券名称',
        dataIndex: 'bondName',
        key: 'bondName',
        width: 200
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 200,
        align: 'right'
      },
      {
        title: '折算比例',
        dataIndex: 'conversionProportion',
        key: 'conversionProportion',
        width: 200
      }
    ],
    eroPledgeRefList: []
  },

  mdRowed: {},
  DYAbout: [],
  /**成交编号*/
  bondLendingNumberList: [],

  /**现卷买卖模糊查询条件*/
  queryBondLendingElement: {
    ...page,
    bondCode: '', //债券代码
    execCode: '', //成交编号
    tradeDirection: '', //交易方向
    clearingStatus: 3 //清分状态（1、未清分，3、所有指令）
  },

  // 债券名称
  bondNameListLending: [],
  licenseData: {}
};
