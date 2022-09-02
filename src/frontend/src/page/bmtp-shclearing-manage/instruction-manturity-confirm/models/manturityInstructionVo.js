import { page } from 'yss-biz';
// 合同管理-数据
export default {
  // 指令表格
  manturitySettleTable: {
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
        title: '结算指令编号',
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
        title: '到期确认状态',
        dataIndex: 'maturityConfirmStatusName',
        key: 'maturityConfirmStatusName',
        width: 150
      },
      {
        title: '到期结算日',
        dataIndex: 'settlementDate',
        key: 'settlementDate',
        width: 150
      },
      {
        title: '到期结算方式',
        dataIndex: 'settlementTypeName',
        key: 'settlementTypeName',
        width: 150
      },
      {
        title: '本方状态',
        dataIndex: 'ourTradeStatusName',
        key: 'ourTradeStatusName',
        width: 100
      },
      {
        title: '对手方状态',
        dataIndex: 'offsetTradeStatusName',
        key: 'offsetTradeStatusName',
        width: 120
      },
      {
        title: '系统交割状态',
        dataIndex: 'systemContractStatusName',
        key: 'systemContractStatusName',
        width: 180
      },
      {
        title: '全额结算指令状态',
        dataIndex: 'grossOrderStatusName',
        key: 'grossOrderStatusName',
        width: 180
      },
      {
        title: '确认时间',
        dataIndex: 'maturityTime',
        key: 'maturityTime',
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

  /**指令模糊查询条件*/
  expireSettleQueryForm: { ...page },
  dataDetail: {}, //数据详情
  // 交易日期
  currentTradeDate: ''
};
