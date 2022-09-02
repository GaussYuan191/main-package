import {
  searcZJDList,
  searcZJDListQf,
  searcAboutZJList,
  searcAboutDBList,
  searcAboutAccont,
  searcAboutInfo,
  searcAboutContractList,
  aboutLSInfo,
  manualDelivery,
  axioSend
} from '../services/index';
import { message } from 'antd';
import { page, filterNullElement } from 'yss-biz';
export default {
  async httpQueryZJDList(state, { type }, { mutations, getState }) {
    try {
      let queryElement = '';
      if (type == 'instructManage') {
        queryElement = state.get('instructionQueryForm').toJS();
      } else {
        queryElement = state.get('contractQueryForm').toJS();
      }

      let result = await searcZJDList(type, filterNullElement(queryElement));
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        const action = {
          1: mutations.asyncHttpSearcAboutInfo, //结算指令详情
          2: mutations.asyncHttpSearchAboutZJList, //债券明细
          3: mutations.asyncHttpSearcAboutAccont, //资金明细
          4: mutations.asyncHttpSearcAboutDBList, //担保信息
          5: mutations.asyncHttpSearcAboutDealDetailedList, //成交流水明细
          6: mutations.asyncHttpSearcAboutContractList, //合同信息
          7: mutations.asyncHttpSearcAboutDBList //质押券信息
        };
        //加载第一条中债登指令信息
        if (type == 'instructManage') {
          if (!data.list.length) {
            return state
              .setIn(['instructionTable', 'data'], [])
              .set('instructionInfo', {})
              .setIn(['zjTable', 'list'])
              .set('zjInfo', {})
              .setIn(['guaranteeInformation', 'dataSource'], [])
              .setIn(['runningWaterTable', 'dataSource'], [])
              .setIn(['contractMessageTable', 'dataSource'], [])
              .setIn(['instructionTable', 'total'], data.total);
          }
          let active = getState().get('active');
          state = await action[active]({ params: data.list[0] });
          return state
            .setIn(['instructionTable', 'data'], data.list)
            .setIn(['instructionTable', 'total'], data.total)
            .set('rowed', data.list[0]);
          //加载中债登合同关联
        } else {
          if (!data.list.length) {
            return state
              .setIn(['contractTable', 'data'], [])
              .set('instructionInfo', {})
              .setIn(['zjTable', 'list'])
              .set('zjInfo', {})
              .setIn(['guaranteeInformation', 'dataSource'], [])
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
        }
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('数据失败');
      return state.setIn(['contractTable', 'data'], []).setIn(['contractTable', 'total'], 0);
    }
  },

  /****查询指令的清分 */
  async httpQueryZJDListQf(state, { params, cb }, { getState }) {
    let result = await searcZJDListQf(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      // return state.set('qfTable', data);
      typeof cb == 'function' && cb(data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /****查询关联详情信息 */
  async httpSearcAboutInfo(state, { params }, { getState }) {
    let instrId = params.instrId;
    if (!instrId) {
      return;
    }
    let result = await searcAboutInfo(instrId);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('instructionInfo', data || {});
    } else {
      message.error(msg || '数据错误');
    }
  },

  /****查询关联债券信息 */
  async httpSearchAboutZJList(state, { params }, { getState }) {
    let newParams = {
      reqPageNum: params.reqPageNum ? params.reqPageNum : page.reqPageNum,
      reqPageSize: params.reqPageSize ? params.reqPageSize : page.reqPageSize,
      instrId: params.instrId
    };
    if (!params.instrId) {
      return;
    }
    let result = await searcAboutZJList(newParams);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.setIn(['zjTable', 'list'], data.list || []);
    } else {
      message.error(msg || '数据错误');
    }
  },
  /****查询关联担保信息 */
  async httpSearcAboutDBList(state, { params }, { getState }) {
    if (!params.instrId) {
      return;
    }
    let result = await searcAboutDBList({ instrId: params.instrId });
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      data.map((item, idx) => {
        item.index = idx + 1;
      });

      return state.setIn(['guaranteeInformation', 'dataSource'], data || []);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /****成交流水 */
  async httpSearcAboutDealDetailedList(state, { params }, { getState }) {
    if (!params.execCode) {
      return;
    }
    let queryElement = {
      reqPageNum: 1,
      reqPageSize: 100,
      execCode: params.execCode
    };
    let result = await aboutLSInfo(filterNullElement(queryElement), params.bizCategory);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.setIn(['runningWaterTable', 'dataSource'], data.list || []);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**查询资金账号*/
  async httpSearcAboutAccont(state, { params }, { getState }) {
    // let query;
    // /**当有产品编码的情况下*/
    // if (params.consignorCode && params.productCode) {
    //   query = {
    //     productCode: params.productCode,
    //     subjectType: 1,
    //     ...page
    //   };
    //   /**当没有产品编码的情况下有管理人的情况下*/
    // } else if (params.consignorCode && !params.productCode) {
    //   query = {
    //     subjectType: 2,
    //     ...page
    //   };
    //   /**当没有产品编码的情况下没有管理人的情况下*/
    // } else if (!params.consignorCode && !params.productCode) {
    //   query = {
    //     subjectType: 0,
    //     ...page
    //   };
    // } else if (!params.consignorCode && params.productCode) {
    //   query = {
    //     subjectType: 0,
    //     ...page
    //   };
    // }
    if (!params.productCode) {
      return state.set('zjInfo', {});
    }
    let result = await searcAboutAccont({ productCode: params.productCode });
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('zjInfo', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**查询合同信息*/
  async httpSearcAboutContractList(state, { params }, { getState }) {
    let newParams = {
      reqPageNum: params.reqPageNum ? params.reqPageNum : page.reqPageNum,
      reqPageSize: params.reqPageSize ? params.reqPageSize : page.reqPageSize,
      instrId: params.instrId
    };
    if (!params.instrId) {
      return;
    }
    let result = await searcAboutContractList(newParams);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.setIn(['contractMessageTable', 'dataSource'], data.list || []);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // 手动交割
  async httpManualDelivery(state, { contractId }, { getState, mutations }) {
    let result = await manualDelivery(contractId);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpQueryZJDList({ type: 'contractManage' });
      message.success('手动交割成功');
    } else {
      message.error('手动交割失败');
    }
  },
  //生成台账按钮
  async httpAxiosSend(state, params, { mutations }) {
    let result = await axioSend(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      mutations.asyncHttpQueryZJDList({ type: 'contractManage' });
      message.success(msg || '操作成功');
    } else {
      message.error(msg || '数据错误');
    }
  }
};
