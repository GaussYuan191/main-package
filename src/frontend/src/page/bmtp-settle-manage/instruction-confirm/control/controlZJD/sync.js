import { filterNullElement } from 'yss-biz';
export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  //保存需要的关联的instrId
  changeInstrId(state, { value }) {
    return state.set('instrId', value);
  },

  /*弹框-是否展示弹框*/
  openFormModal(state, { type, status }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status
      }
    });
  },
  setInstructionQueryForm(state, values) {
    let params = values;
    let query = state.get('instructionQueryForm').toJS();
    if (params.systemInstructionStatus == '待确认') {
      params.systemInstructionStatus = 1;
    }
    return state.merge({
      instructionQueryForm: filterNullElement({ ...query, ...params })
    });
  },
  setPageQueryParam(state, page) {
    const { reqPageNum, reqPageSize } = page;
    if (!reqPageSize) {
      return state.setIn(['pageReqParm', 'reqPageNum'], reqPageNum);
    } else {
      return state
        .setIn(['pageReqParm', 'reqPageNum'], reqPageNum)
        .setIn(['pageReqParm', 'reqPageSize'], reqPageSize);
    }
  },
  setSelectRow(state, list) {
    return state.setIn(['instructionTable', 'modalData'], list);
  },
  // 重置
  toResetSearch(state) {
    return state.merge({
      instructionQueryForm: {
        settleBeginDate: state.get('currentTradeDate'),
        settleEndDate: state.get('currentTradeDate'),
        systemInstructionStatus: 1
      }
    });
  }
};
