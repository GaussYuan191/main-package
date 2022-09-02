/***结算费用Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***结算费用列表** */
  settlementList: [],

  settlementTotal: '0',

  settlementColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '费用编号',
      dataIndex: 'id',
      width: 200
    },
    {
      title: '结算机构',
      dataIndex: 'settleInstitutionName',
      width: 120
    },
    {
      title: '费用类型',
      dataIndex: 'chargeTypeName',
      width: 150
    },
    // {
    //   title: '本期应缴费金额(元)',
    //   dataIndex: 'currentPayableAmount',
    //   width: 200
    // },
    // {
    //   title: '往期未缴费金额(元)',
    //   dataIndex: 'previousUnpaidAmount',
    //   width: 200
    // },
    // {
    //   title: '应缴费金额合计(元)',
    //   dataIndex: 'payableTotalAmount',
    //   width: 200
    // },
    {
      title: '应缴费金额(元)',
      dataIndex: 'currentPayableAmount',
      width: 150
    },
    {
      title: '已缴费金额(元)',
      dataIndex: 'paidFeeAmount',
      width: 150
    },
    {
      title: '未缴费金额(元)',
      dataIndex: 'previousUnpaidAmount',
      width: 150
    },
    {
      title: '缴费金额(元)',
      dataIndex: 'payableTotalAmount',
      width: 150
    },
    {
      title: '审核状态',
      width: 120,
      dataIndex: 'checkStatusName'
    },
    {
      title: '费用结算状态',
      width: 200,
      dataIndex: 'settleStatusName'
    },

    {
      title: '费用计提开始日',
      width: 200,
      dataIndex: 'expenseStartDate'
    },

    {
      title: '费用计提截止日',
      width: 200,
      dataIndex: 'expenseEndDate'
    },

    {
      title: '费用缴纳开始日',
      width: 200,
      dataIndex: 'chargeStartDate'
    },

    {
      title: '费用缴纳截止日',
      width: 200,
      dataIndex: 'chargeEndDate'
    },

    {
      title: '收款人名称',
      width: 200,
      dataIndex: 'beneficiaryName'
    },

    {
      title: '收款人账号',
      width: 200,
      dataIndex: 'beneficiaryAccount'
    },

    {
      title: '收款人开户行名称',
      width: 200,
      dataIndex: 'beneficiaryBankName'
    },

    {
      title: '收款人开户行行号',
      dataIndex: 'beneficiaryBankCode',
      width: 200
    },

    {
      title: '附言',
      width: 200,
      dataIndex: 'remark'
    },
    {
      title: '缴费通知编号',
      width: 200,
      dataIndex: 'paymentNotice'
    },
    {
      title: '所属管理人',
      width: 200,
      dataIndex: 'managerName'
    },
    {
      title: '所属产品',
      dataIndex: 'productName',
      width: 250
    },
    {
      title: '确认人',
      dataIndex: 'auditUserName',
      width: 150
    },
    {
      title: '确认时间',
      dataIndex: 'auditTime',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 200
    }
  ],

  /**保存选择结算费用的行信息*/
  rowed: {},

  /**查询条件列表*/
  queryElement: {
    settleInstitution: '',
    chargeType: '',
    settleStatus: '',
    productCode: '',
    expenseStartDate: '',
    expenseEndDate: '',
    chargeStartDate: '',
    chargeEndDate: '',
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },

  parentId: '',

  parentSettleStatus: ''
};
