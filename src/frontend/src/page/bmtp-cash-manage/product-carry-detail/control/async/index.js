import { getValue, getPrevDate, page, filterNullElement } from 'yss-biz';
import {
  axiosQueryDetailList,
  axiosGetBalance,
  axioosGetBondAccountByProductId,
  axiosDeleteBatch,
  detailAdd,
  detailUpdate,
  axiosCheckBatch,
  getCurTradeDate,
  getTotalBalance
} from '../../services';
import { message } from 'antd';
// 查询表格
const handelQueryDetailList = async (state, params, { getState, mutations }) => {
  state = getState();
  let queryDatas = state.get('queryDatas').toJS();

  let queryDatasFilter = {};
  for (let item in queryDatas) {
    if (queryDatas[item] && queryDatas[item].length !== 0) {
      queryDatasFilter[item] = queryDatas[item];
    }
  }

  let result = await axiosQueryDetailList(filterNullElement({ ...params, ...queryDatasFilter }));
  const { data, winRspType, msg } = result;
  if (winRspType != 'SUCC') {
    message.error(msg);
    return;
  }

  let datas = getValue(data, {});
  let list = getValue(datas.list, []);
  // 查询关联信息
  state = mutations.setTrDatas({ row: datas.total > 0 ? list[0] : {}, type: 'click' });
  state = await mutations.asyncSetAboutMessage({ type: 'about' });

  return state.set('dataSource', list).set('listTotal', datas.total);
};

const toOptDetail = async (state, { type, params }, { getState, mutations }) => {
  let result = {};
  if (type == 'add') {
    result = await detailAdd(params);
  } else {
    result = await detailUpdate(params);
  }

  const { winRspType, msg } = result;
  if (winRspType != 'SUCC') {
    message.error(msg);
    return;
  } else {
    message.success(msg, 1);
    setTimeout(async () => {
      await mutations.asyncHandelQueryDetailList({});
    }, 0);
  }
};

// 查询余额信息(不作为mutation)
const getBalanceMessage = async aboutMessage => {
  let params = { ...aboutMessage };
  let res = await axiosGetBalance({
    // tradeDate: getPrevDate(params['tradeDate']),
    tradeDate: params['tradeDate'],
    productId: params['productId'],
    bondCode: params['bondCode'],
    bondAccount: params['bondAccount'],
    ...page
  });
  const { data, msg, winRspType } = res;
  if (winRspType !== 'SUCC') {
    message.error(`获取总余额异常, 详细${msg}`);
  }

  let datas = getValue(data, {});
  let list = getValue(datas.list, []);
  return getValue(list[0], {});
};

// 查询关联信息
const setAboutMessage = async (state, { type }, { getState, mutations }) => {
  let getBalance = (object = {}) => {
    return (
      +object['usableSubject'] +
      +object['accruedSubject'] +
      +object['totalBuyBackSubject'] +
      +object['pledgeSubject'] +
      +object['freezeSubject'] +
      +(object['underwritingSubject'] || 0) +
      +(object['underwritingAccruedSubject'] || 0)
    );
  };

  state = getState();
  let row = state.get('clickRow').toJS();
  let aboutMessage = getValue(row, {}) || {};
  if (type === 'about') {
    if (!Object.keys(aboutMessage).length) {
      return state.set('aboutMessage', {});
    }
    let bondBalanceNum = getBalance(aboutMessage);
    aboutMessage['bondBalance'] = isNaN(bondBalanceNum) ? 0 : bondBalanceNum;
    await getBalanceMessage(aboutMessage).then(res => {
      let beginningBalanceNum = getBalance(res);
      aboutMessage['beginningBalance'] = isNaN(beginningBalanceNum) ? 0 : beginningBalanceNum;
    });

    return state.set('aboutMessage', aboutMessage);
  } else {
    let modalMessage = JSON.parse(JSON.stringify(aboutMessage));
    let balanceMessage = await getBalanceMessage(modalMessage);
    let totalBalance = getBalance(balanceMessage);
    modalMessage.totalBalance = isNaN(totalBalance) ? 0 : totalBalance;
    return state.set('modalMessage', modalMessage);
  }
};
// 查询债券托管账户
const getBondAccountByProductId = async (state, params, { getState, mutations }) => {
  let { data, msg, winRspType } = await axioosGetBondAccountByProductId(params);
  if (winRspType === 'SUCC') {
    return state.set('bondAccount', data || {});
  } else {
    message.error(`债券托管账户异常，详细${msg}`);
  }
};
// 删除选中的表格行
const deleteBatch = async (state, parmas, { getState }) => {
  state = getState();
  // debugger
  let selectRows = state.get('selectRows').toJS();
  let ids = selectRows.map(item => item.id);

  let res = await axiosDeleteBatch(ids);
  return state.set('callbackForTableChange', res);
};
// 批量审核功能
const checkBatch = async (state, params, { getState, mutations }) => {
  try {
    const { msg, winRspType } = await axiosCheckBatch(params);
    if (winRspType === 'SUCC') {
      message.success(`审核成功，详细：${msg}`);
      await mutations.asyncHandelQueryDetailList({});
    } else {
      message.error(`审核失败，详细：${msg}`);
    }
  } catch (error) {
    message.error(`异常，详细：${error}`);
  }
};

const httpGetTotalBalance = async (state, { params, cb }, { getState, mutations }) => {
  const result = await getTotalBalance(params);
  const { winRspType, data, msg } = result;
  if (winRspType === 'SUCC') {
    typeof cb == 'function' && cb(data);
  } else {
    message.error(msg || '数据错误');
  }
};

// 获取当前交易日期
const httpGetCurTradeDate = async (state, params, { getState, mutations }) => {
  const result = await getCurTradeDate();
  const { winRspType, data } = result;
  if (winRspType === 'SUCC') {
    const { currentTradeDate } = data;
    state = mutations.changeQueryDatas({
      tradeDate_begin: currentTradeDate,
      tradeDate_end: currentTradeDate
    });
    return state.setIn(['currentTradeDate'], currentTradeDate);
  } else {
    return state.setIn(['currentTradeDate'], '');
    // message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
  }
};

export default {
  handelQueryDetailList,
  setAboutMessage,
  getBondAccountByProductId,
  deleteBatch,
  toOptDetail,
  checkBatch,
  httpGetCurTradeDate,
  httpGetTotalBalance
  // httpBondCode,
};
