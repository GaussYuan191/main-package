import { $ajax } from 'yss-biz';

/****-查询****/

export const getQueryList = params =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/pageList`, params, 'post');

/****--新增****/
export const addRow = params =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/add`, params, 'post');

// 债券账户加载
export const getBondAccount = () =>
  $ajax('/bmtp-product-manage/account/bondAccount/getTrustBondAccount', {}, 'post');
//获取持仓余额
export const holdBalance = params =>
  $ajax(`/bmtp-cash-manage/hold/productCarryBalance/getBondProCarBal`, params, 'post');
// 票面利率
export const getFaceRate = code =>
  $ajax(`/bmtp-common-basicparameter/api/security/securityBond/getInfoSeclist/${code}`);

/****--修改****/

export const updateRow = params =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/update`, params, 'put');

/****-删除****/
export const deleteRow = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/delete/${id}`, {}, 'delete');

// 数据拆分
export const dataSplit = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/split/${id}`, {}, 'get');

// 拆分确认
export const splitAffirm = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/checksplit/${id}`, {}, 'get');

// 取消确认
export const cacelAffirm = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/unchecksplit/${id}`, {}, 'get');

// 发送账单
export const sendBill = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/sendbill/${id}`, {}, 'get');

// /****-关联信息****/
export const aboutList = id =>
  // $ajax(`/bmtp-settle-manage/payment/bondPaymentDetail/pageList`, params, 'post');
  $ajax(`/bmtp-settle-manage/payment/bondPaymentDetail/getpagetlist/${id}`, {}, 'get');

// 手工调整列表
export const adjustList = id =>
  $ajax(`/bmtp-settle-manage/payment/bondPaymentDetail/getpagetlist/${id}`, {}, 'get');
// 保存调整
export const saveAjustResult = params =>
  $ajax(`/bmtp-settle-manage/payment/bondPaymentDetail/updatelist`, params, 'post');

// 当前交易日
export const currentTradingDay = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`);

//批量审核
export const toCheckData = ids =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/checkBatch`, ids, 'post');

// 批量反审核
export const toUnCheckData = ids =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/unCheckBatch`, ids, 'post');

/**** 债券回售接口 ****/
// 列表
export const getBondQueryList = params =>
  $ajax(`/bmtp-settle-manage/payment/bondPayment/pageList`, params, 'post');
//全量债券信息
// export const allBondList = params =>
//   $ajax(
//     `/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList`,
//     params,
//     'post',
//     { mask: false }
//   );
