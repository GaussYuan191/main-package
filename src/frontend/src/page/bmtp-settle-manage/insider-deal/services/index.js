// import axios from 'axios';

/**上清直连指令*/
import { $ajax } from 'yss-biz';

// 现券内转业务列表
export const bandInnerTradeList = params =>
  $ajax(`/bmtp-settle-manage/innnertrade/bondInnerTrade/pageList`, params, 'post');

// 债券明细
// export const bondDetail = innerContactCode => $ajax(`/bmtp-settle-manage/  ${innerContactCode}`);
// 现券内转买卖房信息
export const bondInnerInfo = innerContactCode =>
  $ajax(
    `/bmtp-settle-manage/innnertrade/bondInnerTrade/buyerAndSeller?innerContactCode=${innerContactCode}`,
    {},
    'post'
  );
// 划款指令信息
export const drawMoney = id =>
  $ajax(`/bmtp-cash-manage/api/transfer/transferCommandApi/detailByTradeOrderNo/${id}`);
// // 担保信息
// export const GuaranteeInformation = id => $ajax(`/bmtp-settle-manage/  ${id}`);
// // 源结算指令/合同信息
// export const sourcetMessage = id => $ajax(`/bmtp-settle-manage/  ${id}`);
// 撤回
export const revocationInner = tradeInstId =>
  $ajax(
    `/bmtp-settle-manage/innnertrade/bondInnerTrade/rescind?tradeInstId=${tradeInstId}`,
    {},
    'post'
  );

//买方
export const searchBuyerInfo = () =>
  $ajax(`/bmtp-settle-manage/innnertrade/bondInnerTrade/productName/buyer`);
// 买方
export const searchSellerInfo = () =>
  $ajax(`/bmtp-settle-manage/innnertrade/bondInnerTrade/productName/seller`);

//业务类别
export const getBizCategoryType = params => $ajax(`/dfas-base-biz/dics/listAllSub`, params, 'post');

//发送
export const axioSend = params =>
  $ajax('/bmtp-settle-manage/innnertrade/bondInnerTrade/batchConfirm', params, 'post');

// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);
//新增
export const formAdd = params =>
  $ajax('/bmtp-settle-manage/innnertrade/bondInnerTrade/add', params, 'post');

//修改
export const formEdit = params =>
  $ajax('/bmtp-settle-manage/innnertrade/bondInnerTrade/update', params, 'put');
//审核
export const checkList = params =>
  $ajax('/bmtp-settle-manage/innnertrade/bondInnerTrade/batchCheck', params, 'post');
// 删除
export const del = params =>
  $ajax('/bmtp-settle-manage/innnertrade/bondInnerTrade/batchDelete', params, 'post');
