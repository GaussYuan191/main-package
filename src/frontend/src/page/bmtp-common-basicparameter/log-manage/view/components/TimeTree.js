import React, { Component } from 'react';
import { Tree } from 'antd';
import { filterTreeData } from 'yss-biz';
const { TreeNode } = Tree;
// const { Search } = Input;

class TimeTree extends Component {
  state = {
    dataSource: this.props.treeData,
    orgTreeData: [],
    keyExpand: [],
    defaultKeyExpand: [],
    selectedKeys: []
  };

  //格式化树结构，有以key value 的形式展示
  /**渲染子节点**/
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={`${item.title}`}
            key={item.code}
            dataRef={item}
            disabled={item.isLeaf ? false : true}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.code} {...item} />;
    });

  /***渲染树形结构***/
  render() {
    let rendOk = typeof this.state.orgTreeData.keys == 'function';

    return (
      <div className="darkStyle" style={{ overflowX: 'auto' }}>
        <Tree
          onSelect={this.changeTreeItem.bind(this)}
          expandedKeys={rendOk ? [] : this.state.keyExpand}
          onExpand={this.changeExpand}
          // onCheck={this.onCheck}
        >
          {this.renderTreeNodes(this.state.dataSource)}
        </Tree>
      </div>
    );
  }
  /***点击选中的树结构进行models赋值***/
  async changeTreeItem(selectedKeys, { selected, selectedNodes, node, event }) {
    const { saveServerPath, saveChecked } = this.props;
    const { dataRef } = node.props;
    const { serverPath, isLeaf } = dataRef;
    if (isLeaf) {
      saveServerPath(serverPath);
      saveChecked({ checked: true });
      this.setState({ selectedKeys });
    }
  }

  changeExpand = (expandedKeys, option) => {
    this.setState({
      keyExpand: expandedKeys
    });
  };

  componentDidMount() {
    this.setState(
      () => {
        return {
          orgTreeData: filterTreeData(this.props.treeData || [], {
            keyField: 'code',
            titleField: 'title'
          })
        };
      },
      () => {
        this.setState({
          keyExpand: this.state.orgTreeData.keys,
          defaultKeyExpand: this.state.orgTreeData.keys
        });
      }
    );
  }
}

export default TimeTree;
