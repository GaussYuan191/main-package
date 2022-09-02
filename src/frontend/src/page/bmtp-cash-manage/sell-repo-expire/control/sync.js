import { page } from 'yss-biz/utils/util/constant';
export default {
  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },
  /**模糊查询*/
  changeQueryElementNumberList(state, { value, type }) {
    return state.setIn(['queryElement', type], value);
  },
  // 重置功能
  toReasetSearch(state,queryElement) {
    return state.merge({
      queryElement: {
        // createTime: moment().format('YYYY-MM-DD'),
        ...page,
        ...queryElement
      }
    });
  }
};
