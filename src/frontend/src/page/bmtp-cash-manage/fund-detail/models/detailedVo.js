import { page } from 'yss-biz/utils/util/constant';
export default {
  /**List*/
  /**资金交易明细List*/
  capitalDetailList: {
    list: [],
    total: 0
  },
  /**资金表格列信息*/
  capitalDetailCol: [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
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

  /*资金明细查询*/
  queryElement: {
    ...page
    // tradeBeginTime: moment().format('YYYY-MM-DD'),
    // tradeEndTime: moment().format('YYYY-MM-DD')
    // consignorCode: '', //管理人code
    // productCode: '', //产品code
    // item: '', //科目
    // borrowingSide: '', //借代方向
    // tradeType: '', //交易类型
    // checkStatus: '', //审核状态
    // settleInstitution: '', //结算机构
    // recordCode: '', //流水号
    // instructId: '', //合同编号
    // dataSource: '', //数据来源
    // tradeBeginTime: '', //开始交易日,
    // tradeEndTime: '' //结束交易时间
  },

  /***是否弹框 */
  isOpenFormModal: {
    status: false,
    type: 'add'
  },
  /***选择的当前行 */
  rowed: {},

  /***资金 */
  account: {},

  /***调整后资金 */
  accountAfter: {},

  // 划款信息详细--弹窗
  modalVal: {},
  currentTradeDate:''
};
