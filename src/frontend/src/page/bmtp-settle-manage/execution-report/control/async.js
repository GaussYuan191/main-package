/*********公共***********/
import { message, Modal } from 'antd';
import React from 'react';
import {
  searchTransactionReturnsList,
  // searchGetQueryCondition,
  searchErpBondRef,
  searchEroCollateralRef,
  // toGetInsterIds,
  getBondQueryList,
  searchEroPledgeRef,
  // getQueryCondition,
  getLicense,
  getProductMsg,
  currentTradingDay,
  // allBondList,
  checkList,
  unCheckList,
  postFormAdd,
  delList,
  detailMsg,
  postFormEdit
  // getBondInfoGroupByReport,
  // getTradeInstrIdGroupByReport
} from '../services/index';

import { filterNullElement } from 'yss-biz';
import { stat } from 'fs-extra';
// import { stat } from 'fs-extra';

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
          if (data.list.length > 0 && code) {
            //查询质押式回购关联
            await mutations.asyncHttpSearchErpBondRef({
              code
            });
          }

          state = getState();
          // return state.set('collateralisedRepoList', data.list); //
          return state
            .setIn(['collateralisedRepoList', 'list'], data.list)
            .setIn(['collateralisedRepoList', 'total'], data.total)
            .setIn(['queryCollateralisedRepoElement', 'reqPageNum'], params.reqPageNum);
        } else if (type == 'executionReportOutright') {
          if (data.list.length > 0 && code) {
            //查询买断式回购关联
            await mutations.asyncHttpsearchEroCollateralReff({ code });
          }

          state = getState();
          // return state.set('outrightRepoList', data.list);
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
          // return state.set('dealInstructionsList', data.list);
          return state
            .setIn(['dealInstructionsList', 'list'], data.list)
            .setIn(['dealInstructionsList', 'total'], data.total)
            .setIn(['queryDistributionElement', 'reqPageNum'], params.reqPageNum);
        } else if (type == 'executionReportLending') {
          if (data.list.length > 0 && code) {
            //查询债券借贷关联
            await mutations.asyncHttpsearchEroPledgeRef({ code });
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

  // async httpSearchGetQueryCondition(state, { type }, { getState }) {
  //   const typePage = {
  //     executionReportBond: 'transactionNumberList', //现卷买卖
  //     executionReportPledge: 'collateralisedRepoNumberList', //质押式回购
  //     executionReportOutright: 'outrightRepoNumberList', //买断式回购,
  //     executionReportLending: 'bondLendingNumberList' //买断式回购,
  //   };
  //   let result = await searchGetQueryCondition(type);
  //   const { winRspType, data } = result;
  //   if (winRspType == 'SUCC') {
  //     state = getState();
  //     if (
  //       type == 'executionReportOutright' ||
  //       type == 'executionReportBond' ||
  //       type == 'executionReportLending'
  //     ) {
  //       let arr = [],
  //         filterArr = [];
  //       if (data && data.length > 0) {
  //         data.map(item => {
  //           if (filterArr.indexOf(item.bondCode) === -1) {
  //             filterArr.push(item.bondCode);
  //             arr.push({
  //               label: `${item.bondCode}--${item.bondName}`,
  //               value: item.bondCode
  //             });
  //           }
  //         });
  //         if (type == 'executionReportOutright') {
  //           state = state.set('bondNameList', arr);
  //         } else if (type == 'executionReportBond') {
  //           state = state.set('bondNameListCashSele', arr);
  //         } else if (type == 'executionReportLending') {
  //           state = state.set('bondNameListLending', arr);
  //         }
  //       }
  //     }
  //     return state.set(typePage[type], data);
  //   }
  // },

  /*质押回购查询关联列表**/
  async httpSearchErpBondRef(state, { code }, { getState }) {
    if (!code) {
      return;
    }
    let result = await searchErpBondRef(code);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('erpBondRefList', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*买断式回购查询关联保障品列表**/
  async httpsearchEroCollateralReff(state, { code }, { getState }) {
    if (!code) {
      return;
    }
    let result = await searchEroCollateralRef(code);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('guaranteeList', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*债券借贷关联信息-抵押券信息**/
  async httpsearchEroPledgeRef(state, { code }, { getState }) {
    if (!code) {
      return;
    }
    let result = await searchEroPledgeRef(code);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      state = getState();
      return state.set('eroPledgeRefList', data);
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

  /***** 债券回售 *****/
  // 获取列表
  async httpGetBondList(state, params, { getState, mutations }) {
    try {
      state = getState();
      let queryElement = {
        ...state.get('queryBondSaleBackElement').toJS(),
        ...params
      };
      let result = await getBondQueryList({
        isProductLevel: false,
        ...filterNullElement(queryElement)
      });
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg || '请求错误');
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
  // 获取产品信息
  async httpGetProductList(state, params, { getState }) {
    try {
      let result = await getProductMsg();
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        return state.set('productList', data);
      } else {
        message.error(msg || '请求错误');
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
  // },
  // 审核
  async httpCheckList(state, { ids, type }) {
    try {
      let result = await checkList(ids, type);
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
        return;
      } else {
        if (!data) {
          message.error(msg || '操作失败');
        }
        let dataList;
        if (!Array.isArray(data)) {
          dataList = [data];
        } else {
          dataList = data;
        }
        Modal.info({
          title: '提示信息',
          content: (
            <div>
              {dataList.map((item, index) => {
                for (let n in item) {
                  return (
                    <div key={index}>
                      交易指令编号：{n}，错误信息：{item[n]}
                    </div>
                  );
                }
              })}
            </div>
          )
        });
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 反审核
  async httpUnCheckList(state, { ids, type }) {
    try {
      let result = await unCheckList(ids, type);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
        return;
      } else {
        message.error(msg || '操作失败');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 新增--提交
  async httpPostAdd(state, { type, params }) {
    try {
      let result = await postFormAdd(params, type);
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        if (data && data.length > 0) {
          let content = '';
          for (let n in data) {
            content += `交易指令编号${n}：${data[n]};<br/>`;
          }
          Modal.info({
            title: '提示信息',
            content
          });
        } else {
          message.success(msg || '操作成功');
        }
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 新增--提交
  async httpPostEdit(state, { type, params }) {
    try {
      let result = await postFormEdit(params, type);
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        if (data && data.length > 0) {
          let content = '';
          for (let n in data) {
            content += `交易指令编号${n}：${data[n]};<br/>`;
          }
          Modal.info({
            title: '提示信息',
            content
          });
        } else {
          message.success(msg || '操作成功');
        }
      } else {
        message.error(msg || '请求错误');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 删除
  async httpDel(state, { type, ids }) {
    try {
      let result = await delList(ids, type);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg || '操作成功');
        return;
      } else {
        message.error(msg || '操作失败');
      }
    } catch (e) {
      message.error('请求错误');
    }
  },
  // 获取详数据
  async httpDetailMsg(state, params) {
    let result = await detailMsg(params);
    const { winRspType, msg, data } = result;
    if (winRspType == 'SUCC') {
      return state.set('detailMsgFX', data);
    } else {
      message.error(msg || '操作失败');
    }
  }
  // 获取查询项信息--债券
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
  // 获取查询项信息--交易指令编号
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
