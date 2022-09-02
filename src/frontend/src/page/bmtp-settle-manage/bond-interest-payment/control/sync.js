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

  openBondFormModal(state, { type, status, sign }) {
    return state.merge({
      isBondOpenFormModal: {
        type,
        status,
        sign
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
  changeQueryElement(state, values) {
    let query = state.get('queryElement').toJS();

    // return state.setIn(['queryElement', element], value);
    return state.merge({
      queryElement: {
        ...query,
        ...values
      }
    });
  },

  changeElementQuery(state, { sing, value, type }) {
    return state.setIn([sing, type], value);
  },

  changeQueryAboutElement(state, values) {
    let query = state.get('queryAboutElement').toJS();
    // return state.setIn(['queryElement', element], value);
    return state.merge({
      queryAboutElement: {
        ...query,
        ...values
      }
    });
  },

  /*重置*/
  toResetSearch(state, params) {
    let currentTradeDate = state.get('currentTradeDate');
    return state.merge({
      queryElement: {
        tradeStartDate: currentTradeDate,
        tradeEndDate: currentTradeDate,
        ...page,
        ...params
      }
    });
  },

  toResetAbout(state) {
    return state.merge({
      queryAboutElement: {
        ...page
      }
    });
  },

  // 设置选择A区行信息
  setRowInfo(state, { value }) {
    return state.set('selectRow', value);
  },

  /**添加手工调整费用**/
  addReadjustingItem(state, { value }) {
    return state.set('readjustingList', value);
  },

  /*下拉框复制*/
  changeBondListDown(state, { value }) {
    if (value == null) {
      return state.merge({
        bondDownRelation: {}
      });
    }
    let findElement = state.get('bondListDown').find(item => item['publisherCode'] == value);
    //更新关联信息
    return state.merge({
      bondDownRelation: findElement
    });
  },

  // 债券关联
  toSetBondRelation(state, value) {
    return state.set('bondRelation', value);
  },

  // 债券账号关联
  toSetBondAccoutRelation(state, value) {
    return state.set('bondAccoutRelation', value);
  },

  // 是否拆分确认
  toChangeAffirmSplitStatus(state, value) {
    return state.set('isAffirmSplit', value);
  },

  // 设置持仓
  toSetBoldBalanceNum(state, value) {
    return state.set('boldBalanceNum', value);
  },

  // 设置票面利率
  toSetFaceRate(state, value) {
    return state.set('faceRate', value);
  },

  // **债券回售** 重置查询
  resetElement(state) {
    return state.merge({
      queryBondSaleBackElement: {
        ...page
      }
    });
  }
};
