import { $ajax } from 'yss-biz';

export const getassetUnitList = params =>
  $ajax(`/bmtp-product-manage/product/assetUnit/pageList`, params, '$ajax');
/**（资金/债券）账户-根据条件查询 */
export const searchAccountByCondition = (params, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/searchAccountByCondition`, params, 'post');

/***添加一条数据*/
export const addRow = (addData, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/add`, addData, 'post');

/***删除一条数据*/
export const deleteRow = (id, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/delete/${id}`, 'delete');

/***修改一条数据*/
export const updateRow = (params, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/update`, params, 'put');

/***批量-审核 */
export const checkAccount = (ids, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/checkAccount`, ids, 'put');

/***批量-反审核 */
export const uncheckAccount = (ids, type) =>
  $ajax(`/bmtp-product-manage/account/${type}/uncheckAccount`, ids, 'put');

/*账户停用**/
export const updateDisableStatus = (type, id) =>
  $ajax(`/bmtp-product-manage/account/${type}/updateDisableStatus/${id}`, 'put');

/*账户启用**/
export const updateEnableStatus = (type, id) =>
  $ajax(`/bmtp-product-manage/account/${type}/updateEnableStatus/${id}`, 'put');

/*账户注销**/
export const updateLogoutStatus = (type, id) =>
  $ajax(`/bmtp-product-manage/account/${type}/updateLogoutStatus/${id}`, 'put');

/***资金账户-获取关联主体下的所有资金账户*/
export const getAssetRefBatch = params =>
  $ajax(`/bmtp-product-manage/account/assetAccount/getAssetRefBatch`, params, 'post');

/***债券托管账户-获取关联主体下的所有债券托管账户*/
export const getBondRefBatch = params =>
  $ajax(`/bmtp-product-manage/account/bondAccount/getBondRefBatch`, params, 'post');

/***交易账户-获取关联主体下的所有交易账户*/
export const getTradeRefBatch = params =>
  $ajax(`/bmtp-product-manage/account/tradeAccount/getTradeRefBatch`, params, 'post');

/***产品树结构*/
export const getProductTree = params =>
  $ajax('/bmtp-product-manage/product/product/getLevelTree', params, 'post');

//债券托管账户类型
export const bondAccountType = params => $ajax('/dfas-base-biz/dics/listAllSub', params, 'post');
//资金托管账户类型
export const capitalAccountType = params => $ajax('/dfas-base-biz/dics/listAllSub', params, 'post');

export const requestProductInfoByACS = params =>
  $ajax('/bmtp-open-platform/api/external/product/requestProductInfoByACS', params, 'post');
