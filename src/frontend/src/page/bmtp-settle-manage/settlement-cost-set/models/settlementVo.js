/***结算费用Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***结算费用列表** */
  settlementList: [],

  total: '',

  /****结算费用列表头部信息 */
  settlementColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '结算机构',
      dataIndex: 'settleInstitutionName',
      width: 150
    },
    {
      title: '费用类型',
      dataIndex: 'chargeTypeName',
      width: 200
    },
    {
      title: '交易品种',
      dataIndex: 'tradingProductName',
      width: 150
    },

    {
      title: '收费对象',
      width: 200,
      dataIndex: 'chargeObjectName'
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      width: 150
    },
    {
      title: '收费标的',
      width: 200,
      dataIndex: 'chargeTargetName'
    },
    {
      title: '收费标准(元)',
      width: 100,
      dataIndex: 'chargeStandard'
    },
    {
      title: '费用收取频率',
      dataIndex: 'chargeFrequencyName',
      width: 150
    },
    {
      title: '费用缴纳时间',
      dataIndex: 'paymentDayName',
      width: 150
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      width: 150
    },

    {
      title: '结束日期',
      dataIndex: 'endDate',
      width: 150
    },

    {
      title: '拆分计算方式',
      dataIndex: ' chargeAlgorithmTypeName',
      width: 150
    },

    {
      title: '所属管理人',
      width: 200,
      dataIndex: 'managerName'
    },
    {
      title: '所属产品',
      dataIndex: 'productName',
      width: 150
    },
    {
      title: '审核状态',
      dataIndex: 'checkStatusName',
      width: 150
    }
  ],

  /**保存选择结算费用的行信息*/
  rowed: {},

  /**查询条件列表*/
  queryElement: {
    settleInstitution: '', // 结算机构
    chargeType: '', // 费用类型
    enableState: '', //启用状态
    productCode: '', //产品代码（所属产品）
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  }
};
