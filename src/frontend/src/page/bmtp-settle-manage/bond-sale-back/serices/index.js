import { $ajax } from 'yss-biz';

// 表格展示
export const getQueryList = params =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/pageList`, params, 'post');

// 表格数据每项额外展示
export const childrenList = params =>
  $ajax(`/bmtp-settle-manage/sellback/sellback/pageList`, params, 'post');

// 子表格数据获取
// export const productInfoList = id =>
//   $ajax(`/bmtp-settle-manage/sellback/sellback/queryWithProductInfo`, id, 'post');

// 获取数据字典信息
export const getMapCode = id =>
  $ajax(`/dfas-base-biz/dics/listAllSub`, { parentDicCode: id }, 'post');
// 获取查询项--债券信息
// export const getBondInfoGroupByReport = () =>
//   $ajax(
//     `/bmtp-common-basicparameter/api/security/securityBond/getInfoSecurityPageList`,
//     { reqPageNum: 1, reqPageSize: 100 },
//     'post'
//   );
// 获取查询项--交易指令编号
// export const getTradeInstrIdGroupByReport = () =>
//   $ajax(`/bmtp-settle-manage/sellback/sellback/getTradeInstrIdGroupByReport`, 'get');

// 子表格数据获取
export const getSellBackDist = id =>
  $ajax(`/bmtp-settle-manage/sellback/sellbackdics/getSellBackDistByParentId`, id, 'post');
