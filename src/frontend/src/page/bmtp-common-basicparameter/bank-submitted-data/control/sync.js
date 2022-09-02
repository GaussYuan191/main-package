import { page } from 'yss-biz/utils/util/constant';
export default {
  /**展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status
      }
    });
  },

  /**选择一条管理人记录进行保存*/
  changeTableRow(state, { value }) {
    return state.merge({
      rowed: value
    });
  },

  /*修改查询元素*/
  changeQueryElement(state, { elementType, element, value }) {
    return state.setIn([elementType, element], value);
  },

  /*查询日期*/
  changeDateElement(state, { value }) {
    return state.set('searchDate', value);
  },

  /*修改tab切换的标识值*/
  changeTabSign(state, { key }) {
    return state.set('active', key);
  },

  // 重置
  toResetSearch(state, { type }) {
    return state.merge({
      [type]: {
        ...page
      }
    });
  },

  // 设置行数据
  consignorRowSet(state, { rowed }) {
    return state.set('consignorRow', rowed);
  },
  trusteeshipRowSet(state, { rowed }) {
    return state.set('trusteeshipRow', rowed);
  },
  settlementRowSet(state, { rowed }) {
    return state.set('settlementRow', rowed);
  },
  resetROW(state, { type }) {
    return state.set(type, new Array());
  }
};
