import { $ajax } from 'yss-biz';

/****交易明细 */
export const getMoneyList = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/pageList`, params, 'post');

/****交易明细--批量审核 */

export const checkBatch = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/checkBatch`, params, 'post');

/**资金余额查询 资金账户余额信息-根据资金账户编号查询资金账户余额 */
export const getAccountBalance = accountSn =>
  $ajax(`/bmtp-cash-manage/account/assetAccountBalance/getBalanceByAccountSn/${accountSn}`);

/****交易明细--批量反审核 */

export const unCheckBatch = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/unCheckBatch`, params, 'post');

/****交易明细--删除 */

export const deleteRow = id =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/delete/${id}`, 'delete');

/****交易明细--新增 */

export const addRow = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/add`, params, 'post');

/****交易明细--修改 */

export const updateRow = params =>
  $ajax(`/bmtp-cash-manage/account/assetAccountRecord/update`, params, 'put');

/****交易明细--修改 */

export const getAccount = params =>
  $ajax(
    `/bmtp-product-manage/account/assetAccount/getAssetAccountBalanceBySubjectOrProduct`,
    params,
    'post'
  );

// 查询划款状态
export const findDetail = id =>
  $ajax(
    `/bmtp-cash-manage/transfer/transferCommand/detail/getTransferCommandByTransferInstructCode?transferInstructCode=${id}`,
    {},
    'post'
  );


// 当前交易日
export const getCurTradeDate = () =>
$ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);
