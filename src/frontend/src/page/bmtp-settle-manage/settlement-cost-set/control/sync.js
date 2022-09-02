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

  /**选择一条管理人记录进行保存*/
  changeTableRow(state, { value }) {
    return state.merge({
      rowed: value
    });
  },

  /*修改查询元素*/
  changeQueryElement(state, { element, value }) {
    return state.setIn(['queryElement', element], value);
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
