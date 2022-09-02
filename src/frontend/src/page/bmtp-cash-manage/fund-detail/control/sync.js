import { page } from 'yss-biz/utils/util/constant';
export default {
  /**是否展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status: status
      }
    });
  },

  /**修改调整后金额*/
  changeAccountAfter(state, { totalAmount, usableAmount, lockedAmount }, { getState }) {
    state = getState();
    return state.merge({
      accountAfter: {
        totalAmount,
        usableAmount,
        lockedAmount
      }
    });
  },

  /**选择一条表格录进行保存*/
  changeTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  /**进行模糊查询元素保存*/
  changeQueryElement(state, { type, value }) {
    return state.setIn(['queryElement', type], value);
  },

  /**重置资金余额*/
  resetAccont(state) {
    return state.set('account', {}).set('accountAfter', {});
  },

  /*重置*/
  toResetSearch(state, queryElement) {
    return state.merge({
      queryElement: {
        ...page,
        ...queryElement
        // tradeBeginTime: moment().format('YYYY-MM-DD'),
        // tradeEndTime: moment().format('YYYY-MM-DD')
      }
    });
  }
};
