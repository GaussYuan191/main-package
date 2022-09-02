import { page } from 'yss-biz/utils/util/constant';
export default {
  // 弹窗
  isBondOpenFormModal: {
    type: 'add',
    status: false
  },
  bondSaleBackList: {
    list: [],
    total: 0
  },

  // 表头字段
  bondSaleBackColum: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '管理人',
      dataIndex: 'intreReachStatus',
      width: 150
    },
    {
      title: '产品名称',
      dataIndex: 'bondAccount2',
      width: 150
    },
    {
      title: '成交日期',
      dataIndex: 'bondAccount3',
      width: 150
    },
    {
      title: '付息兑付日期',
      dataIndex: 'bondAccount4',
      width: 150
    },
    {
      title: '证券代码',
      dataIndex: 'bondAccount5',
      width: 150
    },
    {
      title: '证券名称',
      dataIndex: 'bondAccount6',
      width: 150
    },
    {
      title: '成交编号',
      dataIndex: 'bondAccount7',
      width: 150
    },
    {
      title: '源成交编号',
      dataIndex: 'bondAccount8',
      width: 150
    },
    {
      title: '券面总额（万元）',
      dataIndex: 'bondAccount9',
      width: 150
    },
    {
      title: '交易金额（元）',
      dataIndex: 'bondAccount10',
      width: 150
    },
    {
      title: '结算金额（元）',
      dataIndex: 'bondAccount11',
      width: 150
    },
    {
      title: '应计利息（元）',
      dataIndex: 'bondAccount12',
      width: 150
    },
    {
      title: '交易费用（元）',
      dataIndex: 'bondAccount13',
      width: 150
    },
    {
      title: '结算费用（元）',
      dataIndex: 'bondAccount14',
      width: 150
    },
    {
      title: '审核状态',
      dataIndex: 'bondAccount15',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'bondAccount16',
      width: 150
    }
  ],

  // 查询条件
  queryBondSaleBackElement: {
    ...page
  }
};
