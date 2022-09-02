/**
 * 参数缓存 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class ParamCacheService {
  // 查询参数缓存
  getParamCachePageList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/redis/listCache',
      method: 'post',
      data: params
    });
  }

  // 刷新参数缓存
  refreshParamCache(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/redis/refreshCache',
      method: 'post',
      data: params
    });
  }
}
