import { page } from 'yss-biz';
import moment from 'moment';
export default {
  queryDataForPledgeBond: {
    dateType: '0',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    ...page
  },
  pledgeBondList: {
    list: 0,
    total: 0
  },
  pledgeBondRowd: {},
  entrustSide: [],
};
