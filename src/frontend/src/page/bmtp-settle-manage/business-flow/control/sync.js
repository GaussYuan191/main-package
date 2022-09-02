import { page } from 'yss-biz/utils/util/constant';
export default {
  changeElementQuery(state, { sing, value, type }) {
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
  }
};
