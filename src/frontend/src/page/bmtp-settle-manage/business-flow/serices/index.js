import { $ajax } from 'yss-biz';

// 表格展示
export const getQueryList = params => $ajax(`/bmtp-settle-manage/flow/pageList`, params, 'post');
