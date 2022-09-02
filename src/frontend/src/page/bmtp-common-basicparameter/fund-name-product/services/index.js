import { $ajax } from 'yss-biz';

/** 基金简称同多级产品映射表-分页列表查询 */
export const getFunNameToProductPageList = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/pageList`, params, 'post');

/** 审核 */
export const checkList = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/checkBatch`, params, 'post');

/** 反审核 */
export const unCheckList = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/unCheckBatch`, params, 'post');

/** 新增 */
export const postFormAdd = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/add`, params, 'post');

/** 修改 */
export const postFormEdit = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/update`, params, 'put');

/** 删除 */
export const delList = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/deleteBatch`, params, 'delete');

/** 一键清分 */
export const distributionByHand = params =>
  $ajax(`/bmtp-common-basicparameter/biz/fundNameToProduct/distributionByHand`, params, 'post');
