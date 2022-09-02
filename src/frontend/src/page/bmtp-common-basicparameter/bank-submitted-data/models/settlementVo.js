/***结算明细Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***结算明细列表** */
  settlementList: {
    dataSource: [],
    total: 0
  },
  /****结算明细列表头部信息 */
  settlementColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '结算日期',
      dataIndex: 'settleDate',
      width: 150
    },
    {
      title: '交易日期',
      dataIndex: 'tradeDate',
      width: 150
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      width: 200
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      width: 150
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      width: 200
    },
    {
      title: '交易方式',
      width: 150,
      dataIndex: 'tradeType'
    },
    {
      title: '交易方向',
      width: 150,
      dataIndex: 'tradeDirection'
    },
    {
      title: '结算类型',
      width: 150,
      dataIndex: 'settleType'
    },
    {
      title: '结算金额（元）',
      width: 150,
      dataIndex: 'settleAmount'
    },
    {
      title: '预期到期收益率（%）',
      width: 150,
      dataIndex: 'expectRate'
    },
    {
      title: '结算状态',
      width: 150,
      dataIndex: 'settleStatus'
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      width: 200
    },
    {
      title: '债券简称',
      dataIndex: 'bondName',
      width: 200
    },
    {
      title: '债券面额（万元）',
      width: 150,
      dataIndex: 'faceVal'
    },
    {
      title: '对手方名称',
      dataIndex: 'offsetName',
      width: 150
    },
    {
      title: '备注',
      width: 300,
      dataIndex: 'remark'
    }
  ],

  /**保存选择结算费用的行信息*/
  rowed: {},

  /**查询条件列表*/
  stv_queryElement: {
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },
  settlementRow: []
};
