import { page } from 'yss-biz/utils/util/constant';
import moment from 'moment';
// 接收消息管理
export default {
  receiveHandlingDataList: {
    list: [],
    total: 0
  },
  receiveHandlingColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '接口名称',
      width: 200,
      dataIndex: 'interfaceName',
      key: 'interfaceName'
    },
    {
      title: '数据类型',
      width: 200,
      dataIndex: 'dataTypeName',
      key: 'dataTypeName'
    },
    {
      title: '协议方式',
      width: 200,
      dataIndex: 'protocolName',
      key: 'protocolName'
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ],

  /**查询条件列表*/
  queryReceiveElement: {
    ...page
  },
  /***弹框status*/
  isOpenReceiveFormModal: {
    status: false
  },
  // 查看数据
  lookReceiveData: {}
};
