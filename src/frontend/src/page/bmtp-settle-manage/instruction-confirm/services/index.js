/**查询中债登指令*/
import { $ajax } from 'yss-biz';

export const searcZJDList = (type, params) =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/${type}/pageList`, params, 'post');

// 中债
/**查询指令详情*/
export const searcAboutInfo = instrId =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/instructManage/detail/${instrId}`);

/**查询关联债券信息*/
export const searcAboutZJList = params =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/instructBondRef/pageList`, params, 'post');

/**查询关担保信息信息*/
export const searcAboutDBList = params =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/instructGuaranteeRef/pageList`, params, 'post');

// 上清
/**查询指令详情*/
export const aboutSQInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/settleInstructManage/queryByTradeId/${tradeId}`);
/**查询关联债券信息*/
export const aboutSQZJInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/pledgeCollBond/bondDetail/${tradeId}`);
/**查询关担保信息信息*/
export const aboutSQBZInfo = tradeId =>
  $ajax(`/bmtp-clearingorg-manage/shclearing/pledgeCollBond/guaranteeBondDetail/${tradeId}`);

/** 查询指令确认列表 */
///bmtp-settle-manage
export const getPendingConfirmInstruction = params =>
  $ajax(`/bmtp-settle-manage/instruction/getPendingConfirmInstruction`, params, 'post');

/** 查询上清所指令确认列表 */
export const getPendingConfirmInstructionForShQs = params =>
  $ajax(
    `/bmtp-clearingorg-manage/shclearing/settleInstructManage/getPendingConfirmInstructionPageList`,
    params,
    'post'
  );

/** 查询中债登指令确认列表 */
export const getPendingConfirmInstructionForZJD = params =>
  $ajax(
    `/bmtp-clearingorg-manage/dim/settle/instructManage/getPendingConfirmInstructionPageList`,
    params,
    'post'
  );

/** 获取表中表 */
export const getErbPageList = params =>
  $ajax(`/bmtp-settle-manage/distribution/tradFeedbackDistribution/erbPageList`, params, 'post');

/** 重新报送 */
export const batchSendInstruction = params =>
  $ajax(
    '/bmtp-clearingorg-manage/shclearing/settleInstructManage/batchSendInstruct',
    params,
    'post'
  );

/** 自动匹配 */
export const getMatchInstruction = params =>
  $ajax(
    `/bmtp-clearingorg-manage/shclearing/settleInstructManage/autoMatchInstruction`,
    params,
    'post'
  );
/** 获取手工匹配，网上分销的成交数据 */
export const getHandleMatchInstruction = params =>
  $ajax(
    `/bmtp-settle-manage/execution/onlineExecutReport/selectMatchOnlineExecutionReport`,
    params,
    'post'
  );

/** 手工匹配 */
export const handleMatchInstruction = params =>
  $ajax(
    `/bmtp-clearingorg-manage/shclearing/settleInstructManage/matchInstruction`,
    params,
    'post'
  );

/** 批量确认 */
export const batchConfirmInstruction = params =>
  $ajax(`/bmtp-settle-manage/instruction/batchConfirmInstruction`, params, 'post');
// $ajax(`/bmtp-settle-manage/api/instructionConfirm/batchConfirmInstruction`, params, 'post');

/** 批量回退 */
export const batchFallBackInstruction = params =>
  $ajax(
    `/bmtp-clearingorg-manage/shclearing/settleInstructManage/batchFallBackInstruction`,
    params,
    'post'
  );

// 当前交易日期
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

/**查询上清清分*/
export const searcZLQf = params =>
  $ajax(
    `/bmtp-settle-manage/api/distribution/tradFeedbackDistribution/listTradingFeedbackDistribution`,
    params,
    'post'
  );
