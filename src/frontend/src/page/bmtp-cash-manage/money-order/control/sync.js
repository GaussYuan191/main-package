import { page } from 'yss-biz/utils/util/constant';
export default {
  /**展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status
      }
    });
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  /*修改查询元素*/
  changeQueryElement(state, { element, value }) {
    return state.setIn(['queryElement', element], value);
  },

  /*重置*/
  toResetSearch(state,queryElement) {
    return state.merge({
      queryElement: {
        ...page,
        ...queryElement
      }
    });
  }
};
