import { $ajax } from 'yss-biz';
/* 菜单列表 */
export const getMenuList = () => $ajax('/dfas-auth-center/user/menu/listTree');

/*获取权限数据-独立版*/
export const getMenuAuth = code => $ajax(`/dfas-auth-center/user/permit/func/${code}`);
/*获取权限数据-sofa嵌入版*/
export const getSofaMenuAuth = code => $ajax(`/dfas-sofa-auth-center/user/permit/func/${code}`);

//许可认证
export const permitVerity = menuCode => $ajax(`/dfas-base-biz/license/permit/${menuCode}`, 'get');

/*获取客户编码*/
export const getCustomCode = () =>
  $ajax('/bmtp-common-basicparameter/api/customer/getCurrentCustomerCode', 'post');
