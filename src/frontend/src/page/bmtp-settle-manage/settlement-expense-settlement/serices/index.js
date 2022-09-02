import { $ajax } from 'yss-biz';

/****-查询结算费用信息的数据***/

export const getQueryList = params =>
  $ajax(`/bmtp-settle-manage/charge/charge/pageList`, params, 'post');

/****--新增****/

export const addRow = params => $ajax(`/bmtp-settle-manage/charge/charge/add`, params, 'post');

/****--修改****/

export const updateRow = params => $ajax(`/bmtp-settle-manage/charge/charge/update`, params, 'put');

/****-删除****/
export const deleteRow = id =>
  $ajax(`/bmtp-settle-manage/charge/charge/delete/${id}`, {}, 'delete');

// /****-费用拆分****/

export const chargeSplit = id =>
  $ajax(`/bmtp-settle-manage/charge/charge/chargeSplit/${id}`, {}, 'get');

// /****-费用拆分确认****/
export const chargeSplitConfirm = id =>
  $ajax(`/bmtp-settle-manage/charge/charge/splitConfirm/${id}`, {}, 'get');

// /****-费用拆分取消确认****/
export const chargeUnSplitConfirm = id =>
  $ajax(`/bmtp-settle-manage/charge/charge/unSplitConfirm/${id}`, {}, 'get');

/****-获取费用拆分和调整金额的合计值 */
export const getChargeTotal = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeProduct/getProductTotalFeeAmount`, params, 'post');

/****-获取关联信息表格中的数据***/
export const getChargeProductDetail = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeProduct/pageList`, params, 'post');

/****-获取关联信息表格中的数据***/
export const getChargeDetail = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeDetail/pageList`, params, 'post');

/****-手工调整 更新数据***/
export const chargeProductUpdate = params =>
  $ajax(`/bmtp-settle-manage/charge/chargeProduct/update`, params, 'put');

/****-通知划款***/
export const noticeTransfer = id =>
  $ajax(`/bmtp-settle-manage/charge/charge/noticeTransfer/${id}`, {}, 'get');

//批量审核
export const toCheckData = ids =>
  $ajax(`/bmtp-settle-manage/charge/charge/checkBatch`, ids, 'post');

// 批量反审核
export const toUnCheckData = ids =>
  $ajax(`/bmtp-settle-manage/charge/charge/unCheckBatch`, ids, 'post');

/* 获取管理人下产品id及名称 */
export const getProductIdFromConsigor = params =>
  $ajax('/bmtp-product-manage/product/product/listProductIdCodeAndName', params, 'post');

/* 批量取消合成 */
export const cancelMergeList = params =>
  $ajax('/bmtp-settle-manage/charge/charge/cancelMerge', params, 'post');

/* 生成划款指令 */
export const createTransfer = params =>
  $ajax('/bmtp-settle-manage/charge/charge/generateTransferCommand', params, 'post');

/* 已出账单费用明细查询 */
export const getAccountCostDetail = params =>
  $ajax('/bmtp-settle-manage/charge/chargeitem/selectAccountCostDetail', params, 'post');

/**关联信息-费用条目-分页列表查询*/
export const getChargeItemPageList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/pageList`, params, 'post');
};
