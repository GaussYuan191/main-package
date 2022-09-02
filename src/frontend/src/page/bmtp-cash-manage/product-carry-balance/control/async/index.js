import { getValue, page, filterNullElement } from 'yss-biz';
import {
  getPageList,
  getDetailPageList,
  getQueryBondCount,
  getQueryAccountCount,
  getQueryConsignorCount,
  getCurTradeDate,
  axioSend
  // axiosBondCode
} from '../../services';
import { message } from 'antd';

export default {
  // 查询列表
  async httpGetPageList(state, values = {}, { getState, mutations }) {
    state = getState();
    let query = { ...state.get('query').toJS() };

    // 为查询条件中不包含 分页信息时，加入默认的分页信息
    let { reqPageNum = page.reqPageNum, reqPageSize = page.reqPageSize } = query;

    const targetQuery = Object.assign({}, query, { reqPageNum, reqPageSize }, values);
    let res = await getPageList(filterNullElement(targetQuery));

    let data = getValue(res.data, {});
    let list = getValue(data.list, []);

    list = list.map((item, index) => {
      item.id = `${item.productId}_${index}`;
      item.detailList &&
        item.detailList.forEach(subItem => {
          subItem.parentId = item.id; //记录所属父节点id,用于处理勾选
        });
      item.bondName = '——';
      item.bondCode = '——';
      item.bondCurrencyName = '——';
      item.bondAccount = '——';
      item.bondAccountName = '——';
      item.bondAccountTypeName = '——';
      item.createTime = '——';

      return item;
    });

    state = mutations.setTrDatas({ row: list[0]?.detailList[0] || {} });
    return state.set('tableDatas', list).set('listTotal', data.total);
  },
  // 关联信息
  async httpGetAboutMessage(state, values, { getState, mutations }) {
    state = getState();

    let rowData = state.get('clickRow').toJS ? state.get('clickRow').toJS() : state.get('clickRow');
    if (!rowData || !Object.keys(rowData).length) {
      return mutations.clearAboutMessage();
    }

    let query = { ...state.get('query').toJS() };
    let defaultDate = {
      tradeDate: query.tradeDate
    };
    let type = state.get('setMessageType');
    switch (type) {
      case 'money': {
        const {
          data: { list = [] },
          msg,
          winRspType
        } = await getDetailPageList({
          ...defaultDate,
          id: rowData.id,
          ...page
        });

        if (winRspType !== 'SUCC') {
          message.error(`数据获取异常：${msg}`);
        }
        return state.set('moneyForm', list[0] || {});
      }
      case 'bond': {
        const {
          data = {},
          msg,
          winRspType
        } = await getQueryBondCount({
          ...defaultDate,
          consignorCode: rowData.consignorCode,
          bondCode: rowData.bondCode
        });
        if (winRspType !== 'SUCC') {
          message.error(`数据获取异常：${msg}`);
        }
        if (!rowData.consignorCode) {
          return state.set('bondForm', {});
        } else {
          return state.set('bondForm', data || {});
        }
      }

      case 'product': {
        const {
          data = {},
          msg,
          winRspType
        } = await getQueryAccountCount({
          ...defaultDate,
          bondAccount: rowData.bondAccount,
          productId: rowData.productId
        });

        if (winRspType !== 'SUCC') {
          message.error(`数据获取异常：${msg}`);
          return state.set('productForm', {});
        }
        return state.set('productForm', data || {});
      }

      default: {
        const {
          data = {},
          msg,
          winRspType
        } = await getQueryConsignorCount({
          ...defaultDate,
          consignorCode: rowData.consignorCode
        });

        if (winRspType !== 'SUCC') {
          message.error(`数据获取异常：${msg}`);
          return state.set('consignorForm', {});
        } else {
          return state.set('consignorForm', data || {});
        }
      }
    }
  },
  // 获取系统当前交易日期
  async httpGetCurTradeDate(state, params, { mutations }) {
    const result = await getCurTradeDate();
    const { winRspType, data, msg } = result;
    if (winRspType === 'SUCC') {
      const { currentTradeDate = '' } = data;
      return state.set('currentTradeDate', currentTradeDate);
    } else {
      message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
      return state.set('currentTradeDate', '');
    }
  },

  //发送
  async httpAxiosSend(state, { params }, { mutations }) {
    let result = await axioSend(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      await mutations.asyncHttpGetPageList({});
      message.success(msg || '发送成功', 1);
      // callback && callback(true);
    } else {
      message.error(msg || '数据错误');
      // callback && callback(false);
    }
  }

  // //获取债券名称
  // async httpBondCode(state, param = {}) {
  //   const params = {
  //     reqPageNum: 1,
  //     reqPageSize: 100,
  //     marketCode: 'YH',
  //     ...param
  //   };
  //   let result = await axiosBondCode(params);
  //   const { winRspType, msg, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let list =
  //       data &&
  //       data.list.map(item => {
  //         item.label = item.bondCode + '-' + item.securityName;
  //         item.value = item.bondCode;
  //         item.key = item.id;
  //         return item;
  //       });
  //     return state.set('bondNames', list);
  //   } else {
  //     message.error(msg || '数据错误');
  //   }
  // },
};
