import { page } from 'yss-biz';
import moment from 'moment';

export default {
  // 日初List
  dataList: { list: [], total: 0 },

  // 选种行指令
  rowed: {},

  // 日志默认显示区域
  activeA: '1', //状态码 1：日志执行中
  activeB: '2', //状态码 2：日志执行成功
  activeC: '3', //状态码 3：日志执行失败
  activeD: '4', //状态码 4：日志执行警告
  active: 'activeA',
  // 清分列表
  qfTable: [],

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  },

  // 执行计划修改弹窗
  isOpenBondFormModal: {
    type: 'add',
    status: false
  },
  // 日志数量刷新
  dailyNum: {},

  /**查询条件列表*/
  queryElement: {
    jobType: '1',
    ...page
  },

  // 当前系统交易日的时间
  currentTradeDate: ''
};
