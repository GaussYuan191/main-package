import { page } from 'yss-biz';

// 合同管理-数据
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
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      {
        title: '证券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 150
      },
      {
        title: '结算指令编号',
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
        title: '成交日期',
        dataIndex: 'instrDate',
        key: 'instrDate',
        width: 150
      },
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 150
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '成交匹配状态',
        dataIndex: 'execMatchStatusName',
        key: 'execMatchStatusName',
        width: 120
      },
      {
        title: '系统内部状态',
        dataIndex: 'innerStatusName',
        key: 'innerStatusName',
        width: 150
      },
      {
        title: '指令状态',
        dataIndex: 'instructStatusName',
        key: 'instructStatusName',
        width: 120
      },
      {
        title: '本方状态',
        dataIndex: 'ownStatusName',
        key: 'ownStatusName',
        width: 120
      },
      {
        title: '对手方',
        dataIndex: 'counterAccountName',
        key: 'counterAccountName',
        width: 150
      },
      {
        title: '对手状态',
        dataIndex: 'counterStatusName',
        key: 'counterStatusName',
        width: 120
      },

      {
        title: '结算指令来源',
        dataIndex: 'tradeSourceName',
        key: 'tradeSourceName',
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
        width: 120
      },
      {
        title: '确认时间',
        dataIndex: 'affirmTime',
        key: 'affirmTime',
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
        dataIndex: 'remark',
        key: 'remark',
        width: 200
      }
    ],
    data: [],
    total: 0
  },

  /***点击一行进行保存 */
  rowed: {},

  /***保存当前关联切换到哪一个tab上 */
  active: 1,
  /**指令模糊查询条件*/
  instructionQueryForm: {
    ...page
    // instrId: '', // 指令编号
    // instructStatus: '', //指令状态
    // instructionDate: '', //指令日期
    // settleDate: '', //结算日期无
    // execCode: '', //成交编号
    // businessType: '', //业务类型无
    // entrustSide: '', //交易方向
    // settleType: '', //结算方式
    // execMatchStatus: '', //成交匹配状态
    // paymentSatate: '', //划款匹配状态无
    // counterAccountCode: '', //对手方编码
    // counterAccountName: '', //对手方账户
    // counterStatus: '' //对手方状态
  },
  /**清分列表*/
  qfTable: [],
  // 结算指令管理对手方
  // jszlCounterAccount: []
};
