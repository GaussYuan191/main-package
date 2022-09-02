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

/**质押式回购-关联债券列表 */
export const searchErpBondRef = code =>
  $ajax(`/bmtp-settle-manage/execution/executionReportPledge/getPledgeBondRef/${code}`);

/**买断式式回购-关联担保信息列表 */
export const searchEroCollateralRef = code =>
  $ajax(`/bmtp-settle-manage/execution/executionReportOutright/getEroCollateralRef/${code}`);

/**债券借贷关联信息-抵押券信息 */
export const searchEroPledgeRef = code =>
  $ajax(`/bmtp-settle-manage/execution/executionReportLending/getLendingPledgeBondRef/${code}`);

// 交易指令编号 /execution/onlineExecutReport/getInsterIds
export const toGetInsterIds = () =>
  $ajax(`/bmtp-settle-manage/execution/onlineExecutReport/getInsterIds`, {}, 'post');

/**** 债券回售接口 ****/
// 列表
export const getBondQueryList = params =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/pageList`, params, 'post');

//根据业务类别判断客户数据许可证书接口
export const getLicense = params =>
  $ajax(`/dfas-base-biz/license/getCustomerLicenseDataList`, {}, 'get');

// 获取所有产品信息
export const getProductMsg = () =>
  $ajax(`/bmtp-product-manage/product/product/listProductCodeAndName`, 'get');

// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

//全量债券信息
// export const allBondList = params =>
//   $ajax(
//     `/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList`,
//     params,
//     'post',
//     { mask: false }
//   );

// 审核
export const checkList = (params, type) => {
  let url = '';
  if (type == 'FX') {
    //分销
    url = 'execution/onlineExecutReport/batchCheck';
  } else if (type == 'ZQHS') {
    //债券回售
    url = 'sellback/sellback/checkBatch';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};

// 反审核
export const unCheckList = (params, type) => {
  let url = '';
  if (type == 'FX') {
    //分销
    url = '/execution/onlineExecutReport/batchUnCheck';
  } else if (type == 'ZQHS') {
    //债券回售
    url = '/sellback/sellback/unCheckBatch';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};
// 新增
export const postFormAdd = (params, type) => {
  let url = '';
  if (type == 'FX') {
    //分销
    url = 'execution/onlineExecutReport/addOnlineOrOfflineDistributeExecutionReport';
  } else if (type == 'ZQHS') {
    //债券回售
    url = 'sellback/sellback/add';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'post');
};
// 修改
export const postFormEdit = (params, type) => {
  let url = '';
  if (type == 'FX') {
    //分销
    url = 'execution/onlineExecutReport/updateOnlineOrOfflineDistributeExecutionReport';
  } else if (type == 'ZQHS') {
    //债券回售
    url = 'sellback/sellback/update';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'put');
};

// 删除
export const delList = (params, type) => {
  let url = '';
  if (type == 'FX') {
    //分销
    url = 'execution/onlineExecutReport/deteleOnlineOrOfflineDistributeExecutionReport';
  } else if (type == 'ZQHS') {
    //债券回售
    url = 'sellback/sellback/deleteBatch';
  }
  return $ajax(`/bmtp-settle-manage/${url}`, params, 'delete');
};
// 分销项编辑时，获取详细信息
export const detailMsg = id =>
  $ajax(`/bmtp-settle-manage/execution/onlineExecutReport/selectByTradeInstrId/${id}`, 'get');
// 获取查询项--债券信息
// export const getBondInfoGroupByReport = () =>
//   $ajax(`/bmtp-settle-manage/sellback/sellback/getBondInfoGroupByReport`, 'get');
// 获取查询项--交易指令编号
// export const getTradeInstrIdGroupByReport = () =>
//   $ajax(`/bmtp-settle-manage/sellback/sellback/getTradeInstrIdGroupByReport`, 'get');
