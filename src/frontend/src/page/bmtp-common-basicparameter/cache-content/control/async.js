import { cachePage, del, showDetial, getRefreshList, refresh } from '../services/index';
import { message } from 'antd';
// import { page, filterNullElement } from 'yss-biz';

export default {
  // 缓存内容列表查询
  async httpCachePage(state, params) {
    let query = state.get('queryElement').toJS();
    const queryElement = {
      ...query,
      ...params
    };
    let result = await cachePage(queryElement);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state
        .setIn(['dataList', 'list'], data.list)
        .setIn(['dataList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } else {
      message.error(msg);
    }
  },

  // 删除行数据
  async httpDel(state, id, { mutations }) {
    let result = await del(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({});
      message.success(msg);
    } else {
      message.error(msg);
    }
  },

  // 查看详细行数据
  async httpShowDetial(state, id, { mutations }) {
    let result = await showDetial(id);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('rowDetial', data);
    } else {
      message.error(msg);
    }
  },

  // 获取可刷新数据的列表
  async httpGetRefreshList(state, id, { mutations }) {
    let result = await getRefreshList();
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('refreshList', data);
    } else {
      message.error(msg);
    }
  },

  // 获取可刷新数据的列表
  async httpRefresh(state, params, { mutations }) {
    let result = await refresh(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({ reqPageNum: 1 });
      message.success(msg);
    } else {
      message.error(msg);
    }
  }
};
