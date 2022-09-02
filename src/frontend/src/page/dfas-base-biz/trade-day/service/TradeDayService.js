/**
 * 交易日 Service
 */
import { service } from 'bmtp-trade-base';

export default class TradeDayService {
  // 交易日类型-列表
  getTradeDayTypeList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/tradeDayType/list',
      method: 'post',
      data: params
    });
  }

  // 交易日-列表
  getTradeDayList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/tradeDay/list',
      method: 'post',
      data: params
    });
  }

  // 获取法定节假日
  getLegalHoliday(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/tradeDay/legalHoliday',
      method: 'post',
      data: params
    });
  }

  // 设置交易日
  configTradeDay(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: 'tradeDay/config',
      method: 'put',
      data: params
    });
  }
}
