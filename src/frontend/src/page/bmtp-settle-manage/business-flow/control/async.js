import { filterNullElement } from 'yss-biz';
import { message } from 'antd';
import { getQueryList } from '../serices/index';

export default {
  async httpGetList(state, params, { getState, mutations }) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getQueryList(filterNullElement(queryElement));
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
  }
};
