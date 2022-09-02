import { page } from 'yss-biz';

export default {
  /**List*/
  /**资金账户余额查询列表*/
  businessList: [],
  /**正回购列信息*/

  businessCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true
    },
    {
      title: '所属管理人',
      dataIndex: 'consignorName',
      key: 'consignorName',
      width: 200,
      ellipsis: true
    },
    {
      title: '资金账户',
      dataIndex: 'assetAccountSn',
      key: 'assetAccountSn',
      width: 160,
      ellipsis: true
    },
    {
      title: '账户名称',
      dataIndex: 'assetAccountSnName',
      key: 'assetAccountSnName',
      width: 160,
      ellipsis: true
    },
    {
      title: '账户类型',
      dataIndex: 'accountTypeName',
      key: 'accountTypeName',
      width: 200,
      ellipsis: true
    },
    {
      title: '总余额(元)',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 180,
      ellipsis: true
    },
    {
      title: '可用余额(元)',
      dataIndex: 'usableAmount',
      key: 'usableAmount',
      width: 180,
      ellipsis: true
    },
    {
      title: '锁定余额(元)',
      dataIndex: 'lockedAmount',
      key: 'lockedAmount',
      width: 180,
      ellipsis: true
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 180,
      ellipsis: true
    },
    {
      title: '币种',
      dataIndex: 'moneyType',
      key: 'moneyType',
      width: 120,
      ellipsis: true
    }
  ],

  /*正回购到期业务查询*/
  queryElement: {
    ...page
  },

  /**是否加载成功*/
  isSpinning: true,

  /**关联*/
  relationCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber1'
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true
    },
    {
      title: '所属管理人',
      dataIndex: 'consignorName',
      key: 'consignorName',
      width: 200,
      ellipsis: true
    }
  ],

  /**批量回款设置列表*/
  batchRefundCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber2'
    },
    {
      title: '所属产品',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true
    },
    {
      title: '资金账号',
      dataIndex: 'assetAccountSn',
      key: 'assetAccountSn',
      width: 200,
      ellipsis: true
    }
  ],
  // 批量回款的表格中填充的数据
  batchRefundList: [],
  relationList: [],

  /***是否弹框 */
  isOpenFormModal: {
    sign: ''
  },
  /***选择的当前行 */
  rowed: {},
  /*** 日间提款资金账户信息 */
  assetAccount: {},

  selectPro: {},

  // 当前系统交易日期
  currentTradeDate: '',
  // 关联信息分页请求参数
  pageReqParm: { ...page }
  // assetAccountWithSearch: [],
};
