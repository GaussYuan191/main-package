/**
 * 系统菜单管理 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class SystemMenuService {
  // 系统菜单树
  getSystemMenuTreeData(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/menu/listTreeAll',
      method: 'post',
      data: params
    });
  }

  // 根据父菜单编码查询菜单
  getMenuByParMenuCode(parentMenuCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/menu/listTree/${parentMenuCode}`,
      method: 'get'
    });
  }

  // 新增菜单
  addSystemMenu(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/menu/add',
      method: 'post',
      data: params
    });
  }

  // 修改菜单
  modifySystemMenu(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/menu/update',
      method: 'post',
      data: params
    });
  }

  // 删除菜单
  removeSystemMenu(menuCode) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/menu/delete/${menuCode}`,
      method: 'delete'
    });
  }

  // 查询菜单功能
  getMenuFunc(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: 'menuFunc/listMenuFuncByCondition',
      method: 'post',
      data: params
    });
  }

  // 新增菜单功能
  addMenuFunc(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/menuFunc/add',
      method: 'post',
      data: params
    });
  }

  // 修改菜单功能
  modifyMenuFunc(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/menuFunc/update',
      method: 'post',
      data: params
    });
  }

  // 删除菜单功能
  removeMenuFunc(id) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/menuFunc/delete/${id}`,
      method: 'delete'
    });
  }
}
