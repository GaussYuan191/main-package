import { page } from 'yss-biz';

export default {
  /**List*/
  /**费用条目列表*/
  expenseEntryList: {
    list: [],
    total: 0
  },
  /**费用条目头部信息*/
  expenseEntryColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '费用项目',
      dataIndex: 'expenseItemName',
      ellipsis: true,
      width: 150
    },
    {
      title: '业务品种',
      dataIndex: 'businessTypeName',
      ellipsis: true,
      width: 150
    },
    {
      title: '收费项编号',
      dataIndex: 'chargeForItemNumber',
      ellipsis: true,
      width: 150
    },
    {
      title: '业务流水号',
      dataIndex: 'businessSerialNumber',
      ellipsis: true,
      width: 150
    },
    {
      title: '关联费用编号',
      dataIndex: 'parentId',
      ellipsis: true,
      width: 180
    },
    {
      title: '业务大类',
      dataIndex: 'businessCategoryName',
      ellipsis: true,
      width: 150
    },
    {
      title: '审核状态',
      dataIndex: 'checkStatusName',
      ellipsis: true,
      width: 150
    },
    {
      title: '持有人账号',
      dataIndex: 'holderAccount',
      ellipsis: true,
      width: 150
    },
    {
      title: '持有人简称',
      dataIndex: 'holderShortName',
      ellipsis: true,
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: 180
    },
    {
      title: '发生日期',
      dataIndex: 'startTime',
      ellipsis: true,
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      ellipsis: true,
      width: 180
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      ellipsis: true,
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      ellipsis: true,
      width: 180
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      ellipsis: true,
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      ellipsis: true,
      width: 150
    },
    {
      title: '数据来源',
      dataIndex: 'dataSourceName',
      ellipsis: true,
      width: 150
    },
    {
      title: '外币币种',
      dataIndex: 'foreignCurrency',
      ellipsis: true,
      width: 150
    },
    {
      title: '标准费用(外币)',
      dataIndex: 'standardAmountOther',
      ellipsis: true,
      width: 150
    },
    {
      title: '代理持有人账号',
      dataIndex: 'agencyHolderAccount',
      ellipsis: true,
      width: 150
    },
    {
      title: '代理持有人简称',
      dataIndex: 'agencyHolderName',
      ellipsis: true,
      width: 150
    }
  ],

  /**列表业务查询*/
  expenseEntryElement: {
    ...page
  },
  /**弹框status*/
  isOpenFormModal: {
    type: '',
    status: false
  },
  /**选择的当前行*/
  rowed: {}
};
