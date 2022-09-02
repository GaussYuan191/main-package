/**
 *
 */

export default {
  /**修改状态管理器状态 */
  changeState(state, params, { getState }) {
    state = getState();
    const { key, value } = params;
    return state.set(key, value);
  },
  /**修改查询条件 */
  changeQueryParam(state, params, { getState }) {
    state = getState();
    const queryParam = state.get('queryParam').toJS
      ? state.get('queryParam').toJS()
      : state.get('queryParam');
    return state.merge({
      queryParam: { ...queryParam, ...params }
    });
  }
};
