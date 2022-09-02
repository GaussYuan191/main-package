// import { isCheckTrue } from "yss-biz/utils/util/tools"
import { filterNullElement, isCheckTrue } from 'yss-biz';
import { message } from 'antd';
import {
  getQueryList,
  addRow,
  updateRow,
  deleteRow,
  batchCheckClient,
  batchUnCheckClient,
  startInfo,
  stopInfo
} from '../serices/index';

const isSelectedData = params => {
  return params && Array.isArray(params) && params.length > 0;
};

export default {
  /**查询列表*******/
  async httpGetList(state, { params = {} }, { getState }) {
    try {
      // state = getState();
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getQueryList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(`异常：${msg}`);
        return;
      }
      return state
        .set('settlementList', data.list)
        .set('total', data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求数据异常');
    }
  },

  /***增加一列*******/
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
    } catch (e) {
      message.error(e);
    }
  },

  /***修改一行*******/
  async httpUpDateRow(state, { params }, { mutations }) {
    try {
      let result = await updateRow(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
        await mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  /***删除一行*******/
  async httpDeleteRow(state, { params }, { mutations }) {
    try {
      let id = params.id;
      let result = await deleteRow(id);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
        await mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },
  // /***批量审核********/
  async httpBatchexamine(state, { params }, { mutations }) {
    try {
      if (!isSelectedData(params)) {
        message.error('请选择需要审核的数据！');
        return;
      }
      //判断审核是否有勾选 1：审核,2：是未审核;
      let stringTtpe = isCheckTrue(params, '1', 'checkStatus');
      if (typeof stringTtpe == 'boolean') {
        message.error('只有未审核的数据才能审核，请重新选择');
        return;
      }
      let result = await batchCheckClient(stringTtpe);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        if (params.length > 1) {
          message.success('批量审核通过');
        } else {
          message.success('审核通过');
        }
        mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  // /***批量反审核********/
  async httpUncheckAccount(state, { params }, { mutations }) {
    try {
      if (!isSelectedData(params)) {
        message.error('请选择需要反审核的数据！');
        return;
      }
      //判断审核是否有勾选  1：审核,2：是未审核;
      let stringTtpe = isCheckTrue(params, '2', 'checkStatus');
      if (typeof stringTtpe == 'boolean') {
        message.error('只有已审核的数据才能反审核，请重新选择');
        return;
      }
      let result = await batchUnCheckClient(stringTtpe);
      const { winRspType, msg } = result;
      if (winRspType == 'SUCC') {
        //前端局部刷新页面
        if (params.length > 1) {
          message.success('批量反审核通过');
        } else {
          message.success('反审核通过');
        }
        mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    }
  },

  //***启用** */
  async httpStart(state, { params }, { mutations }) {
    try {
      let result = await startInfo(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
        mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      message.error(error);
    }
  },

  //***停用** */
  async httpStop(state, { params }, { mutations }) {
    try {
      let result = await stopInfo(params);
      const { msg, winRspType } = result;
      if (winRspType == 'SUCC') {
        message.success(msg);
        mutations.asyncHttpGetList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      message.error(error);
    }
  }
};
