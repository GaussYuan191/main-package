/**
 * 数据角色管理 Controller
 * @author txf
 */

import React from 'react';
import { message, Modal } from 'antd';
export default class RoleManageController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**控制展开的角色树节点 */
      treeExpandedKeys: [],
      /**选中节点的key(展示用) */
      selectedKeys: [],
      /**角色新增/修改对话框初始值 */
      editData: {},
      /**编辑状态 */
      editing: false
    };
  }
  async componentDidMount() {
    await this.props.asyncHttpGetDataRoleTree();
  }

  /**角色名称模糊查询 */
  handleSearch = roleName => {
    this.props.changeState({ key: 'roleName', value: roleName });
    this.props.asyncHttpGetDataRoleTree();
  };

  /**角色树展开事件 */
  onTreeExpand = treeExpandedKeys => {
    this.setState({
      treeExpandedKeys
    });
  };

  /**点击左侧树节点 */
  handleTreeSelect = (selectedKeys, e) => {
    const { type, roleCode } = e?.node?.props || {};
    if (type === 'O' || this.isEditing()) {
      return;
    }
    const { changeState, changeQueryParam, asyncHttpGetDataAuthList } = this.props;
    changeState({
      key: 'treeActiveCode',
      value: roleCode ? roleCode : ''
    });
    changeQueryParam({
      reqPageNum: 1
    });
    asyncHttpGetDataAuthList();
    this.setState({ selectedKeys });
  };

  /**打开新增/修改对话框 */
  handleShowModal = (record, isAdd) => {
    if (this.isEditing()) {
      return;
    }
    this.setState({
      editData: isAdd ? {} : record || {},
      editing: isAdd ? 'add' : 'update'
    });
  };

  /**取消/关闭对话框 */
  handleCloseEdit = () => {
    this.setState({
      editing: false
    });
  };

  /**删除角色 */
  handleRemoveRole = node => {
    const { asyncHttpDeleteDataRole } = this.props;
    if (this.isEditing()) {
      return;
    }
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        asyncHttpDeleteDataRole({
          roleCode: node.roleCode
        });
      }
    });
  };

  /**检查是否是编辑状态 */
  isEditing = () => {
    if (this.state.editing) {
      message.warning('正在编辑！');
      return true;
    }

    return false;
  };
}
