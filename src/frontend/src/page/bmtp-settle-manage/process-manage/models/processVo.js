import { page } from 'yss-biz';
// 合同管理-数据
export default {
  // 指令表格
  processTable: {
    data: [],
    innerData: [],
    modalData: []
  },

  total:"",
  paging: { ...page },

  /**指令模糊查询条件*/
  processQueryForm: {
    publisherName: '',
    bizCategory: ''
  },

  /***弹框status*/
  isOpenFormModal: {
    //affirm结算确认  fail确认失败
    type: '',
    status: false
  }
};
