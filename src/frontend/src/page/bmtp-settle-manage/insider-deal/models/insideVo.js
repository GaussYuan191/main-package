/***内部转仓业务-数据 */
import { page } from 'yss-biz/utils/util/constant';
export default {
  // 指令表格
  instructionTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        width: 100
      },
      {
        title: '成交日期',
        dataIndex: 'execDate',
        width: 140
      },
      {
        title: '交易指令编号',
        dataIndex: 'tradeInstrId',
        width: 200
      },
      {
        title: '内转合同编号',
        dataIndex: 'innerContactId',
        width: 200
      },
      {
        title: '成交编号',
        dataIndex: 'execCode',
        width: 200
      },
      {
        title: '内部合同状态',
        dataIndex: 'innerContactStatusName',
        width: 150
      },
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        width: 150
      },
      {
        title: '债券名称',
        dataIndex: 'bondName',
        width: 150
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        width: 150
      },
      // {
      //   title: '回购方向',
      //   dataIndex: 'repurchaseDirectionName',
      //   width: 100
      // },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        width: 160
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        width: 160
      },
      {
        title: '应计利息(元/百元面值)',
        dataIndex: 'accruedInterest',
        width: 160
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        width: 160
      },
      {
        title: '净价(元)',
        dataIndex: 'netPrice',
        width: 160
      },
      {
        title: '全价(元)',
        dataIndex: 'dirtyPrice',
        width: 160
      },
      {
        title: '交易金额(元)',
        dataIndex: 'tradeAmount',
        width: 160
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        width: 160
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        width: 160
      },
      // {
      //   title: '到期结算金额(元)',
      //   dataIndex: 'expireSettleAmount',
      //   width: 160
      // },
      {
        title: '结算方式',
        dataIndex: 'settleTypeName',
        width: 160
      },
      // {
      //   title: '到期结算方式',
      //   dataIndex: 'expireSettleTypeName',
      //   width: 150
      // },
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        width: 180
      },
      // {
      //   title: '到期结算日期',
      //   dataIndex: 'expireSettleDate',
      //   width: 150
      // },
      {
        title: '指令状态',
        dataIndex: 'commandStatusName',
        width: 100
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 160,
        ellipsis: true
      },
      {
        title: '审核状态',
        dataIndex: 'checkStatusName',
        key: 'checkStatus',
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
      }
    ],
    dataList: [],
    total: 0
  },
  // 列表参数
  queryElement: {
    ...page
  },
  // 选种行指令
  rowed: {},
  rowChecked: [],
  active: '1',
  // 清分列表
  qfTable: [],

  buyerInfo: [],
  sellerInfo: [],
  // allBondList: [],
  currentTradeDate: ''
};
