/*********公共***********/
import { message, Modal } from 'antd';
import React from 'react';
import {
  searchTransactionReturnsList,
  searchGetQueryCondition,
  childrenList,
  productInfoList,
  // 点击子表
  toGetInsterIds,
  getAboutzyj,
  getAboutdbxx,
  getAboutdbLendingexecrepdist,

  // 点击母表
  searchErpBondRef,
  searchEroCollateralRef,
  searchOrder, //结算确认
  searchOrder4Distribution,
  getBondQueryList,
  searchEroPledgeRef,
  getProductMsg,
  getLicense,
  postProductSplitXQ,
  postProductSplitZY,
  postProductSplitMD,
  postProductSplitZQJD,
  checkList,
  unCheckList,
  getExeCodeZY,
  getExeCodeDY,
  currentTradingDay,
  queryTransactionData
  // getBondInfoGroupByReport,
  // getTradeInstrIdGroupByReport
} from '../services/index';
import '../view/account/style/style.less';
import { filterNullElement } from 'yss-biz';

/***账户类型*** */

export default {
  /*查询列表**/
  async httpSearchAccountByCondition(state, { params, type, isRefresh }, { mutations, getState }) {
    try {
      let result = await searchTransactionReturnsList(params, type);

      const { winRspType, data, msg } = result;

      //获取第一个表格的第一行的code值
      let code = '';
      if (data.list.length > 0) {
        code = data.list[0]['execCode'];
      }
      if (winRspType == 'SUCC') {
        //通过第一行取到的code值查询关联表格
        if (type == 'executionReportPledge') {
          if (code) {
            state = await mutations.asyncHttpSearchZYAbout({
              type: 'parent',
              params: { code: code }
            });
          }

          state = getState();
          // return state.set('collateralisedRepoList', data.list); //
          return state
            .setIn(['collateralisedRepoList', 'list'], data.list)
            .setIn(['collateralisedRepoList', 'total'], data.total)
            .setIn(['queryCollateralisedRepoElement', 'reqPageNum'], params.reqPageNum);
        } else if (type == 'executionReportOutright') {
          if (code) {
            state = await mutations.asyncHttpSeachGetAboutdbxx({
              type: 'parent',
              params: { code: code }
            });
          }

          state = getState();
          return state
            .setIn(['outrightRepoList', 'list'], data.list)
            .setIn(['outrightRepoList', 'total'], data.total)
            .setIn(['queryOutrightRepoElement', 'reqPageNum'], params.reqPageNum);
        } //无关联
        else if (type == 'executionReportBond') {
          //现券买卖
          state = getState();
          return state
            .setIn(['cashSaleList', 'list'], data.list)
            .setIn(['cashSaleList', 'total'], data.total)
            .setIn(['queryCashSaleElement', 'reqPageNum'], params.reqPageNum);
        } else if (type == 'onlineExecutReport') {
          //分销
          state = getState();
          return state
            .setIn(['dealInstructionsList', 'list'], data.list)
            .setIn(['dealInstructionsList', 'total'], data.total)
            .setIn(['queryDistributionElement', 'reqPageNum'], params.reqPageNum);
        } else if (type == 'executionReportLending') {
          if (code) {
            //查询债券借贷关联
            state = await mutations.asyncHttpsearchEroPledgeRef({
              type: 'parent',
              params: { code: code }
            });
          }
          //债券借贷
          state = getState();
          // return state.set('dealInstructionsList', data.list);
          return state
            .setIn(['bondLendingList', 'list'], data.list)
            .setIn(['bondLendingList', 'total'], data.total)
            .setIn(['queryBondLendingElement', 'reqPageNum'], params.reqPageNum);
        }
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  async httpSearchGetQueryCondition(state, { type }, { getState }) {
    const typePage = {
      executionReportBond: 'transactionNumberList', //现卷买卖
      executionReportPledge: 'collateralisedRepoNumberList', //质押式回购
      executionReportOutright: 'outrightRepoNumberList', //买断式回购,,
      executionReportLending: 'bondLendingNumberList' //买断式回购,
    };
    let result = await searchGetQueryCondition(type);
    const { winRspType, data } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      if (
        type == 'executionReportOutright' ||
        type == 'executionReportBond' ||
        type == 'executionReportLending'
      ) {
        let arr = [],
          filterArr = [];
        if (data && data.length > 0) {
          data.map(item => {
            if (filterArr.indexOf(item.bondCode) === -1) {
              filterArr.push(item.bondCode);
              arr.push({
                label: `${item.bondCode}--${item.bondName}`,
                value: item.bondCode
              });
            }
          });
          if (type == 'executionReportOutright') {
            state = state.set('bondNameList', arr);
          } else if (type == 'executionReportBond') {
            state = state.set('bondNameListCashSele', arr);
          } else if (type == 'executionReportLending') {
            state = state.set('bondNameListLending', arr);
          }
        }
      }
      return state.set(typePage[type], data);
    }
  },

  /****质押式回购关联***/
  async httpSearchZYAbout(state, { type, params }) {
    let result = {};
    if (type == 'parent') {
      if (!params.code) {
        return;
      }
      result = await searchErpBondRef(params.code);
    } else {
      result = await getAboutzyj(params);
    }

    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.setIn(['aboutHypothecation', 'hypothecationList'], data.list || data || []);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /****买断式担保信息关联***/
  async httpSeachGetAboutdbxx(state, { type, params }) {
    let result = {};
    if (type == 'parent') {
      if (!params.code) {
        return;
      }
      result = await searchEroCollateralRef(params.code);
    } else {
      result = await getAboutdbxx(params);
    }

    const { winRspType, data, msg } = result;
    if (!data) {
      return;
    }
    if (winRspType == 'SUCC') {
      return state.setIn(['aboutguarantee', 'guaranteeList'], data.list || data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*债券借贷关联信息**/

  async httpsearchEroPledgeRef(state, { type, params }) {
    let result = {};
    if (type == 'parent') {
      if (!params.code) {
        return;
      }
      result = await searchEroPledgeRef(params.code);
    } else {
      result = await getAboutdbLendingexecrepdist(params);
    }

    const { winRspType, data, msg } = result;
    if (!data) {
      return;
    }
    if (winRspType == 'SUCC') {
      return state.setIn(['abouteroPledgeRef', 'eroPledgeRefList'], data.list || data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  // /*交易指令编号**/
  // async httpToGetInsterIds(state, { code }, { getState }) {
  //   let result = await toGetInsterIds();
  //   const { winRspType, data, msg } = result;
  //   if (winRspType == 'SUCC') {
  //     if (!data) {
  //       return;
  //     }
  //     let arr = [];
  //     data.map(item => {
  //       arr.push({
  //         label: item,
  //         value: item
  //       });
  //     });
  //     return state.set('getInsterIds', arr);
  //   } else {
  //     message.error(msg || '数据错误');
  //   }
  // },

  /*查询列表**/
  async httpSearchQfList(state, { params, type, cb }, { mutations, getState }) {
    try {
      if (!params.execCode) {
        return;
      }
      let queryElement = {
        reqPageNum: 1,
        reqPageSize: 100,
        execCode: params.execCode
      };

      let result = await childrenList(filterNullElement(queryElement), type);
      const { winRspType, data, msg } = result;

      //获取第一个表格的第一行的code值
      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*查询子行表格**/
  async httpSearchChildrenList(state, { id, cb }) {
    try {
      if (!id) {
        return;
      }
      let queryElement = id;
      let result = await productInfoList(queryElement);
      const { winRspType, data, msg } = result;

      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*查询列表**/
  async httpSearchQfListFX(state, { params, type, cb }, { mutations, getState }) {
    try {
      if (!params.tradeInstrId) {
        return;
      }
      let queryElement = {
        reqPageNum: 1,
        reqPageSize: 100,
        tradeInstrId: params.tradeInstrId
      };

      let result = await childrenList(filterNullElement(queryElement), type);
      const { winRspType, data, msg } = result;

      //获取第一个表格的第一行的code值
      if (winRspType == 'SUCC') {
        typeof cb == 'function' && cb(data);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /**查询结算指令 */
  async httpSearchOrder(state, params, { getState }) {
    let result = await searchOrder(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /**查询指令信息-分销 */
  async httpSearchOrder4Distribution(state, params, { getState }) {
    let result = await searchOrder4Distribution(params);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***** 债券回售 *****/
  // 获取列表
  async httpGetBondList(state, params, { getState, mutations }) {
    try {
      // state = getState()
      let queryElement = {
        ...state.get('queryBondSaleBackElement').toJS(),
        ...params
      };
      let result = await getBondQueryList({
        ...filterNullElement(queryElement),
        isProductLevel: false
      });
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg);
        return;
      }

      return state
        .setIn(['bondSaleBackList', 'list'], data.list)
        .setIn(['bondSaleBackList', 'total'], data.total)
        .setIn(['queryBondSaleBackElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 获取产品信息
  async httpGetProductList(state, params, { getState }) {
    try {
      let result = await getProductMsg();
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        if (!Array.isArray(data) && !!data.list) {
          return state.set('productList', data.list);
        } else {
          return state.set('productList', data || []);
        }
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  //根据业务类别判断客户数据许可证书接口
  async httpLicenseValite(state, params, { getState }) {
    let result = await getLicense();
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('licenseData', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /****根据主表信息，获取其质押券信息***/
  async httpGetZYAbout(state, { type, params }) {
    let result = {};
    if (type == 'parent') {
      if (!params.code) {
        return;
      }
      result = await getExeCodeZY(params.code);
    }
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('ZYAbout', data || []);
    } else {
      message.error(msg || '数据错误');
    }
  },
  /*根据主表信息，获取其抵押券信息**/

  async httpGetDYAbout(state, { type, params }) {
    let result = {};
    if (type == 'parent') {
      if (!params.code) {
        return;
      }
      result = await getExeCodeDY(params.code);
    }
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('DYAbout', data || []);
    } else {
      message.error(msg || '数据错误');
    }
  },
  // 提交拆分信息
  async httppostProductSplit(state, { type, params }, mutations) {
    try {
      let result = {};
      if (type == 'XQ') {
        result = await postProductSplitXQ(params);
      } else if (type == 'ZY') {
        result = await postProductSplitZY(params);
      } else if (type == 'MD') {
        result = await postProductSplitMD(params);
      } else if (type == 'ZQJD') {
        result = await postProductSplitZQJD(params);
      }
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 审核
  async httpCheckList(state, { ids, type }) {
    try {
      let result = await checkList(ids, type);
      const { winRspType, msg, data } = result;
      if (winRspType != 'SUCC') {
        message.error(msg || '操作失败');
        return;
      } else {
        if (data && typeof data == 'object') {
          let arr = [];
          for (let n in data) {
            arr.push(
              <p key={n}>
                成交编号为{n}：{data[n]}
              </p>
            );
          }
          if (arr.length > 0) {
            Modal.info({
              title: '错误信息',
              content: arr.map(item => {
                return item;
              }),
              width: 550,
              className: 'infoMaxheight'
            });
          } else {
            message.success(msg);
          }
        }
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 反审核
  async httpUnCheckList(state, { ids, type }) {
    try {
      let result = await unCheckList(ids, type);
      const { winRspType, msg, data } = result;
      if (winRspType != 'SUCC') {
        message.error(msg || '操作失败');
        return;
      } else {
        if (data && typeof data == 'object') {
          let arr = [];
          for (let n in data) {
            arr.push(
              <p key={n}>
                成交编号为{n}：{data[n]}
              </p>
            );
          }
          if (arr.length > 0) {
            Modal.info({
              title: '错误信息',
              content: arr.map(item => {
                return item;
              }),
              width: 550,
              className: 'infoMaxheight'
            });
          } else {
            message.success(msg);
          }
        }
      }
    } catch (e) {
      message.error('请求错误');
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
  // 查询交易数据
  async httpQueryData(state, params) {
    let result = await queryTransactionData(params);
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      if (data) {
        message.success(msg || '操作成功');
      } else {
        message.error('未查询到对应交易数据');
      }
      return;
    } else {
      message.error(msg || '请求错误');
    }
  }
  // // 获取查询项信息--债券
  // async getBondInfoGroupByReport(state) {
  //   let result = await getBondInfoGroupByReport();
  //   const { winRspType, msg, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let arr = [];
  //     data.map(item => {
  //       arr.push({
  //         value: item.bondCode,
  //         label: `${item.bondCode}--${item.bondName}`
  //       });
  //     });
  //     return state.set('bondNameListBondSaleBack', arr);
  //   } else {
  //     message.error(msg || '操作失败');
  //   }
  // },
  // // 获取查询项信息--交易指令编号
  // async getTradeInstrIdGroupByReport(state) {
  //   let result = await getTradeInstrIdGroupByReport();
  //   const { winRspType, msg, data } = result;
  //   if (winRspType == 'SUCC') {
  //     let arr = [];
  //     data.map(item => {
  //       arr.push({
  //         value: item,
  //         label: item
  //       });
  //     });
  //     return state.set('InstrIdListBondSaleBack', arr);
  //   } else {
  //     message.error(msg || '操作失败');
  //   }
  // }
};
