/**
 * @产品创设
 *
 */

import { message } from 'antd';
import {
  getProductList,
  addProduct,
  deleteProduct,
  updateProduct,
  checkBatchProduct,
  unCheckBatchProduct,
  getSubjectList,
  getAccount,
  getDocumentList,
  getSubjectDownList,
  getTrusteeName,
  getSubjectMechanismDownList,
  updateEnableStatus,
  updateDisableStatus,
  updateLogoutStatus,
  getPublisherDownData,
  addSubject,
  deleteSubject
} from '../services/index';
import { isCheckTrue, getValue, filterNullElement, page } from 'yss-biz';

export default {
  /*第一次加载页面**/
  async queryMoust(state, params, { getState }) {
    let query = state.get('queryProductElement').toJS();
    let newQueryParams = { ...query, ...params };
    let result = await getProductList(filterNullElement(newQueryParams));
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }

    const { list } = data;
    list.total = data.total; //挂摘元素总和
    if (!list.length) {
      return state.merge({
        poductList: list,
        accountList: [],
        documentList: [],
        subjectList: []
      });
    }

    let productId = list[0]['id']; // productId 取 id
    let productInfo = {
      productId,
      ...list[0]
    };
    state = state.set('poductList', list).set('productInfo', productInfo);

    if (state.get('activePan') == '1') {
      // 关联账户
      let result2 = await getAccount(productId);
      if (result2.winRspType === 'SUCC') {
        state = state.set('accountList', result2.data);
      } else {
        message.error(result2.msg || '数据错误');
        state = state.set('accountList', []);
      }
    } else if (state.get('activePan') == '2') {
      // 关联主体
      let params = {
        ...page,
        productId: productInfo.productId
      };
      let result2 = await getSubjectList(params);
      if (result2.winRspType === 'SUCC') {
        state = state.set('subjectList', result2.data.list);
      } else {
        message.error(result2.msg || '数据错误');
        state = state.set('subjectList', []);
      }
    } else {
      // 关联文档
      let params = {
        ...page,
        subjectId: productInfo.productId,
        subjectType: 1,
        type: 0
      };
      let result2 = await getDocumentList(params);
      if (result2.winRspType === 'SUCC') {
        state = state.set('documentList', result2.data.list);
      } else {
        message.error(result2.msg || '数据错误');
        state = state.set('documentList', []);
      }
    }
    return state;
  },

  /*获取产品**/
  async httpGetProductList(state, { params }, { getState }) {
    try {
      let result = await getProductList(params);
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        data.list.total = data.total; //挂摘元素总和
        state = getState();
        return state.set('poductList', data.list);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /*产品-管理人下拉列表**/
  async httpGetSubjectDownList(state) {
    try {
      let result = await getSubjectDownList({});
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        return state.set('subjectDownList', data);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /* 所属托管人 */
  async httpGetTrusteeName(state) {
    try {
      let result = await getTrusteeName({});
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        let obj = {
          name: data.parameterName,
          value: data.parameterValue
        };
        return state.set('refTrusteeNameObj', obj);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /****产品--增加 */
  async httpAddProduct(state, { params }, { mutations, getState }) {
    let result = await addProduct(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success('新增成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***产品--修改*******/
  async httpUpDateProduct(state, { params }, { mutations, getState }) {
    let result = await updateProduct(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success('修改成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***产品--删除*******/
  async httpDeleteProduct(state, { params }, { mutations, getState }) {
    let id = params.id;
    let result = await deleteProduct(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success('删除成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***批量审核********/
  async httpBatchexamine(
    state,
    { params, type = 'poductList', callback },
    { mutations, getState }
  ) {
    //判断审核是否有勾选 1：审核,2：未审核;
    if (!params.length) {
      message.error('是否要将选中的记录执行【审核】操作？');
      return;
    }
    let stringTtpe = isCheckTrue(params, '1');
    if (typeof stringTtpe == 'boolean') {
      message.error('选择项存在已审核的数据');
      return;
    }
    let result = await checkBatchProduct(stringTtpe);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      //刷新页面
      message.success('审核成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***批量反审核********/
  async httpUncheckAccount(
    state,
    { params, type = 'poductList', callback },
    { mutations, getState }
  ) {
    //判断审核是否有勾选 2：待审核,1：是已审核;
    if (!params.length) {
      message.error('是否要将选中的记录执行【反审核】操作？');
      return;
    }
    let stringTtpe = isCheckTrue(params, '2');
    if (typeof stringTtpe == 'boolean') {
      message.error('选择项存在未审核的数据');
      return;
    }
    let result = await unCheckBatchProduct(stringTtpe);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      //刷新页面
      message.success('反审核成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*关联主体-关联主体列表**/
  async httpGetSubjectList(state, { params }, { getState }) {
    try {
      let listLength = state.get('poductList').length || state.get('poductList').toJS().length;
      if (!listLength) {
        return state.set('subjectList', []);
      }

      let result = await getSubjectList(params);
      const { data, winRspType, msg } = result;
      data.list.total = data.total;
      if (winRspType == 'SUCC') {
        state = getState();
        return state.set('subjectList', data.list);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /*关联账户-关联账户列表**/
  async httpGetAccount(state, { productId }, { getState }) {
    try {
      let listLength = state.get('poductList').length || state.get('poductList').toJS().length;
      if (!listLength) {
        return state.set('accountList', []);
      }
      let resul2 = await getAccount(productId);
      resul2.data.total = resul2.data.total;
      const { winRspType, msg } = resul2;
      if (winRspType == 'SUCC') {
        state = getState();
        return state.merge({
          accountList: resul2.data
        });
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /*关联文档-获取关联文档**/
  async httpGetDocumentList(state, { params }, { getState }) {
    try {
      const productList = state.get('poductList') || [];
      const productListLength = productList.toJS ? productList.toJS().length : productList.length;
      if (!productListLength) {
        return state.set('documentList', []);
      }
      let result = await getDocumentList(params);
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        state = getState();
        return state.set('documentList', data.list);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /*关联主体-主体机构下拉列表**/
  async httpGetSubjectMechanismDownList(state, { params }, { getState }) {
    try {
      let result = await getSubjectMechanismDownList(params);
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        state = getState();
        return state.set('subjectMechanismDownList', getValue(data.list, []));
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /*修改状态**/
  async httpUpdateEnableStatus(state, { row, status }, { mutations, getState }) {
    let id = row.id;
    let result;
    if (status == '1') {
      result = await updateEnableStatus(id);
    } else if (status == '2') {
      result = await updateDisableStatus(id);
    } else {
      result = await updateLogoutStatus(id);
    }
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success('状态修改成功');
      let query = getState().get('queryProductElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetProductList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*主体下拉框**/
  async httpGetPublisherDownData(state, { params }, { getState }) {
    let result = await getPublisherDownData(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('subjectListDown', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*增加关联主体**/
  async httpAddSubject(state, { params }, { mutations }) {
    let result = await addSubject(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      let query = {
        ...page,
        productId: state.getIn(['productInfo', 'productId'])
      };
      message.success('新增机构成功');
      state = await mutations.asyncHttpGetSubjectList({ params: query });
      return state.setIn(['isOpenFormModal', 'status'], false);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*删除关联主体**/
  async httpDeleteSubject(state, { id }, { mutations }) {
    let result = await deleteSubject(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      let query = {
        ...page,
        productId: state.getIn(['productInfo', 'productId'])
      };
      mutations.asyncHttpGetSubjectList({ params: query });
      return state.setIn(['isOpenFormModal', 'status'], false);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
