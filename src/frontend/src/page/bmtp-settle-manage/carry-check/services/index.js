import { $ajax } from 'yss-biz';

/**持仓核对列表 */
export const searchCheckList = params =>
  $ajax(`/bmtp-settle-manage/hold/cashCarryCheck/pageList`, params, 'post');

/****按条件导出 */
export const exportExecutionReportBond = params =>
  $ajax(`/bmtp-settle-manageT/hold/cashCarryCheck/export/condition`, params, 'post', {
    responseType: 'arraybuffer'
  });

/****按条件导出 */
export const exportExecutionReportCurrent = params =>
  $ajax(`/bmtp-settle-manage/hold/cashCarryCheck/export/condition`, params, 'post', {
    responseType: 'arraybuffer'
  });

// 账户类型
export const getAccoutType = params => $ajax(`/dfas-base-biz/dics/listAllSub`, params, 'post');

// 导入
export const toImportOpt = params =>
  $ajax(`/bmtp-settle-manage/hold/cashCarryCheck/checkCashCarryData`, params, 'post');

// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);
