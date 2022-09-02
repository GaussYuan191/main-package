import { page } from 'yss-biz';
export default {
  paramChange(state, param, { getState }) {
    const { value, stateNames } = param;
    state = getState();
    return state.setIn(stateNames, value);
  },
  setPages(state, param, { getState }) {
    state = getState();
    return state.set('paging', param);
  },
  //表格行勾选
  setRowChecked(state, param, { getState }) {
    state = getState();
    return state.set('rowChecked', param);
  },

  //是否打开Modal
  openFormModal: (state, { sign, title }, { getState }) => {
    state = getState();
    return state.merge({
      isOpenFormModal: {
        sign,
        title
      }
    });
  },
  // 重置
  toResetSearch(state) {
    return state.merge({
      bondQueryValues: {
        ...page
      }
    });
  }
};
