/***托管明细Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  // /***托管明细列表** */
  truteeshipList: {
    dataSource: [],
    total: 0
  },
  /****托管明细头部信息 */
  trusteeshipColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '持仓日期',
      dataIndex: 'tradeDate',
      width: 150
    },
    {
      title: '托管机构',
      dataIndex: 'institution',
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
      title: '债券代码',
      width: 200,
      dataIndex: 'bondCode'
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      width: 150
    },
    {
      title: '债券类型',
      width: 150,
      dataIndex: 'bondType'
    },
    {
      title: '本日持仓数量（张）',
      width: 200,
      dataIndex: 'todBondNum'
    },
    {
      title: '本日持仓面额（元）',
      dataIndex: 'todBondPrice',
      width: 200
    },
    {
      title: '上日持仓数量（张）',
      dataIndex: 'yesBondNum',
      width: 200
    },
    {
      title: '上日持仓面额（元）',
      dataIndex: 'yesBondPrice',
      width: 200
    },

    {
      title: '本日变动数量（张）',
      dataIndex: 'bondNumChg',
      width: 200
    },

    {
      title: '本日变动面额（元）',
      width: 200,
      dataIndex: 'bondPriceChg'
    },
    {
      title: '债券评级',
      dataIndex: 'bondRating',
      width: 150
    },
    // {
    //   title: '主体评级',
    //   dataIndex: 'bondMainRating',
    //   width: 150
    // },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 300
    }
  ],

  /**保存选择结算费用的行信息*/
  rowed: {},

  /**查询条件列表*/
  tsv_queryElement: {
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },
  trusteeshipRow: []
};
