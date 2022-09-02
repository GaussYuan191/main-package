/*********公共***********/
import { message } from 'antd';
import {
  getMoneyList,
  getAccountBalance,
  checkBatch,
  unCheckBatch,
  deleteRow,
  addRow,
  updateRow,
  getAccount,
  findDetail,
  getCurTradeDate
} from '../services/index';
import { page, filterNullElement } from 'yss-biz';

/***交易明细类型*** */

export default {
  /*资金明细List**/
  async httpGetMoneyList(state, params, { getState }) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getMoneyList(queryElement);
      const { msg, winRspType, data } = result;
      if (winRspType == 'SUCC') {
        state = getState();
        return state
          .setIn(['capitalDetailList', 'list'], data.list)
          .setIn(['capitalDetailList', 'total'], data.total);
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error('数据错误');
    }
  },

  /*查找修改的资金余额**/
  async httpGetAccountBalance(state, { params }) {
    let code = params.assetAccountSn;
    let result = await getAccountBalance(code);
    const { msg, winRspType, data } = result;
    if (winRspType == 'SUCC') {
      return state.set('account', data).set('accountAfter', data);
    } else {
      message.error(msg || '数据错误');
    }
  },

  /*选择产品下拉框获取资金**/
  async httpGetAccount(state, { params }, { getState }) {
    let result = await getAccount(filterNullElement(params));
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('account', data).set('accountAfter', data);
    } else {
      // message.error(msg || '数据错误');
      message.error('获取账户失败, 请检查账户所属机构');
      return state.set('account', {}).set('accountAfter', {});
    }
  },

  /*审核**/
  async httpCheckBatch(state, params, { mutations, getState }) {
    //判断审核是否有勾选
    if (!params.length) {
      message.error('请选择需要审核的数据！');
      return;
    }
    let ids = params;
    // let isNoCheck = true;
    // params.forEach(item => {
    //   if (item.checkStatus === '1') {
    //     isNoCheck = false;
    //     return;
    //   } else {
    //     ids.push(item.id);
    //   }
    // });

    let result = await checkBatch(ids);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(`审核成功, 详细：${msg}`);
      let queyElemnt = filterNullElement(getState().get('queryElement').toJS());
      let params = {
        ...queyElemnt
      };
      await mutations.asyncHttpGetMoneyList({ params });
    } else {
      message.error(`审核失败，详细：${msg}`);
    }
  },

  /*反审核**/
  async httpUnCheckBatch(state, { params }, { mutations, getState }) {
    //判断反审核是否有勾选
    if (!params.length) {
      message.error('请选择需要反审核的数据！');
      return;
    }
    let ids = [];
    let isNoCheck = true;
    params.forEach(item => {
      if (item.checkStatus === '2') {
        isNoCheck = false;
        return;
      } else {
        ids.push(item.id);
      }
    });
    let result = await unCheckBatch(ids);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(`反审核成功,详细：${msg}`);
      let queyElemnt = filterNullElement(getState().get('queryElement').toJS());
      let params = {
        ...queyElemnt
      };
      await mutations.asyncHttpGetMoneyList({ params });
    } else {
      message.error(`反审核失败, 详细：${msg}`);
    }
  },

  /*删除一列**/
  async httpDeleteRow(state, { params }, { mutations }) {
    let id = params.id,
      result = await deleteRow(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(`删除成功,详细：${msg}`);
      let params = {
        ...page
      };
      await mutations.asyncHttpGetMoneyList({ params });
    } else {
      message.error(`删除失败,详细：${msg}`);
    }
  },

  /*新增一列**/
  async httpAddRow(state, { params }, { mutations }) {
    let result = await addRow(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(`新增成功, 详细：${msg}`, 1);
      let params = {
        ...page
      };
      await mutations.asyncHttpGetMoneyList({ params });
    } else {
      message.error(`新增失败,详细：${msg}`);
    }
  },

  /*修改一列**/
  async httpUpdateRow(state, { params }, { mutations, getState }) {
    let result = await updateRow(params);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      let queyElemnt = filterNullElement(getState().get('queryElement').toJS());
      let params = {
        ...queyElemnt
      };
      message.success(`修改成功, 详细${msg}`, 1);
      await mutations.asyncHttpGetMoneyList({ params });
    } else {
      message.error(`修改失败, 详细${msg}`);
    }
  },

  // 查询划款状态
  async httpSearchDetail(state, id, { mutations }) {
    let result = await findDetail(id);
    const { winRspType, data, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('modalVal', data);
    } else {
      message.error(`查询失败,详细${msg}`);
    }
  },
  // 获取当前交易日期
  async httpGetCurTradeDate(state, params, { mutations }) {
    const result = await getCurTradeDate();
    const { winRspType, data } = result;
    if (winRspType === 'SUCC') {
      return state.setIn(['currentTradeDate'], data.currentTradeDate);
    } else {
      return state.setIn(['currentTradeDate'], '');
      // message.warning(`获取系统当前交易日期失败, 详细 ${msg}`);
    }
  }
};
