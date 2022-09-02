import { restQueryElement } from 'yss-biz';

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

  /**产品-选择产品一条记录进行保存*/
  changeTableRow(state, { value }) {
    return state.set('changeProductRowed', value);
  },

  /**查询项目*/
  changeQueryElement(state, { type, element, value }) {
    return state.setIn([type, element], value);
  },

  /**重置搜索**/
  resetElement(state, queryElement, { getState }) {
    let s = restQueryElement(state.get('queryProductElement').toJS());
    let params = {...s,...queryElement}
    return state.merge({ queryProductElement: params});
  },

  /**产品-点击产品行修改产品的id 与code*/
  changeProductInfo(state, { value }) {
    return state.set('productInfo', value);
  },

  /**关联主体-点击表格一条行进行保存*/
  changeSubjectRow(state, { value }) {
    return state.set('subjected', value);
  },

  changeActiveAccountKey(state, { value }) {
    return state.set('activePan', value);
  },

  changeConsignorSubjectListDown(state, { value }) {
    if (value == null) {
      return state.merge({
        consignorDownRelation: {}
      });
    }
    let findElement = state.get('subjectListDown').find(item => item['publisherCode'] == value);
    //更新关联信息
    return state.merge({
      consignorDownRelation: findElement
    });
  }
};
