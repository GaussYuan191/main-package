/***附件Vo** */

export default {
  /**委托人附件表头*/
  enclosureColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },

    {
      title: '文档类型',
      width: 150,
      name: 'name'
    },
    {
      title: '管理人',
      width: 150,
      dataIndex: 'name'
    },

    {
      title: '附件编号',
      dataIndex: 'founder',
      width: 150
    },
    {
      title: '文档来源',
      dataIndex: 'source',
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
  /****文件类型列表 */

  enclosureFileTypeList: [
    {
      name: '文件列表1',
      code: '0'
    },
    {
      name: '文件列表2',
      code: '1'
    }
  ],
  /****附件变号 */
  enclosureNo: '',

  /****附件ID选择查看 */
  enclosureedId: '',

  /***弹框status*/
  isOpenFormModal2: {
    status: false
  }
};
