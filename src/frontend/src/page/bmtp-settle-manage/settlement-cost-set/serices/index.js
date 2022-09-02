import { $ajax } from 'yss-biz';

/****--新增****/
export const addRow = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/add`, params, 'post');

/****-审核****/
export const checkClient = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/check/${id}`, {}, 'get');

// /****-批量审核****/
export const batchCheckClient = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/checkBatch`, params, 'post');

/****-删除****/
export const deleteRow = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/delete/${id}`, {}, 'delete');

/****-批量删除删除****/
export const batchDeleteRow = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/deleteBatch`, params, 'delete');

/****-结算费用设置信息-详情***/
export const getRowDetail = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/detail/${id}`, {}, 'get');

/****-结算费用设置信息-按条件导出****/
export const exportCondition = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/export/condition`, params, 'post');

/****-结算费用设置信息-导出选中项****/
export const exportSelected = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/export/selected`, params, 'post');

/****-结算费用设置信息-分页列表查询****/
export const getQueryList = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/pageList`, params, 'post');

/****-启用****/
export const startInfo = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/start/${id}`, {}, 'get');

/****-停用****/
export const stopInfo = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/stop/${id}`, {}, 'get');

/****-反审核****/
export const unCheckClient = id =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/unCheckOne/${id}`, {}, 'get');

/****批量反审核****/
export const batchUnCheckClient = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/unCheckBatch`, params, 'post');

/****--修改****/
export const updateRow = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeSetting/update`, params, 'put');
