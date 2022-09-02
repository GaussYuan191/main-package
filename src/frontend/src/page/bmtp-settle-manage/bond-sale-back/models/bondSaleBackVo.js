import { page } from 'yss-biz/utils/util/constant';
export default {
  bondSaleBackList: {
    list: [],
    total: 0
  },

  // 表头字段
  bondSaleBackColum: [
    {
      title: '管理人',
      dataIndex: 'consignorName',
      key: 'consignorName',
      width: 150
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 150
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 150
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200
    },
    {
      title: '结算合同编号',
      dataIndex: 'contractId',
      key: 'contractId',
      width: 200
    },

    {
      title: '结算日期',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150
    },

    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150
    }
  ],

  // 查询条件
  queryBondSaleBackElement: {
    ...page
  }
};
