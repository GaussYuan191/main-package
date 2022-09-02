import { page } from 'yss-biz/utils/util/constant';
export default {
  changeElementQuery(state, { sing, value, type }) {
    return state.setIn([sing, type], value);
  },
  resetElement(state, { sing, query }) {
    return state.merge({
      [sing]: {
        ...page,
        ...query
      }
    });
  }
};
