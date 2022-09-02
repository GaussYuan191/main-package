/**
 * 角色管理 View
 * @author daizq
 */

import React from 'react';
import RoleManageController from '../controller/RoleManageController';
import { Input, Button, Tree, Form, Icon } from 'antd';
import { BizTable } from 'bmtp-trade-base';
import { getMenuTablecols } from './table-columns';
import RoleEditModal from './RoleEditModal';
import SearchForm from './SearchForm';
import { filterWithAuth } from 'yss-biz';
import '../styles/role-manage.less';

class RoleManageView extends RoleManageController {
  render() {
    return (
      <React.Fragment>
        <div className="role-manage-left">
          <div className="tree-top-tools">
            <Button type="link" onClick={this.handleToggleTree}>
              {this.state.treeExpandedKeys.length ? '全部收起' : '全部展开'}
              <Icon type={this.state.treeExpandedKeys.length ? 'minus-square' : 'plus-square'} />
            </Button>
            {filterWithAuth(
              <Button
                className="add-btn"
                icon="plus"
                type="link"
                onClick={() => this.handleShowModal({}, true)}
                disabled={this.state.editing}
              >
                新增
              </Button>,
              this.state.btnAuth
            )}
            <RoleEditModal
              {...this.state}
              loadData={this.getRoleTreeData}
              ref={ref => (this.$roleEditContent = ref)}
            />
          </div>
          <Form colon={false} layout="inline">
            <Form.Item>
              <Input.Search
                placeholder="请输入角色名称"
                onSearch={this.handleSearch}
                style={{ width: 270 }}
                enterButton
                disabled={this.state.editing}
              />
            </Form.Item>
          </Form>

          <div className="tree-content-scroll">
            <Tree.DirectoryTree
              treeData={this.state.roleTreeData}
              expandedKeys={this.state.treeExpandedKeys}
              onExpand={this.onTreeExpand}
              onSelect={this.handleTreeSelect}
              selectedKeys={[this.state.treeActiveCode]}
            />
          </div>
        </div>

        <div className="role-manage-right">
          <div style={{ paddingTop: '10px' }}></div>
          <SearchForm handleSearch={this.handleSearchMenuAuth} {...this.state} />

          <div className="table-top-tools">
            <Button.Group>
              {filterWithAuth(
                <Button
                  icon={this.state.editing ? 'save' : 'edit'}
                  onClick={() => this.handleToggleEdit()}
                  disabled={!this.state.treeActiveCode}
                  funcname="修改"
                >
                  {this.state.editing ? '保存' : '编辑'}
                </Button>,
                this.state.btnAuth
              )}

              {this.state.editing ? (
                <Button icon="undo" onClick={() => this.handleCancelEdit()}>
                  取消
                </Button>
              ) : (
                ''
              )}
            </Button.Group>
          </div>
          <BizTable
            columns={getMenuTablecols(this)}
            activeKeys="1"
            dataSource={this.state.menuAuthTreeData}
            pagination={false}
            expandedRowKeys={this.state.expandedRowKeys}
            onExpand={this.onTreeTableExpand}
            rowClassName={record => {
              return record.menuFuncList &&
                record.menuFuncList.find(v => {
                  return v.grantFlag === '1';
                })
                ? 'has-auth-row'
                : '';
            }}
            scollX="400px"
            scollY={top.document.body.clientHeight - 240}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default RoleManageView;
