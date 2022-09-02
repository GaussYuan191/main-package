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

  /**切换指令查询***/
  changeClearingStatus(state, { value, sing }) {
    return state.setIn([sing, 'clearingStatus'], value);
  },

  /****修改模糊查询***/
  changeElementQuery(state, { sing, value, type }) {
    return state.setIn([sing, type], value);
  },

  /**重置搜索**/
  resetElement(state, { type, query }, { getState }) {
    //cashSaleList
    let s = restQueryElement(state.get(type).toJS());
    if ('queryCashSaleElement' == type) {
      return state.merge({ queryCashSaleElement: { ...s, ...query } });
    } else if ('queryCollateralisedRepoElement' == type) {
      return state.merge({ queryCollateralisedRepoElement: { ...s, ...query } });
    } else if (type == 'queryOutrightRepoElement') {
      return state.merge({ queryOutrightRepoElement: { ...s, ...query } });
    } else if (type == 'queryDistributionElement') {
      return state.merge({ queryDistributionElement: { ...s, ...query } });
    } else if (type == 'queryBondSaleBackElement') {
      return state.merge({ queryBondSaleBackElement: { ...s, ...query } });
    } else if (type == 'queryBondLendingElement') {
      return state.merge({ queryBondLendingElement: { ...s, ...query } });
    }
  }
};
