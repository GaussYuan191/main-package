// 合同管理-数据
import { page } from 'yss-biz';
export default {
  // 指令表格
  instructionTable: {
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
        title: '证券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 150
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
        title: '交易日期',
        dataIndex: 'tradeDate',
        key: 'tradeDate',
        width: 150
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
        width: 120,
        render: function (text, record, index) {
          if (text === '网上分销' || record.bizCategory == '4') {
            return '分销';
          } else {
            return text;
          }
        }
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '成交匹配状态',
        dataIndex: 'dealMatchingStatusName',
        key: 'dealMatchingStatusName',
        width: 120
      },
      {
        title: '系统指令状态',
        dataIndex: 'systemLocalcurrencyStatusName',
        key: 'systemLocalcurrencyStatusName',
        width: 120
      },
      {
        title: '交易状态',
        dataIndex: 'tradeStatusName',
        key: 'tradeStatusName',
        width: 120
      },

      {
        title: '本方状态',
        dataIndex: 'ourTradeStatusName',
        key: 'ourTradeStatusName',
        width: 120
      },
      {
        title: '本方备注',
        dataIndex: 'ourRemark',
        key: 'ourRemark',
        width: 160
      },
      {
        title: '对手方账户简称',
        dataIndex: 'offsetAccountShortName',
        key: 'offsetAccountShortName',
        width: 150
      },
      {
        title: '对手方状态',
        dataIndex: 'offsetTradeStatusName',
        key: 'offsetTradeStatusName',
        width: 120
      },
      {
        title: '对手方备注',
        dataIndex: 'offsetRemark',
        key: 'offsetRemark',
        width: 160
      },

      {
        title: '结算方式',
        dataIndex: 'settlementTypeName',
        key: 'settlementTypeName',
        width: 150
      },
      {
        title: '清算方式',
        dataIndex: 'clearTypeName',
        key: 'clearTypeName',
        width: 150
      },
      {
        title: '交易来源',
        dataIndex: 'tradeSourceName',
        key: 'tradeSourceName',
        width: 180
      },
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
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 140
      },
      {
        title: '确认时间',
        dataIndex: 'confirmTime',
        key: 'confirmTime',
        width: 160
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: 200
      }
    ],
    data: [],
    total: 0
  },

  // 选种行指令
  rowed: {},
  active: '1',
  // 清分列表
  qfTable: [],
  // 对手方信息
  counterAccountInfo: [],
  queryDetails: undefined,
  businessTypes: [],
  bondCodes: [],
  bondCodesList: [],
  /**指令模糊查询条件*/
  instructionQueryForm: {
    ...page
  },
  contractQueryForm: {
    ...page
  }
};
