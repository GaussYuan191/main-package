/**
 * 数据字典 Service
 * @author daizq
 */
import { service } from 'bmtp-trade-base';

export default class DataDictionaryService {
  // 查询数据字典
  getDataDictionaryPageList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/dics/list',
      method: 'post',
      data: params
    });
  }

  // 查询数据字典子项
  getDictionaryDetail(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/dics/listSub',
      method: 'post',
      data: params
    });
  }
}
