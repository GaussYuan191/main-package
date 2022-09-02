import { $ajax } from 'yss-biz';

/**获取正回报列表 */
export const getAtureBusinessList = params =>
  $ajax(`/bmtp-cash-manage/hold/cashRepoEndBusiness/pageList`, params, 'post');

/*获取正回报划款指令详情*/
export const getInfo = id =>
  $ajax(`/bmtp-cash-manage/hold/cashRepoEndBusiness/queryCashTransferDetail/${id}`, {}, 'post');

// export const getInfo = (id) => $ajax(`/bmtp-cash-manage/fund/cashTransfer/detail/${id}`);

/**获取指令清分数据 */
export const getZLQF = params =>
  $ajax(
    `/bmtp-settle-manage/api/distribution/tradFeedbackDistribution/listTradingFeedbackDistribution`,
    params,
    'post'
  );
