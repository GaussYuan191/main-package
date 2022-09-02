import { restQueryElement } from 'yss-biz';
export default {
  /**账户-是否展示弹框*/
  openFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status,
        sign
      }
    });
  },

  /**选择一条表格账户记录进行保存*/
  changeTableRow(state, { type, value }) {
    return state.set(type, value);
  },

  /**账户-修改查询****/
  changeQueryElement(state, { type, element, value }) {
    return state.setIn([type, element], value);
  },
  /**重置搜索**/
  resetElement(state, type) {
    let s = restQueryElement(state.get(type).toJS());
    if (type == 'queryCapitalElement') {
      return state.merge({ queryCapitalElement: s });
    } else {
      return state.merge({ queryBandElement: s });
    }
  },

  /**账户-获取账户树性结构code*/
  getAccountCodes(state, { value }) {
    return state.set('accountCodes', value);
  },

  /**切换面板获取选中的key值*/
  changeActiveAccountKey(state, { value }) {
    return state.set('activeAccountKey', value);
  },

  /**点击树进行节点保存*/
  changeTreeRow(state, { params }) {
    return state.set('treeItemed', params);
  }
};
