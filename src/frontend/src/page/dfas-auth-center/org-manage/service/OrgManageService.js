/**
 * 机构管理 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class OrgManageService {
  // 查询机构树
  getOrgTreeData(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/org/listTree',
      method: 'post',
      data: params
    });
  }

  // 根据父机构查询机构树
  getOrgByOrgCode(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/org/listTreeByOrgCode',
      method: 'post',
      data: params
    });
  }

  // 新增机构
  addOrg(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/org',
      method: 'post',
      data: params
    });
  }

  // 修改机构
  modifyOrg(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: '/org',
      method: 'put',
      data: params
    });
  }

  // 删除机构
  removeOrg(params) {
    return service.httpService({
      baseURL: service.dfasAuthCenter,
      url: `/org/deleteByOrgCode`,
      method: 'delete',
      data: params
    });
  }
}
