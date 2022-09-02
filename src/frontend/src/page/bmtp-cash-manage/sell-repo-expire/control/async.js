/*********公共***********/
import { getAtureBusinessList, getInfo, getZLQF } from '../services/index';

import { filterNullElement } from 'yss-biz';

import { message } from 'antd';

export default {
  /*获取正回购List**/

  async httpGetAtureBusinessList(state, { params }, { mutations }) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getAtureBusinessList(filterNullElement(queryElement));
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        /**正回购列表为空**/

        if (data.list.length > 0) {
          state = await mutations.asyncHttpGetInfo(data.list[0]);
        }

        return state
          .setIn(['businessList', 'list'], data.list || [])
          .setIn(['businessList', 'total'], data.total || 0);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  // 正回购到期划款指令详情
  async httpGetInfo(state, { id }) {
    if (!id) {
      return;
    }

    let result = await getInfo(id);
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      return state.set('businessInfo', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 查询子表格数据(指令清分)
  async httpQueryZLQf(state, { params, cb }, { mutations }) {
    let result = await getZLQF(filterNullElement(params));
    const { winRspType, data, msg } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
    } else {
      typeof cb === 'function' && cb(data);
    }
  }
};
