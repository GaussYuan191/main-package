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
      title: '文档类型',
      width: 150,
      dataIndex: 'typeName'
    },
    {
      title: '附件名称',
      dataIndex: 'name',
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
    }
  ],
  /****附件列表 */
  documentList: [],
  /****文件类型列表 */

  /****附件变号 */
  enclosureNo: '',

  /****附件ID选择查看 */
  enclosureedId: '',

  /**查询条件列表*/
  queryDocumentElement: {
    subjectType: 2, //委托人
    type: 0, //文档全部
    ...page
  },

  /***弹框status*/
  isOpenFormModal2: {
    status: false
  },

  /***点击文档保存当前的文档*/
  documented: {}
};
