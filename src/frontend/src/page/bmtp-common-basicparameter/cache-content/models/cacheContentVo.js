import { page } from 'yss-biz';
import moment from 'moment';

export default {
  queryElement: { ...page },
  dataList: {
    list: [],
    total: 0
  },
  rowDetial: null,
  refreshList: []
};
