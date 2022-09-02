/**
 * 用户角色授权 Controller
 * @author txf
 */

import React from 'react';
export default class UserRoleAuthorizeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      ids: [],
      userCodeList: [], // 选中的用户编号
      userOrgList: [], // 选中用户机构数组, 用于处理只允许勾选同一机构下用户
      showDataAuth: false // 是否展示数据权限相关功能
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeOrgCode !== this.props.activeOrgCode) {
      // 清除勾选
      this.toEmptySelect();
    }
    if (nextProps.isEnableDataAuth !== this.props.isEnableDataAuth) {
      this.setState({ showDataAuth: nextProps.isEnableDataAuth });
    }
  }

  /**查询用户列表 */
  query = values => {
    this.props.changeQueryParam({ userCode: values.userCode, reqPageNum: 1 });
    this.props.asyncHttpGetUserList();
    this.toEmptySelect();
  };

  /**分页查询 */
  searchPage = pages => {
    this.props.changeQueryParam(pages);
    // 后端的分页当前有问题, 会返回所有数据, 故不用再请求
    // this.props.asyncHttpGetUserList();
  };

  /**关闭授权窗口 */
  closeAuthorizeModal = () => {
    this.props.changeModalInfo({ visible: false, userCodeList: [] });
    this.props.clearAuthTempData();
  };

  /**清空勾选 */
  toEmptySelect = () => {
    this.setState({ keys: [], ids: [], userCodeList: [], userOrgList: [] });
  };
}
