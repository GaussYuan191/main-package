import { filterNullElement } from 'yss-biz';
export default {
  /* 设置表单搜索参数 */
  setForexSettingQueryForm(state, values) {
    let query = state.get('forexSettingQueryForm').toJS();
    return state.merge({
      forexSettingQueryForm: filterNullElement({ ...query, ...values })
    });
  },
  /* 设置表格搜索参数 */
  setPageQueryParam(state, page) {
    const { reqPageNum, reqPageSize } = page;
    if (!reqPageSize) {
      return state.setIn(['pageReqParm', 'reqPageNum'], reqPageNum);
    } else {
      return state
        .setIn(['pageReqParm', 'reqPageNum'], reqPageNum)
        .setIn(['pageReqParm', 'reqPageSize'], reqPageSize);
    }
  },
  /* 设置选择一行数据 */
  setSelectRow(state, list) {
    return state.setIn(['forexSettingTable', 'modalData'], list);
  },
  /* 重置表单搜索参数 */
  toResetSearch(state) {
    return state.merge({
      expireSettleQueryForm: {}
    });
  }
};
