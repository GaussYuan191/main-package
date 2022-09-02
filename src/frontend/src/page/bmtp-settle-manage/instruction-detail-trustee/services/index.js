//import lugiax from 'lugiax';

import { $ajax } from 'yss-biz';

export const getassetUnitList = params =>
  $ajax(`/bmtp-product-manage/product/assetUnit/pageList`, params, '$ajax');
/**成交回报列表 */
export const searchTransactionReturnsList = (params, type) =>
  $ajax(`/bmtp-settle-manage/execution/${type}/pageList`, params, 'post');

/**成交查询下拉框 */
export const searchGetQueryCondition = type =>
  $ajax(`/bmtp-settle-manage/execution/${type}/getQueryCondition`);

/**质押式--抵押债券信息 */
export const getAboutzyj = params =>
  $ajax(`/bmtp-settle-manage/distribution/distributionBondRef/pageList`, params, 'post');

// 点击母表加载
/**质押式回购-关联债券列表 */
export const searchErpBondRef = code =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportPledge/getPledgeBondRefForDistribution/${code}`
  );

/**买断式式回购-关联担保信息列表 */
export const searchEroCollateralRef = code =>
  $ajax(`/bmtp-settle-manage/execution/executionReportOutright/getEroCollateralRef/${code}`);
// ////////////

/**债券借贷关联信息-抵押券信息 */
export const searchEroPledgeRef = code =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportLending/getLendingPledgeBondRefForDistribution/${code}`
  );

// 点击子表
/**买断式回购-担保信息 */
export const getAboutdbxx = params =>
  $ajax(`/bmtp-settle-manage/distribution/distributionCollateralRef/pageList`, params, 'post');

/**债券借贷 */
export const getAboutdbLendingexecrepdist = params =>
  $ajax(`/bmtp-settle-manage/distribution/lendingexecrepdist/pageList`, params, 'post');

// 交易指令编号 /execution/onlineExecutReport/getInsterIds
export const toGetInsterIds = () =>
  $ajax(`/bmtp-settle-manage/execution/onlineExecutReport/getInsterIds`, {}, 'get');
//////////////////////////

// 子表接口
/**清分列表 erbPageList  现劵 erpPageList 质押式 eroPageList 买断式 */
export const childrenList = (params, type) => {
  let url = '';
  if (type == 'erbPageList') {
    //现券
    url = 'distribution/cashBond/cashBondDistributionPageList';
  } else if (type == 'erpPageList') {
    //质押式
    url = 'distribution/pledgeExecutionReportDist/pageList';
  } else if (type == 'eroPageList') {
    //买断式
    url = 'distribution/outrightExecutionReportDist/pageList';
  } else if (type == 'onlineExecutReport') {
    url = 'distribution/onlineDistrInstruct/pageList';
  } else if (type == 'bondSaleBack') {
    //债券回售
    url = 'distribution/onlineDistrInstruct/pageList';
  } else if (type == 'executionReportLending') {
    //债券借贷
    url = 'distribution/lendingExecutionReportDist/pageList';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};

// 债券回售子表行数据
export const productInfoList = params =>
  $ajax(`/bmtp-settle-manage/sellback/sellbackdics/getSellBackDistByParentId`, params, 'post');

// 查询结算指令
export const searchOrder = ({ execCode, instituion }) =>
  $ajax(`/bmtp-settle-manage/instruction/query?execCode=${execCode}&instituion=${instituion}`);

// 查询结算指令-分销
export const searchOrder4Distribution = params =>
  $ajax(`/bmtp-settle-manage/instruction/queryOnlineData`, params, 'post');

/**** 债券回售接口 ****/
// 列表
export const getBondQueryList = params =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/pageList`, params, 'post');

// 获取所有产品信息
export const getProductMsg = () =>
  $ajax(`/bmtp-product-manage/product/product/listProductIdCodeAndName`, {}, 'post');

//根据业务类别判断客户数据许可证书接口
export const getLicense = params =>
  $ajax(`/dfas-base-biz/license/getCustomerLicenseDataList`, {}, 'get');

// 现券拆分
export const postProductSplitXQ = params =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportBond/saveClearDetailsByHandWork`,
    params,
    'post'
  );
// 质押式回购拆分
export const postProductSplitZY = params =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportPledge/saveClearDetailsByHandWork`,
    params,
    'post'
  );
// 买断式回购拆分
export const postProductSplitMD = params =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportOutright/saveClearDetailsByHandWork`,
    params,
    'post'
  );
// 债券借贷拆分
export const postProductSplitZQJD = params =>
  $ajax(
    `/bmtp-settle-manage/execution/executionReportLending/saveClearDetailsByHandWork`,
    params,
    'post'
  );

// 审核
export const checkList = (params, type) => {
  let url = '';
  if (type == 'erbPageList') {
    //现券
    url = 'execution/executionReportBond/checkBatch';
  } else if (type == 'erpPageList') {
    //质押式
    url = 'execution/executionReportPledge/checkBatch';
  } else if (type == 'eroPageList') {
    //买断式
    url = 'execution/executionReportOutright/checkBatch';
  } else if (type == 'executionReportLending') {
    //债券借贷
    url = 'execution/executionReportLending/checkBatch';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};

// 反审核
export const unCheckList = (params, type) => {
  let url = '';
  if (type == 'erbPageList') {
    //现券
    url = 'execution/executionReportBond/unCheckBatch';
  } else if (type == 'erpPageList') {
    //质押式
    url = 'execution/executionReportPledge/unCheckBatch';
  } else if (type == 'eroPageList') {
    //买断式
    url = 'execution/executionReportOutright/unCheckBatch';
  } else if (type == 'executionReportLending') {
    //债券借贷
    url = 'execution/executionReportLending/unCheckBatch';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};

// 获取成交回报级别 质押券
export const getExeCodeZY = params =>
  $ajax(
    '/bmtp-settle-manage/distribution/distributionBondRef/getPledgeBondsByExecCode?execCode=' +
      params,
    {},
    'post'
  );
// 获取成交回报级别 抵押券
export const getExeCodeDY = params =>
  $ajax(
    '/bmtp-settle-manage/lending/lendingdistbondref/getLendingDistributionBondRefByExecCode?execCode=' +
      params,
    {},
    'post'
  );
// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);
// 查询交易数据
export const queryTransactionData = params =>
  $ajax(`/bmtp-settle-manage/api/execution/queryIMIXDataByTradeDateAndExecCode`, params, 'post');
// 获取查询项--债券信息
export const getBondInfoGroupByReport = () =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/getBondInfoGroupByReport`, 'get');
// 获取查询项--交易指令编号
export const getTradeInstrIdGroupByReport = () =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/getTradeInstrIdGroupByReport`, 'get');
