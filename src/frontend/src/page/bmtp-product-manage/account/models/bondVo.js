import { page } from 'yss-biz/utils/util/constant';

export default {
  /**债券账户表格列表*/
  bondList: [],
  /**债券托管账户表格列表***/
  bondColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '关联主体代码',
      width: 200,
      dataIndex: 'relatedSubjectCode'
    },

    {
      title: '债券托管账户编号',
      width: 200,
      dataIndex: 'bondTrusteeshipAccountSn'
    },
    {
      title: '账号类型',
      width: 200,
      dataIndex: 'accountTypeName'
    },
    {
      title: '债券托管账户',
      width: 200,
      dataIndex: 'bondTrusteeshipAccount'
    },
    {
      title: '债券托管账户名称',
      dataIndex: 'bondTrusteeshipName',
      width: 150
    },
    // TODO 根据后端要求，翻转使用字符串
    {
      title: '交易市场',
      dataIndex: 'tradeMarket',
      width: 150
    },
    // TODO 根据后端要求，翻转使用字符串
    {
      title: '托管机构',
      dataIndex: 'depositOrgan',
      width: 150
    },
    {
      title: '状态 ',
      dataIndex: 'accountStatusName',
      width: 150
    },
    {
      title: '开户日期',
      dataIndex: 'openingDate',
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
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
      title: '审核状态 ',
      dataIndex: 'checkStatusName',
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
  /**债券托管账列表*/
  bondAccountList: [],

  /**点击表格单行的保存的行信息*/
  bonded: {},
  /**债券模糊查询条件*/
  queryBandElement: {
    ...page,
    checkStatus: '', // "审核状态（0：待审核，1:已审核）",
    accountStatus: '', //"账户状态 0：停用，1：启用，2：注销"
    bondTrusteeshipAccountSn: '', //债券托管账户
    // relatedSubjectCodes: [] //机构
  },

  /**model*****/

  /***弹框status*/
  isOpenBondModal: {
    type: 'add',
    status: false
  },

  /***关联资金账户modal*/
  bondCapitalList: [],

  // 债券账户类型
  bondAccountType: []
};
