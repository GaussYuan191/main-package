import {
  cachePage,
  del,
  showDetial,
  getCode,
  add,
  update,
  check,
  uncheck
} from '../services/index';
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';

export default {
  // 列表
  async httpCachePage(state, params) {
    let query = state.get('queryElement').toJS();
    const newQuery = {
      ...query,
      ...params
    };
    let result = await cachePage(filterNullElement(newQuery));
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state
        .setIn(['dataList', 'list'], data.list)
        .setIn(['dataList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], newQuery.reqPageNum);
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
  async httpGetCode(state, { id, name }, { mutations }) {
    let result = await getCode(id);
    const { data, winRspType } = result;
    if (winRspType == 'SUCC') {
      const arr = (data || []).map(item => ({
        label: item.dicCode,
        value: item.dicCode,
        title: item.dicExplain
      }));
      return state.setIn(['apiName', name], arr);
    }
  },

  // 新增
  async httpAdd(state, { params, cb }, { mutations }) {
    let result = await add(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({});
      message.success(msg);
      typeof cb === 'function' && cb();
    } else {
      message.error(msg);
    }
  },

  // 修改
  async httpUpdate(state, { params, cb }, { mutations }) {
    let result = await update(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({});
      message.success(msg);
      typeof cb === 'function' && cb();
    } else {
      message.error(msg);
    }
  },

  // 审核
  async httpCheck(state, id, { mutations }) {
    let result = await check(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({});
      message.success(msg);
    } else {
      message.error(msg);
    }
  },

  // 反审核
  async httpUncheck(state, id, { mutations }) {
    let result = await uncheck(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpCachePage({});
      message.success(msg);
    } else {
      message.error(msg);
    }
  }
};
