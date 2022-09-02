import { $ajax } from 'yss-biz';

/**费用条目-分页列表查询*/
export const getPageList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/pageList`, params, 'post');
};

/**费用条目-批量审核*/
export const checkList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/checkBatch`, params, 'post');
};

/**费用条目-批量反审核*/
export const unCheckList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/unCheckBatch`, params, 'post');
};

/**费用条目-条目合成*/
export const mergeList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/mergeChargeItem`, params, 'post');
};
/**费用条目-条目关联母数据*/
export const relationList = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/handRelateCharge`, params, 'post');
};

/**费用条目-获取条目母数据*/
export const getParentRelationList = params => {
  return $ajax(`/bmtp-settle-manage/charge/charge/unCheckAndUnMergePageList`, params, 'post');
};

/**费用条目-删除*/
export const deleteBatch = params => {
  return $ajax(`/bmtp-settle-manage/charge/chargeitem/deleteBatch`, params, 'delete');
};
