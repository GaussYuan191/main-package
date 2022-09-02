// import { isCheckTrue } from "yss-biz/utils/util/tools"
import { filterNullElement } from 'yss-biz';
import { message } from 'antd';
import {
  getTrusteeship,
  getSettlement,
  getConsignor,
  generateCustReptData,
  getCurTradeDate
} from '../services/index';
export default {
  /**查询列表*******/
  async httpGetList(state, { type, reqPageNum }, { getState }) {
    try {
      let active = state.get('active');
      let queryElement = {
        ...state.get(type).toJS(),
        reqPageNum: reqPageNum ? reqPageNum : state.get(type).toJS().reqPageNum
      };
      let listName = {
        1: 'truteeshipList',
        2: 'settlementList',
        3: 'consignorList'
      };
      let tabsName = {
        1: 'tsv_queryElement',
        2: 'stv_queryElement',
        3: 'csv_queryElement'
      };

      let result = {};
      if (active == 1) {
        result = await getTrusteeship(filterNullElement(queryElement));
      } else if (active == 2) {
        result = await getSettlement(filterNullElement(queryElement));
      } else if (active == 3) {
        result = await getConsignor(filterNullElement(queryElement));
      }
      // await pathName[active](filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      return state
        .setIn([listName[active], 'dataSource'], data.list)
        .setIn([listName[active], 'total'], data.total)
        .setIn([tabsName[active], 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 结算明细数据表格生成报表
  async httpGenerateCustReptData(state, params) {
    try {
      const { msg, winRspType } = await generateCustReptData(params);
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      } else {
        message.success(`成功：${msg}`);
      }
    } catch (error) {
      message.error(`异常：${error}`);
    }
  },
  // 获取当前系统交易日期；
  async httpGetCurTradeDate(state) {
    const result = await getCurTradeDate();
    const { winRspType, data, msg } = result;
    if (winRspType === 'SUCC') {
      const { currentTradeDate } = data;
      return state
        .setIn(['tsv_queryElement', 'tradeDate'], currentTradeDate)
        .setIn(['stv_queryElement', 'settleDate'], currentTradeDate)
        .setIn(['csv_queryElement', 'reporteTime'], currentTradeDate)
        .setIn(['currentTradeDate'], currentTradeDate)
        .setIn(['searchDate'], currentTradeDate);
    } else {
      message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
      return state.setIn(['currentTradeDate'], '');
    }
  },
};
