import React from 'react';
import {
  sqDebtList,
  aboutZJInfo,
  aboutAccont,
  aboutBZInfo,
  aboutJSzlInfo,
  aboutzlInfo,
  aboutLSInfo,
  searcZLQf,
  axiosSettlementStatus,
  axiosUpdateStatus,
  axiosBusinessType,
  axiosTradeDirection,
  getmaturityFullInstructionPageList,
  batchFallBackFullInstruction,
  batchConfirmFullInstruction,
  currentTradingDay,
  maturityFullInstructionDelivery,
  queryFullInstruction,
  reSendMaturityConfirm
} from '../services/index';
import { filterNullElement } from 'yss-biz';
import { message, Modal } from 'antd';

export default {
  async httpSqDebtList(state, { params }, { mutations, getState }) {
    try {
      let queryElement = '';
      queryElement = state.get('expireSettleQueryForm').toJS();
      let result = await sqDebtList(filterNullElement(queryElement));
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        const action = {
          1: mutations.asyncHttpAboutzlInfo, //结算指令详情
          2: mutations.asyncHttpAboutZJInfo, //债券明细
          3: mutations.asyncHttpAboutAccont, //资金明细
          4: mutations.asyncHttpAboutBZfo, //担保信息
          5: mutations.asyncHttpAboutLSInfo, //成交流水明细
          6: mutations.asyncHttpAboutJSzlInfo, //结算指令信息
          7: mutations.asyncHttpAboutBZfo //质押券信息
        };
        //加载第一条上清指令信息
        data.list.total = data.total; //计算总和条目

        if (!data.list.length) {
          return state
            .setIn(['contractTable', 'data'], [])
            .set('instructionInfo', {})
            .setIn(['zjTable', 'list'], [])
            .set('zjInfo', {})
            .setIn(['dbTable', 'list'], [])
            .setIn(['runningWaterTable', 'dataSource'], [])
            .setIn(['contractMessageTable', 'dataSource'], [])
            .setIn(['contractTable', 'total'], data.total);
        }

        let active = getState().get('active');
        state = await action[active]({ params: data.list[0] });
        return state
          .setIn(['contractTable', 'data'], data.list)
          .setIn(['contractTable', 'total'], data.total)
          .set('rowed', data.list[0]);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /****查询指令的清分 */
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
  },

  /***指令信息明细 */
  async httpAboutzlInfo(state, { params }, { getState }) {
    if (!params.tradeId) {
      return;
    }
    let result = await aboutzlInfo(params.tradeId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      state = getState();
      return state.set('instructionInfo', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***关联债券明细 */
  async httpAboutZJInfo(state, { params }, { getState }) {
    if (!params.tradeId) {
      return;
    }
    let result = await aboutZJInfo(params.tradeId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      state = getState();
      return state.setIn(['zjTable', 'list'], data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**查询资金账号*/
  async httpAboutAccont(state, { params }, { getState }) {
    // let query;
    /**当有产品编码的情况下有管理人的情况*/
    // if (params.consignorCode && params.productCode) {
    //   query = {
    //     productCode: params.productCode,
    //     subjectType: 1,
    //     ...page
    //   };
    //   /**当管理人的情况没有产品编码的情况*/
    // } else if (params.consignorCode && !params.productCode) {
    //   query = {
    //     subjectType: 2,
    //     ...page
    //   };
    //   /**没有管理人没有产品编码的情况下*/
    // } else if (!params.consignorCode && !params.productCode) {
    //   query = {
    //     subjectType: 0,
    //     ...page
    //   };
    // }
    if (!params.productId) {
      return state.set('zjInfo', {});
    }
    state = getState();
    let result = await aboutAccont({ productId: params.productId });
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('zjInfo', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***关联担保明细 */
  async httpAboutBZfo(state, { params }) {
    //DBQ_ZHG 正回购保证券，DBQ_NHG 逆回购保证 1买入 2卖出
    if (!params.tradeId) {
      return;
    }
    if (params.bizCategory != '3') {
      //只有买断式才能加载数据
      return state.setIn(['dbTable', 'list'], []);
    }
    let result = await aboutBZInfo(params.tradeId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      if (data.length) {
        data.map((item, idx) => {
          item.index = idx + 1;
        });
      }
      return state.setIn(['dbTable', 'list'], data || []);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***关联资金流水 */
  async httpAboutLSInfo(state, { params }) {
    if (!params.srcTradeId) {
      return;
    }
    let queryElement = {};
    if (params.bizCategory == 4 || params.bizCategory == 5) {
      queryElement = {
        reqPageNum: 1,
        reqPageSize: 100,
        tradeInstrId: params.tradeInstrId
      };
    } else {
      queryElement = {
        reqPageNum: 1,
        reqPageSize: 100,
        execCode: params.srcTradeId
      };
    }
    let result = await aboutLSInfo(filterNullElement(queryElement), params.bizCategory);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      let list;
      // 返回数据的类型
      const dataType = {
        1: 'cashBondExecutionReportDistributionRepPageInfo', // 现券
        2: 'pledgeExecutionReportDistRepPageInfo', // 质押式
        3: 'outrightExecutionReportDistRepPageInfo', // 买断式
        4: 'onlineDistrInstructRepPageInfo', // 分销
        8: 'lendingExecutionReportDistRepPageInfo' // 债券借贷
      };
      list = data[dataType[params.bizCategory]]?.list || [];
      return state
        .setIn(['runningWaterTable', 'dataSource'], list)
        .setIn(['runningWaterTable', 'isShowData'], data.isAllData);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***全额结算指令信息明细 */
  async httpAboutJSzlInfo(state, { params }, { getState }) {
    if (!params.tradeId) {
      return;
    }
    let result = await aboutJSzlInfo(params.tradeId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      state = getState();
      return state.setIn(['contractMessageTable', 'dataSource'], data);
    } else {
      message.error(msg || '数据错误');
    }
  },
  //更新状态
  async httpUpdateStatus(state, params) {
    let result = await axiosUpdateStatus(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg || '更新成功');
    } else {
      message.error(msg || '数据错误');
    }
  },
  //业务类别
  async getBusinessType(state, params) {
    //excludeList不包含，includeList包含
    let result = await axiosBusinessType({
      parentDicCode: '1030308',
      excludeList: ['1', '4', '5', '6', '9']
    });
    const { winRspType, msg, data } = result;
    if (winRspType == 'SUCC') {
      data.map(item => {
        item.value = item.dicCode;
        item.label = item.dicExplain === '网上分销' ? '分销' : item.dicExplain;
        return item;
      });
      return state.set('businessTypes', data);
    } else {
      message.error(msg || '数据错误');
    }
  },
  /* 交易方向 */
  async getTradeDirection(state, params) {
    //excludeList不包含，includeList包含
    let result = await axiosTradeDirection({
      parentDicCode: '1030124',
      excludeList: ['1', '2']
    });
    const { winRspType, msg, data } = result;
    if (winRspType == 'SUCC') {
      const tradeDirCtionList = data.map(item => {
        item.value = item.dicCode;
        item.label = item.dicExplain;
        return item;
      });
      return state.set('tradeDirection', tradeDirCtionList);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**查询关联信息 */
  async httpAboutQuery(state, params, { getState, mutations }) {
    const action = {
      1: mutations.asyncHttpAboutzlInfo, //结算指令详情
      2: mutations.asyncHttpAboutZJInfo, //债券明细
      3: mutations.asyncHttpAboutAccont, //资金明细
      4: mutations.asyncHttpAboutBZfo, //担保信息
      5: mutations.asyncHttpAboutLSInfo, //成交流水明细
      6: mutations.asyncHttpAboutJSzlInfo, //结算指令信息
      7: mutations.asyncHttpAboutZJInfo //质押式信息
    };
    let active = getState().get('active');
    let rowed = params && typeof params === 'object' ? params : getState().get('rowed');
    state = await action[active]({ params: rowed });
    return state;
  },
  /* 查询到期全额结算指令管理列表 */
  async httpGetmaturityFullInstructionPageList(state, params, { getState, mutations }) {
    let expireSettleQueryForm = { ...state.get('expireSettleQueryForm').toJS() };
    let param = filterNullElement(expireSettleQueryForm);
    param = { ...param, fullOrderType: 1 };
    let result = await getmaturityFullInstructionPageList({ ...param });
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      data.list.total = data.total; //提取总条数

      if (!data?.list?.length) {
        state = mutations.clearAboutData();
        return state
          .setIn(['manturitySettleTable', 'data'], [])
          .setIn(['manturitySettleTable', 'dataTotal'], data.total)
          .set('rowed', {});
      }

      //加载第一条数据关联信息
      state = await mutations.asyncHttpAboutQuery(data.list[0]);
      return state
        .setIn(['manturitySettleTable', 'data'], data.list)
        .setIn(['manturitySettleTable', 'dataTotal'], data.total)
        .set('rowed', data.list[0]);
    } else {
      message.error(msg || '加载错误');
    }
  },
  /* 批量确认 */
  async httpSetBatchConfirmFullInstruction(state, params, { getState, mutations }) {
    let result = await batchConfirmFullInstruction(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (data?.length == 0) {
        await mutations.asyncHttpGetmaturityFullInstructionPageList();
        message.success(msg);
      } else {
        let strMsg = data.join(', ');
        Modal.warning({
          title: '以下编号结算确认失败',
          width: 700,
          content: '编号: ' + strMsg,
          className: 'confirModals'
        });
      }
    } else {
      message.error(msg || '加载错误');
    }
  },

  /* 批量回退 */
  async httpSetBatchFallBackFullInstruction(state, params, { getState, mutations }) {
    let result = await batchFallBackFullInstruction(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (data?.length == 0) {
        await mutations.asyncHttpGetmaturityFullInstructionPageList({});
        message.success(msg);
      } else {
        let strMsg = data.join(', ');
        Modal.warning({
          title: '以下编号回退失败',
          width: 700,
          content: '编号: ' + strMsg,
          className: 'confirModals'
        });
      }
    } else {
      message.error(msg);
    }
  },
  /* 合同交割 */
  async httpMaturityFullInstructionDelivery(state, params, { getState, mutations }) {
    let result = await maturityFullInstructionDelivery(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (data?.length == 0) {
        await mutations.asyncHttpGetmaturityFullInstructionPageList({});
        message.success(msg);
      } else {
        let strMsg = data.join(', ');
        Modal.warning({
          title: '以下编号交割失败',
          width: 700,
          content: '编号: ' + strMsg,
          className: 'confirModals'
        });
      }
    } else {
      message.error(msg);
    }
  },

  /* 获取当前交易日 */
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  },
  /** 查询全额结算指令*/
  async httpQueryFullInstruction(state, { params, type }, { mutations }) {
    let result = await queryFullInstruction(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      return mutations.asyncHttpGetmaturityFullInstructionPageList();
    } else {
      message.error(msg || '数据错误');
    }
  },
  /** 到期全额结算指令-重新报送*/
  async httpReSetBatchConfirmFullInstruction(state, params, { getState, mutations }) {
    let result = await reSendMaturityConfirm(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (data?.length == 0) {
        await mutations.asyncHttpGetmaturityFullInstructionPageList();
        message.success(msg);
      } else {
        let strMsg = data.join(', ');
        Modal.warning({
          title: '以下编号重新报送失败',
          width: 700,
          content: '编号: ' + strMsg,
          className: 'confirModals'
        });
      }
    } else {
      message.error(msg || '加载错误');
    }
  }
};
