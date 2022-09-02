/**
 * 角色管理 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class RoleManageService {
  // 查询角色树
  getRoleTreeData() {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/user/orgrole/listTree',
      method: 'get'
    });
  }

  // 查询角色列表
  getRoleList(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/sysRole/list',
      method: 'post',
      data: params
    });
  }

  // 新增角色
  addRole(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/sysRole/addRole',
      method: 'post',
      data: params
    });
  }

  // 修改角色
  modifyRole(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/sysRole/updateRole',
      method: 'post',
      data: params
    });
  }

  // 删除角色
  removeRole(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/sysRole/delRole',
      method: 'post',
      data: params
    });
  }

  // 根据角色编号查询机构
  getOrgByRoleCode(roleCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/grantAssign/listByRoleCode/${roleCode}`,
      method: 'get'
    });
  }

  // 查询角色菜单功能树
  getRoleMenuFuncTreeData(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/sysRole/queryMenuFunTree',
      method: 'post',
      data: params
    });
  }

  // 查询功能类型
  getFuncType() {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/funcType/list',
      method: 'get'
    });
  }

  // 保存角色菜单功能权限
  saveRoleMenuFuncData(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/user/roleFunc/update',
      method: 'post',
      data: params
    });
  }

  // 根据角色编码查互斥角色
  getMutexRole(roleCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/sysRole/queryMutex/${roleCode}`,
      method: 'get'
    });
  }

  // 查询角色类别
  getRoleType() {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/roleType/list `,
      method: 'get'
    });
  }
}
