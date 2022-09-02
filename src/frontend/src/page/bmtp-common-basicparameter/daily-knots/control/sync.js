import { page } from 'yss-biz/utils/util/constant';
export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  openFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status,
        sign
      }
    });
  },

  changeDetailModal(state, params) {
    return state.set('isOpenDetailModal', params);
  },

  changeAboutActive(state, { value }, { mutations }) {
    return state.set('active', value);
  },

  /*修改查询元素*/
  changeQueryElement(state, { type, value }) {
    let queryElement = state.get(type).toJS();

    return state.merge({
      [type]: { ...queryElement, ...value }
    });
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
