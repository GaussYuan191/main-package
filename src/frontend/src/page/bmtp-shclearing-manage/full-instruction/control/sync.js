import { page } from 'yss-biz';
export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },
  //保存勾选的数据
  setRowChecked(state, param, { getState }) {
    state = getState();
    return state.set('selectRows', param);
  },

  // 查询参数
  changeQueryElement(state, { type, value }) {
    let val = 'contractQueryForm';
    let query = state.get(val).toJS();
    return state.merge({
      [val]: { ...query, ...value }
    });
  },
  // 重置
  toResetSearch(state, { type, queryElement }, { getState }) {
    let val = '';
    if (type == 'settleInstructManage') {
      val = 'instructionQueryForm';
    } else {
      let contractQueryForm = state.get('contractQueryForm');
      contractQueryForm = contractQueryForm.toJS && contractQueryForm.toJS();
      val = 'contractQueryForm';
      queryElement = {
        settlementDate_begin: getState().get('currentTradeDate'),
        settlementDate_end: getState().get('currentTradeDate'),
        // maturityConfirmStatus: '6',
        reqPageNum: contractQueryForm.reqPageNum,
        reqPageSize: contractQueryForm.reqPageSize,
        ...queryElement
      };
    }
    // let query = state.get(val).toJS();
    // let params = {...query,...queryElement};
    return state.merge({
      [val]: queryElement
    });
  },
  // 清除关联信息数据
  clearAboutData(state) {
    return state
      .set('instructionInfo', {})
      .set('zjInfo', {})
      .setIn(['zjTable', 'list'], [])
      .setIn(['dbTable', 'list'], [])
      .setIn(['runningWaterTable', 'dataSource'], [])
      .setIn(['contractMessageTable', 'dataSource'], []);
  }
};
