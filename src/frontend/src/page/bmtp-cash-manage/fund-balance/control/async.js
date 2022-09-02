/*********公共***********/
import { message } from 'antd';
import {
  searchAssetAccountBalanceList,
  searchAboutBalanceList,
  // axiosGetAssetAccountBalanceBySubjectOrProduct,
  axiosDaytimeWithdrawals,
  batchReturnedMoney,
  getCurTradeDate,
  axioSend
} from '../services';
import { page, getValue } from 'yss-biz';

/***交易明细类型*** */

export default {
  /*资金账户余额查询与关联查询**/
  async httpAssetAccountBalanceList(state, { params }, { mutations, getState }) {
    let result = await searchAssetAccountBalanceList(params);

    try {
      const { data, winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        if (!data['list'].length && data['list'].length !== 0) {
          return;
        }

        data['list'].total = data.total;
        let assetAccountSn =
          params.assetAccountSn || (data && data.list[0] && data.list[0]['assetAccountSn']);

        if (assetAccountSn) {
          state = getState();
          state = await mutations.asyncHttpSearchAboutBalanceList({
            ...page,
            assetAccountSn
          });
        }

        return state.set('businessList', data.list).set('selectPro', data && data.list[0]);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*查询关联**/
  async httpSearchAboutBalanceList(state, params, { getState }) {
    let result = await searchAboutBalanceList(params);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      let reqData = { data: data.list, dataTotal: data.total };
      return state.set('relationList', reqData);
    } else {
      message.error(msg || '数据错误');
    }
  },
  // 日间提款获取账号信息
  // async getAssetAccountBalanceBySubjectOrProduct(state, params, { getState }) {
  //   let result = await axiosGetAssetAccountBalanceBySubjectOrProduct(params);
  //   let data = getValue(result.data, {});
  //   state = getState();
  //   return state.merge({ assetAccount: data });
  // },
  // 日间提款提交
  async submitDaytimeWithdrawals(state, params, { getState }) {
    let result = await axiosDaytimeWithdrawals(params);
    const { winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 批量回款
  async httpBatchReturnedMoney(state, params, { mutations }) {
    let result = await batchReturnedMoney(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpAssetAccountBalanceList({ params: { ...page } });
      message.success(msg);
    } else {
      message.error(msg || '数据错误');
    }
  },
  // 获取当前系统交易日期
  async httpGetCurTradeDate(state) {
    const result = await getCurTradeDate();
    const { winRspType, data, msg } = result;
    if (winRspType === 'SUCC') {
      const { currentTradeDate } = data;
      return state.setIn(['currentTradeDate'], currentTradeDate);
    } else {
      message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
      return state.setIn(['currentTradeDate'], '');
    }
  },

  //发送
  async httpAxiosSend(state, params, { mutations }) {
    let result = await axioSend(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpAssetAccountBalanceList({ params: { ...page } });
      message.success(msg || '发送成功', 1);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
