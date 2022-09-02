import { page } from 'yss-biz/utils/util/constant';
export default {
  /**交易账户表格列表*/
  transactionList: [],
  /**交易表格表头***/
  transactionColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '账户主体',
      width: 150,
      dataIndex: 'relatedSubjectName',
      sorter: 'descend'
    },
    {
      title: '交易账户编号',
      width: 200,
      dataIndex: 'tradeAccountSn'
    },
    {
      title: '交易账户代码',
      dataIndex: 'tradeAccount',
      width: 200
    },
    {
      title: '交易账户名称',
      dataIndex: 'tradeMarket',
      width: 150
    },
    {
      title: '交易市场',
      dataIndex: 'tradeMarketName',
      width: 150
    },
    {
      title: '交易账户业务权限',
      dataIndex: 'accountTradeAuthority',
      width: 150
    },
    {
      title: '限额(万元)',
      dataIndex: 'limitMoney',
      width: 150
    },
    {
      title: '币种',
      dataIndex: 'moneyType',
      width: 150
    },
    {
      title: '到期日',
      dataIndex: 'expireDate',
      width: 150
    },
    {
      title: '退市日',
      dataIndex: 'delistingDate',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'accountStatus',
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 150
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 150
    },
    {
      title: '审核状态',
      dataIndex: 'checkStatus',
      width: 150
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 150
    }
  ],

  /**交易账户*/
  transactionAccountList: [],

  /**交易账户状态下拉框列表*/
  transactionStatusList: [],

  /**点击表格单行的保存的行信息*/

  transactioned: {},
  /**债券模糊查询条件*/
  queryTransactionElement: {
    ...page,
    checkStatus: '', // "审核状态（1：待审核，2:已审核）",
    accountStatus: '', //"账户状态 2：停用，1：启用，3：注销"
    tradeAccountSn: '', //交易账户
    relatedSubjectCodes: [] //机构
  }
};
