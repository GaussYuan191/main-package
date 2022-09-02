import {
  dayilyFirstList,
  dayilyFirstStart,
  dayilyFirstLogList,
  dayilyFirstLogNum,
  dayilyFirstLogDetail,
  getCurTradeDate,
  changePlan,
  startPlan,
  stopPlan
} from '../services/index';
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';

export default {
  // 日结列表接口
  async httpDailyFirstList(state, { params = {} }, { mutations, getState }) {
    //TODO jobType =1 为日初  2 为日终，
    // let currentTradeDate = state.get('currentTradeDate');
    let queryElement = {
      // tradeDate: currentTradeDate,
      ...state.get('queryElement').toJS()
    };
    let result = await dayilyFirstList(filterNullElement(queryElement));
    let active = state.get('active');
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    state = await mutations.asyncHttpDailyFirstLogList({ type: active });
    state = await mutations.asyncHttpDailyFirstLogNum({});
    data.list.map((item, i) => (item.index = Number(i + 1)));
    return state.merge({
      dataList: { list: data.list, total: data.total }
    });
  },
  // 日结日志列表
  async httpDailyFirstLogList(state, { type }, { mutations, getState }) {
    let ValType = type ? type : state.get('active');
    // type 状态 1为执行中 2 执行完完成 3 执行失败 4 执行警告
    let active = state.get(ValType); //active tab切换类型对应查询查询
    let currentTradeDate = state.get('currentTradeDate');
    let query = state.get('queryElement').toJS();
    // let row = state.get('rowed');
    let queryElement = {
      ...state.get('queryAboutElement').toJS(),
      settleDate: query.tradeDate ? query.tradeDate : currentTradeDate,
      status: active,
      jobType: '1'
      // jobId: row.id || ''
    };

    let result = await dayilyFirstLogList(filterNullElement(queryElement));
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    return state
      .setIn(['aboutTable', `list${active}`], data.list)
      .setIn(['aboutTable', `total${active}`], data.total);
  },

  // 日结日志数量刷新获取
  async httpDailyFirstLogNum(state, params, { mutations, getState }) {
    let query = state.get('queryElement').toJS();
    let currentTradeDate = state.get('currentTradeDate');
    let result = await dayilyFirstLogNum({
      settleDate: query.tradeDate ? query.tradeDate : currentTradeDate,
      jobType: '1'
    });
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    return state.set('dailyNum', data);
  },

  // 开始操作
  async toStartDailyFirst(state, { id, tradeDate, cb }, { mutations }) {
    let result = await dayilyFirstStart({ id, tradeDate, jobType: '1' });
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let active = state.get('active');
      state = await mutations.asyncHttpDailyFirstList({});
      state = await mutations.asyncHttpDailyFirstLogNum({});
      state = await mutations.asyncHttpDailyFirstLogList({ type: active });
    } else {
      message.error(msg);
    }
  },
  // 获取当前系统交易日期；
  async httpGetCurTradeDate(state) {
    const result = await getCurTradeDate();
    const { winRspType, data, msg } = result;
    if (winRspType === 'SUCC') {
      const { currentTradeDate } = data;
      return state
        .setIn(['currentTradeDate'], currentTradeDate)
        .setIn(['queryElement', 'tradeDate'], currentTradeDate);
    } else {
      message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
      return state.setIn(['currentTradeDate'], '');
    }
  },
  // 日志详情列表
  async httpDayilyFirstLogDetail(state, { batchNo, jobId }) {
    const result = await dayilyFirstLogDetail(
      filterNullElement({ batchNo, jobId, reqPageNum: 1, reqPageSize: 1000 })
    );
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg || '数据错误');
      return;
    }
    return state.set('detailList', data.list || []);
  },

  // （旧）开始操作
  // async start(state, { params }, { getState }) {
  //   if (!params.length) {
  //     message.error('是否要将选中的记录执行【开始】操作？');
  //     return;
  //   }
  //   let ids = [];
  //   let isNoCheck = true;
  //   params.forEach(item => {
  //     if (item.status === '1') {
  //       isNoCheck = false;
  //       return;
  //     } else {
  //       ids.push(item.id);
  //     }
  //   });
  //   if (isNoCheck) {
  //     //前端局部刷新页面
  //     message.success('启动成功');
  //     let newState = state.get('dataList');
  //     ids.forEach(rowId => {
  //       state.get('dataList').forEach((element, index) => {
  //         if (element.get('id') == rowId) {
  //           let newRow = state.get('dataList').get(index).set('status', '1');
  //           newState = newState.splice(index, 1, newRow);
  //         }
  //       });
  //     });
  //     return state.merge({
  //       dataList: newState
  //     });
  //   } else {
  //     message.error('选择项存在开始项目');
  //   }
  // },
  // (旧)
  // async stop(state, { params }, { getState }) {
  //   if (!params.length) {
  //     message.error('是否要将选中的记录执行【结束】操作？');
  //     return;
  //   }
  //   let ids = [];
  //   let isNoCheck = true;
  //   params.forEach(item => {
  //     if (item.status === '2') {
  //       isNoCheck = false;
  //       return;
  //     } else {
  //       ids.push(item.id);
  //     }
  //   });
  //   if (isNoCheck) {
  //     //前端局部刷新页面
  //     message.success('停止成功');
  //     let newState = state.get('dataList');
  //     ids.forEach(rowId => {
  //       state.get('dataList').forEach((element, index) => {
  //         if (element.get('id') == rowId) {
  //           let newRow = state.get('dataList').get(index).set('status', '2');
  //           newState = newState.splice(index, 1, newRow);
  //         }
  //       });
  //     });
  //     return state.merge({
  //       dataList: newState
  //     });
  //   } else {
  //     message.error('选择项存在停止项目');
  //   }
  // },
  //修改任务执行计划
  async httpEditPlan(state, params, { mutations, getState }) {
    let result = await changePlan(params);
    const { winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    } else {
      message.success(msg);
    }
    await mutations.asyncHttpDailyFirstList({});
  },

  // 启用任务
  async httpStartPlan(state, params, { mutations }) {
    let result = await startPlan(params);
    const { winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    } else {
      message.success(msg);
    }
    let active = state.get('active');
    state = await mutations.asyncHttpDailyFirstList({});
    state = await mutations.asyncHttpDailyFirstLogNum({});
    state = await mutations.asyncHttpDailyFirstLogList({ type: active });
  },

  //停用任务
  async httpStopPlan(state, params, { mutations }) {
    let result = await stopPlan(params);
    const { winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    } else {
      message.success(msg);
    }
    let active = state.get('active');
    state = await mutations.asyncHttpDailyFirstList({});
    state = await mutations.asyncHttpDailyFirstLogNum({});
    state = await mutations.asyncHttpDailyFirstLogList({ type: active });
  }
};
