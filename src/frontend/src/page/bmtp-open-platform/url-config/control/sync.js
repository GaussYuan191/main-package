import { page } from 'yss-biz/utils/util/constant';
import moment from 'moment';

export default {
  changeElementQuery(state, { sing, value, type }) {
    return state.setIn([sing, type], value);
  },
  // 重置
  toResetSearch(state) {
    return state.merge({
      queryElement: {
        ...page
      }
    });
  }
};
