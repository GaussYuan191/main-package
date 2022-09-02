import { selectRequest, page } from 'yss-biz';
export default {
  selectRequest,
  isOpenFormModal: {
    status: false
  },
  setMessageType: 'bond',
  query: {
    ...page
  },
  listTotal: 0,
  tableDatas: [],
  clickRow: {},
  moneyForm: {},
  bondForm: {},
  productForm: {},
  consignorForm: {},
  // 当前系统交易日的时间
  currentTradeDate: '',
  rowRecords:[],
  rows:[],
  selectRowsIds:[],
  selectedChildData:[],
  relatedSubjectCodes:[],
  // bondNames:[],
  // bondAccountList:[]
};
