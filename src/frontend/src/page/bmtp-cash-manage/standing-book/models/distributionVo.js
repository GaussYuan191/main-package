import { page } from 'yss-biz';
import moment from 'moment';
export default {
  queryDataForDistribution: {
    startSettleDate: moment().format('YYYY-MM-DD'),
    endSettleDate: moment().format('YYYY-MM-DD'),
    ...page
  },
  distributionList: {
    list: [],
    total: 0
  },
  distributionRowd: {},
  opponentList: [], //对手方数据
  row: {}
};
