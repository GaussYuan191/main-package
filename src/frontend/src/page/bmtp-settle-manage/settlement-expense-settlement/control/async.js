// import { isCheckTrue } from "yss-biz/utils/util/tools"
import { filterNullElement } from 'yss-biz';
import { page } from 'yss-biz/utils/util/constant';
import { message, modal } from 'antd';
import {
  getQueryList,
  addRow,
  updateRow,
  deleteRow,
  chargeSplit,
  chargeSplitConfirm,
  chargeUnSplitConfirm,
  getChargeProductDetail,
  getChargeTotal,
  getChargeDetail,
  chargeProductUpdate,
  noticeTransfer,
  toCheckData,
  toUnCheckData,
  getProductIdFromConsigor,
  cancelMergeList,
  getAccountCostDetail,
  getChargeItemPageList,
  createTransfer
} from '../serices/index';
export default {
  /**查询列表*******/
  async httpGetList(state, params, { getState }) {
    try {
      state = getState();
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getQueryList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error('请求错误' || msg);
        return;
      }
      return state
        .set('settlementList', data.list)
        .set('settlementTotal', data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***增加一行*******/
  async httpAddRow(state, { params }, { mutations }) {
    try {
      let result = await addRow(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
        await mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      message.error(`异常:${error}`);
    }
  },

  /***修改一行*******/
  async httpUpDateRow(state, { params }, { mutations }) {
    let result = await updateRow(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  /***删除一行*******/
  async httpDeleteRow(state, { params }, { mutations }) {
    let id = params.id;
    let result = await deleteRow(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      await mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // /***费用拆分功能********/
  async httpChargeSplit(state, { params }, { mutations }) {
    const result = await chargeSplit(params.id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // /***费用拆分确认功能********/
  async httpChargeSplitConfirm(state, { params }, { mutations }) {
    const result = await chargeSplitConfirm(params.id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // /***费用拆分取消确认功能********/
  async httpChargeUnSplitConfirm(state, { params }, { mutations }) {
    const result = await chargeUnSplitConfirm(params.id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      mutations.asyncHttpGetList({});
    } else {
      message.error(msg);
    }
  },

  // /***通知划款功能********/
  async httpNoticeTransfer(state, { params }, { mutations }) {
    try {
      params &&
        params.forEach(async param => {
          const result = await noticeTransfer(param.id);
          const { winRspType, msg } = result;
          if (winRspType == 'SUCC') {
            message.success(msg);
            await mutations.asyncHttpGetList({});
          } else {
            message.error(msg);
          }
        });
    } catch (error) {
      message.error(`异常：${error}`);
    }
  },

  // /***获取关联信息表格中的值并更新相关的状态********/
  async httpGetChargeProductDetail(state, { params }, { mutations }) {
    const parentId = params ? params.id : state.get('parentId') || '';
    const pageParams = { ...state.get('queryPage').toJS() };
    const targetParams = Object.assign({}, { ...page }, { parentId }, { ...pageParams });
    const result = await getChargeProductDetail(targetParams);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('aboutList', data.list).set('aboutTotal', data.total);
    } else {
      message.error(`异常：${msg}`);
    }
  },

  /**获取产品所有费用信息 */
  async httpGetChargeProductAll(state) {
    const parentId = state.get('parentId') || '';
    const result = await getChargeProductDetail({ parentId, reqPageNum: 1, reqPageSize: 10000 });
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('readjustingList', data.list);
    } else {
      message.error(`异常：${msg}`);
    }
  },

  /***获取费用拆分与调整金额的统计值 */
  async httpGetChargeTotal(state, id) {
    const parentId = id || state.get('parentId') || '';
    const result = await getChargeTotal(parentId);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state
        .set('splitChargeAmount', data.splitChargeAmount)
        .set('adjustChargeAmount', data.adjustChargeAmount);
    } else {
      message.error(`异常：${msg}`);
    }
  },

  // /***获取关联信息表格中的 产品费用详细表格的数据********/
  async httpGetChargeDetail(state, { params }, { mutations }) {
    const {
      row: { parentId = '', refProductCode = '' }
    } = params;
    const pageParams = { ...state.get('queryInfoPage').toJS() };
    const targetParams = Object.assign(
      {},
      { ...page },
      { parentId, refProductCode },
      { ...pageParams }
    );
    const result = await getChargeDetail(targetParams);
    const { data, winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      return state.set('aboutInfoList', data.list).set('aboutInfoTotal', data.total);
    } else {
      message.error(`异常：${msg}`);
    }
  },

  // /***手工调整更新数据********/
  async httpChargeProductUpdate(state, { params }, { mutations }) {
    let ajaxList =
      params &&
      params.map(param => {
        // const { id, refProductCode } = param;
        return new Promise((resolve, reject) => {
          chargeProductUpdate(param).then(async result => {
            const { winRspType, msg } = result;
            if (winRspType == 'SUCC') {
              // await mutations.asyncHttpGetChargeDetail({
              //   params: { row: { parentId: id, refProductCode } }
              // });
              resolve();
            } else {
              // message.error(`异常：${msg}`);
              reject(msg);
            }
          });
        });
      });
    Promise.all(ajaxList)
      .then(async res => {
        message.success(`手工调整成功`);
        await mutations.asyncHttpGetList({});
        await mutations.asyncHttpGetChargeProductDetail({});
      })
      .catch(errMsg => {
        message.error(`手工调整异常${errMsg || ''}`);
      });
  },

  // 审核
  async httpToCheckData(state, ids, { getState, mutations }) {
    let result = await toCheckData(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },

  // 反审核
  async httpToUnCheckData(state, ids, { getState, mutations }) {
    let result = await toUnCheckData(ids);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },

  // 查询管理人下的产品
  async httpGetProductIdFromConsigor(state, params, { getState, mutations }) {
    let result = await getProductIdFromConsigor(params);
    const { data, winRspType, msg } = result;
    state = getState();
    if (winRspType == 'SUCC') {
      return state.set('productIdList', data.list);
    } else {
      message.error(msg || '请求错误');
    }
  },
  /**批量取消合成 */
  async httpCancelMergeList(state, param, { getState, mutations }) {
    let result = await cancelMergeList(param);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      message.error(msg || '请求错误');
      return state;
    }
  },
  /**生成划款指令 */
  async httpCreateTransfer(state, param, { getState, mutations }) {
    let result = await createTransfer(param);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      state = await mutations.asyncHttpGetList({});
      return state;
    } else {
      modal.error({
        title: '生成划款失败',
        width: 700,
        content: msg,
        className: 'confirModals'
      });
      return state;
    }
  },

  // // /***批量反审核********/
  // async httpUncheckAccount(state, { params }, { mutations }) {
  //   //判断审核是否有勾选  1：审核,2：是未审核;
  //   let stringTtpe = isCheckTrue(params, '2', '是否要将选中的记录执行【反审核】操作？');
  //   if (typeof stringTtpe == 'boolean') {
  //     message.error('选择项存在反审核人');
  //     return;
  //   }
  //   let result = await batchUnCheckClient(stringTtpe);
  //   const { winRspType, msg } = result;
  //   if (winRspType == 'SUCC') {
  //     //前端局部刷新页面
  //     message.success(msg);
  //     mutations.asyncHttpGetClientList();
  //   }
  // }

  /* 已出账单费用明细查询 */
  async httpGetAccountCostDetail(state, params, {}) {
    const result = await getAccountCostDetail(params);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '请求错误');
    }
  },

  /* 关联信息-费用条目明细 */
  async httpgetChargeItemPageList(state, params, {}) {
    const result = await getChargeItemPageList({ ...params, ...page });
    console.log(result);
    const { winRspType, msg, data } = result;
    if (winRspType === 'SUCC') {
      if (!data?.list?.length) {
        return state
          .setIn(['chargeItemList', 'list'], [])
          .setIn(['chargeItemList', 'total'], data.total);
      }
      return state
        .setIn(['chargeItemList', 'list'], data.list)
        .setIn(['chargeItemList', 'total'], data.total);
    } else {
      message.error(msg);
    }
  }
};
