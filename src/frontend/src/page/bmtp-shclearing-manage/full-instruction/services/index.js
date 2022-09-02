/**上清直连指令*/
import { $ajax } from 'yss-biz';

export const sqDebtList = params =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/fullInstruction/pageList`, params, 'post');
/***关联指令信息详情 */
export const aboutzlInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/settleInstructManage/queryByTradeId/${tradeId}`);
/***关联债券 */
export const aboutZJInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/pledgeCollBond/bondDetail/${tradeId}`);

/***资金账号查询
 *
 *
  "productCode": "string",//产品code
  "subjectType": "string",// 判断是否是主体，产品，或者无
 *
 */
export const aboutAccont = ({ productId }) =>
  $ajax(
    `/bmtp-cash-manage/api/account/assetAccount/getAssetBalanceByProductId?productId=${productId}`,
    {},
    'post'
  );

/**查询上清清分*/
export const searcZLQf = params =>
  $ajax(
    `/bmtp-settle-manage/api/distribution/tradFeedbackDistribution/listTradingFeedbackDistribution`,
    params,
    'post'
  );

/***关联保证 */
export const aboutBZInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/pledgeCollBond/guaranteeBondDetail/${tradeId}`);

/***关联成交流水 */
// export const aboutLSInfo = (execCode, tradeDirection, bizCategory) =>
//   $ajax(
//     `/bmtp-settle-manage/distribution/cashBond/getTraFeedbackDistributionFlowList/${execCode}/${tradeDirection}/${bizCategory}`
//   );
export const aboutLSInfo = (params, type) => {
  // type BT00 分销  BT01 现券 BT02 质押式回购 BT03 买断式回购
  let url = '';
  if (type == '1') {
    //现券
    url = 'distribution/cashBond/cashBondDistributionPageList';
  } else if (type == '2') {
    //质押式
    url = 'distribution/pledgeExecutionReportDist/pageList';
  } else if (type == '3') {
    //买断式
    url = 'distribution/outrightExecutionReportDist/pageList';
  } else if (type == '8') {
    //债券借贷
    url = 'distribution/lendingExecutionReportDist/pageList';
  } else {
    //分销
    url = 'distribution/onlineDistrInstruct/pageList';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};

/***关联全额结算指令*/
export const aboutJSzlInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/fullInstruction/queryListByTradeId/${tradeId}`);

// 手动交割
export const manualDelivery = params =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/fullInstruction/manualDelivery`, params, 'post');

export const toGetCounterAccount = () =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/settleInstructManage/getCounterAccount`);
//更新状态
export const axiosUpdateStatus = params =>
  $ajax('/bmtp-clearingorg-manage/shclearing/transactionStatus/addContractStatus', params, 'post');

//查询数据
export const axiosqueryData = params =>
  $ajax(
    '/bmtp-clearingorg-manage/shclearing/settleInstructManage/selectInstructionFromExecutionReport',
    params,
    'post'
  );

//保存
export const axiosSave = params =>
  $ajax(
    '/bmtp-clearingorg-manage/shclearing/transactionData/saveInstructionFromExecutionReport',
    params,
    'post'
  );

//保存
export const axiosBusinessType = params => $ajax('/dfas-base-biz/dics/listAllSub', params, 'post');

//债券代码数据字典
export const axiosBondCode = params =>
  $ajax(
    '/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList',
    params,
    'post',
    { mask: false }
  );
// 当前交易日期
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

/**查全额结算指令 */
export const queryFullInstruction = params =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/fullInstruction/query`, params, 'post');

/** 首期合同回退 */
export const fallBackFullInstruct = params =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/fullInstruction/fallBackFullInstruct`, params, 'post');
//生成台账
export const axioSend = params =>
  $ajax('/bmtp-clearingorg-manage/shclearing/fullInstruction/generateStandingBook', params, 'post');
