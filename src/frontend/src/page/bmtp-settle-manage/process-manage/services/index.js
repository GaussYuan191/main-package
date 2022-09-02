import { $ajax } from 'yss-biz';

//表格接口
export const getProcessTableData = params =>
  $ajax(`/bmtp-settle-manage/flowconfig/pageList`, params, 'post');
