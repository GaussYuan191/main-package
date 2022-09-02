import { page } from 'yss-biz/utils/util/constant';
import moment from 'moment';
// 异常处理-数据
export default {
  // 日结List
  dataList: {
    list: [],
    total: 0
  },

  ecphdColumns: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '日期',
      width: 180,
      dataIndex: 'bussinessDate',
      key: 'bussinessDate'
    },
    {
      title: '接口名称',
      width: 200,
      dataIndex: 'interfaceName',
      key: 'interfaceName'
    },
    {
      title: '数据id',
      width: 200,
      dataIndex: 'dataId',
      key: 'dataId'
    },
    {
      title: '成交编号',
      width: 200,
      dataIndex: 'execCode',
      key: 'execCode'
    },
    {
      title: '失败时间',
      width: 200,
      dataIndex: 'failTime',
      key: 'failTime'
    },
    {
      title: '对方系统',
      width: 150,
      dataIndex: 'targetSystem',
      key: 'targetSystem'
    },
    {
      title: '数据状态',
      width: 150,
      dataIndex: 'statusName',
      key: 'statusName'
    },
    {
      title: '发送次数',
      width: 150,
      dataIndex: 'sendNumber',
      key: 'sendNumber'
    },
    // {
    //   title: '创建人',
    //   width: 150,
    //   dataIndex: 'createUserName',
    //   key: 'createUserName'
    // },
    {
      title: '重发时间',
      width: 160,
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '备注',
      width: 300,
      dataIndex: 'remark',
      key: 'remark'
    }
  ],

  /**查询条件列表*/
  queryElement: {
    // bussinessDate: moment().format('YYYY-MM-DD'),
    status: 2,
    ...page
  },
  /***弹框status*/
  isOpenFormModal: {
    status: false
  },
  // 查看数据
  lookData: {}
};
