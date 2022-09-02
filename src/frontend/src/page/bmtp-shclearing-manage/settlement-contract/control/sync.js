export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  setRowChecked(state, params, { getState }) {
    state = getState();
    return state.set('selectRows', params);
  },

  /***指令**/
  // changeQueryElement(state, { type, value }) {
  //   return state.setIn(['instructionQueryForm', type], value);
  // },

  changeQueryElement(state, { type, value }) {
    let val = '';
    if (type == 'instructManage') {
      val = 'instructionQueryForm';
    } else {
      val = 'contractQueryForm';
    }
    let query = state.get(val).toJS();

    return state.merge({
      [val]: { ...query, ...value }
    });
  },
  // // 重置
  toResetSearch(state, { type, queryElement }) {
    let val = '';
    if (type == 'instructManage') {
      val = 'instructionQueryForm';
    } else {
      val = 'contractQueryForm';
    }
    // let query = state.get(val).toJS();
    // let params = {...query,...queryElement};
    return state.merge({
      [val]: queryElement
    });
  }

  /***合同**/
  // changeCQueryElement(state, { type, value }) {
  //   return state.setIn(['contractQueryForm', type], value);
  // },
};
