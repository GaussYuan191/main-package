/*
 * @Author: zhangkuangwen
 * @Date: 2020-03-23 11:09:48
 * @LastEditors: txf
 * @Description: 一些处理表格数据的方法, 与lugia状态管理器结合使用, 目前未在项目中调用过
 */

import { message } from 'antd';

export const selectRows = (state, { selectedRowKeys, selectedRows }) => {
  return state.set('selectedRowKeys', selectedRowKeys).set('selectedRows', selectedRows);
};
export const removeSelectedRows = (state, ids) => {
  let selectedRowKeys = state.get('selectedRowKeys').filter(k => !ids.includes(k));
  let selectedRows = state.get('selectedRows').filter(r => !ids.includes(r.id));
  return state.set('selectedRowKeys', selectedRowKeys).set('selectedRows', selectedRows);
};
export const updateSelectedRows = (state, row) => {
  let selectedRows = state.get('selectedRows').map(r => (r.id === row.id ? { ...r, ...row } : r));
  return state.set('selectedRows', selectedRows);
};
export const clearSelectedRows = state => {
  return state.set('selectedRowKeys', []).set('selectedRows', []);
};

/***审核反审核前端局部刷新***/
export const batchexamine = (ids, state, list, type) => {
  let newState = state.get(list);
  ids.forEach(rowId => {
    state.get(list).forEach((element, index) => {
      if (element.get('id') === rowId) {
        let newRow = state.get(list).get(index).set('checkStatus', type);
        newState = newState.splice(index, 1, newRow);
      }
    });
  });
  return newState;
};

/***批量删除前端局部刷新***/
export const batcheDelete = (ids, state, list) => {
  let newState = state.get(list);
  ids.forEach(rowId => {
    newState.forEach((element, index) => {
      if (element.get('id') === rowId) {
        newState = newState.splice(index, 1);
      }
    });
  });
  return newState;
};

/**更新状态***/
export const upState = (state, stateList, statusName, status, tableRowId) => {
  let index = state.get(stateList).findIndex(item => item.get('id') == tableRowId);
  let newRow = state.get(stateList).get(index).set(statusName, status);
  let newState = state.get(stateList).splice(index, 1, newRow);
  return newState;
};

/***表格修改行前端局部刷新***/
export const upDate = (state, result, list, params) => {
  const { winRspType } = result.data;
  if (winRspType == 'SUCC') {
    let newList = state.get(list).map(item => {
      //判断浏览器对immtable 的兼容
      let id = item.id || item.get('id');
      if (id === params.id) {
        return params;
      } else {
        return item;
      }
    });
    return newList;
  } else {
    message.error('请求错误');
  }
};

/***表格增加行前端局部刷新***/
export const add = (state, result, list, params) => {
  const { winRspType } = result.data;
  if (winRspType === 'SUCC') {
    let newList = state.get(list).unshift(params);
    message.success('新增成功');
    return newList;
  } else {
    message.error('新增失败');
  }
};

/***表格删除行前端局部刷新***/
export const deletes = (state, result, list, id) => {
  const { msg, winRspType } = result.data;
  if (winRspType === 'SUCC') {
    let newList = state.get(list).filter(item => {
      let filterId = item.id || item.get('id');
      return filterId !== id;
    });
    message.success('删除成功');
    return newList;
  } else {
    message.error(msg);
  }
};
