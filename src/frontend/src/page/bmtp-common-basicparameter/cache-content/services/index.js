import { $ajax } from 'yss-biz';

// 缓存内容列表查询
export const cachePage = params =>
  $ajax(`/dfas-base-biz/redis/queryCacheContentPage`, params, 'post');

// 删除
export const del = id => $ajax(`/dfas-base-biz/redis/removeCacheKey/${id}`, 'get');

// 查看
export const showDetial = id => $ajax(`/dfas-base-biz/redis/getCacheKey/${id}`, 'get');

// 获取刷新列表
export const getRefreshList = () => $ajax(`/dfas-base-biz/redis/queryRefreshCache`, 'get');

// 刷新
export const refresh = params => $ajax(`/dfas-base-biz/redis/refreshCache`, params, 'post');
