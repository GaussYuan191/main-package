/**
 * 参数表 Service
 * @author jianshengxiong
 */
import { service } from 'bmtp-trade-base';
export default class ParamParameterService {
  // 分页查询
  getParamParameterPageList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/parameter/pageList',
      method: 'post',
      data: params
    });
  }

  // 修改
  updateParamParameter(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/parameter/update',
      method: 'post',
      data: params
    });
  }

  // 启用
  enable(id) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/parameter/enable/' + id,
      method: 'put'
    });
  }

  // 停用
  unEnable(id) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/parameter/unEnable/' + id,
      method: 'put'
    });
  }
}
