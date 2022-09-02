import { $ajax } from 'yss-biz';

const PREFIX = '/bmtp-cash-manage';

/** 列表项 */
export const axiosQueryDetailList = params =>
  $ajax(`${PREFIX}/hold/prodCarrChangeDetail/pageList`, params, 'post');
/** 获取总余额和期初余额 */

export const axiosGetBalance = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/pageList`, params, 'post');
/** 删除选中的表格行 */

export const axiosDeleteBatch = params =>
  $ajax(`${PREFIX}/hold/prodCarrChangeDetail/deleteBatch`, params, 'delete');
/** 获取证券账号 */

export const axioosGetBondAccountByProductId = params =>
  $ajax('/bmtp-product-manage/account/bondAccount/getBondAccountByProductId', params, 'post');

// 产品持仓明细新增
export const detailAdd = params => $ajax(`${PREFIX}/hold/prodCarrChangeDetail/add`, params, 'post');

// 产品持仓明细修改
export const detailUpdate = params =>
  $ajax(`${PREFIX}/hold/prodCarrChangeDetail/update`, params, 'post');

// 批量审核接口
export const axiosCheckBatch = params =>
  $ajax(`${PREFIX}/hold/prodCarrChangeDetail/checkBatch`, params, 'post');

// 获取总余额
export const getTotalBalance = params =>
  $ajax(`/bmtp-cash-manage/api/hold/productCarryBalanceApi/getProductCarryBalance`, params, 'post');

// 当前交易日
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

