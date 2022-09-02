import { message } from 'antd';
import { filterNullElement } from 'yss-biz';
import { bizUtils } from 'bmtp-trade-base';
import {
  getOrgTreeData,
  getUserByOrgCode,
  getUserCheckedFuncRoleTree,
  getUserFuncRoleTree,
  saveFuncRoleAuthorization,
  batchSaveFuncRoleAuthorization,
  getRoleMutex,
  getUserCheckedDataRoleTree,
  getUserDataRoleTree,
  saveDataRoleAuthorization,
  batchSaveDataRoleAuthorization,
  getEnableDataAuth
} from '../service/index';

export default {
  /**查询机构树 */
  async httpGetOrgTree(state, { orgName = '' }, { getState, mutations }) {
    const { data, msg, winRspType } = (await getOrgTreeData()) || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    const orgTreeDataBiz = bizUtils.filterTreeData(data || [], {
      keyField: 'orgCode',
      titleField: 'orgName',
      filterValue: orgName
    });

    //提取第一个树节点或当前选中树节点
    const activeOrgCode = getState().get('activeOrgCode');
    const activeRowData =
      bizUtils.flattenTreeData(orgTreeDataBiz.rows).find(item => {
        return item.key === activeOrgCode;
      }) ||
      orgTreeDataBiz.rows[0] ||
      {};

    return state
      .set('orgTreeData', orgTreeDataBiz.rows)
      .set('orgTreeAllKeys', orgTreeDataBiz.keys)
      .set('activeOrgCode', activeRowData.orgCode);
  },

  /**查询机构用户 */
  async httpGetUserList(state, params, { getState, mutations }) {
    state = getState();
    const activeOrgCode = state.get('activeOrgCode');
    let queryParam = state.get('queryParam');
    queryParam = queryParam.toJS ? queryParam.toJS() : queryParam;

    const { data, msg, winRspType } = await getUserByOrgCode(
      filterNullElement({ orgCode: activeOrgCode, ...queryParam })
    );
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }

    let { list, total } = data || {};
    list = list.map((item, index) => {
      item.key = index + 1;
      return item;
    });

    return state.set('userTableData', list).set('userTableTotal', total);
  },

  /**查询功能/数据角色树/授权信息 */
  async httpGetRoleTree(state, params, { getState, mutations }) {
    const { userCode } = params;
    let modalInfo = state.get('modalInfo');
    modalInfo = modalInfo.toJS ? modalInfo.toJS() : modalInfo;
    const { type, isBatch } = modalInfo;
    const func =
      type === 'dataAuth'
        ? isBatch
          ? getUserDataRoleTree
          : getUserCheckedDataRoleTree
        : isBatch
        ? getUserFuncRoleTree
        : getUserCheckedFuncRoleTree;
    const result = await func(userCode);

    const { data, msg, winRspType } = result;
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }

    let roleTreeDataBiz = bizUtils.formatTreeTableData(data, {
      keyField: 'treeCode'
    });
    return state.set('roleTreeData', data).set('roleTreeDataAllKeys', roleTreeDataBiz.keys);
  },

  /**更新互斥角色列表 */
  async httpGetMutexRoleCodeList(state, params, { getState, mutations }) {
    let { roleCodeList } = params || {};
    if (!roleCodeList) {
      // 首次加载时获取互斥角色的情况
      const roleTreeData = state.get('roleTreeData').toJS
        ? state.get('roleTreeData').toJS()
        : state.get('roleTreeData');
      roleCodeList = filterRole(roleTreeData);
    }
    if (!roleCodeList.length) {
      // 空的则不用查询了
      return state.set('mutexRoleCodeList', []);
    }
    const result = await getRoleMutex({ roleCodeList });
    const { data, msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    const mutexRoleCodeList = (data || []).map(item => item.mutexRoleCode);
    return state.set('mutexRoleCodeList', mutexRoleCodeList);
  },

  /**添加授权 */
  async httpAddRoleAuth(state, params, { getState, mutations }) {
    let modalInfo = state.get('modalInfo');
    modalInfo = modalInfo.toJS ? modalInfo.toJS() : modalInfo;
    const { isBatch, type } = modalInfo;

    const func =
      type === 'dataAuth'
        ? isBatch
          ? batchSaveDataRoleAuthorization
          : saveDataRoleAuthorization
        : isBatch
        ? batchSaveFuncRoleAuthorization
        : saveFuncRoleAuthorization;
    const result = await func(filterNullElement(params));

    const { msg, winRspType } = result;
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    message.success(msg);
    state = mutations.changeModalInfo({ visible: false });

    return state
      .set('roleTreeData', [])
      .set('roleTreeDataAllKeys', [])
      .set('mutexRoleCodeList', []);
  },

  /**查询是否开启数据权限 */
  async httpGetEnableDataAuthStatus(state, params, { getState, mutations }) {
    state = getState();
    const result = await getEnableDataAuth();
    const { data, msg, winRspType } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据或网络错误');
      return;
    }
    return state.set('isEnableDataAuth', data);
  }
};

/**从用户角色数据结果中提取用户当前角色 */
function filterRole(roleListTree, roleList = []) {
  roleListTree.forEach(item => {
    if (item.type === 'R' && item.checked) {
      roleList.push(item.roleCode);
      return;
    }
    if (item.type === 'O' && item.children instanceof Array) {
      filterRole(item.children, roleList);
    }
  });
  return roleList;
}
