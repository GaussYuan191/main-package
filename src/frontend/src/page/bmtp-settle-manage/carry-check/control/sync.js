import { page } from 'yss-biz';
export default {
  /**选择一条表格账户记录进行保存*/
  changeTableRow(state, { type, value }) {
    return state.set(type, value);
  },

  /**修改查询*/
  changeQueryElement(state, { type, value }) {
    return state.setIn(['queryElement', type], value);
  },

  /*重置*/
  toResetSearch(state, params) {
    return state.merge({
      queryElement: {
        ...page,
        ...params
      }
    });
  }
};
