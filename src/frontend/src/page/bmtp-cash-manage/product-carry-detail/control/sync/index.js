import { page } from 'yss-biz';
export default {
  openFormModal: (state, { sign, title }, { getState }) => {
    state = getState();
    return state.merge({
      isOpenFormModal: {
        sign,
        title
      }
    });
  },
  changeQueryDatas(state, values, { getState }) {
    state = getState();
    let queryDatas = state.get('queryDatas').toJS();
    return state.merge({
      queryDatas: { ...queryDatas, ...values }
    });
  },
  setPages(state, page, { getState }) {
    state = getState();
    return state.merge({
      page
    });
  },
  setTrDatas(state, { type = 'click', row }, { getState }) {
    state = getState();
    // debugger
    return state.merge({
      [type === 'click' ? 'clickRow' : 'selectRows']: row || {}
    });
  },

  toSetTotal(state, { total }) {
    try {
      return state.set('listTotal', total);
    } catch (error) {
      console.error(error);
    }
  },

  // 清空弹框债券账号信息
  toEmptybond(state) {
    return state.set('bondAccount', {});
  },

  // 重置
  toResetSearch(state, queryElement) {
    return state.merge({
      queryDatas: {
        ...page,
        ...queryElement
      }
    });
  },
  setModalDetail(state, modalMessage) {
    return state.set('modalMessage', modalMessage);
  }
};
