import { page } from 'yss-biz/utils/util/constant';
import moment from 'moment';
export default {
  // changeQueryDatasForBusiness(state, values, { getState }) {
  //     state = getState()
  //     let queryDatasForBusiness = state.get('queryDatasForBusiness').toJS()
  //     return state.merge({
  //         queryDatasForBusiness: { ...queryDatasForBusiness, ...values }
  //     })
  // },
  /**选择一条表格账户记录进行保存*/
  changeTableRow(state, { type, value }) {
    return state.set(type, value);
  },
  setPages(state, page, { getState }) {
    state = getState();
    return state.merge({
      page
    });
  },
  setRowChecked(state, { ids }, { getState }) {
    state = getState();
    return state.merge({
      clickIds: ids
    });
  },
  changeQueryElement(state, { type, value }) {
    let query = state.get(type).toJS();
    return state.merge({
      [type]: { ...query, ...value }
    });
  },

  toChangeTabType(state, { type }) {
    return state.set('tabType', type);
  },

  // 重置功能
  toReasetSearch(state, queryElement) {
    let type = state.get('tabType'),
      query = null,
      dateTime = {};
    if (type == 1) {
      query = 'queryDataForBusiness';
      dateTime.dateType = '0';
      dateTime.startDate = moment().format('YYYY-MM-DD');
      dateTime.endDate = moment().format('YYYY-MM-DD');
    } else if (type == 2) {
      query = 'queryDataForPledgeBond';
      dateTime.dateType = '0';
      dateTime.startDate = moment().format('YYYY-MM-DD');
      dateTime.endDate = moment().format('YYYY-MM-DD');
    } else if (type == 3) {
      query = 'queryDataForDistribution';
      dateTime.startSettleDate = moment().format('YYYY-MM-DD');
      dateTime.endSettleDate = moment().format('YYYY-MM-DD');
    }
    return state.merge({
      [query]: {
        ...dateTime,
        ...page,
        ...queryElement
      }
    });
  },
  // 修改委托方向值
  toChangeEntrustSideValue(state, values) {
    return state.set('entrustSide', values);
  },

  setRow(state, row) {
    return state.set('row', row);
  }
};
