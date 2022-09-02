// import { getValue, handleExport } from 'yss-biz'
import { filterNullElement, page } from 'yss-biz';
import { message } from 'antd';
import {
  businessAccountList, // 业务台账列表
  // businessDetailInfo, // 业务台账详情
  pledgeBondAccountList, // 质押券台账列表
  distributionLedgerList, // 分销台账列表
  entrustSide,
  turnTheListed, //转上市
  opponentOptions, //对手方
  axioSend,
  axioCounterName
} from '../../services';
// 查询表格

export default {
  async httpGetList(state, { type, reqPageNum }, { getState, mutations }) {
    try {
      let queryElement = { ...state.get(type).toJS(), ...reqPageNum };
      let result = '',
        eleList = '',
        rowType = '';

      if (type == 'queryDataForBusiness') {
        result = await businessAccountList(filterNullElement(queryElement));
        eleList = 'businessList';
        rowType = 'businessRowd';
      } else if (type == 'queryDataForDistribution') {
        result = await distributionLedgerList(filterNullElement(queryElement));
        eleList = 'distributionList';
        rowType = 'distributionRowd';
      } else if (type == 'queryDataForPledgeBond') {
        result = await pledgeBondAccountList(filterNullElement(queryElement));
        eleList = 'pledgeBondList';
        rowType = 'pledgeBondRowd';
      }

      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      if (data.list && data.list.length > 0) {
        state = mutations.changeTableRow({ type: rowType, value: data.list[0] });
      }

      // return state.merge({
      //   [eleList]: data.list
      // });
      return state.setIn([eleList, 'list'], data.list || []).setIn([eleList, 'total'], data.total);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 委托方向
  async httpEntrustSide(state, parmas, { getState }) {
    try {
      let result = await entrustSide(1030124);
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }
      if (!data) {
        return;
      }

      let arr = [];
      data.map(item => {
        if (
          item.dicCode == '3' ||
          item.dicCode == '4' ||
          item.dicCode == '5' ||
          item.dicCode == '6'
        ) {
          arr.push({
            label: item.dicExplain,
            value: item.dicCode
          });
        }
      });

      return state.set('entrustSide', arr);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 转上市
  async httpTurnTheListed(state, { id }, { getState }) {
    let result = await turnTheListed(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      return;
    } else {
      message.error(msg || '操作失败');
      return;
    }
  },

  //分销对手方
  async httpOpponentOptions(state, parmas, { getState }) {
    let result = await opponentOptions();
    const { winRspType, msg, data } = result;
    if (winRspType == 'SUCC') {
      if (!data) {
        return;
      }
      let arr = [];
      data.map(item => {
        arr.push({
          label: item.split('_')[1],
          value: item.split('_')[0]
        });
      });
      return state.set('opponentList', arr);
    } else {
      message.error(msg || '操作失败');
      return;
    }
  },
  //发送
  async httpAxiosSend(state, params, { mutations }) {
    let result = await axioSend(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpAssetAccountBalanceList({ params: { ...page } });
      message.success(msg || '发送成功');
    } else {
      message.error(msg || '数据错误');
    }
  },

  async httpCounterName(state, params, { mutations }) {
    let result = await axioCounterName(params);
    const { winRspType, msg, data } = result;
    if (winRspType == 'SUCC') {
      data.map(item => {
        item.label = item.NAME;
        item.value = item.CODE;
        item.key = item.CODE;
        return item;
      });
      return state.set('counterNameList', data);
    } else {
      message.error(msg || '数据错误');
    }
  }
};
