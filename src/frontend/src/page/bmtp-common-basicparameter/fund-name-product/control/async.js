import {
  getFunNameToProductPageList,
  checkList,
  unCheckList,
  postFormAdd,
  postFormEdit,
  delList,
  distributionByHand
} from '../services';
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';
export default {
  /* 基金简称同多级产品映射表-详情 */
  async httpGetFunNameToProductPageList(state, params, { getState }) {
    let forexSettingQueryForm = { ...state.get('forexSettingQueryForm').toJS() };
    let param = filterNullElement(forexSettingQueryForm);
    let pageParam = { ...state.get('pageReqParm').toJS() };
    param = { ...param, ...pageParam };
    let result = await getFunNameToProductPageList({ ...param });
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (!data) {
        return;
      }
      let { total = 0, list = [] } = data;
      return state
        .setIn(['forexSettingTable', 'data'], list)
        .setIn(['forexSettingTable', 'dataTotal'], total);
    } else {
      message.error(msg || '加载错误');
    }
  },
  /* 基金简称同多级产品映射表-审核 */
  async httpCheckList(state, ids) {
    try {
      let result = await checkList(ids);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '操作失败');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  /* 基金简称同多级产品映射表-反审核 */
  async httpUnCheckList(state, ids) {
    try {
      let result = await unCheckList(ids);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '操作失败');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  /* 基金简称同多级产品映射表-新增 */
  async httpPostAdd(state, params) {
    try {
      let result = await postFormAdd(params);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  /* 基金简称同多级产品映射表-修改 */
  async httpPostEdit(state, params) {
    try {
      let result = await postFormEdit(params);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  /* 基金简称同多级产品映射表-删除 */
  async httpDel(state, params) {
    try {
      let result = await delList(params);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  /* 基金简称同多级产品映射表-一键清分 */
  async httpDistributionByHand(state, params) {
    try {
      let result = await distributionByHand(params);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  }
};
