import { $ajax } from 'yss-biz';

// 列表查询
export const cachePage = params =>
  $ajax(`/bmtp-open-platform/interfaceconf/pageList`, params, 'post');

// 删除
export const del = id => $ajax(`/bmtp-open-platform/interfaceconf/delete/${id}`, 'delete');

// 查看
export const showDetial = id => $ajax(`/bmtp-open-platform/redis/getCacheKey/${id}`, 'get');

// 获取数据字典
export const getCode = id => $ajax(`/dfas-base-biz/dics/listAllSub`, { parentDicCode: id }, 'post');

// 刷新
export const refresh = params => $ajax(`/bmtp-open-platform/redis/refreshCache`, params, 'post');

//新增
export const add = params => $ajax(`/bmtp-open-platform/interfaceconf/add`, params, 'post');

// 修改
export const update = params => $ajax(`/bmtp-open-platform//interfaceconf/update`, params, 'put');

// 审核
export const check = ids => $ajax(`/bmtp-open-platform/interfaceconf/checkBatch`, ids, 'post');

// 反审核
export const uncheck = ids => $ajax(`/bmtp-open-platform/interfaceconf/unCheckBatch`, ids, 'post');
