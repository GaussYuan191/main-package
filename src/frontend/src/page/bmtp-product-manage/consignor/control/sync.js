import { restQueryElement } from 'yss-biz';
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

  /**展示弹框*/
  openFormModal2(state, { status, sign, type }) {
    return state.merge({
      isOpenFormModal2: {
        status,
        sign,
        type
      }
    });
  },

  /**选择一条管理人记录进行保存*/
  changeTableRow(state, { value }) {
    return state.merge({
      consignored: value,
      consignorDownRelation: value
    });
  },

  /**选择切换tab*/

  changeActiveAccountKey(state, { value }) {
    return state.merge({
      activePan: value
    });
  },

  /**选择一条管理人记录进行保存*/
  changeEnclosureRow(state, { id }) {
    return state.set('enclosureedId', id);
  },

  /**选择文档进行保存*/
  changeDocumented(state, { value }) {
    return state.set('documented', value);
  },

  /*修改查询元素*/
  changeQueryElement(state, { type, element, value }) {
    return state.setIn([type, element], value);
  },

  /**重置搜索**/
  resetElement(state,queryElement) {
    let s = restQueryElement(state.get('queryConsignorElement').toJS());
    let params = {...s,...queryElement};
    return state.merge({ queryConsignorElement: params });
  },

  /**修改一机构名称保存*/
  changeInstitutionsName(state, { value }) {
    return state.setIn(['queryConsignorElement', 'code'], value);
  },

  /*选择管理人下拉列表*/
  changeConsignorDownList(state, { value, option }) {
    let findElement = state
      .get('organizationNamelList')
      .find(item => item['publisherCode'] == value);
    //更新关联信息
    return state.merge({
      consignorDownRelation: findElement
    });
  },

  /*还原管理人关联数据*/
  resetJiGou(state) {
    //更新关联信息
    return state.merge({
      consignorDownRelation: {}
    });
  },

  /*保存管理人Id*/
  changeSubjectId(state, { value }) {
    return state.merge({
      subjectId: value
    });
  },

  /*切换文档类型*/
  changeDocumentType(state, { value }) {
    return state.setIn(['queryDocumentElement', 'type'], value);
  },

  /*切换合同状态*/
  changeContractStatusList(state, { value }) {
    return state.setIn(['queryContracElement', 'contractStatus'], value);
  },

  /*重置j文档附件*/
  resetEnclosure(state) {
    return state.set('enclosureList', []);
  }
};
