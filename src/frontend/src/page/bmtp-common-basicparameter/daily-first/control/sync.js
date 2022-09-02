import { page } from 'yss-biz/utils/util/constant';
import moment from 'moment';

export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  openFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status,
        sign
      }
    });
  },

  openBondFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenBondFormModal: {
        type,
        status,
        sign
      }
    });
  },

  changeAboutActive(state, { value }) {
    return state.set('active', value);
  },

  /*重置*/
  toResetSearch(state) {
    let currentTradeDate = state.get('currentTradeDate');
    return state.merge({
      queryElement: {
        jobType: '1',
        tradeDate: currentTradeDate,
        ...page
      }
    });
  },

  /*修改查询元素*/
  changeQueryElement(state, { type, value }) {
    let queryElement = state.get(type).toJS();

    return state.merge({
      [type]: { ...queryElement, ...value }
    });
  }
};
