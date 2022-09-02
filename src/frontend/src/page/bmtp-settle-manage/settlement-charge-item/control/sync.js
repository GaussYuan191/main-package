import { page } from 'yss-biz';
export default {
  /**选择一条记录进行保存*/
  changeTableRow(state, { value }) {
    return state.merge({
      rowed: value
    });
  },
  /**弹框-是否展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status
      }
    });
  },
  /**修改查询元素*/
  changeQueryElement(state, { element, value }) {
    let val = 'expenseEntryElement';
    return state.setIn([val, element], value);
  },
  /**重置*/
  toResetSearch(state, params) {
    return state.merge({
      expenseEntryElement: {
        ...page,
        ...params
      }
    });
  }
};
