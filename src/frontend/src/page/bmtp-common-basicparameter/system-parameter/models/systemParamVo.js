import { page } from 'yss-biz';
export default {
  // 选中行
  rowChecked: [],
  // 分页
  paging: { ...page },
  // 修改表格参数值信息后回调的状态值
  callbackForTableChange: {},
  systemParamQueryList: {
    paramClass: [],
    paramDetailClass: []
  },
  // 模糊查询信息集合
  systemParamQueryValues: {
    businessType: '',
    businessTypeDetail: '',
    parameterName: '',
    checkStatus: ''
  },
  paramTable: {
    columns: [
      {
        title: '编号',
        dataIndex: 'parameterCode',
        key: 'parameterCode',
        width: 300,
        ellipsis: true
      },
      {
        title: '参数分类',
        dataIndex: 'businessType',
        key: 'businessType',
        width: 100,
        ellipsis: true
      },
      {
        title: '参数明细分类',
        dataIndex: 'businessTypeDetail',
        key: 'businessTypeDetail',
        width: 200,
        ellipsis: true
      },
      {
        title: '参数名',
        dataIndex: 'parameterName',
        key: 'parameterName',
        width: 200,
        ellipsis: true
      },
      {
        title: '审核状态',
        dataIndex: 'checkStatusName',
        width: 120,
        key: 'checkStatusName',
        ellipsis: true
      }
    ],
    dataSource: [],
    total: 0
  }
};
