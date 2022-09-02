// 相关信息-数据
import { page } from 'yss-biz';
export default {
  //about
  aboutTable: {
    col: [
      {
        title: '结算日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 150
      },
      {
        title: '业务功能',
        dataIndex: 'jobName',
        key: 'jobName',
        width: 150
      },
      // {
      //   title: '操作',
      //   dataIndex: 'productCode',
      //   key: 'productCode',
      //   width: 150
      // },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
        width: 150
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 150
      },
      {
        title: '耗费时长（ms）',
        dataIndex: 'spanTime',
        key: 'spanTime',
        width: 150
      }
    ],
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    total1: 0,
    total2: 0,
    total3: 0,
    total4: 0
  },
  /**查询条件列表*/
  queryAboutElement: {
    ...page
  },

  // 详情分页查询条件
  queryDetailElement: {
    ...page
  },
  //详情列表
  detailList: []
};
