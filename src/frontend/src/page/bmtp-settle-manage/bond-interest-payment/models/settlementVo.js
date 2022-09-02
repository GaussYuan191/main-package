/***结算费用Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***结算费用列表** */
  settlementList: {
    list: [],
    total: 0
  },
  // allBondList: [],
  settlementColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '债券账户',
      dataIndex: 'bondAccount',
      width: 150
    },
    {
      title: '债券账户名称',
      dataIndex: 'bondAccountName',
      width: 150
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      width: 150
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      width: 150
    },
    {
      title: '付息兑付日期',
      dataIndex: 'tradeDate',
      width: 150
    },

    {
      title: '付息兑付种类',
      width: 150,
      dataIndex: 'bondPaymentCategoryName'
    },
    {
      title: '利息到账状态',
      width: 150,
      dataIndex: 'intreReachStatusName'
    },

    // {
    //   title: '划款指令状态',
    //   width: 150,
    //   dataIndex: 'transComStatusName'
    // },

    {
      title: '持仓余额(万元)',
      width: 150,
      dataIndex: 'proCarryBal'
    },

    {
      title: '实际划付利息(元)',
      width: 200,
      dataIndex: 'realInterVal'
    },
    {
      title: '融入券应付利息(元)',
      dataIndex: 'meltInBondInterest',
      width: 200
    },
    {
      title: '实际划付本金(元)',
      width: 200,
      dataIndex: 'realCaptialVal'
    },

    {
      title: '实际划付本息合计(元)',
      dataIndex: 'realCapinterTotal',
      width: 200
    },
    {
      title: '暂不划付利息(元)',
      width: 200,
      dataIndex: 'tempInterVal'
    },
    {
      title: '暂不划付本金(元)',
      dataIndex: 'tempCaptialVal',
      width: 200
    },
    {
      title: '暂不划付本息合计(元)',
      dataIndex: 'tempCapinterTotal',
      width: 200
    },
    {
      title: '手续费(元)',
      dataIndex: 'fee',
      width: 150
    },
    {
      title: '票面利率（%）',
      dataIndex: 'bondCouponRate',
      width: 150
    },
    {
      title: '本期执行利率',
      dataIndex: 'bondExeRate',
      width: 150
    },
    {
      title: '资金支付日',
      dataIndex: 'captiPaymentDate',
      width: 150
    },
    {
      title: '本期计息起息日',
      dataIndex: 'curinterStaDate',
      width: 150
    },
    {
      title: '本期计息结息日',
      dataIndex: 'curinterEndDate',
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
      title: '确认人',
      dataIndex: 'auditUserName',
      width: 150
    },
    {
      title: '确认时间',
      dataIndex: 'auditTime',
      width: 200
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 200
    },
    {
      title: '审核状态',
      width: 150,
      dataIndex: 'checkStatusName'
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

  /* 选择A区查看B区行信息 */
  selectRow: {},

  /**查询条件列表*/
  queryElement: {
    ...page
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },

  // 债券数据
  bondList: [],
  bondRelation: {},

  // 债券账号数据
  bondAccoutList: [],
  bondAccoutRelation: {},

  boldBalanceNum: '', //持仓余额
  faceRate: '', //票面利率

  // 确认拆分
  isAffirmSplit: false
};
