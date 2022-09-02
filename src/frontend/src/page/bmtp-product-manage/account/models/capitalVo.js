import { page } from 'yss-biz/utils/util/constant';

export default {
  /**资金表格列表*/
  capitalList: [],
  /**资金表格列信息*/
  capitalColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '资金账户编号',
      width: 200,
      dataIndex: 'assetAccountSn'
    },
    {
      title: '资金账号',
      dataIndex: 'assetAccount',
      ellipsis: true,
      width: 200
    },
    {
      title: '资金账号名称',
      dataIndex: 'assetAccountName',
      ellipsis: true,
      width: 200
    },
    // {
    //   title: '银行账号',
    //   dataIndex: 'openingBankNumber',
    //   width: 150
    // },
    {
      title: '开户机构',
      dataIndex: 'openingInstitutionName',
      width: 150
    },
    {
      title: '开户行',
      dataIndex: 'openingBankName',
      width: 150
    },
    {
      title: '支付系统行号',
      dataIndex: 'paymentSystemBankNumber',
      width: 200
    },
    {
      title: '账户类型',
      dataIndex: 'accountTypeName',
      width: 150
    },
    {
      title: '账户性质',
      dataIndex: 'accountNatureName',
      width: 150
    },
    {
      title: '币种',
      dataIndex: 'moneyTypeName',
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

  /**资金账号状态下拉框列表*/
  capitalStatusList: [],

  /**点击表格单行的保存的行信息*/
  capitaled: {},

  /**资金模糊查询条件*/
  queryCapitalElement: {
    ...page,
    accountStatus: '', //"账户状态 0：停用，1：启用，2：注销",
    accountType: '', //"账户类型",
    assetAccountSn: '', //"资金账户-编号",
    checkStatus: '' ,// "审核状态（0：待审核，1:已审核）",
    // relatedSubjectCodes: []//机构
  },
  capitaLRelatedSubjectCodes: [],

  /***弹框status*/
  isOpenCapitalModal: {
    type: 'add',
    status: false
  },

  checkCapitalStatus: '1',

  // 资金账户类型
  capitalAccountType: []
};
