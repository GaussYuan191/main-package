import {
  abnormalData,
  abnormalDataSend,
  toLookData,
  receiveData,
  toReceiveLookData
} from '../services/index';
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';

export default {
  /**异常数据列表*******/
  async httpGetList(state, params, { getState, mutations }) {
    try {
      state = getState();
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await abnormalData(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      return state
        .setIn(['dataList', 'list'], data.list)
        .setIn(['dataList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 异常数据发送
  async httpSendData(state, { ids }, { mutations }) {
    let result = await abnormalDataSend(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      if (ids.length > 1) {
        message.success('批量发送成功');
      } else {
        message.success('发送成功');
      }
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 异常数据查看
  async httpLookData(state, { id }, { mutations }) {
    let result = await toLookData(id);
    const { data, msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      // message.success(msg)
      return state.set('lookData', data);
    } else {
      message.error(msg || '数据错误');
    }
  },
  /** 接收消息管理 */
  async httpGetReceiveHandlingList(state, params, { getState, mutations }) {
    try {
      state = getState();
      let queryReceiveElement = {
        ...state.get('queryReceiveElement').toJS(),
        ...params
      };
      let result = await receiveData(filterNullElement(queryReceiveElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      return state
        .setIn(['receiveHandlingDataList', 'list'], data.list)
        .setIn(['receiveHandlingDataList', 'total'], data.total)
        .setIn(['queryReceiveElement', 'reqPageNum'], queryReceiveElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 异常数据查看
  async httpReceiveLookData(state, { id }, { mutations }) {
    let result = await toReceiveLookData(id);
    const { data, msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      return state.set('lookData', data);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
