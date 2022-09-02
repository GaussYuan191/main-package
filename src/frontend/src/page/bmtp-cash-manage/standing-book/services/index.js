import { $ajax } from 'yss-biz';

const PREFIX = '/bmtp-cash-manage';

/** 列表项 */
// export const axiosQueryBookList = params => $ajax(`${PREFIX}/hold/pledgeBondAccount/pageList`, params, "post");
// /** 获取总余额和期初余额 */
// export const axiosGetBalance = params => $ajax(`${PREFIX}/hold/productCarryBalance/pageList`, params, "post");
// /** 删除选中的表格行 */
// export const axiosDeleteBatch = params => $ajax('/hold/prodCarrChangeDetail/deleteBatch', params, "delete");
// /** 获取证券账号 */
// export const axioosGetBondAccountByCode = params => $ajax('/bmtp-product-manage/account/bondAccount/getBondAccountByCode', params, "post");
// /** 导出 */
// export const axiosExport = params =>  $ajax('/hold/prodCarrChangeDetail/export/condition', params, "post");

// 业务台账列表
export const businessAccountList = params =>
  $ajax(`${PREFIX}/hold/businessAccount/pageList`, params, 'post');
// 业务台账详情
export const businessDetailInfo = id => $ajax(`${PREFIX}/hold/businessAccount/detail/${id}`);

// 质押券台账列表
export const pledgeBondAccountList = params =>
  $ajax(`${PREFIX}/hold/pledgeBondAccount/pageList`, params, 'post');
// 质押券台账详情
export const pledgeBondDetailInfo = id => $ajax(`${PREFIX}/hold/pledgeBondAccount/detail/${id}`);

// 分销台账列表
export const distributionLedgerList = params =>
  $ajax(`${PREFIX}/hold/distributionLedger/pageList`, params, 'post');
// 分销台账详情
export const distributionDetailInfo = id => $ajax(`${PREFIX}/hold/distributionLedger/detail/${id}`);

//交易方向
export const entrustSide = parentDicCode =>
  $ajax(`/dfas-base-biz/dics/listAllSub`, { parentDicCode }, 'post');

// 转上市
export const turnTheListed = id =>
  $ajax(`/bmtp-common-basicparameter/api/security/secCirc/relisting?fid=${id}`, {}, 'post');

// 对手方
export const opponentOptions = () =>
  $ajax(`${PREFIX}/hold/distributionLedger/getOuterInfo`, {}, 'post');

//发送
export const axioSend = params =>
  $ajax('/bmtp-cash-manage/dim/settle/contractManage/generateStandingBook', params, 'post');

export const axioCounterName = params =>
  $ajax('/bmtp-cash-manage/hold/pledgeBondAccount/queryCounterName', {}, 'post');
