/**
 * 数据角色管理 Service
 * @author txf
 */
import { $ajax, urlHashToJson } from 'yss-biz';
const { source } = urlHashToJson();
/**查询角色树 */
export const getRoleTreeData = () => {
  return $ajax(
    `/dfas-${source === 'sofa' ? 'sofa-' : ''}auth-center/user/orgrole/listDataTree`,
    'get'
  );
};

/**查询角色列表 */
export const getRoleList = params => {
  return $ajax(`/dfas-auth-center/sysRole/list`, params, 'post');
};

/**新增角色 */
export const addRole = params => {
  return $ajax(`/dfas-auth-center/sysDataRole/addDataRole`, params, 'post');
};

/**修改角色 */
export const updateRole = params => {
  return $ajax(`/dfas-auth-center/sysDataRole/updateDataRole`, params, 'post');
};

/**删除角色 */
export const removeRole = params => {
  return $ajax(`/dfas-auth-center/sysDataRole/delSysDataRole`, params, 'post');
};

/**获取机构下拉列表 */
export const getOrgTree = () => {
  return $ajax(`/dfas-${source === 'sofa' ? 'sofa-' : ''}auth-center/org/listTree`, {}, 'post');
};

/**查询角色产品数据权限 */
export const getDataRoleAuth = params => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/pageList`, params, 'post');
};

/**批量新增/授权角色数据权限产品 */
export const addDataRoleAuthBath = params => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/add`, params, 'post');
};

/**批量删除/撤销角色数据权限产品 */
export const batchDeleteDataRoleAuth = ids => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/batchDeleteDataRoleAuth`, ids, 'post');
};

/**删除/撤销单个角色数据权限产品 */
export const deleteDataRoleAuth = params => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/deleteDataRoleAuth`, params, 'post');
};

/**撤销角色全部数据权限 */
export const deleteAllDataRoleAuth = params => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/deleteAllDataRoleAuth`, params, 'post');
};

/**全量同步数据权限 */
export const synchronizeAllDataAuth = () => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/synchronizeAllDataAuth`, {}, 'post');
};

/**同步单条数据权限 */
export const synchronizeDataAuth = params => {
  return $ajax(`/dfas-auth-center/authRole/dataAuthRole/synchronizeDataAuth`, params, 'post');
};

/**根据产品id批量获取产品代码和名称 */
export const getBatchProductCodeAndName = ids => {
  return $ajax(`/bmtp-product-manage/product/product/getProductByProductIdList`, ids, 'post');
};

/**产品列表分页 */
export const listProductIdCodeAndName = params => {
  return $ajax(`/bmtp-product-manage/product/product/listProductIdCodeAndName`, params, 'post');
};

/**批量传递产品Id, 查询已授权产品 */
export const filterAuthorizedProductId = params => {
  return $ajax(
    `/dfas-auth-center/authRole/dataAuthRole/queryDataAuthByRoleCodeAndProductIdList`,
    params,
    'post'
  );
};

/**查询服务器是否开启同步 */
export const queryDataAuthSynchronizeFlag = () => {
  return $ajax(
    `/dfas-auth-center/authRole/dataAuthRole/queryDataAuthSynchronizeIsOpen`,
    {},
    'post'
  );
};
