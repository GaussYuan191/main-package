import {
  dayilyKnotsList,
  dayilyKnotsLogList,
  dayilyKnotsLogNum,
  dayilyKnotsLogDetail,
  dayilyKnotsStart,
  getCurTradeDate
} from '../services/index';
import { message } from 'antd';
// import moment from 'moment';
import { filterNullElement } from 'yss-biz';

export default {
  // 日结列表接口
  async httpDailyKnotsList(state, { params = {} }, { mutations, getState }) {
    //TODO jobType =1 为日初  2 为日终，
    let currentTradeDate = state.get('currentTradeDate');
    let queryElement = {
      ...state.get('queryElement').toJS(),
      ...params,
      jobType: '2',
      tradeDate: currentTradeDate
    };
    let result = await dayilyKnotsList(filterNullElement(queryElement));
    let active = state.get('active');
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    state = await mutations.asyncHttpDailyKnotsLogNum({});
    state = await mutations.asyncHttpDailyKnotsLogList({
      type: active,
      reqPageNum: queryElement.reqPageNum
    });
    data.list.map((item, i) => (item.index = Number(i + 1)));
    return state
      .merge({ dataList: data.list, dataTotal: data.total })
      .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
  },

  // 日结日志列表
  async httpDailyKnotsLogList(state, { type, reqPageNum }, { mutations, getState }) {
    let ValType = type ? type : state.get('active');
    // type 状态 1为执行中 2 执行完完成 3 执行失败 4 执行警告
    let active = state.get(ValType); //active tab切换类型对应查询查询
    let currentTradeDate = state.get('currentTradeDate');
    let queryElement = {
      ...state.get('queryAboutElement').toJS(),
      settleDate: currentTradeDate,
      reqPageNum: reqPageNum ? reqPageNum : state.get('queryAboutElement').toJS().reqPageNum,
      jobType: '2',
      status: active
    };

    let result = await dayilyKnotsLogList(filterNullElement(queryElement));
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    // 解决标签值与日志实际条数不同的问题
    let dailyNum = state.get('dailyNum');
    dailyNum = dailyNum.toJS ? dailyNum.toJS() : dailyNum;
    let keys = {
      1: 'execCount',
      2: 'succCount',
      3: 'failCount',
      4: 'warnCount'
    }; // dailyNum键值与active映射
    dailyNum[keys[active]] = data.total;
    return state
      .setIn(['aboutTable', `list${active}`], data.list)
      .setIn(['aboutTable', `total${active}`], data.total)
      .setIn(['queryAboutElement', 'reqPageNum'], queryElement.reqPageNum)
      .set('dailyNum', dailyNum);
  },

  // 日结日志数量刷新获取
  async httpDailyKnotsLogNum(state, params, { mutations, getState }) {
    let currentTradeDate = state.get('currentTradeDate');
    let result = await dayilyKnotsLogNum({
      settleDate: currentTradeDate,
      jobType: '2'
    });
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    return state.set('dailyNum', data);
  },

  // 日志操作详情接口
  async httpDailyKnotsOptDetail(state, { batchNo, jobId }, { mutations, getState }) {
    // let queryElement = {
    //   ...state.get('queryDetailElement').toJS()
    // };
    let result = await dayilyKnotsLogDetail({ batchNo, jobId, reqPageNum: 1, reqPageSize: 1000 });
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    data.list.map((item, i) => (item.index = Number(i + 1)));
    return state.merge({
      detailList: data.list
    });
  },

  // 开始操作
  async toStartDailyKnots(state, { ids, cb }, { mutations }) {
    let result = await dayilyKnotsStart(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let active = state.get('active');
      state = await mutations.asyncHttpDailyKnotsList({});
      state = await mutations.asyncHttpDailyKnotsLogNum({});
      state = await mutations.asyncHttpDailyKnotsLogList({ type: active });
    } else {
      message.error(msg);
    }
  },

  // 终止操作
  async toStopDailyKnots(state, { ids, cb }, { mutations }) {
    let result = {};
    // await abnormalDataSend({ ids: ids.join(',') })
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      // mutations.asyncHttpDailyKnotsLogNum({})
    } else {
      message.error(msg);
    }
  },

  async start(state, { params }, { getState }) {
    if (!params.length) {
      message.error('是否要将选中的记录执行【开始】操作？');
      return;
    }
    let ids = [];
    let isNoCheck = true;
    params.forEach(item => {
      if (item.status === '1') {
        isNoCheck = false;
        return;
      } else {
        ids.push(item.id);
      }
    });
    if (isNoCheck) {
      //前端局部刷新页面
      message.success('启动成功');

      state.set('isStartDeal', true);

      let newState = state.get('dataList');
      ids.forEach(rowId => {
        state.get('dataList').forEach((element, index) => {
          if (element.get('id') == rowId) {
            let newRow = state.get('dataList').get(index).set('status', '1');
            newState = newState.splice(index, 1, newRow);
          }
        });
      });
      return state.merge({
        dataList: newState
      });
    } else {
      message.error('选择项存在开始项目');
    }
  },

  async stop(state, { params }, { getState }) {
    if (!params.length) {
      message.error('是否要将选中的记录执行【结束】操作？');
      return;
    }
    let ids = [];
    let isNoCheck = true;
    params.forEach(item => {
      if (item.status === '2') {
        isNoCheck = false;
        return;
      } else {
        ids.push(item.id);
      }
    });
    if (isNoCheck) {
      //前端局部刷新页面
      message.success('终止成功');

      state.set('isStartDeal', false);

      let newState = state.get('dataList');
      ids.forEach(rowId => {
        state.get('dataList').forEach((element, index) => {
          if (element.get('id') == rowId) {
            let newRow = state.get('dataList').get(index).set('status', '2');
            newState = newState.splice(index, 1, newRow);
          }
        });
      });
      return state.merge({
        dataList: newState
      });
    } else {
      message.error('选择项存在停止项目');
    }
  },

  async httpGetCurTradeDate(state) {
    const result = await getCurTradeDate();
    const { winRspType, data, msg } = result;
    if (winRspType === 'SUCC') {
      const { currentTradeDate } = data;
      return state.setIn(['currentTradeDate'], currentTradeDate);
    } else {
      message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
      return state.setIn(['currentTradeDate'], '');
    }
  }
};
