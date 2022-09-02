import { $ajax } from 'yss-biz';

/** 查询流程监控任务列表 */
export const getRemindTastList = params =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/pageList`, params, 'post');

/** 查询流程提醒任务详情 */
export const getDetailById = id =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/detail/${id}`, null, 'get');

/** 新增流程提醒任务 */
export const addRemindTask = params =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/add`, params, 'post');

/** 启动流程提醒任务 */
export const startRemindTask = id =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/changeStatusForUse/${id}`, null, 'get');

/** 停用流程提醒任务 */
export const stopRemindTask = id =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/changeStatusForNoUse/${id}`, null, 'get');

/** 更新编辑流程提醒任务 */
export const updateRemindTask = params =>
$ajax(`/bmtp-settle-manage/flow/flowjob/update`, params, 'put');

/** 删除流程提醒任务 */
export const deleteRemindTask = id =>
  $ajax(`/bmtp-settle-manage/flow/flowjob/delete/${id}`, null, 'delete');

/** 获取监控节点列表 */
export const getFlowConfig = params =>
  $ajax(`/bmtp-settle-manage/flowconfig/pageList`, params, 'post');

/** 获取任务的监控节点配置 */
export const getTaskFlowConfig = params =>
  $ajax(`/bmtp-settle-manage/flow/flowjobnode/pageList`, params, 'post');

/** 获取随机序号 */
export const getSequence = () =>
  $ajax(
    `/bmtp-common-basicparameter/sequence/generateBusinessSequence/flowJobCode/Common`,
    null,
    'get'
  );
