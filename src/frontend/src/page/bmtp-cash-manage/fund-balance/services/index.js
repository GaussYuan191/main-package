//import lugiax from 'lugiax';
import { $ajax } from 'yss-biz';

// export const getassetUnitList = (params) =>$ajax(`/bmtp-product-manage/product/assetUnit/pageList`, params, '$ajax');

/**获取资金账户余额列表 */
export const searchAssetAccountBalanceList = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountBalance/pageList`, params, 'post');

/**根据资金账户余额查询关联信息 */

export const searchAboutBalanceList = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/pageList`, params, 'post');

/** 日间提款资金账户信息 */
export const axiosGetAssetAccountBalanceBySubjectOrProduct = params =>
  $ajax(
    '/bmtp-product-manage/account/assetAccount/getAssetAccountBalanceBySubjectOrProduct',
    params,
    'post'
  );

/*** 日间提款提交 */
export const axiosDaytimeWithdrawals = params =>
  $ajax('/bmtp-cash-manage/account/assetAccountBalance/daytimeWithdrawals', params, 'post');
// /****机构-下拉列表弹框****/
// export const getConsignorDownData = (params) => $ajax(`/bmtp-product-manage/consignor/pullDownList`, params, 'post');

// 批量回款
export const batchReturnedMoney = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountBalance/daytimeWithdrawalsBatch`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');


//发送
export const axioSend = params =>
  $ajax('/bmtp-cash-manage/account/assetAccountBalance/sendProductAssetBalance', params, 'post');

// 根据查询代码查询资金账户
export const axioxAssetAccount = () =>
  $ajax(`/bmtp-product-manage/account/assetAccount/getAllAssetAccount`, 'post');
