/**上清直连指令*/
import { $ajax } from 'yss-biz';

//实时日志：日志数
export const getTimeLogTree = () =>
  $ajax(`/dfas-base-biz/console/appServer/listAppServer`, 'get');

// 实时日志：获取日志数据
export const timeLogData = params =>
  $ajax(`/dfas-base-biz/console/log/realtimeLog`, params, 'post', { mask: false });

/***历史日志：日志树结构*/
export const getHistoryLogTree = params =>
  $ajax('/dfas-base-biz/console/log/historyFile', {}, 'post');

// 历史日志
export const historyLogData = params =>
  $ajax(`/dfas-base-biz/console/log/historyLog`, params, 'post');

//历史日志：日志下载
export const downloadLog = params =>
  $ajax(`/dfas-base-biz/console/log/download`, params, 'post', {
    responseType: 'arraybuffer'
  });

//环境配置
export const envConfig = params => {
  return $ajax(`/dfas-base-biz/console/env/config`, params, 'post');
};
