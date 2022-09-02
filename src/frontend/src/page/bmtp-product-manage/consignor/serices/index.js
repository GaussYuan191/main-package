import { $ajax } from 'yss-biz';

/****管理人表格分页数据查询****/

export const getClientData = params =>
  $ajax(`/bmtp-product-manage/consignor/pageList`, params, 'post');

/****管理人--新增****/

export const addClient = params => $ajax(`/bmtp-product-manage/consignor/add`, params, 'post');

/****管理人--修改****/

export const updateClient = params => $ajax(`/bmtp-product-manage/consignor/update`, params, 'put');

/****管理人--删除****/
export const deleteClient = id => $ajax(`/bmtp-product-manage/consignor/delete/${id}`, 'delete');

/****管理人-批量删除****/
export const batchDeleteClient = ids =>
  $ajax(`/bmtp-product-manage/consignor/deleteBatch`, {
    params: {
      ids: ids
    }
  });

/****管理人-单个审核****/
export const batchCheckId = id => $ajax(`/bmtp-product-manage/consignor/check/${id}`, {}, 'post');
/****管理人-批量审核****/
export const batchCheckClient = params =>
  $ajax(`/bmtp-product-manage/consignor/checkBatch`, params, 'post');

/****管理人-单个反审核****/
export const batchUnCheckId = id =>
  $ajax(`/bmtp-product-manage/consignor/unCheck/${id}`, {}, 'post');
/****管理人-批量反审核****/
export const batchUnCheckClient = params =>
  $ajax(`/bmtp-product-manage/consignor/unCheckBatch`, params, 'post');

/****管理人-下拉列表弹框****/
export const getClientDownData = params =>
  $ajax(`/bmtp-product-manage/consignor/pullDownList`, params, 'post');

// ************接口分隔线(分割线以下的代码未暂未启用的功能的代码)*************

/****机构-下拉列表弹框****/
export const getPublisherDownData = params =>
  $ajax(`/bmtp-common-basicparameter/infoPublisher/list`, params, 'post');

/****附件上传成功创建文档添加附件****/
export const uploadDocumentAdd = params =>
  $ajax(`/bmtp-product-manage/attachment/noDocumentAdd`, params, 'post');

/***合同文档设置-添加**/
export const addContract = params =>
  $ajax(`/bmtp-product-manage/document/addContract`, params, 'post');

/****有文档的情况下添加文档附件****/
export const addEnclosure = params => $ajax(`/bmtp-product-manage/attachment/add`, params, 'post');

/****文档--查询****/
export const getDocument = params =>
  $ajax(`/bmtp-product-manage/document/pageList`, params, 'post');

/****附件--查询****/
export const getEnclosure = params =>
  $ajax(`/bmtp-product-manage/attachment/pageList`, params, 'post');

/****删除--文档****/
export const deleteEnclosure = (id, params) =>
  $ajax(`/bmtp-product-manage/attachment/del/${id}`, params, 'post');

/****应用--文档****/
export const updateEnclosure = id => $ajax(`/bmtp-product-manage/attachment/use/${id}`, {}, 'post');

/***没有合同文档Id 批量上传**/
export const addBatchContract = params =>
  $ajax(`/bmtp-product-manage/attachment/noDocumentAddFiles`, params, 'post');
