/**
 * 数据角色管理 View
 * @author txf
 */

import React from 'react';
import OrgTreeController from '../../controller/OrgTreeController';
import { Input, Button, Tree, Form, Icon } from 'antd';
const { DirectoryTree } = Tree;

class OrgTreeView extends OrgTreeController {
  constructor(props) {
    super(props);
  }

  render() {
    const { orgTreeData, orgTreeAllKeys } = this.props;
    return (
      <React.Fragment>
        <div className="tree-top-tools">
          <Button
            type="link"
            onClick={() => {
              this.setState({
                treeExpandedKeys: this.state.treeExpandedKeys.length ? [] : orgTreeAllKeys
              });
            }}
          >
            {this.state.treeExpandedKeys.length ? '全部收起' : '全部展开'}
            <Icon type={this.state.treeExpandedKeys.length ? 'minus-square' : 'plus-square'} />
          </Button>
        </div>
        <Form colon={false} layout="inline">
          <Form.Item>
            <Input.Search
              placeholder="请输入机构名称"
              onSearch={this.handleTreeSearch}
              style={{ width: 270 }}
              enterButton
              allowClear
              disabled={this.state.editing}
            />
          </Form.Item>
        </Form>

        <div className="tree-content-scroll">
          <DirectoryTree
            treeData={orgTreeData}
            expandedKeys={this.state.treeExpandedKeys}
            onExpand={this.onTreeExpand}
            selectedKeys={this.state.selectedKeys}
            onSelect={this.handleTreeSelect}
            expandAction={false}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default OrgTreeView;
