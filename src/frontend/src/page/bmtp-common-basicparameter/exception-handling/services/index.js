// import axios from 'axios';

/**上清直连指令*/
import { $ajax } from 'yss-biz';

// 异常数据列表
export const abnormalData = params =>
  $ajax(`/bmtp-common-basicparameter/exceptionData/pageList`, params, 'post');

// 异常数据发送
export const abnormalDataSend = ids =>
  $ajax(`/bmtp-common-basicparameter/exceptionData/resend`, ids, 'post');

// 查看数据
export const toLookData = id => $ajax(`/bmtp-common-basicparameter/exceptionData/detail/${id}`);

// 接收消息管理
export const receiveData = params => $ajax(`/bmtp-open-platform/receiveMsgLog/pageList`, params, 'post');
// 查看接收消息管理数据
export const toReceiveLookData = id => $ajax(`/bmtp-open-platform/receiveMsgLog/detail/${id}`);
