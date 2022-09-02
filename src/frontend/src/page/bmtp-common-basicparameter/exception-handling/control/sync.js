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
  changeActive(state, { value }) {
    return state.set('active', value);
  },
  /*修改查询元素*/
  changeQueryElement(state, values) {
    let queryElement;
    let { type } = values;
    delete values.type;
    switch (type) {
      case 'ReceiveHandling':
        queryElement = state.get('queryReceiveElement').toJS();
        return state.merge({
          queryReceiveElement: { ...queryElement, ...values }
        });
      case 'ExceptionHandling':
        queryElement = state.get('queryElement').toJS();
        return state.merge({
          queryElement: { ...queryElement, ...values }
        });
      default:
        return;
    }
  },
  // 重置
  toResetSearch(state, params) {
    let { type } = params;
    delete params.type;
    switch (type) {
      case 'ReceiveHandling':
        return state.merge({
          queryReceiveElement: {
            ...page,
            ...params
          }
        });
      case 'ExceptionHandling':
        return state.merge({
          queryElement: {
            ...page,
            status: 2,
            ...params
          }
        });
      default:
        return;
    }
  }
};
