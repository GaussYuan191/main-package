// import { handleExport } from 'yss-biz';
import { message } from 'antd';
import {
  axiosBondList,
  axiosCheck,
  axiosUncheck,
  axiosDelete,
  axiosGetBondInfo,
  axiosAdd,
  axiosUpdate,
  getCodeMenu
} from '../services';

export default {
  // 查询表格数据
  async getBondTableDatas(state, params, { mutations, getState }) {
    const response = await axiosBondList(params);
    const { data, winRspType, msg } = response;
    if (winRspType !== 'SUCC') {
      message.error(msg || '数据错误');
      return;
    }
    data.list.map((item, index) => (item.index = index + 1));
    return state
      .setIn(['bondTable', 'dataSource'], data.list)
      .setIn(['bondTable', 'total'], data.total)
      .setIn(['paging', 'reqPageNum'], params.reqPageNum)
      .setIn(['paging', 'reqPageSize'], params.reqPageSize);
  },
  //审核
  async check(state, params, { mutations, getState }) {
    const response = await axiosCheck(params);
    const { winRspType, msg } = response;
    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误');
      return;
    } else {
      message.success(msg || '审核成功', 1);
    }
  },
  //反审核
  async uncheck(state, params, { mutations, getState }) {
    const response = await axiosUncheck(params);
    const { winRspType, msg } = response;
    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误');
      return;
    } else {
      message.success(msg || '反审核成功', 1);
    }
  },
  //删除
  async delete(state, params, { mutations, getState }) {
    const response = await axiosDelete(params);
    const { winRspType, msg } = response;
    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误');
      return;
    } else {
      message.success(msg || '删除成功', 1);
    }
  },
  //获取债券基本信息
  async getBaseInfo(state, params, { mutations, getState }) {
    const response = await axiosGetBondInfo(params);
    const { data, winRspType, msg } = response;
    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误');
      return;
    } else {
      return state.set('modalMessage', data);
    }
  },
  //新增/修改保存
  async save(state, { sign, params }, { mutations, getState }) {
    let result;
    if (sign == 'add') {
      result = await axiosAdd(params);
    } else if (sign == 'edit') {
      result = await axiosUpdate(params);
    }
    const { winRspType, msg } = result;
    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误', 3);
      return;
    } else {
      message.success(msg || '操作成功', 1);
    }
  },
  //获取债券类型
  async getCodeMenu(state, params, { mutations, getState }) {
    const response = await getCodeMenu(params);
    const { data, winRspType, msg } = response;

    if (winRspType !== 'SUCC') {
      message.error(msg || '请求错误');
      return;
    } else {
      let arr = data.map(item => {
        return {
          value: item.securityType,
          label: item.securityTypeName
        };
      });
      return state.merge({ ZQlist: arr });
    }
  }
};
