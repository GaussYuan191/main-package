/**关联*/
import { page } from 'yss-biz/utils/util/constant';
export default {
  aboutColumn: [
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
      title: '所属管理人',
      dataIndex: 'refManagerName',
      width: 200
    },
    {
      title: '所属产品',
      dataIndex: 'refProductName',
      width: 200
    },
    // {
    //   title: '统计费用(元)',
    //   dataIndex: 'statistChargeAmount',
    //   width: 150
    // },
    {
      title: '费用拆分金额(元)',
      dataIndex: 'splitChargeAmount',
      width: 150
    },
    {
      title: '调整后金额(元)',
      dataIndex: 'adjustChargeAmount',
      width: 150
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    }
  ],

  aboutList: [],

  aboutTotal: 0,

  /**详情**/
  aboutInfoColumn: [
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
      title: '所属管理人',
      dataIndex: 'refManagerName',
      width: 200
    },
    {
      title: '所属产品',
      dataIndex: 'refProductName',
      width: 200
    },
    // {
    //   title: '资产单元',
    //   dataIndex: 'assetUnitCode',
    //   width: 150
    // },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      width: 150
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      width: 150
    },
    {
      title: '交易方向',
      dataIndex: 'entrustSideName',
      width: 150
    },
    {
      title: '结算费用(元)',
      dataIndex: 'splitChargeAmount',
      width: 150
    },
    {
      title: '交割日期',
      dataIndex: 'settleDate',
      width: 150
    },
    {
      title: '结算指令编号/成交编号',
      dataIndex: 'instrId',
      width: 200
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      width: 200
    }
  ],

  /* 费用条目明细 */
  chargeItemList: {
    list: [],
    total: 0
  },

  /* 关联信息-费用条目表头 */
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

  // 选择行的信息
  rowed: {},

  aboutInfoList: [],

  readjustingColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },

    {
      title: '所属管理人',
      dataIndex: 'refManagerName',
      width: 150
    },
    {
      title: '所属产品',
      dataIndex: 'refProductName',
      width: 150
    }
  ],

  readjustingList: [],

  queryPage: {
    ...page
  },

  aboutInfoTotal: '0',

  queryInfoPage: {
    ...page
  },
  refProductCode: '',
  splitChargeAmount: 0, // 拆分金额合计
  adjustChargeAmount: 0 // 调整金额合计
};
