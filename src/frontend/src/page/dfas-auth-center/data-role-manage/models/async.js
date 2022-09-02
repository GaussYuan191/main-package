import { message } from 'antd';
import { filterNullElement } from 'yss-biz';
import { bizUtils } from 'bmtp-trade-base';
import {
  getRoleTreeData,
  addRole,
  updateRole,
  removeRole,
  getDataRoleAuth,
  deleteDataRoleAuth,
  batchDeleteDataRoleAuth,
  deleteAllDataRoleAuth,
  addDataRoleAuthBath,
  synchronizeDataAuth,
  synchronizeAllDataAuth,
  getOrgTree,
  getBatchProductCodeAndName,
  listProductIdCodeAndName,
  filterAuthorizedProductId,
  queryDataAuthSynchronizeFlag
} from '../service/index';

export default {
  // 角色 ############
  /**查询数据角色功能树 */
  async httpGetDataRoleTree(state, params, { getState, mutations }) {
    const { data, msg, winRspType } = await getRoleTreeData();
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    return state.set('roleTreeData', data);
  },

  /**新增数据角色 */
  async httpAddDataRole(state, params, { getState, mutations }) {
    const result = await addRole(filterNullElement(params));
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataRoleTree();
    return state;
  },

  /**修改数据角色 */
  async httpUpdateDataRole(state, params, { getState, mutations }) {
    const result = await updateRole(filterNullElement(params));
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataRoleTree();
    return state;
  },

  /**删除数据角色 */
  async httpDeleteDataRole(state, params, { getState, mutations }) {
    const result = await removeRole(filterNullElement(params));
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataRoleTree();
    return state;
  },

  /**获取机构下拉树 */
  async httpGetOrgPullDownList(state, params, { getState, mutations }) {
    const result = await getOrgTree();
    const { data, msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '获取机构列表失败');
      return;
    }
    const treeData = bizUtils.filterTreeData(data || [], {
      keyField: 'orgCode',
      titleField: 'orgName'
    });
    return state.set('orgPullDownList', treeData.rows);
  },

  // 权限 ############
  /**查询角色的数据权限列表 */
  async httpGetDataAuthList(state, params, { getState, mutations }) {
    state = getState();
    const treeActiveCode = state.get('treeActiveCode');
    let queryParam = state.get('queryParam');
    queryParam = queryParam.toJS ? queryParam.toJS() : queryParam;
    const { data, msg, winRspType } = await getDataRoleAuth(
      filterNullElement({ roleCode: treeActiveCode, ...queryParam })
    );
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    let { list, total } = data || {};

    // 前端调用产品微服务, 映射出产品代码和名称字段
    const dataIdList = list.map(item => item.dataId);
    const productList = dataIdList.length
      ? (await getBatchProductCodeAndName(dataIdList).then(res => res.data)) || []
      : [];
    list.forEach(item => {
      const productInfo = productList.find(val => val.id === item.dataId);
      item.productCode = productInfo ? productInfo.productCode || '' : '暂无数据';
      item.productName = productInfo ? productInfo.productName || '' : '暂无数据';
    });

    return state.set('roleAuthList', list).set('roleAuthListTotal', total);
  },

  /**单个撤销授权 */
  async httpRevokeAuth(state, params, { getState, mutations }) {
    const result = await deleteDataRoleAuth(filterNullElement(params));
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataAuthList();
    return state;
  },

  /**批量撤销授权 */
  async httpBatchRevokeAuth(state, idList, { getState, mutations }) {
    const result = await batchDeleteDataRoleAuth(idList);
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataAuthList();
    return state;
  },

  /**全部撤销 */
  async httpAllRevokeAuth(state, params, { getState, mutations }) {
    const treeActiveCode = state.get('treeActiveCode');
    const result = await deleteAllDataRoleAuth({ roleCode: treeActiveCode });
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    return state;
  },

  /**单个同步 */
  async httpSynchronizeDataAuth(state, params, { getState, mutations }) {
    const result = await synchronizeDataAuth(params);
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    return;
  },

  /**全量同步 */
  async httpSynchronizeAllDataAuth(state, params, { getState, mutations }) {
    const result = await synchronizeAllDataAuth();
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    return;
  },

  /**添加授权 */
  async httpAddDataRoleAuth(state, params, { getState, mutations }) {
    const treeActiveCode = state.get('treeActiveCode');
    const reqParams = {
      productIdList: params,
      roleCode: treeActiveCode
    };
    const result = await addDataRoleAuthBath(reqParams);
    const { msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = await mutations.asyncHttpGetDataAuthList();
    return state;
  },

  /**查询产品列表(授权对话框) */
  async httpGetProductList(state, params, { getState, mutations }) {
    params.isDataAuth = '0';
    const result = await listProductIdCodeAndName(filterNullElement(params));
    const { data, msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }

    // 查询已授权产品
    const treeActiveCode = state.get('treeActiveCode');
    let { list = [], total } = data || {};
    const productIdList = list.map(item => item.id);
    const queryParams = {
      productIdList,
      roleCode: treeActiveCode
    };
    const authorizedProductIdList = productIdList.length
      ? (await filterAuthorizedProductId(queryParams).then(res => res.data)) || []
      : [];

    // 设置已授权的产品为禁用勾选
    list = list.map(item => {
      if (authorizedProductIdList.includes(item.id)) {
        item.disabled = true;
      }
      return item;
    });
    return state.setIn(['productList', 'list'], list).setIn(['productList', 'total'], total);
  },

  /**查询数据权限同步标志 */
  async httpGetDataAuthSynchronize(state, params, { getState, mutations }) {
    const result = await queryDataAuthSynchronizeFlag();
    const { data, msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    return state.set('synchronizeFlag', !!data);
  }
};
