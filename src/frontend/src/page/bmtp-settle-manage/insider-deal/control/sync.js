import { page } from 'yss-biz/utils/util/constant';
export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  changeTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  //表格行勾选
  setRowChecked(state, param, { getState }) {
    state = getState();
    return state.set('rowChecked', param);
  },

  /*修改查询元素*/
  changeQueryElement(state, values, { getState }) {
    let queryElement = state.get('queryElement').toJS();
    return state.merge({
      queryElement: { ...queryElement, ...values }
    });
  },

  // 重置功能
  toResetSearch(state, params,{getState}) {
    let settleDate=getState().get('currentTradeDate')
    return state.merge({
      queryElement: {
        ...page,
        ...params,
        settleDate
      }
    });
  }
};
