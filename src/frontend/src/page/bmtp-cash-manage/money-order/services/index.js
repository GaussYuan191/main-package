/**划款指令*/
import { $ajax } from 'yss-biz';

// 划款指令列表查询
export const instructionList = params =>
  $ajax(`/bmtp-cash-manage/transfer/transferCommand/pageList`, params, 'post');

// 执行指令
export const implementInstruct = ids =>
  $ajax(`/bmtp-cash-manage/transfer/transferCommand/executeByIds`, ids, 'post');

// 重发指令
export const reissuedInstruct = id =>
  $ajax(`/bmtp-cash-manage/transfer/transferCommand/resend/${id}`, {}, 'post');

// 撤销指令
export const revokeInstruct = id =>
  $ajax(`/bmtp-cash-manage/transfer/transferCommand/revoke/${id}`, {}, 'post');

// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

// 查询清算系统划款指令接口
export const queryInstruct = ids =>
  $ajax(`/bmtp-cash-manage/transfer/transferCommand/queryClearingSystemTransferCommandByIds`, ids, 'post');

/**查询序列号关联 */
export const axiosSeqNoAbout = id => $ajax(`/bmtp-open-platform/commandmap/queryByBatchNo/${id}`);
