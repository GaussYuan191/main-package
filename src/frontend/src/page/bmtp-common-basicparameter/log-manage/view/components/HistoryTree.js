import React, { Component } from 'react';
import { Tree, message } from 'antd';
import { filterTreeData } from 'yss-biz';

const { TreeNode } = Tree;
// const { Search } = Input;
class HistoryTree extends Component {
  state = {
    dataSource: this.props.treeData,
    orgTreeData: [],
    keyExpand: [],
    defaultKeyExpand: [],
    dowbloadObj: {},
    checkedKeys: []
  };

  //下载选中的日志
  downLoadLog = () => {
    const { asyncHttpDownloadLog, checkCode } = this.props;
    const { dowbloadObj } = this.state;
    const params = { filePaths: checkCode, serverPath: dowbloadObj.serverPath };
    if (checkCode && checkCode.length) {
      asyncHttpDownloadLog(params);
    } else {
      message.error('请勾选日志后再操作');
    }
  };

  //勾选复选框事件
  onCheck = (checkedKeys, { checked, checkedNodes, node, event }) => {
    const { dataRef } = node.props;
    const { serverPath, filePath, code } = dataRef;
    const dowbloadObj = { serverPath, filePath };
    const { handleCheckCode, handleServerPath, clearCheckCode } = this.props;
    handleServerPath(serverPath);

    const { tempServerPath } = this.props;
    if (checked) {
      if (tempServerPath == serverPath) {
        handleCheckCode({ code, type: 'add' });
      } else {
        handleServerPath(serverPath);
        clearCheckCode();
        handleCheckCode({ code, type: 'add' });
      }
    } else {
      handleCheckCode({ code, type: 'delete' });
    }

    this.setState({ dowbloadObj, checkedKeys });
  };

  expandedKeys = () => {
    const { treeData } = this.props;
    let arr = [];
    arr =
      treeData &&
      treeData.length &&
      treeData.map(item => {
        return item.code;
      });
    return arr;
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
    // let rendOk = typeof this.state.orgTreeData.keys == 'function';
    return (
      <div className="darkStyle" style={{ overflowX: 'auto' }}>
        <div className="treeExpand">
          <span onClick={this.downLoadLog}>下载选中的日志及服务器信息</span>
        </div>
        <Tree
          defaultExpandedKeys={this.expandedKeys()}
          // autoExpandParent
          // defaultExpandAll
          checkable
          onSelect={this.changeTreeItem.bind(this)}
          // expandedKeys={rendOk ? this.expandedKeys() : this.state.keyExpand}
          onExpand={this.changeExpand}
          onCheck={this.onCheck}
          checkedKeys={this.props.checkCode}
        >
          {this.renderTreeNodes(this.state.dataSource)}
        </Tree>
      </div>
    );
  }
  /***点击选中的树结构进行models赋值***/
  async changeTreeItem(selectedKeys, { selected, selectedNodes, node, event }) {
    const { asyncHttpHistoryLogData } = this.props;
    const { dataRef } = node.props;
    const { serverPath, filePath } = dataRef;
    asyncHttpHistoryLogData({ serverPath, filePath }).then(() => {
      // const logContentDiv = document.getElementById('historyLogContent');
      // if (logContentDiv && logContentDiv.scrollHeight) {
      //   logContentDiv.scrollTop = logContentDiv.scrollHeight;
      // }
    });
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

export default HistoryTree;
