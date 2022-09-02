import { filterNullElement } from 'yss-biz';
import { page } from 'yss-biz/utils/util/constant';
export default {
  /*弹框-是否展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status
      }
    });
  },
  setProcessQueryForm(state, values) {
    let params = values;
    let query = state.get('processQueryForm').toJS();
    return state.merge({
      processQueryForm: filterNullElement({ ...query, ...params })
    });
  },

  setPages(state, param, { getState }) {
    state = getState();
    return state.set('paging', param);
  },

  setSelectRow(state, list) {
    return state.setIn(['processTable', 'modalData'], list);
  },
  // 重置
  toResetSearch(state,queryElement) {
    return state.merge({
      processQueryForm: { ...page,...queryElement }
    });
  }
};
