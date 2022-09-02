// import { isCheckTrue } from "yss-biz/utils/util/tools"
import { filterNullElement } from 'yss-biz';
import { message } from 'antd';
import {
  getQueryList,
  addRow,
  updateRow,
  deleteRow,
  aboutList,
  adjustList,
  saveAjustResult,
  dataSplit,
  splitAffirm,
  cacelAffirm,
  sendBill,
  getBondAccount,
  holdBalance,
  getFaceRate,
  currentTradingDay,
  toCheckData,
  toUnCheckData,
  getBondQueryList
  // allBondList
} from '../serices/index';
export default {
  /**查询列表*******/
  async httpGetList(state, params, { getState, mutations }) {
    try {
      // state = getState()
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getQueryList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      if (data.list.length > 0) {
        //默认展示A区第一条数据的产品利息兑付信息
        state = await mutations.asyncHttpGetAboutList(data.list[0]);
        state = mutations.toResetAbout();
        state = mutations.setRowInfo({ value: data.list[0] });
        state = mutations.changeQueryAboutElement({ parentid: data.list[0].id });
      }

      return state
        .setIn(['settlementList', 'list'], data.list)
        .setIn(['settlementList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***增加一行*******/
  async httpAddRow(state, { params }, { mutations }) {
    let result = await addRow(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***债券账号*******/
  async httpBondAccount(state, params, { mutations }) {
    let result = await getBondAccount();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      data.map(item => {
        item.label = `${item.bondTrusteeshipAccount} - ${item.bondTrusteeshipName}`;
        item.value = item.bondTrusteeshipAccount;
      });
      return state.set('bondAccoutList', data);
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 持仓余额
  async httpBoldBalance(state, params, { mutations }) {
    let result = await holdBalance(params);
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      // message.success(msg);
      return state.set('boldBalanceNum', data.list[0] ? data.list[0].bondAccount : 0);
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 票面利率
  async httpFaceRate(state, { code }, { mutations }) {
    let result = await getFaceRate(code);
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      // message.success(msg);
      return state.set('faceRate', data ? data.couponRate : 0);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***修改一行*******/
  async httpUpDatRow(state, { params }, { mutations }) {
    let result = await updateRow(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***删除一行*******/
  async httpDeleteRow(state, { id }, { mutations }) {
    let result = await deleteRow(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 拆分
  async httpDataSplit(state, { id }, { mutations }) {
    let result = await dataSplit(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 拆分确认
  async httpSplitAffirm(state, { id }, { mutations }) {
    let result = await splitAffirm(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 取消确认
  async httpCacelAffirm(state, { id }, { mutations }) {
    let result = await cacelAffirm(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  // 发送账单
  async httpSendBill(state, { id }, { mutations }) {
    let result = await sendBill(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg || '请求错误');
    }
  },

  // /*****关联信息******/
  async httpGetAboutList(state, { id }, { getState }) {
    try {
      if (!id) {
        return;
      }

      let result = await aboutList(id);
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      return state
        .setIn(['aboutList', 'list'], data || [])
      // .setIn(['aboutList', 'total'], data.total);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 加载手工调整列表
  async httpAjustList(state, { params = {} }, { getState }) {
    try {
      let id = state.get('selectRow').id;
      let result = await adjustList(id);
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      return state.merge({
        readjustingList: data || []
      });
    } catch (e) {
      message.error('请求错误');
    }
  },

  //保存调整结果
  async httpSaveAjustResult(state, { params }, { getState, mutations }) {
    let result = await saveAjustResult(params);
    const { msg, winRspType } = result;
    let ele = state.get('selectRow');
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = mutations.asyncHttpGetAboutList(ele);
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },

  // 审核
  async httpToCheckData(state, ids, { getState, mutations }) {
    let result = await toCheckData(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },

  // 反审核
  async httpToUnCheckData(state, ids, { getState, mutations }) {
    let result = await toUnCheckData(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },

  // 获取当前交易日
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      state = mutations.changeQueryElement({
        tradeStartDate: data.currentTradeDate,
        tradeEndDate: data.currentTradeDate
      });
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***** 债券回售 *****/
  // 获取列表
  async httpGetBondList(state, params, { getState, mutations }) {
    try {
      // state = getState()
      let queryElement = {
        ...state.get('queryBondSaleBackElement').toJS()
      };
      let result = await getBondQueryList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      return state
        .setIn(['bondSaleBackList', 'list'], data.list)
        .setIn(['bondSaleBackList', 'total'], data.total);
    } catch (e) {
      message.error('请求错误');
    }
  }

  // 获取全量债券信息
  // async httpAllBondList(state, { param = {}, callback = () => {} }) {
  //   const params = {
  //     reqPageNum: 1,
  //     reqPageSize: 100,
  //     marketCode: 'YH',
  //     ...param
  //   };
  //   callback(true);
  //   let result = await allBondList(params);
  //   callback(false);
  //   const { msg, winRspType, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let arr = [];
  //     if (data.list && data.list.length > 200) {
  //       arr = data.list.slice(0, 200);
  //     } else {
  //       arr = data.list;
  //     }
  //     arr.map(item => {
  //       item.label = `${item.bondCode} - ${item.securityName}`;
  //       item.value = item.bondCode;
  //     });
  //     return state.set('allBondList', arr);
  //   } else {
  //     message.error(msg || '请求错误');
  //   }
  // }
};
