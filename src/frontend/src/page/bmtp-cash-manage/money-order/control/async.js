import {
  instructionList,
  implementInstruct,
  reissuedInstruct,
  revokeInstruct,
  currentTradingDay,
  queryInstruct,
  axiosSeqNoAbout
} from '../services/index';
import { filterNullElement } from 'yss-biz';
import { message } from 'antd';

export default {
  /**查询列表*******/
  async httpGetList(state, { params }, { getState, mutations }) {
    try {
      state = getState();
      let queryElement = {
        ...state.get('queryElement').toJS()
      };
      let result = await instructionList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      if (data.list && data.list.length > 0) {
        state = await mutations.asyncHttpSeqNoAbout(data.list[0]);
      }
      return state.set('instructionData', data);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 执行指令
  async httpImplementInstruct(state, { ids }, { getState, mutations }) {
    let idss = [];
    ids.map(item => idss.push(item.id));
    let result = await implementInstruct(idss);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // 重发指令
  async httpReissuedInstruct(state, { id }, { getState, mutations }) {
    let result = await reissuedInstruct(id);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // 撤销指令
  async httpRevokeInstruct(state, { id }, { getState, mutations }) {
    let result = await revokeInstruct(id);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // 获取当前交易日
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      state = mutations.changeQueryElement({
        element: 'transferStartDate',
        value: data.currentTradeDate
      });
      state = mutations.changeQueryElement({
        element: 'transferEndDate',
        value: data.currentTradeDate
      });
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 查询清算系统划款指令
  async httpQueryInstruct(state, params) {
    let result = await queryInstruct(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /**根据批次号查询关联信息 */
  async httpSeqNoAbout(state, { batchNo }, { mutations }) {
    if (!batchNo) {
      return state.set('aboutTable', []);
    }
    let result = await axiosSeqNoAbout(batchNo);
    const { data, msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      return state.set('aboutTable', data);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
