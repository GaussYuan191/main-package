import { page } from 'yss-biz/utils/util/constant';
export default {
  /**是否展示弹框*/
  openFormModal(state, { sign }) {
    return state.merge({
      isOpenFormModal: {
        sign
      }
    });
  },

  /**选择一条表格账户记录进行保存*/
  changeTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  /**账户-获取账户树性结构code*/
  // getAccountCodes(state, { value }) {
  //   return state.set('accountCodes', value);
  // },

  toResetSearch(state, params) {
    return state.merge({
      queryElement: {
        ...page,
        ...params
      }
    });
  },

  /**选择一条表格账户记录进行保存*/
  // changeTableRow (state, { type, value }) {
  //   return state.set(type, value);
  // },

  /**账户-修改状态*/
  // changeaCountStatus(state, { value, type }) {
  //   return state.setIn([type, 'accountStatus'], value);
  // },

  /**账户-修改审核状态*/
  // changecheckStatus(state, { value, type }) {
  //   return state.setIn([type, 'checkStatus'], value);
  // },

  /**账户-修改账户主体*/
  // changeRelatedSubjectCodes(state, { type, value }) {
  // return state.set(state.get("queryCapitalElement").get("relatedSubjectCodes"), value);
  // },

  /**现券买卖-成交编号与债券名称*/
  // changeTransactionNumberList(state, { value, sing, type }) {
  //   return state.setIn([sing, type], value);
  // },

  /**现券买卖-交易方向*/
  // changeTradeDirection(state, { sing, value }) {
  //   return state.setIn([sing, "tradeDirection"], value);
  // },

  /**切换指令查询***/
  // changeClearingStatus(state, { value, sing }) {
  //   return state.setIn([sing, "clearingStatus"], value);
  // },

  /**修改加载***/
  // changeSpinning(state, { value }, { getState }) {
  //   state = getState()
  //   return state.set("isSpinning", value);
  // },

  /**获取当前页面***/
  // changeReqPageNum(state, { value, sing }) {
  //   return state.setIn([sing, "reqPageNum"], value);
  // },
  setQueryElement(state, values, { getState }) {
    state = getState();
    let queryElement = state.get('queryElement').toJS();

    return state.merge({
      queryElement: { ...queryElement, ...values }
    });
  }

  // setAboutElement(state, values, { getState }) {
  //   state = getState()
  //   let aboutElement = state.get('aboutElement').toJS()

  //   return state.merge({
  //     aboutElement: { ...aboutElement, ...values },
  //   })
  // },
  // 设置表格数据
  // setTableDatas(state, values, { getState }) {
  //   state = getState()
  //   let rowed = state.get('rowed')
  //   return state.merge({
  //     batchRefundList: Array.isArray(rowed) ? rowed : [rowed]
  //   })
  // }
};
