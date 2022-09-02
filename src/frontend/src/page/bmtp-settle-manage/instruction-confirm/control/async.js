import {
  // searcZJDList,
  searcAboutZJList,
  searcAboutDBList,
  searcAboutInfo,
  getMatchInstruction,
  getPendingConfirmInstructionForShQs,
  getPendingConfirmInstructionForZJD,
  getErbPageList,
  batchConfirmInstruction,
  batchFallBackInstruction,
  aboutSQInfo,
  aboutSQZJInfo,
  aboutSQBZInfo,
  currentTradingDay,
  batchSendInstruction,
  searcZLQf,
  getHandleMatchInstruction,
  handleMatchInstruction
} from '../services';
import { message, modal } from 'antd';
import { getValue, isObject, filterNullElement } from 'yss-biz';
import React from 'react';
export default {
  /****查询关联详情信息 */
  async httpSearcAboutInfo(state, { type, params = {} }) {
    let result = {};
    if (type == 'ZJD') {
      result = await searcAboutInfo(params.instrId);
    } else {
      result = await aboutSQInfo(params.tradeId);
    }

    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set(type === 'ZJD' ? 'dataDetail' : 'dataDetail', data);
    } else {
      message.error(msg || '加载错误');
    }
  },

  /****查询关联债券信息 */
  async httpSearchAboutZJList(state, { type, params = {} }) {
    let result = {};
    if (type == 'ZJD') {
      result = await searcAboutZJList({
        // reqPageNum: 1,
        // reqPageSize: 100,
        instrId: params.instrId
      });
    } else {
      result = await aboutSQZJInfo(params.tradeId);
    }

    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set(type === 'ZJD' ? 'ZJPledgeInfo' : 'ZJPledgeInfo', data.list);
    } else {
      message.error(msg || '加载错误');
    }
  },
  /****查询关联担保信息 */
  async httpSearcAboutDBList(state, { type, params = {} }) {
    let result = {};
    if (type == 'ZJD') {
      result = await searcAboutDBList({
        // reqPageNum: 1,
        // reqPageSize: 100,
        instrId: params.instrId
      });
    } else {
      result = await aboutSQBZInfo(params.tradeId);
    }

    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set(type === 'ZJD' ? 'ZJDBInfo' : 'ZJDBInfo', data.list);
    } else {
      message.error(msg || '加载错误');
    }
  },

  /*** 查询指令确认列表 */
  async httpGetPendingConfirmInstruction(state, { type, params }, { getState }) {
    let instructionQueryForm = {
      ...state.get(type === 'ZJD' ? 'instructionZJDQueryForm' : 'instructionQueryForm').toJS()
    };
    let param = filterNullElement(instructionQueryForm);
    let pageParam = { ...state.get(type === 'ZJD' ? 'pageReqParmZJD' : 'pageReqParm').toJS() };
    param = { ...param, ...pageParam };
    let result =
      type === 'ZJD'
        ? await getPendingConfirmInstructionForZJD({ ...param })
        : await getPendingConfirmInstructionForShQs({ ...param });
    const { winRspType, data, msg } = result || {};
    if (winRspType !== 'SUCC') {
      message.error(msg || '网络或加载错误');
      return;
    }
    let { total = 0, list = [] } = data;
    list = list.map(item => {
      item.transferStateName = item.transferCommandStatusDTO?.transferStateName || '';
      return item;
    });
    if (type === 'ZJD') {
      return state
        .setIn(['instructionZJDTable', 'data'], list)
        .setIn(['instructionZJDTable', 'dataTotal'], total);
    } else {
      return state
        .setIn(['instructionTable', 'data'], list)
        .setIn(['instructionTable', 'dataTotal'], total);
    }
  },
  /*** 重新报送*/
  async httpBatchSendInstruction(state, params, { getState, mutations }) {
    let result = await batchSendInstruction(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      await mutations.asyncHttpGetPendingConfirmInstruction({});
      message.success(msg);
    } else {
      message.error(msg);
    }
  },

  // 自动匹配
  // TODO 拆分中债上清?
  async httpGetMatchInstruction(state, { type, params }, { getState, mutations }) {
    // if (params.length < 1) {
    //   message.error('请选择需要手工匹配的数据');
    //   return;
    // }
    let result = await getMatchInstruction(params);
    const { winRspType, msg, data } = result;
    // state = getState();
    if (winRspType === 'SUCC') {
      await mutations.asyncHttpGetPendingConfirmInstruction({ type });
      let flag = data.find(item => item.state === '1111');
      if (flag) {
        modal.confirm({
          title: '自动匹配失败',
          width: 700,
          content: data.map((item, index) => {
            return <li key={index}>结算指令编号：{item.errorMsg}</li>;
          }),
          className: 'confirModals'
        });
      } else {
        message.success(msg);
      }
    } else {
      modal.confirm({
        title: '自动匹配失败',
        width: 700,
        content: msg,
        className: 'confirModals'
      });
    }
  },
  //  点击手工匹配，获取网上分销成交数据
  async httpGetHandleMatchInstruction(state, getParams, { getState, mutations }) {
    let { params, tradeId } = getParams;
    let result = await getHandleMatchInstruction(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      // const { list, total } = data;
      await mutations.asyncHttpGetPendingConfirmInstruction({});
      // message.success(msg);
      state = getState();
      return state
        .setIn(['onlineExecutTable', 'data'], data)
        .setIn(['onlineExecutTable', 'tradeId'], tradeId);
      // .setIn(['onlineExecutTable', 'dataTotal'], total)
    } else {
      message.error(msg);
    }
  },

  // 勾选一条成交数据进行手工匹配
  async httpHandleMatchInstruction(state, params, { getState, mutations }) {
    let result = await handleMatchInstruction(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      await mutations.asyncHttpGetPendingConfirmInstruction({});
      message.success(msg);
    } else {
      message.error(msg);
    }
  },

  // 获取表中表
  // TODO 拆分上清中债?
  async httpGetErbPageList(state, params, { getState }) {
    let result = await getErbPageList({ ...params });
    let data = getValue(result.data, {});
    let list = getValue(data.list, []);
    state = getState();
    return (state = state.setIn(['instructionTable', 'innerData'], list));
  },
  // 批量确认
  async httpSetBatchConfirmInstruction(state, { type, params, cb }, { getState, mutations }) {
    let vals = [];
    params.map(item => {
      vals.push({
        instructionId: (type === 'ZJD' ? item.instrId : item.tradeId) || '',
        execCode: (type === 'ZJD' ? item.execCode : item.srcTradeId) || '',
        productName: item.productName || '',
        settleOrgType: item.settleInstitution || '',
        bizCategory: item.bizCategory || '',
        bizCategoryName: item.bizCategoryName || '',
        tradeDirection: item.entrustSide || '',
        tradeDirectionName: item.entrustSideName || '',
        remark: (type === 'ZJD' ? item.remark : item.remarks) || '', // TODO 应取批量确认时的remark?
        execMatchStatus: (type === 'ZJD' ? item.execMatchStatus : item.dealMatchingStatus) || '',
        tradeInstrId: item.tradeInstrId || '',
        systemInstructionStatus:
          (type === 'ZJD' ? item.innerStatus : item.systemLocalcurrencyStatus) || ''
      });
    });

    let result = await batchConfirmInstruction({ instructList: vals });
    const { winRspType, msg, data } = result;
    // state = getState();
    if (winRspType === 'SUCC') {
      // if (!data.length) {
      //   return;
      // }
      await mutations.asyncHttpGetPendingConfirmInstruction({ type });
      let isOk = true,
        errorMsg = '';
      let noError = data.every((item, idx) => {
        item.index = idx + 1;
        switch (item.state) {
          case '1111':
            item.stateName = '确认失败';
            isOk = false;
            return true;
          case '0000':
            item.stateName = '确认成功';
            return true;
          case '0001':
            // 0001 表示存在不通过的指令状态数据, 不进行结算确认流程
            errorMsg = item.errorMsg;
            return false;
          default:
            return true;
        }
      });

      if (noError) {
        await mutations.openFormModal({ status: false });
        typeof cb == 'function' && cb(isOk, data);

        if (isOk) {
          message.success(msg);
        }
      } else {
        message.error(errorMsg);
      }

      // return state;
    } else {
      typeof cb == 'function' && cb(false, []);
      message.error(msg || '加载错误');
    }
    // return state;
  },

  // 批量回退
  async httpSetBatchFallBackInstruction(state, { type, params }, { getState, mutations }) {
    let vals = [];
    params.map(item => {
      vals.push({
        instructionId: (type === 'ZJD' ? item.instrId : item.tradeId) || '',
        execCode: (type === 'ZJD' ? item.execCode : item.srcTradeId) || '',
        systemInstructionStatus:
          (type === 'ZJD' ? item.innerStatus : item.systemLocalcurrencyStatus) || ''
      });
    });
    let result = await batchFallBackInstruction(vals);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      await mutations.asyncHttpGetPendingConfirmInstruction({ type });
      message.success(msg);
    } else {
      message.error(msg);
    }
  },

  // 获取当前交易日
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      // 默认参数
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  },
  /****查询子表数据 */
  async httpQueryZLQf(state, { params, cb }, { getState }) {
    let result = await searcZLQf(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      // return state.set('qfTable', data);
      typeof cb == 'function' && cb(data);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
