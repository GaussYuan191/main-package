/*********公共***********/
import { message } from 'antd';
import { filterNullElement } from 'yss-biz';

import {
  searchAccountByCondition,
  deleteRow,
  addRow,
  updateRow,
  checkAccount,
  uncheckAccount,
  getProductTree,
  // getAssetRefBatch,
  updateDisableStatus,
  updateEnableStatus,
  updateLogoutStatus
} from '../services/index';
import { page } from 'yss-biz';

/***账户类型*** */
let stateTypes = {
  assetAccount: 'capitalList',
  bondAccount: 'bondList',
  tradeAccount: 'transactionList'
};
/** 查询参数类型 */
const queryElementType = {
  assetAccount: 'queryCapitalElement',
  bondAccount: 'queryBandElement',
  tradeAccount: 'queryTransactionElement'
};
export default {
  /**第一次加载页面**/
  async httpFirstMount(state) {
    try {
      const result = await getProductTree({
        // isAssetUnitLevel: 1,
        isProductLevel: 0
      });
      const { winRspType, data: treelist } = result;
      if (winRspType != 'SUCC') {
        return;
      }
      const firstCode = treelist[0]['code'];
      const firstTitle = treelist[0]['title'];

      let query = {
        ...page,
        relatedSubjectCodes: [firstCode]
      };
      //加载资金账号
      // const result2 = await getAssetRefBatch([firstCode]);

      let treeItemed = { type: 'assetAccount', floor: 1, code: firstCode, title: firstTitle };
      const result3 = await searchAccountByCondition(query, 'assetAccount');
      result3.data.list.total = result3.data.total;
      return (
        state
          .set('treeList', treelist)
          // .set('capitalAccountList', result2.data)
          .set('capitalList', result3.data.list)
          .set('treeItemed', treeItemed)
      );
    } catch (e) {
      message.error('请求错误');
    }
  },

  /**滚动加载节点数据**/
  async loadMoreNodes(state, { code, level, reqPageNum, type }) {
    try {
      let params;
      if (type == 'search') {
        params = {
          isProductLevel: level,
          reqPageNum,
          reqPageSize: 100,
          searchProductCode: code
        };
      } else {
        params = {
          isProductLevel: level,
          reqPageNum,
          reqPageSize: 50,
          searchManagerCode: code
        };
      }
      const result = await getProductTree(params);
      const { winRspType, data } = result;
      if (winRspType != 'SUCC') {
        return;
      }
      return state.set('moreNodes', data || []);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /**根据查询type状态查询账户**/
  async httpAccountlList(state, { params, type }, { getState }) {
    try {
      const treeItemed = state.get('treeItemed').toJS
        ? state.get('treeItemed').toJS()
        : state.get('treeItemed');
      // 若关联主体为产品级, 必须添加关联产品id进行查询, 否则用关联code查询
      let newParams = {
        relatedSubjectIdList: treeItemed.floor >= 3 ? (treeItemed.key ? [treeItemed.key] : []) : '',
        relatedSubjectCodes: treeItemed.code ? [treeItemed.code] : [],
        ...params
      };
      let result = await searchAccountByCondition(filterNullElement(newParams), type);
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        const { list, total, pageNum, pageSize } = data;
        list.total = total;
        return state
          .set(stateTypes[type], list)
          .setIn([queryElementType[type], 'reqPageNum'], pageNum)
          .setIn([queryElementType[type], 'reqPageSize'], pageSize);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***增加一行*****/
  async httpAddRow(state, { params, type }, { mutations, getState }) {
    let newParams = filterNullElement(params);
    let result = await addRow(newParams, type);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success('增加成功');
      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***删除一列*****/
  async httpDeleteRow(state, { params, type }, { mutations, getState }) {
    let id = params.id;
    let result = await deleteRow(id, type);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('删除成功');
      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***修改一列******/
  async httpUpdateRow(state, { params, type, list }, { mutations, getState }) {
    let result = await updateRow(params, type);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('修改成功');
      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
    } else {
      message.success(msg || '数据错误');
      return;
    }
  },

  /***批量审核********/
  async httpBatchexamine(state, { params, type, callback }, { mutations, getState }) {
    //判断审核是否有勾选 1：已审核,2：是待审核;
    if (!params.length) {
      message.error('请勾选数据后再操作?');
      return;
    }

    let arr = params.filter(item => item.checkStatus === '1');
    if (arr && arr.length) {
      message.error('选择的数据存在已审核的记录');
      return;
    }

    let ids = [];
    let isNoCheck = true;
    params.forEach(item => {
      if (item.checkStatus === '1') {
        isNoCheck = false;
        return;
      } else {
        ids.push(item.id);
      }
    });

    let result = await checkAccount(ids, type);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('审核成功');

      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***批量反审核 */
  async httpUncheckAccount(state, { params, type, callback }, { mutations, getState }) {
    //判断审核是否有勾选   1：已审核,2：是待审核;
    if (!params.length) {
      message.error('请勾选数据后再操作?');
      return;
    }

    let arr = params.filter(item => item.checkStatus === '2');
    if (arr && arr.length) {
      message.error('选择的数据存在反审核的记录');
      return;
    }

    let ids = [];
    let isNoCheck = true;
    params.forEach(item => {
      if (item.checkStatus === '2') {
        isNoCheck = false;
      } else {
        ids.push(item.id);
      }
    });

    let result = await uncheckAccount(ids, type);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('反审核成功');
      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***修改状态 */
  async httpUpdateStatus(state, { row, type, status }, { mutations, getState }) {
    //1：启用，2：停用，3：注销
    let tableRowId = row.id;
    let result;
    if (status == '1') {
      //启用状态
      result = await updateEnableStatus(type, tableRowId);
    } else if (status == '2') {
      //停用状态
      result = await updateDisableStatus(type, tableRowId);
    } else {
      //注销状态
      result = await updateLogoutStatus(type, tableRowId);
    }
    const { winRspType, msg } = result;
    if (winRspType != 'SUCC') {
      message.error(msg || '数据错误');
      return;
    } else {
      message.success('操作成功');

      state = getState();
      await mutations.asyncHttpAccountlList({ params: page, type });
    }
  }
};
