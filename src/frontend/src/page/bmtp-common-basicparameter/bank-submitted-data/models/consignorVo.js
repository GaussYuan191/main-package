/***委托人明细Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***委托人明细列表** */
  consignorList: {
    dataSource: [],
    total: 0
  },
  /****委托人列表头部信息 */
  consignorColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      width: 200
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      width: 200
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      width: 150
    },
    {
      title: '募集方式',
      width: 150,
      dataIndex: 'rasingWay'
    },
    {
      title: '期限',
      dataIndex: 'term',
      width: 150
    },
    {
      title: '规模',
      width: 150,
      dataIndex: 'investScope'
    },
    {
      title: '投资人名称',
      width: 150,
      dataIndex: 'investor'
    },
    {
      title: '投资人类型',
      dataIndex: 'investorType',
      width: 150
    },
    {
      title: '投资金额(元)',
      dataIndex: 'investmentAmount',
      width: 150
    },
    {
      title: '投资比例',
      dataIndex: 'investmentRatio',
      width: 100
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
  csv_queryElement: {
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },

  // 行数据
  consignorRow: []
};
