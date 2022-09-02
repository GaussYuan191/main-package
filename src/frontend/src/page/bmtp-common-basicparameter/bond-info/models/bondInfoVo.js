import { page } from 'yss-biz';
export default {
  // 选中行
  rowChecked: [],
  //是否打开Modal
  isOpenFormModal: {},

  // 分页
  paging: { ...page },
  // 修改表格参数值信息后回调的状态值
  callbackForTableChange: {},

  modalMessage: {},

  // 模糊查询信息集合
  bondQueryValues: {},
  bondTable: {
    columns: [
      {
        title: '证券内码',
        dataIndex: 'securityCode',
        key: 'securityCode',
        width: 100,
        //fixed: 'left',
        ellipsis: true
      },
      {
        title: '债券名称',
        dataIndex: 'securityName',
        key: 'securityName',
        width: 100,
        //fixed: 'left',
        ellipsis: true
      },
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 100,
        ellipsis: true
      },
      {
        title: 'ISIN代码',
        dataIndex: 'isinCode',
        key: 'isinCode',
        width: 100,
        ellipsis: true
      },
      {
        title: '债券类型',
        dataIndex: 'securitySubtypeName',
        key: 'securitySubtypeName',
        width: 140,
        ellipsis: true
      },
      {
        title: '交易市场',
        dataIndex: 'marketName',
        key: 'marketName',
        width: 200,
        ellipsis: true
      },
      {
        title: '债券币种',
        dataIndex: 'transCurrencyName',
        key: 'transCurrencyName',
        width: 100,
        ellipsis: true
      },
      {
        title: '每手数量',
        dataIndex: 'boardDecimal',
        key: 'boardDecimal',
        width: 100,
        ellipsis: true
      },
      {
        title: '报价因子',
        dataIndex: 'offerFactor',
        key: 'offerFactor',
        width: 100,
        ellipsis: true
      },
      {
        title: '债券面值',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 100,
        ellipsis: true
      },
      {
        title: '发行价格(元)',
        dataIndex: 'issuePrice',
        key: 'issuePrice',
        width: 100,
        ellipsis: true
      },
      {
        title: '票面利率',
        dataIndex: 'couponRate',
        key: 'couponRate',
        width: 100,
        ellipsis: true
      },
      {
        title: '息票类型',
        dataIndex: 'couponRateTypeName',
        key: 'couponRateTypeName',
        width: 100,
        ellipsis: true
      },
      {
        title: '计息标准',
        dataIndex: 'dayCountName',
        key: 'dayCountName',
        width: 100,
        ellipsis: true
      },
      {
        title: '付息频率',
        dataIndex: 'couponPaymentFrequencyName',
        key: 'couponPaymentFrequencyName',
        width: 100,
        ellipsis: true
      },
      {
        title: '债券起息日',
        dataIndex: 'valueDate',
        key: 'valueDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '债券截息日',
        dataIndex: 'expiryInterestDate',
        key: 'expiryInterestDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '债券发行日',
        dataIndex: 'bondIssueDate',
        key: 'bondIssueDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '债券到期日',
        dataIndex: 'bondDueDate',
        key: 'bondDueDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '托管机构',
        dataIndex: 'clearHouseName',
        key: 'clearHouseName',
        width: 100,
        ellipsis: true
      },
      {
        title: '含权标志',
        dataIndex: 'weightMarkName',
        key: 'weightMarkName',
        width: 100,
        ellipsis: true
      },
      {
        title: '行权日',
        dataIndex: 'exerciseDate',
        key: 'exerciseDate',
        width: 120,
        ellipsis: true
      },
      {
        title: '正股代码',
        dataIndex: 'relateUnderlySecurity',
        key: 'relateUnderlySecurity',
        width: 120,
        ellipsis: true
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 100,
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 180,
        ellipsis: true
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatusName',
        key: 'auditStatusName',
        width: 100,
        fixed: 'right',
        ellipsis: true
      }
    ],
    dataSource: [],
    total: 0
  },
  ZQlist: []
};
