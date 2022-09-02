import { $ajax } from 'yss-biz';
const prefix = '/bmtp-common-basicparameter/businessParameter';
// 请求参数分类
export const axiosParamClass = () => $ajax(`${prefix}/getParameterType`, 'post');
// 请求参数分类明细
export const axiosParamClassDetail = params =>
  $ajax(`${prefix}/getParameterType/${params}`, 'post');
// 请求表格数据
export const axiosParamList = params => $ajax(`${prefix}/queryList`, params, 'post');
// 请求表格项下拉菜单
export const axiosTableSelectList = (url, params) => $ajax(url, params);
// 请求修改表格行数据
export const axiosEditTableRow = params => $ajax(`${prefix}/update`, params, 'put');
// 导出
export const axiosExport = params =>
  $ajax(`${prefix}/export/erbCondition`, params, 'post', { responseType: 'arraybuffer' });
// 审核
export const axiosAudit = params => $ajax(`${prefix}/checkBatch`, params, 'post');
// 反审核
export const axiosUnaudit = params => $ajax(`${prefix}/unCheckBatch`, params, 'post');
