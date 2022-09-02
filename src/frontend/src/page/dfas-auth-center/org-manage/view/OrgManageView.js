/**
 * 机构管理 View
 * @author daizq
 */

import React from 'react';
import OrgManageController from '../controller/OrgManageController';
import { Input, Button, Tree, Form, Icon } from 'antd';
import { BizTable } from 'bmtp-trade-base';
import { getOrgTablecols } from './table-columns';
import EditModal from './EditModal';
import '../styles/org-manage.less';
import { filterWithAuth } from 'yss-biz';
class OrgManageView extends OrgManageController {
  render() {
    return (
      <React.Fragment>
        <div className="org-manage-left">
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
                enterButton={true}
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

        <div className="org-manage-right">
          <div className="table-title-tools">
            {filterWithAuth(
              <Button icon="plus" shape="round" onClick={() => this.handleShowModal({}, true)}>
                新增
              </Button>,
              this.state.btnAuth
            )}

            <EditModal
              {...this.state}
              ref={ref => (this.$editContent = ref)}
              loadData={this.getOrgTreeData}
            />
          </div>

          <BizTable
            columns={getOrgTablecols(this)}
            activeKeys="1"
            scollX={true}
            dataSource={this.state.orgTableData}
            pagination={false}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default OrgManageView;
