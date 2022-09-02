import React from 'react';
import {
  bandInnerTradeList,
  drawMoney,
  bondInnerInfo,
  revocationInner,
  searchBuyerInfo,
  searchSellerInfo,
  // GuaranteeInformation,
  // sourcetMessage,
  getBizCategoryType,
  axioSend,
  currentTradingDay,
  formAdd,
  formEdit,
  checkList,
  del
} from '../services/index';
import { filterNullElement } from 'yss-biz';
import { message, Modal } from 'antd';
// import moment from 'moment';

export default {
  // },
  // 查询内转交易列表
  async httpGetList(state, params, { getState, mutations }) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };

      let result = await bandInnerTradeList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      data.list.map((item, i) => {
        if (item.commandStatus == 1) {
          item.commandStatusName = '成功';
        }
        item.idx = i + 1;
      });

      if (data.list.length > 0) {
        state = mutations.changeTableRow({ value: data.list[0] });
      }

      return state
        .setIn(['instructionTable', 'dataList'], data.list)
        .setIn(['instructionTable', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***现券内转买卖房信息 */
  async httpAboutBondInnerInfo(state, { innerContactId }, { getState }) {
    if (!innerContactId) {
      return;
    }

    let result = await bondInnerInfo(innerContactId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      return state.set('mmfInfo', data);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***划款指令信息明细 */
  async httpAboutDrawMoney(state, { tradeInstrId }, { getState }) {
    if (!tradeInstrId) {
      return;
    }

    let result = await drawMoney(tradeInstrId);
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      let columns = state.get('drawMoneyTable').toJS().columns;
      let info = data || {},
        list = data.detailList && data.detailList.length > 0 ? data.detailList : [];

      list.map(item => {
        columns.map(val => {
          item[`${val.dataIndex}`] = item[`${val.dataIndex}`]
            ? item[`${val.dataIndex}`]
            : info[`${val.dataIndex}`];
          return val;
        });
        return item;
      });
      return state
        .setIn(['drawMoneyTable', 'dataSource'], list)
        .setIn(['drawMoneyTable', 'allData'], info.allData);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /***撤销 */
  async httpRevocationInner(state, { tradeInstrId }, { getState, mutations }) {
    let result = await revocationInner(tradeInstrId);
    const { winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      await mutations.asyncHttpGetList({});
      message.success(msg);
    } else {
      message.error(msg || '请求错误');
    }
  },

  async httpSearchBuyerInfo(state, params, { getState }) {
    let result = await searchBuyerInfo();
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      let arr = data.map(item => {
        return {
          label: item,
          value: item
        };
      });
      return state.set('buyerInfo', arr || []);
    } else {
      message.error(msg || '请求错误');
    }
  },

  async httpSearchSellerInfo(state, params, { getState }) {
    let result = await searchSellerInfo();
    const { data, winRspType, msg } = result;
    if (winRspType === 'SUCC') {
      let arr = data.map(item => {
        return {
          label: item,
          value: item
        };
      });
      return state.set('sellerInfo', arr || []);
    } else {
      message.error(msg || '请求错误');
    }
  },

  async httpBizCategoryType(state, params, { mutations }) {
    let result = await getBizCategoryType({ parentDicCode: '1030308', includeList: ['6'] });
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      let arr = [];
      data.length &&
        data.map(item => {
          arr.push({
            label: item.dicExplain,
            value: item.dicCode
          });
        });
      return state.set('bizCategoryType', arr);
    } else {
      message.error(msg || '请求错误');
    }
  },
  //发送
  async httpAxiosSend(state, params, { mutations }) {
    let result = await axioSend(params);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      // await mutations.asyncHttpGetList({});
      let arr = [];
      for (let n = 0; n < data.length; n++) {
        if (data[n].state == '1111') {
          arr.push(data[n].instrId);
        }
      }
      if (arr.length) {
        Modal.error({
          title: '划款未成功,确认失败！',
          content: `下列交易指令编号对应的数据结算确认失败:\n${arr.join('、 ')}`
        });
      } else {
        message.success(msg);
      }
    } else {
      message.error(msg || '数据错误');
    }
  },
  // 获取当前交易日
  async httpCurrentTradingDay(state, params, { getState, mutations }) {
    let result = await currentTradingDay();
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      return state.set('currentTradeDate', data.currentTradeDate);
    } else {
      message.error(msg || '请求错误');
    }
  },
  // 提交
  async httpFormAdd(state, { params, type }, { mutations }) {
    let result = {};
    if (type == 'add') {
      result = await formAdd(params);
    } else if (type == 'edit') {
      result = await formEdit(params);
    }
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg || '操作成功');
      await mutations.asyncHttpGetList({});
      return;
    } else {
      message.error(msg || '请求错误');
    }
  },
  // 审核
  async httpCheckList(state, params, { mutations }) {
    let result = await checkList(params);
    const { msg, data, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg || '操作成功');
      await mutations.asyncHttpGetList({});
      return;
    } else {
      if (data && data.length > 0) {
        Modal.info({
          title: '错误信息',
          content: data.map(item => {
            return <p>{item}</p>;
          })
        });
      } else {
        message.error(msg || '请求错误');
      }
    }
  },
  // 删除
  async httpDel(state, params, { mutations }) {
    let result = await del(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg || '操作成功');
      await mutations.asyncHttpGetList({});
      return;
    } else {
      message.error(msg || '请求错误');
    }
  }
};
