/**
 * 用户角色权限授权 Service
 * @author txf
 */
import { $ajax, urlHashToJson } from 'yss-biz';
const { source } = urlHashToJson();
/**查询机构树 */
export const getOrgTreeData = params => {
  return $ajax(`/dfas-${source === 'sofa' ? 'sofa-' : ''}auth-center/org/listTree`, params, 'post');
};

/**根机构查询用户 */
export const getUserByOrgCode = params => {
  return $ajax(
    `/dfas-${source === 'sofa' ? 'sofa-' : ''}auth-center/user/pageList`,
    params,
    'post'
  );
};

// 功能权限相关
/**查询用户功能角色赋权信息 */
export const getUserCheckedFuncRoleTree = userCode => {
  return $ajax(`/dfas-auth-center/user/orgrole/listTree/checked/${userCode}`, 'get');
};

/**查询用户功能角色树 */
export const getUserFuncRoleTree = userCode => {
  return $ajax(`/dfas-auth-center/user/orgrole/listTree/${userCode}`, 'get');
};

/**用户功能角色授权 */
export const saveFuncRoleAuthorization = params => {
  return $ajax(`/dfas-auth-center/userRole/save`, params, 'post');
};

/**批量用户功能角色授权 */
export const batchSaveFuncRoleAuthorization = params => {
  return $ajax(`/dfas-auth-center/userRole/saveBatch`, params, 'post');
};

/**互斥功能角色查询 */
export const getRoleMutex = params => {
  return $ajax(`/dfas-auth-center/roleMutex/list`, params, 'post');
};

// 数据权限相关
/**查询用户数据角色赋权信息 */
export const getUserCheckedDataRoleTree = userCode => {
  return $ajax(
    `/dfas-${
      source === 'sofa' ? 'sofa-' : ''
    }auth-center/user/data_role/listTree/checked/${userCode}`,
    'get'
  );
};

/**查询用户数据角色树 */
export const getUserDataRoleTree = userCode => {
  return $ajax(
    `/dfas-${source === 'sofa' ? 'sofa-' : ''}auth-center/user/data_role/listTree/${userCode}`,
    'get'
  );
};

/**用户数据角色授权 */
export const saveDataRoleAuthorization = params => {
  return $ajax(`/dfas-auth-center/userDataRole/save`, params, 'post');
};

/**批量用户数据角色授权 */
export const batchSaveDataRoleAuthorization = params => {
  return $ajax(`/dfas-auth-center/userDataRole/saveBatch`, params, 'post');
};
/**查询是否开启数据权限参数 */
export const getEnableDataAuth = () => {
  return $ajax(`/dfas-base-biz/param/switch/isEnableDataAuth`, {}, 'post');
};
