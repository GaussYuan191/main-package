/**查询中债登指令*/
import { $ajax } from 'yss-biz';

export const searcZJDList = (type, params) =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/${type}/pageList`, params, 'post');

/**查询中债清分*/
export const searcZJDListQf = params =>
  $ajax(
    `/bmtp-settle-manage/api/distribution/tradFeedbackDistribution/listTradingFeedbackDistribution`,
    params,
    'post'
  );
/**查询指令详情*/
export const searcAboutInfo = instrId =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/instructManage/detail/${instrId}`);

/**查询关联债券信息*/
export const searcAboutZJList = params =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/instructBondRef/pageList`, params, 'post');

/**查询关担保信息信息*/
export const searcAboutDBList = ({ instrId }) =>
  $ajax(
    `/bmtp-clearingorg-manage/dim/settle/instructGuaranteeRef/getGuranDetail/${instrId}`,
    {},
    'get'
  );

/**查询合同信息*/
export const searcAboutContractList = params =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/contractManage/pageList`, params, 'post');

/**查询成交流水信息 --- 清分*/
// export const aboutLSInfo = (execCode, tradeDirection, bizCategory) =>
//   $ajax(
//     `/bmtp-settle-manage/distribution/cashBond/getTraFeedbackDistributionFlowList/${execCode}/${tradeDirection}/${bizCategory}`
//   );
export const aboutLSInfo = (params, type) => {
  // type BT00 分销  BT01 现券 BT02 质押式回购 BT03 买断式回购
  let url = '';
  if (type == 'BT01') {
    //现券
    url = 'distribution/cashBond/cashBondDistributionPageList';
  } else if (type == 'BT02') {
    //质押式
    url = 'distribution/pledgeExecutionReportDist/pageList';
  } else if (type == 'BT03') {
    //买断式
    url = 'distribution/outrightExecutionReportDist/pageList';
  } else if (type == 'BT00') {
    //分销
    url = 'distribution/onlineDistrInstruct/pageList';
  } else if (type == 'BT05') {
    url = 'distribution/lendingExecutionReportDist/pageList';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};
/***资金账号查询
 *
 *
  "productCode": "string",//产品code
  "subjectType": "string",// 判断是否是主体，产品，或者无
 *
 */
export const searcAboutAccont = ({ productCode }) =>
  $ajax(
    `/bmtp-cash-manage/api/account/assetAccount/getAssetBalanceByProductCode?productCode=${productCode}`,
    {},
    'post'
  );

/**交割*/
export const manualDelivery = contractId =>
  $ajax(`/bmtp-clearingorg-manage/dim/settle/contractManage/manualDelivery/${contractId}`);

//生成台账
export const axioSend = params =>
  $ajax('/bmtp-clearingorg-manage/dim/settle/contractManage/generateStandingBook', params, 'post');

