import { $ajax } from 'yss-biz';

// 请求表格数据/bmtp-cash-manage/hold/productCarryBalance/custDetPageList
//export const axiosBondList = params => $ajax(`/bmtp-common-basicparameter/securityBond/pageList`, params, 'post');
export const axiosBondList = params =>
  $ajax(`/bmtp-common-basicparameter/securityBond/pageList`, params, 'post');

//审核
export const axiosCheck = params =>
  $ajax('/bmtp-common-basicparameter/securityBond/batchCheck', params, 'put');

//反审核dfbp-info-manage/security/updateUnAudit
export const axiosUncheck = params =>
  $ajax('/bmtp-common-basicparameter/securityBond/batchUnCheck', params, 'put');

//删除
export const axiosDelete = params =>
  $ajax('/bmtp-common-basicparameter/securityBond/batchDelete', params, 'delete');

//根据ID, 获取债券基本信息
export const axiosGetBondInfo = params =>
  $ajax(`/bmtp-common-basicparameter/securityBond/get?id=${params.id}`, 'get');

//添加
export const axiosAdd = params =>
  $ajax('/bmtp-common-basicparameter/securityBond/save', params, 'post');
//修改
export const axiosUpdate = params =>
  $ajax('/bmtp-common-basicparameter/securityBond/update', params, 'put');

//获取中债数据字典
export const getCodeMenu = params =>
  $ajax('/bmtp-common-basicparameter/securityTypes/subType', params, 'post');
