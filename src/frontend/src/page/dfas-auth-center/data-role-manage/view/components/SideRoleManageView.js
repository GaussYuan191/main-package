/**
 * 数据角色管理 View
 * @author txf
 */

import React from 'react';
import SideRoleManageController from '../../controller/SideRoleManageController';
import { Input, Button, Tree, Form, Icon } from 'antd';
import RoleEditForm from './RoleEditForm';
import { bizUtils } from 'bmtp-trade-base';
import { filterWithAuth, SearchForm, Modal } from 'yss-biz';

const { DirectoryTree } = Tree;

class RoleManageSideView extends SideRoleManageController {
  constructor(props) {
    super(props);
  }
  // 自定义树节点
  treeNodeRender = node => {
    const buttonList = [
      <Icon
        type="edit"
        title="修改"
        funcname="修改"
        onClick={() => this.handleShowModal(node, false)}
      />,
      <Icon
        type="delete"
        title="删除"
        funcname="删除"
        onClick={() => this.handleRemoveRole(node)}
      />
    ];
    return node.type === 'R'
      ? // 角色
        {
          key: node.treeCode,
          value: node.roleCode,
          title: node.roleName,
          titleDom: (
            <React.Fragment>
              <span title={node.orgName || node.orgCode}>{node.roleName || node.roleCode}</span>
              <span className="tree-node-tools">
                {filterWithAuth(buttonList, this.props.btnAuth)}
              </span>
            </React.Fragment>
          ),
          icon: <Icon type="user" />
        }
      : // 机构
        {
          key: node.treeCode,
          value: node.orgCode,
          title: node.orgName,
          titleDom: (
            <span className="org-tree-node" title={node.orgName || node.orgCode}>
              {node.orgName || node.orgCode}
            </span>
          )
        };
  };
  render() {
    const { roleName, roleTreeData } = this.props;
    const dataTree = bizUtils.filterTreeData(roleTreeData || [], {
      treeNodeRender: this.treeNodeRender,
      filterValue: roleName
    });
    return (
      <React.Fragment>
        <div className="tree-top-tools">
          <Button
            type="link"
            onClick={() => {
              this.setState({
                treeExpandedKeys: this.state.treeExpandedKeys.length ? [] : dataTree.keys
              });
            }}
          >
            {this.state.treeExpandedKeys.length ? '全部收起' : '全部展开'}
            <Icon type={this.state.treeExpandedKeys.length ? 'minus-square' : 'plus-square'} />
          </Button>
          {filterWithAuth(
            <Button
              className="add-btn"
              icon="plus"
              type="link"
              onClick={() => this.handleShowModal({}, true)}
              disabled={!!this.props.editing}
            >
              新增
            </Button>,
            this.props.btnAuth
          )}
          <Modal
            title={`数据角色-${this.state.editing === 'add' ? '新增' : '修改'}`}
            visible={!!this.state.editing}
            width={900}
            destroyOnClose={true}
            onCancel={this.handleCloseEdit}
          >
            <RoleEditForm
              editData={this.state.editData}
              editing={this.state.editing}
              handleCloseEdit={this.handleCloseEdit}
              asyncHttpAddDataRole={this.props.asyncHttpAddDataRole}
              asyncHttpUpdateDataRole={this.props.asyncHttpUpdateDataRole}
              orgPullDownList={this.props.orgPullDownList}
              asyncHttpGetOrgPullDownList={this.props.asyncHttpGetOrgPullDownList}
            />
          </Modal>
        </div>
        <Form colon={false} layout="inline">
          <Form.Item>
            <Input.Search
              placeholder="请输入角色名称"
              onSearch={this.handleSearch}
              style={{ width: 270 }}
              enterButton
              allowClear
              disabled={this.state.editing}
            />
          </Form.Item>
        </Form>

        <div className="tree-content-scroll">
          <DirectoryTree
            treeData={dataTree.rows}
            expandedKeys={this.state.treeExpandedKeys}
            onExpand={this.onTreeExpand}
            selectedKeys={this.state.selectedKeys}
            onSelect={this.handleTreeSelect}
          ></DirectoryTree>
        </div>
      </React.Fragment>
    );
  }
}

export default RoleManageSideView;
