// import axios from 'axios';

/**上清直连指令*/
import { $ajax } from 'yss-biz';

// 获取读数管理表单数据
export const getDataList = params =>
  $ajax(`/bmtp-common-basicparameter/biz/dataUpload/pageListnew`, params, 'post');

// 读数管理-查询数据接口树
export const getInterfData = params =>
  $ajax(`/bmtp-common-basicparameter/biz/dataUpload/getInterfData`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');

// 读数管理-数据读取
export const uploadFile = params =>
  $ajax(`/bmtp-common-basicparameter/biz/dataUpload/uploadFile`, params, 'post');

// ------文件上传导入相关接口

/** 查询现券交易的中间表分页数据 */
export const getBondTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/bondTradeDate/pageList`, params, 'post');

/** 导入现券交易数据 */
export const doBondImport = params =>
  $ajax(`/bmtp-settle-manage/read/bondTradeDate/importTradeData`, params, 'post');

/** 查询质押式回购的中间表分页数据 */
export const getPledgeRepoTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/pledgeTradeData/pageList`, params, 'post');

/** 导入质押式回购数据 */
export const doPledgeRepoImport = params =>
  $ajax(`/bmtp-settle-manage/read/pledgeTradeData/importPledgeTradeData`, params, 'post');

/** 查询债券借贷的中间表分页数据 */
export const getLendingTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/lending/pageList`, params, 'post');

/** 导入债券借贷数据 */
export const doLendingImport = params =>
  $ajax(`/bmtp-settle-manage/read/lending/importLendingTradeData`, params, 'post');

/** 查询买断式回购的中间表分页数据 */
export const getOutrightTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/outright/pageList`, params, 'post');

/** 导入买断式回购数据 */
export const doOutrightImport = params =>
  $ajax(`/bmtp-settle-manage/read/outright/importOutrightTradeData`, params, 'post');

/** 查询债券回售的中间表分页数据 */
export const getSellBackTempTableList = params =>
$ajax(`/bmtp-settle-manage/read/sellBack/pageList`, params, 'post');

/** 导入债券回售数据 */
export const doSellBackImport = params =>
$ajax(`/bmtp-settle-manage/read/sellBack/importTradeData`, params, 'post');

/** 查询网上分销的中间表分页数据 */
export const getOnlineTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/onlineTradeData/pageList`, params, 'post');

/** 导入网上分销数据 */
export const doOnlineImport = params =>
  $ajax(`/bmtp-settle-manage/read/onlineTradeData/importOnlineTradeData`, params, 'post');

/** 查询网下分销的中间表分页数据 */
export const getOfflineTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/offlineTradeData/pageList`, params, 'post');

/** 导入网下分销数据 */
export const doOfflineImport = params =>
  $ajax(`/bmtp-settle-manage/read/offlineTradeData/importOfflineTradeData`, params, 'post');

/** 查询现券内转的中间表分页数据 */
export const getInnerTradeTempTableList = params =>
  $ajax(`/bmtp-settle-manage/read/innerTradeData/pageList`, params, 'post');

/** 导入现券内转数据 */
export const doInnerTradeImport = params =>
  $ajax(`/bmtp-settle-manage/read/innerTradeData/importInnerTradeData`, params, 'post');

// -------

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
