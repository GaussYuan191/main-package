// import { page } from 'yss-biz';
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
  setRowChecked(state, param, { getState }) {
    state = getState();
    return state.set('rowChecked', param);
  },
  toResetSearch(state) {
    return state.merge({
      // paging: {
      //   ...page
      // },
      systemParamQueryValues: {
        businessType: '',
        businessTypeDetail: '',
        parameterName: '',
        checkStatus: ''
      }
    });
  }
};
