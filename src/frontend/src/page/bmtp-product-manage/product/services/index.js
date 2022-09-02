/**
 * @产品创设请求
 *
 */
import { $ajax } from 'yss-biz';
/***区分开发环境与生产环境 */
const api = process.env.NODE_ENV === 'development' ? '/service' : '';
/***获取产品列表 */
export const getProductList = params =>
  $ajax(`/bmtp-product-manage/product/product/pageList`, params, 'post');

/***关联账号*/
export const getAccount = productId =>
  $ajax(`/bmtp-product-manage/product/product/getAllRefAccount/${productId}`);

/***产品-增加 */
export const addProduct = params =>
  $ajax(`/bmtp-product-manage/product/product/add`, params, 'post');

/***产品-删除 */
export const deleteProduct = id =>
  $ajax(`/bmtp-product-manage/product/product/delete/${id}`, 'delete');

/***产品-修改*/
export const updateProduct = params =>
  $ajax(`/bmtp-product-manage/product/product/update`, params, 'put');

/***产品-批量审核 */
export const checkBatchProduct = ids =>
  $ajax(`/bmtp-product-manage/product/product/checkProduct`, ids, 'put');

/***产品-批量反审核 */
export const unCheckBatchProduct = ids =>
  $ajax(`/bmtp-product-manage/product/product/uncheckProduct`, ids, 'put');

/***产品-更新产品状态 */
export const undateProductState = ({ id, status }) =>
  $ajax(`/bmtp-product-manage/product/product/updateStatus/${id}?accountStatus=${status}`, 'put');

/***产品-启用*/
export const updateEnableStatus = id =>
  $ajax(`/bmtp-product-manage/product/product/updateEnableStatus/${id}`, 'put');

/***产品-停用*/
export const updateDisableStatus = id =>
  $ajax(`/bmtp-product-manage/product/product/updateDisableStatus/${id}`, 'put');

/***产品-注销*/
export const updateLogoutStatus = id =>
  $ajax(`/bmtp-product-manage/product/product/updateLogoutStatus/${id}`, 'put');

/***管理人-下拉列表 */
export const getSubjectDownList = params =>
  $ajax(`/bmtp-product-manage/consignor/pullDownList`, params, 'post');

/* 托管人 */
export const getTrusteeName = params =>
  $ajax(`/bmtp-common-basicparameter/businessParameter/getCurrentEscrowBank`, params, 'post');

/***管理人-主体机构下拉框 */
export const getSubjectMechanismDownList = params =>
  $ajax(`/bmtp-product-manage/manager/publisher/pullDownList`, params, 'post');

/***关联文档-获取关联文档列表*/
export const getDocumentList = params =>
  $ajax(`/bmtp-product-manage/document/pageList`, params, 'post');

/****机构-下拉列表弹框****/
export const getPublisherDownData = params =>
  $ajax(`/bmtp-common-basicparameter/infoPublisher/list`, params, 'post');

/****关联主体-增加机构****/
export const addSubject = params =>
  $ajax('/bmtp-product-manage/product/productSubjectRef/add', params, 'post');

/***关联主体-删除机构*/
export const deleteSubject = id =>
  $ajax(`/bmtp-product-manage/product/productSubjectRef/delete/${id}`, 'delete');

/***关联主体-获取关联主体列表*/
export const getSubjectList = params =>
  $ajax(`/bmtp-product-manage/product/productSubjectRef/pageList`, params, 'post');

/***合同文档设置-添加**/
export const addContract = params =>
  $ajax(`/bmtp-product-manage/document/addContract`, params, 'post');

/***没有合同文档Id 批量上传**/
export const addBatchContract = params =>
  $ajax(`/bmtp-product-manage/attachment/noDocumentAddFiles`, params, 'post');
