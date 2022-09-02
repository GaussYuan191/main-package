import { page } from 'yss-biz/utils/util/constant';
export default {
  /**展示弹框*/
  openFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status,
        sign
      }
    });
  },

  /* 切换关联页签 */
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /**选择一条管理人记录进行保存*/
  changeTableRow(state, { value }) {
    return state.merge({
      rowed: value
    });
  },

  /*修改查询元素*/
  changeQueryElement(state, { element, value }) {
    return state.setIn(['queryElement', element], value);
  },

  /*修改B区的分页行为*/
  changeQueryBPage(state, { element, value }) {
    return state.setIn(['queryPage', element], value);
  },

  /*修改B区的详细区域分页行为*/
  changeQueryInfoPage(state, { element, value }) {
    return state.setIn(['queryInfoPage', element], value);
  },

  /**添加手工调整费用**/
  addReadjustingItem(state, { value }) {
    return state.set('readjustingList', value);
  },

  /*重置*/
  toResetSearch(state, params) {
    return state.merge({
      queryElement: {
        ...page,
        ...params
      }
    });
  },

  // 保存parentId,用于查询详细区域
  saveParentId(state, id) {
    return state.setIn(['parentId'], id);
  },

  // 保存settleStatus,用于查询详细区域对相关功能按钮的控制；
  saveParentSettleStatus(state, settleStatus) {
    return state.setIn(['parentSettleStatus'], settleStatus);
  },

  // 保存refProductCode,用于查询详细区域
  saveRefProductCode(state, code) {
    return state.setIn(['refProductCode'], code);
  },

  //  清除aboutList的数据
  cleanAboutList(state) {
    return state.set('aboutList', []).set('aboutTotal', 0);
  }
};
