/*********公共***********/
import { message } from 'antd';
import {
  getOfflineRetailList,
  getOfflineRetailAboutList,
  counterpartyInfo,
  listItemDetial,
  createStandingBook
} from '../services';
import { filterNullElement } from 'yss-biz';

/***交易明细类型*** */
export default {
  /*资金账户余额查询与关联查询**/
  async httpGetList(state, params, { mutations, getState }) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getOfflineRetailList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      // if (data.list.length > 0) {
      //   //默认展示A区第一条数据的信息
      //   state = await mutations.asyncHttpGetAboutList(data.list[0]);
      //   state = mutations.changeTableRow({ value: data.list[0] });
      // } else {
      //   //关联表没数据时，手动清除前一次查询的关联表数据
      //   return state
      //     .setIn(['retailList', 'list'], data.list)
      //     .setIn(['retailList', 'total'], data.total)
      //     .merge({
      //       relationList: []
      //     });
      // }

      // return state.merge({
      //   retailList: data.list
      // });
      return state
        .setIn(['retailList', 'list'], data.list)
        .setIn(['retailList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      //message.error('请求错误');
    }
  },

  /*查询关联**/
  async httpGetAboutList(state, params, { getState }) {
    try {
      if (!params.tradeOrderId) {
        return;
      }
      let result = await getOfflineRetailAboutList(params.tradeOrderId);
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      return state.merge({
        relationList: data
      });
    } catch (e) {
      //message.error('请求错误');
    }
  },

  async httpCounterpartyInfo(state, params, { getState }) {
    try {
      let result = await counterpartyInfo();
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      let arr = []
      data.forEach(item => {
        let [counterBondAccount, counterName] = item.split('-');
        if (!counterBondAccount || !counterName) {
          return false;
        }
        arr.push({
          label: counterName,
          value: counterName,
          key: counterBondAccount
        })
      });
      return state.merge({
        counterpartyInfoList: arr
      });
    } catch (e) {
      //message.error('请求错误');
    }
  },

  async httpQueryZLQf(state, { params, cb }, { getState }) {
    let result = await listItemDetial(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      // state = getState();
      // return state.set('qfTable', data);
      typeof cb == 'function' && cb(data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  async httpCreateStandingBook(state, params) {
    let result = await createStandingBook(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
    } else {
      // Modal.error({
      //   title: '生成台账失败',
      //   content: `下列交易指令编号对应的数据生成台账失败:\n`
      // });
      message.error(msg);
    }
  }
};
