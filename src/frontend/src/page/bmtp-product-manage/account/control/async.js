import asyncCommon from './asyncCommon.js';
import {
  getAssetRefBatch,
  getBondRefBatch,
  getTradeRefBatch,
  bondAccountType,
  capitalAccountType,
  requestProductInfoByACS
} from '../services/index';
import { message, Modal } from 'antd';

export default {
  ...asyncCommon,

  /**债券---获取资主体下全部债券账户列表*/
  async httpGetBondRefBatch(state, { codes }, { getState }) {
    let params = {
      relatedSubjectCodes: codes,
      reqPageNum: 1,
      reqPageSize: 20
    };
    let result = await getBondRefBatch(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      const { list } = data;
      if (list && list.length) {
        list.map(item => {
          item.label = item.bondTrusteeshipName;
          item.value = item.bondTrusteeshipAccountSn;
          item.key = item.id;
          return item;
        });
      }
      return state.set('bondAccountList', list);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**交易---获取资主体下全部债券账户列表*/
  async httpGetTradeRefBatch(state, { codes }, { getState }) {
    let arrays = codes;
    let result = await getTradeRefBatch(arrays);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('transactionAccountList', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 债券--账户类型获取
  async httpBondAccountType(state, params, { getState }) {
    let result = await bondAccountType({ parentDicCode: 1030006 });
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('bondAccountType', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 资金--账户类型获取
  async httpCapitalAccountType(state, params, { getState }) {
    let result = await capitalAccountType({ parentDicCode: 1030003 });
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('capitalAccountType', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 同步估值系统产品数据
  async httpRequestProductInfoByACS(state, params) {
    let result = await requestProductInfoByACS(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      Modal.info({
        title: '结果',
        content: msg
      });
    } else {
      message.error(msg || '数据错误');
    }
  }
};
