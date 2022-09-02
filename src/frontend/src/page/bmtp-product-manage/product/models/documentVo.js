/***附件Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /**委托人文档表头*/
  documentColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '所属产品',
      width: 150,
      dataIndex: 'name'
    },
    {
      title: '文档类型',
      width: 150,
      dataIndex: 'typeName'
    },
    {
      title: '文档来源',
      dataIndex: 'source',
      width: 150
    },
    {
      title: '附件编号',
      dataIndex: 'founder',
      width: 150
    },
    {
      title: '附件记录',
      dataIndex: 'creationNo',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 150
    }
  ],
  /****附件列表 */
  documentList: [],
  /****文件类型列表 */

  /**查询条件列表*/
  queryDocumentElement: {
    subjectType: 1, //产品
    type: 0, //文档全部
    ...page
  },

  /***弹框status*/
  isOpenFormModal2: {
    status: false
  }
};
