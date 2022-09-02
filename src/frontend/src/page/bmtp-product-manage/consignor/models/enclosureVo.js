/***附件Vo** */

export default {
  /**委托人附件表头*/
  enclosureColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '附件名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '文档来源',
      dataIndex: 'sourceName',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
    }
  ],
  /****附件列表 */
  enclosureList: [],

  /****附件ID选择查看 */
  enclosureedId: '',

  /***弹框status*/
  isOpenFormModal2: {
    status: false
  }
};
