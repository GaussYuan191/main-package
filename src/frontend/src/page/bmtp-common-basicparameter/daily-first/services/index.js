// import axios from 'axios';

/**日初*/
import { $ajax } from 'yss-biz';

// 日初列表查询
export const dayilyFirstList = params =>
  $ajax(`/bmtp-common-basicparameter/job/pageList`, params, 'post');

// 日初的开始操作
export const dayilyFirstStart = params =>
  $ajax(`/bmtp-common-basicparameter/job/executeByOneJob`, params, 'post');

//日初日志显示
export const dayilyFirstLogList = params =>
  $ajax(`/bmtp-common-basicparameter/log/pageList`, params, 'post');

// 日初日志数据更新
export const dayilyFirstLogNum = params =>
  $ajax(`/bmtp-common-basicparameter/log/countLogByStatus`, params, 'post');

// 日初日志详情
export const dayilyFirstLogDetail = params =>
  $ajax(`/bmtp-common-basicparameter/logDetail/pageList`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');

// import axios from 'axios';

// /**上清直连指令*/
// import { $ajax } from 'yss-biz';

// export const sqDebtList = (type, params) =>
//   $ajax(`/bmtp-shclearing-manage/${type}/pageList`, params, 'post');
// /***关联指令信息详情 */
// export const aboutzlInfo = tradeId =>
//   $ajax(`/bmtp-shclearing-manage/settleInstructManage/queryByTradeId/${tradeId}`);
// /***关联债券 */
// export const aboutZJInfo = tradeId =>
//   $ajax(`/bmtp-shclearing-manage/pledgeCollBond/bondDetail/${tradeId}`);

// /***资金账号查询
//  *
//  *
//   "productCode": "string",//产品code
//   "subjectType": "string",// 判断是否是主体，产品，或者无
//  *
//  */
// export const aboutAccont = params =>
//   $ajax(
//     // `/bmtp-product-manage/account/assetAccount/getAssetAccountBalanceBySubjectOrProduct`,
//     params,
//     'post'
//   );

// /**查询上清清分*/
// export const searcZLQf = params =>
//   $ajax(
//     // `/bmtp-settle-manage/api/distribution/tradFeedbackDistribution/listTradingFeedbackDistribution`,
//     params,
//     'post'
//   );

// /***关联保证 */
// export const aboutBZInfo = tradeId =>
//   $ajax(`/bmtp-shclearing-manage/pledgeCollBond/guaranteeBondDetail/${tradeId}`);

// /***关联成交流水 */
// export const aboutLSInfo = (execCode, tradeDirection, bizCategory) =>
//   $ajax(
//     `/bmtp-settle-manage/distribution/tradFeedbackDistribution/getTraFeedbackDistributionFlowList/${execCode}/${tradeDirection}/${bizCategory}`
//   );

// /***关联全额结算指令*/
// export const aboutJSzlInfo = tradeId =>
//   $ajax(`/bmtp-shclearing-manage/fullInstruction/queryListByTradeId/${tradeId}`);

// 修改任务调度的执行
export const changePlan = params =>
  $ajax(`/bmtp-common-basicparameter/job/modifyTask`, params, 'post');

// 启用任务
export const startPlan = params =>
  $ajax(`/bmtp-common-basicparameter/job/restartTask`, params, 'post');

// 停用任务
export const stopPlan = params => $ajax(`/bmtp-common-basicparameter/job/stopTask`, params, 'post');
