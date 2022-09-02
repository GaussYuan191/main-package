import { $ajax } from 'yss-biz';

/****-查询****/

// 托管明细
export const getTrusteeship = params =>
  $ajax(`/bmtp-cash-manage/hold/productCarryBalance/custDetPageList`, params, 'post');

// 结算明细
export const getSettlement = params =>
  $ajax(`/bmtp-settle-manage/report/settRepCustDet/pageList`, params, 'post');

// 委托人明细
export const getConsignor = params =>
  $ajax(`/bmtp-settle-manage/report/consignorDet/pageList`, params, 'post');

// 生成报表接口
export const generateCustReptData = params =>
  $ajax(`/bmtp-settle-manage/report/settRepCustDet/generateCustReptData`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');
