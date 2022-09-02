/**
 * 参数操作日志表 Service
 * @author jianshengxiong
 */
import { service } from 'bmtp-trade-base';
export default class ParamParameterLogService {
  // 分页查询
  getParamParameterLogPageList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/parameter/log/pageList',
      method: 'post',
      data: params
    });
  }
}
