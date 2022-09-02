/**
 *
 */

export default {
  /**修改查询条件 */
  changeQueryParam(state, params, { getState }) {
    state = getState();
    const queryParam = state.get('queryParam').toJS
      ? state.get('queryParam').toJS()
      : state.get('queryParam');
    return state.merge({
      queryParam: { ...queryParam, ...params }
    });
  },

  /**变更授权对话框状态 */
  changeModalInfo(state, params, { getState }) {
    state = getState();
    const modalInfo = state.get('modalInfo').toJS
      ? state.get('modalInfo').toJS()
      : state.get('modalInfo');
    return state.set('modalInfo', { ...modalInfo, ...params });
  },

  /**修改激活的机构 */
  changeActiveOrgCode(state, params, { getState }) {
    return state.set('activeOrgCode', params);
  },

  /**清除授权临时数据 */
  clearAuthTempData(state) {
    return state
      .set('roleTreeData', [])
      .set('roleTreeDataAllKeys', [])
      .set('mutexRoleCodeList', []);
  }
};
