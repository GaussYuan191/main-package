/**
 * 用户管理 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class UserManageService {
  // 查询机构树
  getOrgTreeData(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/org/listTree',
      method: 'post',
      data: params
    });
  }

  // 根机构查询用户
  getUserByOrgCode(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/user/pageList',
      method: 'post',
      data: params
    });
  }

  // 查询用户列表
  getUserLimit(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: 'user/listLimit',
      method: 'post',
      data: params
    });
  }

  // 新增用户
  addUser(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/user/save',
      method: 'post',
      data: params
    });
  }

  // 修改用户
  modifyUser(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/user/update',
      method: 'put',
      data: params
    });
  }

  // 删除用户
  removeUser(id) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/deleteById/${id}`,
      method: 'delete'
    });
  }

  // 用户锁定
  lockUser(userCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/lock/${userCode}`,
      method: 'put'
    });
  }

  // 用户解锁
  unlockUser(userCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/unlock/${userCode}`,
      method: 'put'
    });
  }

  // 重置密码
  resetUserPwd(userCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/resetPassword/${userCode}`,
      method: 'put'
    });
  }

  // 用户注销
  userLogOff(userCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/notInPosition/${userCode}`,
      method: 'put'
    });
  }

  //权限刷新
  refreshAuth(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/user/permitCache/loadCache`,
      method: 'post',
      data: params
    });
  }
}
