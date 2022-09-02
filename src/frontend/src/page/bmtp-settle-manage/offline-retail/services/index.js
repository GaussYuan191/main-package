//import lugiax from 'lugiax';
import { $ajax } from 'yss-biz';

// 网下分销列表
export const getOfflineRetailList = params =>
  $ajax(`/bmtp-settle-manage/distribution/offlineDistrInstruct/pageList`, params, 'post');

// 网下分销母表关联数据
export const getOfflineRetailAboutList = instrId =>
  $ajax(
    `/bmtp-settle-manage/distribution/offlineDistrInstruct/detailByInstrId/${instrId}`,
    {},
    'get'
  );

// 对手方查询
export const counterpartyInfo = () =>
  $ajax(`/bmtp-settle-manage/distribution/offlineDistrInstruct/getOtherData`);

// 表格列详细查询
export const listItemDetial = params =>
  $ajax(
    `/bmtp-settle-manage/distribution/onlineDistrInstruct/listTradingFeedbackOfflineDistribution`,
    params,
    'post'
  );

// 生成台账
export const createStandingBook = params =>
  $ajax(
    `/bmtp-settle-manage/distribution/offlineDistrInstruct/generateStandingBook`,
    params,
    'post'
  );
