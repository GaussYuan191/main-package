/**
 * 系统菜单管理 View
 * @author daizq
 */

import React from 'react';
import SystemMenuController from '../controller/SystemMenuController';
import { Col, Input, Button, Tree, Form, Icon } from 'antd';
import { BizTable } from 'bmtp-trade-base';
import { getMenuTablecols, getMenuFuncTablecols } from './table-columns';
import MenuEditModal from './MenuEditModal';
import MenuFuncEditModal from './MenuFuncEditModal';
import '../styles/system-menu.less';

class SystemMenuView extends SystemMenuController {
  render() {
    return (
      <React.Fragment>
        <div className="system-menu-left">
          <div className="tree-top-tools">
            <Button type="link" onClick={this.handleToggleTree}>
              {this.state.treeExpandedKeys.length ? '全部收起' : '全部展开'}

              <Icon type={this.state.treeExpandedKeys.length ? 'minus-square' : 'plus-square'} />
            </Button>
          </div>

          <Form colon={false} layout="inline">
            <Form.Item>
              <Input.Search
                placeholder="请输入菜单名"
                onSearch={this.handleSearch}
                style={{ width: 270 }}
                enterButton
              />
            </Form.Item>
          </Form>

          <div className="tree-content-scroll">
            <Tree.DirectoryTree
              treeData={this.state.menuTreeData}
              expandedKeys={this.state.treeExpandedKeys}
              onExpand={this.onTreeExpand}
              onSelect={this.handleTreeSelect}
              selectedKeys={[this.state.activeMenuCode]}
            />
          </div>
        </div>

        <div className="system-menu-right">
          <div className="table-title">
            <span>菜单管理</span>

            <div className="table-title-tools">
              {/* <Button icon="plus" type="link" onClick={() => this.handleShowMenuModal({}, true)}>
                新增
              </Button> */}

              <MenuEditModal
                {...this.state}
                ref={ref => (this.$menuEditModal = ref)}
                loadData={() => {
                  this.getSystemMenuTreeData();
                }}
              />
            </div>
          </div>
          {this.state.menuTableKeys.length > 0 ? (
            <BizTable
              defaultExpandedRowKeys={this.state.menuTableKeys}
              defaultExpandAllRows={true}
              onExpand={this.changeMenuTable}
              columns={getMenuTablecols(this)}
              activeKeys="1"
              scollX={true}
              dataSource={this.state.menuTableData}
              pagination={false}
              onClickRow={this.onClickMenuRow}
              ref={ref => (this.$menuTable = ref)}
            />
          ) : (
            <BizTable ref={ref => (this.$menuTable = ref)} />
          )}

          <div className="table-title">
            <span>功能点管理</span>

            <div className="table-title-tools">
              {/* <Button icon="plus" type="link" onClick={() => this.handleShowMenuFuncModal({}, true)}>
                新增
              </Button> */}

              <MenuFuncEditModal
                {...this.state}
                ref={ref => (this.$menuFuncEditModal = ref)}
                loadData={() => {
                  this.getMenuFunc({
                    menuCode: this.state.menuRowData.menuCode
                  });
                }}
              />
            </div>
          </div>

          <Col>
            <BizTable
              className="stripe-table"
              columns={getMenuFuncTablecols(this)}
              activeKeys="1"
              scollX={true}
              dataSource={this.state.menuFuncList}
              pagination={false}
              onClickRow={this.onClickMenuFuncRow}
              ref={ref => (this.$menuFuncTable = ref)}
            />
          </Col>
        </div>
      </React.Fragment>
    );
  }
}

export default SystemMenuView;
