import { page } from 'yss-biz/utils/util/constant';
import { getNowFormatDate } from 'yss-biz';
// 读取数据
export default {
  // 读取数据
  dataList: {
    list: [],
    total: 0
  },

  checkList: [],

  readDataColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '接口名称',
      width: 300,
      dataIndex: 'intefacename',
      key: 'intefacename'
    },
    {
      title: '数据读取状态',
      width: 150,
      dataIndex: 'uploadStatusName',
      key: 'uploadStatusName'
    },
    {
      title: '读取耗时',
      width: 150,
      dataIndex: 'consumeTime',
      key: 'consumeTime'
    }
  ],

  /**查询条件列表*/
  queryElement: {
    ...page
  },

  // 上传相关参数
  uploadParams: {
    tradeDate: getNowFormatDate('date')
  },

  // 查询树

  queryTree: {},

  treeData: []
};
