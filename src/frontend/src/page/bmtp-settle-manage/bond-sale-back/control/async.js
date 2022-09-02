import { filterNullElement } from 'yss-biz';
import { message } from 'antd';
import {
  getQueryList,
  childrenList,
  // productInfoList,
  getProductMsg,
  getMapCode,
  // getBondInfoGroupByReport,
  // getTradeInstrIdGroupByReport
  getSellBackDist
} from '../serices/index';

export default {
  async httpGetList(state, params, { getState, mutations }) {
    try {
      let queryElement = {
        ...state.get('queryBondSaleBackElement').toJS(),
        ...params
      };
      let result = await getQueryList({
        // isProductLevel: true,
        ...filterNullElement(queryElement)
      });
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      return state
        .setIn(['bondSaleBackList', 'list'], data.list)
        .setIn(['bondSaleBackList', 'total'], data.total)
        .setIn(['queryBondSaleBackElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },
  /*查询列表**/
  async httpSearchQfList(state, { params, type, cb }, { mutations, getState }) {
    try {
      if (!params.execCode) {
        return;
      }
      let queryElement = {
        reqPageNum: 1,
        reqPageSize: 100,
        execCode: params.execCode
      };

      let result = await childrenList(filterNullElement(queryElement), type);
      const { winRspType, data, msg } = result;

      //获取第一个表格的第一行的code值
      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data.list);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*查询子行表格**/
  async httpSearchChildrenList(state, { id, cb }) {
    try {
      if (!id) {
        return;
      }
      let queryElement = id;
      let result = await getSellBackDist(queryElement);
      const { winRspType, data, msg } = result;

      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  // 获取数据字典信息
  async httpGetMapCode(state, { params, types }, { getState }) {
    try {
      let result = await getMapCode(params);
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        return state.set(types, data);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (error) {
      message.error(error || '请求错误');
    }
  }
  // // 获取查询项信息--债券
  // async getBondInfoGroupByReport(state) {
  //   let result = await getBondInfoGroupByReport();
  //   const { winRspType, msg, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let arr = [];
  //     data.list.map(item => {
  //       arr.push({
  //         value: item.bondCode,
  //         label: `${item.bondCode} - ${item.securityName}`
  //       });
  //     });
  //     return state.set('bondNameListBondSaleBack', arr);
  //   } else {
  //     message.error(msg || '操作失败');
  //   }
  // },
  // // 获取查询项信息--交易指令编号
  // async getTradeInstrIdGroupByReport(state) {
  //   let result = await getTradeInstrIdGroupByReport();
  //   const { winRspType, msg, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let arr = [];
  //     data.map(item => {
  //       arr.push({
  //         value: item,
  //         label: item
  //       });
  //     });
  //     return state.set('InstrIdListBondSaleBack', arr);
  //   } else {
  //     message.error(msg || '操作失败');
  //   }
  // }
};
