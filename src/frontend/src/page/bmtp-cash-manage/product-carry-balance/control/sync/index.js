import { page } from 'yss-biz';
export default {
  //设置模糊查询
  setQueryDatas(state, values) {
    let query = { ...state.get('query').toJS() };
    return state.merge({ query: { ...query, ...values } });
  },
  setTrDatas(state, { row }, { getState }) {
    state = getState();
    return state.set('clickRow', row || {});
  },
  setMassageType(state, type) {
    return state.set('setMessageType', type);
  },
  setFormModal(state, status) {
    return state.merge({
      isOpenFormModal: {
        status
      }
    });
  },
  toResetSearch(state, queryElement) {
    const currentTradeDate = state.get('currentTradeDate');
    return state.merge({
      query: {
        tradeDate: currentTradeDate,
        ...page,
        ...queryElement
      }
    });
  },
  //保存选择的行数据
  setSelectRows(state, rows) {
    // console.log('rows',rows);
    return state.set('rows', rows);
  },

  saveSelectRowsIds(state, params, { getState }) {
    return state.set('selectRowsIds', params);
  },
  setRelatedSubjectCodes(state, { relatedSubjectCodes }) {
    return state.set('relatedSubjectCodes', relatedSubjectCodes);
  },
  // 清空关联信息数据
  clearAboutMessage(state) {
    return state
      .set('moneyForm', {})
      .set('productForm', {})
      .set('bondForm', {})
      .set('consignorForm', {});
  }
};
