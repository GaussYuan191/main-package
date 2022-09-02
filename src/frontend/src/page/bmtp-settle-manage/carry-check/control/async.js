/*********公共***********/
import { message } from 'antd';
import {
  searchCheckList,
  exportExecutionReportBond,
  exportExecutionReportCurrent,
  getAccoutType,
  toImportOpt,
  currentTradingDay
} from '../services/index';

import { handleExport, filterNullElement } from 'yss-biz';

export default {
  /*查询列表**/
  async httpSearchCheckList(state, params) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await searchCheckList(filterNullElement(queryElement));
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        return state
          .setIn(['tableList', 'list'], data.list)
          .setIn(['tableList', 'total'], data.total)
          .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*按条件导出**/
  async httpExportExecutionReportBond(state, { params, type }) {
    let result = await exportExecutionReportBond(params, type);
    handleExport(result, '持仓核对');
  },

  /*按条件导出**/
  async httpExportExecutionReportCurrent(state, { params, type }) {
    if (!params.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    let newParams = { ids: [] };
    params.forEach(element => {
      newParams.ids.push(element.id);
    });
    let result = await exportExecutionReportCurrent(newParams, type);
    handleExport(result, '持仓核对');
  },

  async httpAccountType(state, params, { mutations }) {
    let result = await getAccoutType({ parentDicCode: '1030006' });
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      let arr = [];
      data.length &&
        data.map(item => {
          if (item.dicCode == 1 || item.dicCode == 2) {
            arr.push({
              label: item.dicExplain,
              value: item.dicCode
            });
          }
        });
      return state.set('accountType', arr);
    } else {
      message.error(msg || '请求错误');
    }
  },

  async httpToImportOpt(state, params, { mutations }) {
    let query = state.get('queryElement').toJS();
    let result = await toImportOpt(`"${query.checkDate} 00:00:00"`);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpSearchCheckList({ reqPageNum: 1 });
      message.success(msg);
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 获取当前交易日
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      state = mutations.changeQueryElement({
        value: data.currentTradeDate,
        type: 'checkDate'
      });
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  }
};
