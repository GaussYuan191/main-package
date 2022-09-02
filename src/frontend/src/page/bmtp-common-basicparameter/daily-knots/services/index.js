// import axios from 'axios';

/**日结*/
import { $ajax } from 'yss-biz';

// 日结列表查询
export const dayilyKnotsList = params =>
  $ajax(`/bmtp-common-basicparameter/job/pageList`, params, 'post');

// 日结的开始操作
export const dayilyKnotsStart = params =>
  $ajax(`/bmtp-common-basicparameter/job/execute`, params, 'post');

//日结日志显示
export const dayilyKnotsLogList = params =>
  $ajax(`/bmtp-common-basicparameter/log/pageList`, params, 'post');

// 日结日志数据更新
export const dayilyKnotsLogNum = params =>
  $ajax(`/bmtp-common-basicparameter/log/countLogByStatus`, params, 'post');

// 日结日志详情
export const dayilyKnotsLogDetail = params =>
  $ajax(`/bmtp-common-basicparameter/logDetail/pageList`, params, 'post');

// 获取当前系统交易日的时间
export const getCurTradeDate = () =>
  $ajax(`/bmtp-common-basicparameter/tradeday/tradeDate/getCurTradeDate`, 'get');
