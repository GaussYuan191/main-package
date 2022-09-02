/**
 * 系统版本发布信息表 Service
 * @author jianshengxiong
 */
import { service } from 'bmtp-trade-base';
export default class SysVersionPublishService {
  // 系统版本发布信息-分页
  getVersionPageList(params) {
    return service.httpService({
      baseURL: service.dfasBaseBiz,
      url: '/sysVersionPublish/pageList',
      method: 'post',
      data: params
    });
  }
}
