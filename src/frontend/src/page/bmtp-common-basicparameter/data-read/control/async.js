import {
  getInterfData,
  getDataList,
  uploadFile,
  getBondTempTableList,
  getPledgeRepoTempTableList,
  getLendingTempTableList,
  getOutrightTempTableList,
  getSellBackTempTableList,
  getOnlineTempTableList,
  getOfflineTempTableList,
  getInnerTradeTempTableList,
  doBondImport,
  doPledgeRepoImport,
  doLendingImport,
  doOutrightImport,
  doSellBackImport,
  doOnlineImport,
  doOfflineImport,
  doInnerTradeImport
} from '../services/index';
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';

export default {
  // 获取接口列表
  async httpGetList(state, params, { mutations, getState }) {
    let queryElement = {
      ...state.get('queryElement').toJS(),
      ...params
    };
    let result = await getDataList(filterNullElement(queryElement));
    const { data, winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg);
      return;
    }
    data.list.map((item, i) => (item.index = Number(i + 1)));
    return state
      .setIn(['dataList', 'list'], data.list)
      .setIn(['dataList', 'total'], data.total)
      .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum)
      .setIn(['queryElement', 'reqPageSize'], queryElement.reqPageSize);
  },

  // 获取 读数管理-查询数据接口树
  async httpInterfData(state, { params = {} }, { mutations, getState }) {
    try {
      let queryElement = {
        ...state.get('queryTree').toJS()
      };

      let result = await getInterfData(filterNullElement(queryElement));
      const {
        data: { treeStr },
        winRspType
        // msg
      } = result;
      let treeData = [];
      try {
        let filterArr = []; // 过滤接口列表
        treeData = treeStr
          ? JSON.parse(treeStr, (key, value) => {
              // 前端提供过滤功能
              if (key === 'children' && value instanceof Array) {
                return value.filter(item => !filterArr.includes(item.key));
              }
              return value;
            })
          : [];
      } catch (err) {
        console.error('JSON结构解析错误');
        message.error('数据错误, 请刷新重试');
      }
      if (winRspType != 'SUCC') {
        message.error('数据请求异常！');
        return;
        // message.error(msg);
      } else {
        // message.error(msg);
      }
      return state.setIn(['treeData'], treeData);
    } catch (error) {
      message.error(error);
    }
  },
  // 数据读取按钮的功能
  async httpUploadFile(state, params, { mutations, getState }) {
    try {
      let form = new FormData();
      let keys = params ? Object.keys(params) : [];
      keys &&
        keys.forEach(key => {
          form.append(key, params[key]);
        });
      const result = await uploadFile(form);
      const { winRspType, msg } = result;
      if (winRspType === 'SUCC') {
        message.success(`数据读取成功，详细：${msg}`);
      } else {
        message.error(`数据读取失败，详细：${msg}`);
      }
      return state;
    } catch (error) {
      message.error(`异常：${error}`);
    }
  },
  // 获取回显表格数据
  async httpGetPreviewList(state, params) {
    const { bizCode, reqPageNum, reqPageSize, batchNo } = params;
    const pageRequest = {
      BOND: getBondTempTableList,
      PLEDGE: getPledgeRepoTempTableList,
      LENDING: getLendingTempTableList,
      OUTRIGHT: getOutrightTempTableList,
      SELLBACK: getSellBackTempTableList,
      ONLINE: getOnlineTempTableList,
      OFFLINE: getOfflineTempTableList,
      INNER: getInnerTradeTempTableList
    };
    if (pageRequest[bizCode]) {
      const result = await pageRequest[bizCode](
        filterNullElement({ reqPageNum, reqPageSize, batchNo })
      );
      const { winRspType, msg, data } = result || {};
      if (winRspType === 'SUCC') {
        const { total, list } = data;
        return state.setIn(['previewList', 'list'], list).setIn(['previewList', 'total'], total);
      } else {
        message.error(msg || '数据或网络错误');
      }
    }
  },
  // 中间表格数据导入操作
  async httpTempTableImport(state, params) {
    const { bizCode, callback, id } = params;
    const importRequest = {
      BOND: doBondImport,
      PLEDGE: doPledgeRepoImport,
      LENDING: doLendingImport,
      OUTRIGHT: doOutrightImport,
      SELLBACK: doSellBackImport,
      ONLINE: doOnlineImport,
      OFFLINE: doOfflineImport,
      INNER: doInnerTradeImport
    };
    if (importRequest[bizCode]) {
      const result = await importRequest[bizCode]({ batchNo: id });
      const { winRspType, msg } = result || {};
      callback && callback(winRspType === 'SUCC' ? true : false, msg || '数据或网络错误');
    }
  }
};
