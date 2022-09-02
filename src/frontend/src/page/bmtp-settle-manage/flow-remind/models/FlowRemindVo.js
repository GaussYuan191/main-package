import { page } from 'yss-biz/utils/util/constant';
export default {
  dataList: {
    list: [],
    total: 0
  },
  // 监控任务明细(temp)
  dataDetail: {},
  // 监控任务的节点配置(temp)
  flowNodeDetail: [],
  // 随机序列(temp)
  Sequence: '',
  // 监控配置所有数据
  flowConfigAllData: [],
  // 查询条件
  queryElement: {
    ...page,
  }
};
