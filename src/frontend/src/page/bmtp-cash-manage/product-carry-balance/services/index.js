import { $ajax } from 'yss-biz';

const PREFIX = '/bmtp-cash-manage';

/** 列表项 */
export const getPageList = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/groupPageList`, params, 'post');
/** 详细信息 ？？*/
export const getDetailPageList = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/pageList`, params, 'post');
// 管理人债券合计查询
export const getQueryBondCount = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/queryBondCount`, params, 'post');
//产品持仓合计
export const getQueryAccountCount = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/queryAccountCount`, params, 'post');
// 管理人持仓合计查询
export const getQueryConsignorCount = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/queryConsignorCount`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');

//发送
export const axioSend = params =>
  $ajax(`${PREFIX}/hold/productCarryBalance/sendProductCarryBalance`, params, 'post');


// //债券名称数据字典
// export const axiosBondCode = params =>
//   $ajax(
//     '/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList',
//     params,
//     'post',
//     { mask: false }
//   );
