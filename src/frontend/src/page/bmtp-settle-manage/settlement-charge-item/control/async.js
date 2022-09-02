import { filterNullElement } from 'yss-biz';
import { message, modal } from 'antd';
import {
  getPageList,
  checkList,
  unCheckList,
  mergeList,
  relationList,
  getParentRelationList,
  deleteBatch
} from '../services';

export default {
  /**费用条目--查询列表*/
  async httpGetChargeItemPageList(state, params, { getState, mutations }) {
    let expenseEntryElement = { ...state.get('expenseEntryElement').toJS() };
    let param = filterNullElement(expenseEntryElement);
    let result = await getPageList({ ...param });
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (!data?.list?.length) {
        return state
          .setIn(['expenseEntryList', 'list'], [])
          .setIn(['expenseEntryList', 'total'], data.total);
      }
      return state
        .setIn(['expenseEntryList', 'list'], data.list)
        .setIn(['expenseEntryList', 'total'], data.total);
    } else {
      message.error(msg || '加载错误');
    }
  },
  /**费用条目--费用条目合并*/
  async httpMergeList(state, params, { mutations }) {
    try {
      let result = await mergeList(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        modal.error({
          title: '账单合成失败',
          width: 700,
          content: msg,
          className: 'confirModals'
        });
      }
    } catch (e) {
      message.error(e);
    }
  },
  /**费用条目--批量审核*/
  async httpCheckList(state, params, { mutations }) {
    try {
      let result = await checkList(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },
  /**费用条目--批量反审核*/
  async httpUnCheckList(state, params, { mutations }) {
    try {
      let result = await unCheckList(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },
  /**费用条目--查询母数据*/
  async httpGetParentRelationList(state, { params, cb }, { mutations, getState }) {
    try {
      let result = await getParentRelationList(params);
      const { winRspType, data, msg } = result;
      // 获取母数据
      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },
  /**费用条目--关联母数据*/
  async httpRelationList(state, params, { mutations }) {
    try {
      let result = await relationList(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        modal.error({
          title: '关联母数据失败',
          width: 700,
          content: msg,
          className: 'confirModals'
        });
      }
    } catch (e) {
      message.error(e);
    }
  },
  /**费用条目--批量删除数据*/
  async httpDelList(state, params, { mutations }) {
    try {
      let result = await deleteBatch(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  }
};
