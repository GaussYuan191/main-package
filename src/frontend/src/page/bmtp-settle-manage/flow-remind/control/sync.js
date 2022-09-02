import { page } from 'yss-biz/utils/util/constant';
export default {
  changeElementQuery(state, { sing, type, value }) {
    return state.setIn([sing, type], value);
  },
  resetElement(state, { sing, queryElement }) {
    return state.merge({
      [sing]: {
        ...page,
        reqPageNum: queryElement.reqPageNum,
        reqPageSize: queryElement.reqPageSize
      }
    });
  },
  clearDataDetail(state) {
    return state.set('dataDetail', {}).set('flowNodeDetail', []);
  }
};
