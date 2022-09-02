import { page } from 'yss-biz';
// 外汇基金设置-数据
export default {
  // 表格
  forexSettingTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 80
      },
      {
        title: '基金简称',
        dataIndex: 'fundShortName',
        key: 'fundShortName',
        width: 150
      },
      {
        title: '产品代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 160
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200
      },
      {
        title: '审核状态 ',
        dataIndex: 'checkStatusName',
        key: 'checkStatusName',
        width: 150
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 120
      },
      {
        title: '审核人',
        dataIndex: 'checkUserName',
        key: 'checkUserName',
        width: 120
      }
    ],
    data: [],
    dataTotal: 0,
    innerData: [],
    modalData: []
  },
  // 分页请求参数
  pageReqParm: { ...page },

  /**模糊查询条件*/
  forexSettingQueryForm: {},
  dataDetail: {} //数据详情
};
