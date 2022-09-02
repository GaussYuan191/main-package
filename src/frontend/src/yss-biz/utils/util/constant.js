/***form间距属性***/
export const formLayout_fir = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

export const formLayout_second = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 14
  }
};

/***弹框的默认属性***/
export const modalInfo = {
  getContainer: false,
  className: 'modalStyle',
  destroyOnClose: true,
  maskClosable: false,
  okText: '确定',
  cancelText: '取消'
};

/***按钮组常量***/
export const icons = {
  新增: 'plus',
  删除: 'delete',
  编辑: 'edit',
  修改: 'edit',
  下载: 'download',
  上传: 'upload',
  导入: 'import',
  导出: 'export',
  反审核: 'file-sync',
  审核: 'solution',
  打印: 'printer',
  启用: 'play-circle',
  停止: 'stop',
  注销: 'close-circle',
  浏览: 'container',
  撤销: 'reload',
  授权: 'safety-certificate',
  重置密码: 'reload',
  锁定: 'lock',
  解锁: 'unlock',
  刷新: 'syncOutlined',
  停用: 'stop',
  启动: 'poweroff',
  // 注销: 'logout'
  查看: 'search'
};

/***状态 1.启用，1.停用 2，注销***/

export const typeStatue = ['#fff', '#67C23A', '#E6A23C', '#F56C6C'];

/***审核状态 2.未审核.1.已审核 ***/
export const checkStatue = ['#fff', '#67C23A', '#F56C6C'];

/***默认页码***/
export const page = {
  reqPageNum: 1,
  reqPageSize: 20
};

export const commonInfoVo = [
  {
    title: '审核状态',
    width: 200,
    dataIndex: 'checkStatusName',
    ellipsis: true
  },
  {
    title: '审核人',
    dataIndex: 'checkUserName',
    ellipsis: true,
    width: 150
  },
  {
    title: '审核时间',
    dataIndex: 'checkTime',
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
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    width: 150
  },

  {
    title: '修改人',
    dataIndex: 'updateUserName',
    ellipsis: true,
    width: 150
  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    ellipsis: true,
    width: 150
  }
];
export const selectRequest = {
  // 管理人
  consignor: {
    url: '/bmtp-product-manage/consignor/pullDownList',
    option: {
      value: 'code',
      label: 'fullNameCn'
    },
    fullLabel: true,
    method: 'post'
  },
  // 产品
  product: {
    url: '/bmtp-product-manage/product/product/listProductIdCodeAndName',
    option: {
      value: 'productCode',
      label: 'productName'
    },
    fullLabel: true,
    method: 'post'
  },
  // 机构
  institution: {
    url: '/bmtp-product-manage/product/product/getLevelTree',
    method: 'post'
  },
  // 债券
  bond: {
    // url: '/dfbp-info-manage/securityBond/list',
    url: '/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList',
    option: {
      value: 'bondCode',
      // label: ['securityRepVO', 'securityName']
      label: 'securityName'
    },
    fullLabel: true,
    method: 'post'
  },
  // 债券托管账户
  bondAccount: {
    url: '/bmtp-product-manage/account/bondAccount/getBondRefBatch',
    params: [],
    option: {
      value: 'bondTrusteeshipAccountSn',
      label: 'bondTrusteeshipName'
    },
    fullLabel: true,
    method: 'post'
  },
  // 资金账户
  capitalAccount: {
    url: '/bmtp-product-manage/account/assetAccount/getAllAssetAccount',
    option: {
      value: 'assetAccountSn',
      label: 'assetAccountName'
    }
  }
};
export const selectPageRequest = {
  // 管理人
  consignor: {
    url: '/bmtp-product-manage/consignor/pullDownList',
    option: {
      value: 'code',
      label: 'fullNameCn'
    },
    fieldCode: 'code',
    fullLabel: true,
    method: 'post'
  },
  // 产品
  product: {
    url: '/bmtp-product-manage/product/product/listProductIdCodeAndName',
    option: {
      value: 'id',
      label: 'productName'
    },
    fieldCode: 'productCode',
    fullLabel: 'productCode',
    method: 'post'
  },
  // 债券代码
  bond: {
    url: '/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList',
    option: {
      value: 'bondCode',
      label: 'securityName'
    },
    fieldCode: 'bondCode',
    fullLabel: true,
    method: 'post'
  },
  // 成交编号查询-现券买卖
  executionReportBond: {
    url: '/bmtp-settle-manage/execution/executionReportBond/getQueryCondition',
    option: {
      value: 'execCode',
      label: 'execCode'
    },
    fieldCode: 'execCode',
    fullLabel: false,
    method: 'post'
  },
  // 成交编号查询-质押式回购
  executionReportPledge: {
    url: '/bmtp-settle-manage/execution/executionReportPledge/getQueryCondition',
    option: {
      value: 'execCode',
      label: 'execCode'
    },
    fieldCode: 'execCode',
    fullLabel: false,
    method: 'post'
  },
  // 成交编号查询-买断式回购
  executionReportOutright: {
    url: '/bmtp-settle-manage/execution/executionReportOutright/getQueryCondition',
    option: {
      value: 'execCode',
      label: 'execCode'
    },
    fieldCode: 'execCode',
    fullLabel: false,
    method: 'post'
  },
  // 成交编号查询-债券借贷
  executionReportLending: {
    url: '/bmtp-settle-manage/execution/executionReportLending/getQueryCondition',
    option: {
      value: 'execCode',
      label: 'execCode'
    },
    fieldCode: 'execCode',
    fullLabel: false,
    method: 'post'
  },
  // 分销-交易指令编号
  distributTradeInstr: {
    url: '/bmtp-settle-manage/execution/onlineExecutReport/getInsterIds',
    option: {
      value: 'tradeInstrId',
      label: 'tradeInstrId'
    },
    fieldCode: 'tradeInstrId',
    fullLabel: false,
    method: 'post'
  },
  // 债券回售-交易指令编号
  sellbackTradeInstr: {
    url: '/bmtp-settle-manage/sellback/sellback/getTradeInstrIdGroupByReport',
    option: {
      value: 'tradeInstrId',
      label: 'tradeInstrId'
    },
    fieldCode: 'tradeInstrId',
    fullLabel: false,
    method: 'post'
  },
  // 债券托管账户
  bondAccount: {
    url: '/bmtp-product-manage/account/bondAccount/getBondRefBatch',
    params: [],
    option: {
      value: 'bondTrusteeshipAccountSn',
      label: 'bondTrusteeshipName'
    },
    fieldCode: 'bondTrusteeshipAccountSn',
    fullLabel: true,
    method: 'post'
  },
  // 资金账户
  capitalAccount: {
    url: '/bmtp-product-manage/account/assetAccount/getAllAssetAccount',
    option: {
      value: 'assetAccountSn',
      label: 'assetAccountName'
    },
    fieldCode: 'assetAccountSn',
    fullLabel: false,
    method: 'post'
  }
};

//功能权限
export const functionRolue = {
  查询: 'QUERY', //查询
  新增: 'ADD', //新增
  修改: 'UPDATE', //修改
  删除: 'DELETE', // 删除
  审核: 'CHECK', //审核
  反审核: 'UNCHECK', //反审核
  打印: 'PRINT', //打印
  导入: 'IMPORT', //导入
  导出: 'EXPORT', //导出
  审批通过: 'APPROVED', //审批通过
  审批拒绝: 'APPROVED_REJECT', //  审批拒绝
  其他操作: 'OTHER_OPERATION', //其他操作
  // 新增按钮
  批量回款: 'BATCH_RETURNED', //批量回款
  转上市: 'TO_MARKET', //转上市
  重发指令: 'RESEND_ORDER', //重发指令
  撤销指令: 'REVOCATION_ORDER', //撤销指令
  执行指令: 'EXECUTE_ORDER', //执行指令
  开始: 'START', //开始
  发送: 'SEND', //发送
  查看数据: 'LOOK_DATA', //查看数据
  // 生成报表: 'CREATE_FORMS' //生成报表
  结算确认: 'SeTTLE_AFFIRM', //结算确认
  手工匹配: 'MANUAL_MATCH', //手工匹配
  查询结算信息: 'GET_SETTLE_INFO', //查询结算信息
  新增费用: 'ADD_EXPENSE', //新增费用
  费用拆分: 'EXPENSE_SPLIT', //费用拆分
  拆分确认: 'SPLIT_AFFIRM', //拆分确认
  取消确认: 'CANCEL_AFFIRM', // 取消确认
  通知划款: 'INFORM_TRANSFER', //通知划款
  拆分: 'SPLIT', //拆分
  发送账单: 'SEND_BILL', //发送账单
  撤销: 'REVOCATION', //撤销
  读取: 'READ_CHECK' //读取
};
/***时间格式**/

// 'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
// 'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
// 'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
// 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
// 'range-time-picker': [
//   rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
//   rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
// ],
// 'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),

/** 下载模板文件列表 */
export const downloadFileEnum = {
  交易日历: 'trading_calendar',
  人行报送: 'pedestrian_submission',
  数据读取: {
    现券买卖: 'cash_bond',
    质押式回购: 'pledge_buy',
    债券借贷: 'bond_loan',
    买断式回购: 'buying_out_repurchase',
    网上分销: 'online_distribution',
    网下分销: 'offline_distribution',
    现券内转: 'transfer_inner_trade',
    债券回售: 'sell_back',
    持仓核对: 'position_check',
    费用账单明细: 'charge_item'
  }
};

/**根据客户编码屏蔽按钮规则 */
export const customerFilterRule = {
  'user-manage': {
    hf: ['新增', '删除', '注销', '锁定']
  },
  'org-manage': {
    hf: ['新增', '删除', '修改']
  }
};
