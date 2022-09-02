import { page } from 'yss-biz/utils/util/constant';

export default {
  /**List*/
  /**正回购到期业务列表*/
  businessList: {
    list: [],
    total: 0
  },
  /**正回购列信息*/

  businessCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    // {
    //   title: '产品名称',
    //   dataIndex: 'productName',
    //   key: 'productName',
    //   width: 140,
    //   ellipsis: true
    // },
    {
      title: '源成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 140,
      ellipsis: true
    },
    {
      title: '首期结算日期',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 140,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'firstInstructId',
      key: 'firstInstructId',
      width: 200,
      ellipsis: true
    },
    {
      title: '首次结算金额(元)',
      dataIndex: 'firstSettleAmount',
      key: 'firstSettleAmount',
      width: 140,
      ellipsis: true
    },
    {
      title: '到期结算日期',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 140,
      ellipsis: true
    },
    {
      title: '全额结算指令编号',
      dataIndex: 'secondInstructId',
      key: 'secondInstructId',
      width: 200,
      ellipsis: true
    },
    {
      title: '到期结算金额(元)',
      dataIndex: 'secondSettleAmount',
      key: 'secondSettleAmount',
      width: 140,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'secondSettleTypeName',
      key: 'secondSettleTypeName',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '到期合同状态',
      dataIndex: 'secondContractStatusName',
      key: 'secondContractStatusName',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '对手方债券账号',
      dataIndex: 'counterBondAccount',
      key: 'counterBondAccount',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '对手方名称',
      dataIndex: 'counterName',
      key: 'counterName',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '管理人',
      dataIndex: 'consignorName',
      key: 'consignorName',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '本方债券账号',
      dataIndex: 'ownBondAccount',
      key: 'ownBondAccount',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '本方账户名称',
      dataIndex: 'ownBondAccountName',
      key: 'ownBondAccountName',
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '结算机构',
      dataIndex: 'settleInstitutionName',
      key: 'settleInstitutionName',
      width: 140,
      ellipsis: true
    }
  ],

  /*点击行进行保存*/
  rowed: {},

  /*划款指令详情*/
  businessInfo: {},
  /*正回购到期业务查询*/
  queryElement: {
    ...page,
    consignorCode: '', //管理人code
    productCode: '', //产品code
    settleInstitution: '', //结算机构
    firstInstructId: '', //合同编号,
    firstSettleDate: '' //查询日期（首次结算日期）
  }
};
