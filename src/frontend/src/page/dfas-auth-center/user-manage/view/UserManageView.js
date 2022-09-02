/**
 * 用户管理 View
 * @author daizq
 */

import React from 'react';
import UserManageController from '../controller/UserManageController';
import { Input, Button, Tree, Form, Icon } from 'antd';
import { BizTable } from 'bmtp-trade-base';
import { getUserTablecols } from './table-columns';
import EditModal from './EditModal';
import SearchForm from './SearchForm';
import { filterWithAuth } from 'yss-biz';
import '../styles/user-manage.less';
class UserManageView extends UserManageController {
  render() {
    return (
      <React.Fragment>
        <div className="user-manage-left">
          <div className="tree-top-tools">
            <Button type="link" onClick={this.handleToggleTree}>
              {this.state.treeExpandedKeys.length ? '全部收起' : '全部展开'}

              <Icon type={this.state.treeExpandedKeys.length ? 'minus-square' : 'plus-square'} />
            </Button>
          </div>

          <Form colon={false} layout="inline">
            <Form.Item>
              <Input.Search
                placeholder="请输入机构名称"
                onSearch={this.handleSearch}
                style={{ width: 270 }}
                enterButton
              />
            </Form.Item>
          </Form>

          <div className="tree-content-scroll">
            <Tree.DirectoryTree
              treeData={this.state.orgTreeData}
              expandedKeys={this.state.treeExpandedKeys}
              onExpand={this.onTreeExpand}
              onSelect={this.handleTreeSelect}
              selectedKeys={[this.state.activeOrgCode]}
            />
          </div>
        </div>

        <div className="user-manage-right">
          <SearchForm
            {...this.state}
            wrappedComponentRef={ref => (this.$searchForm = ref)}
            handleSearch={() => this.getUserByOrgCode()}
          />

          <div className="table-title-tools">
            {filterWithAuth(
              <Button icon="plus" shape="round" onClick={() => this.handleShowModal({}, true)}>
                新增
              </Button>,
              this.state.btnAuth
            )}
            <EditModal
              {...this.state}
              loadData={this.getUserByOrgCode}
              ref={ref => (this.$editContent = ref)}
            />
          </div>

          <BizTable
            className="stripe-table"
            columns={getUserTablecols(this)}
            activeKeys="1"
            scollX={true}
            scollY={document.body.clientHeight - 137}
            dataSource={this.state.userTableData}
            total={this.state.userTableData.length}
            loadData={(page, pageSize) => this.getUserByOrgCode('', page, pageSize)}
            pagination={{
              defaultPageSize: 20
            }}
            ref={ref => (this.$userTable = ref)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default UserManageView;
