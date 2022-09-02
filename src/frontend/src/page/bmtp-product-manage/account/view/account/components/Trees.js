import React, { Component } from 'react';
import { Tree, Icon, Input } from 'antd';
import { filterTreeData } from 'yss-biz';
const { TreeNode } = Tree;
const { Search } = Input;

const topNodeKey = ['SG000006'];
/** 查询参数类型 */
const queryElementType = {
  assetAccount: 'queryCapitalElement',
  bondAccount: 'queryBandElement',
  tradeAccount: 'queryTransactionElement'
};

class Trees extends Component {
  state = {
    treeHeight: 600,
    dataSource: this.props.treeData,
    orgTreeData: [],
    // keyExpand: [],
    defaultKeyExpand: [],
    hasMore: true,
    expandedKeys: topNodeKey,
    selectedKeys: [], // 显示选中的节点
    pageArr: [],
    mergeArr: []
  };

  //格式化树结构，有以key value 的形式展示
  /**渲染子节点**/
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={`${item.code} - ${item.title}`}
            key={item.key}
            dataRef={item}
            isLeaf={item.level == '0' || item.level == '1' ? false : true}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} isLeaf={item.level == '1' ? false : true} />;
    });

  /***渲染树形结构***/
  render() {
    // let rendOk = typeof this.state.orgTreeData.keys == 'function';
    return (
      <div className="darkStyle">
        <Search
          style={{ width: '190px', margin: '8px 0 8px 8px' }}
          placeholder={'请输入条件回车查询'}
          allowClear={true}
          onSearch={value => {
            this.searchTreeDate(value);
          }}
          onChange={e => {
            if (!e.target.value) {
              this.setState({ dataSource: this.props.treeData, expandedKeys: topNodeKey });
            }
          }}
        />
        <div className="treeExpand">
          <span onClick={this.toggleExpand}>
            <span>{this.state.expandedKeys.length ? '收起全部' : '展开'}</span>
            <Icon type={this.state.expandedKeys.length ? 'minus-square' : 'plus-square'} />
          </span>
          {/* <span onClick={this.cleanTreeSelect}>重置</span> */}
        </div>

        <div style={{ overflow: 'auto', height: this.state.treeHeight }}>
          <Tree
            onSelect={this.changeTreeItem.bind(this)}
            expandedKeys={this.state.expandedKeys}
            onExpand={this.changeExpand}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.state.dataSource)}
          </Tree>
        </div>
      </div>
    );
  }
  /***点击选中的树结构进行models赋值***/
  async changeTreeItem(selectedKeys, { selected, selectedNodes, node, event }) {
    const { asyncHttpAccountlList, activeAccountKey, changeTreeRow } = this.props;
    const queryParams = this.props[queryElementType[activeAccountKey]];
    const { props } = node;

    if (!selected) {
      return;
    }

    //点击更多
    if (props.flag == 'button') {
      this.loadNodeFunc(props.code, '1');
      return;
    }

    // let floor = node.props.pos.split('-').length - 1;
    let floor = Number(node.props.dataRef.level) + 1;
    let params = {
      title: selectedNodes[0].props.dataRef
        ? selectedNodes[0].props.dataRef.title
        : selectedNodes[0].props.title,
      code: selectedNodes[0].props.dataRef
        ? selectedNodes[0].props.dataRef.code
        : selectedNodes[0].props.code,
      key: selectedNodes[0].props.dataRef
        ? selectedNodes[0].props.dataRef.key
        : selectedNodes[0].key,
      floor
    };
    changeTreeRow({ params: params });
    this.setState({ selectedKeys: selectedKeys });
    await asyncHttpAccountlList({ params: queryParams, type: activeAccountKey });
  }

  /** 点击取消树节点选中并进行models赋值 */
  // cleanTreeSelect = () => {
  //   const { activeAccountKey, changeTreeRow, asyncHttpAccountlList } = this.props;
  //   const queryParams = this.props[queryElementType[activeAccountKey]];
  //   this.setState({ selectedKeys: [] });
  //   changeTreeRow({ params: {} });
  //   asyncHttpAccountlList({ params: queryParams, type: activeAccountKey });
  // };

  //点击加载更多
  loadNodeFunc = (code, level) => {
    this.changePage(code, 'add');
    const reqPageNum = this.filterPage(code);
    this.loadPageNodes(code, level, reqPageNum);
  };

  changeExpand = (expandedKeys, option) => {
    const { node, expanded } = option;
    const dataRef = node.props.dataRef;
    const { code, level } = dataRef;
    if (expanded && dataRef.level == '1') {
      //节点展开
      const reqPageNum = this.filterPage(code);
      this.setState({ mergeArr: [] });
      this.loadPageNodes(code, level, reqPageNum);
    } else {
      //节点收缩
      if (code == 'SG000006') {
        this.setState({
          dataSource: this.props.treeData,
          mergeArr: [],
          expandedKeys: []
        });
      } else {
        this.changePage(code, 'reduce');
        this.setState({ mergeArr: [] });
      }
    }
    if (code == 'SG000006' && expanded) {
      this.setState({ expandedKeys: topNodeKey });
    } else {
      this.setState({ expandedKeys });
    }
  };

  //搜索后展开树节点
  searchExpandKeys = data => {
    const keys = data.map(item => item.key);
    this.setState({ expandedKeys: keys });
  };

  //加载分页节点数据
  loadPageNodes = (code, level, reqPageNum, type) => {
    const { asyncLoadMoreNodes } = this.props;
    asyncLoadMoreNodes({ code, level, reqPageNum, type }).then(() => {
      const { moreNodes } = this.props;
      let dataSource;
      if (type == 'search') {
        dataSource = !code ? this.props.treeData : moreNodes;
        this.searchExpandKeys(moreNodes);
      } else {
        if (moreNodes && moreNodes.length) {
          dataSource = this.spliceTreeData(moreNodes[0]);
        }
      }
      dataSource = dataSource || this.state.dataSource;
      this.setState({ dataSource });
    });
  };

  //拼接树数据
  spliceTreeData = nodes => {
    const mergeArr = this.state.mergeArr;
    const { code, children } = nodes;
    let nodeArr;
    if (children && children.length) {
      nodeArr = mergeArr.concat(children);
      this.setState({ mergeArr: nodeArr });
    }
    const data = this.state.dataSource;
    const moreButton = [
      {
        code,
        key: this.timeDate(),
        level: '2',
        flag: 'button',
        title: '加载更多......'
      }
    ];
    const arr = data.map(item => {
      if (item.children && item.children.length) {
        item.children.map(node => {
          if (node.code == code) {
            if (nodeArr && nodeArr.length) {
              if (children && children.length < 50) {
                node.children = [...nodeArr];
              } else {
                node.children = [...nodeArr, ...moreButton];
              }
            }
          }
          return node;
        });
      }
      return item;
    });
    return arr;
  };

  //将时间作为按钮的key
  timeDate = () => {
    const date = new Date();
    return date.getTime() + '';
  };

  //加载更多：页码累加； 收缩页码重置1
  changePage = (code, type) => {
    const { pageArr } = this.state;
    const arr = pageArr.map(item => {
      if (item.code == code) {
        if (type == 'add') {
          item.reqPageNum += 1;
        } else if (type == 'reduce') {
          item.reqPageNum = 1;
        }
      }
      return item;
    });
    this.setState({ pageArr: arr });
  };

  //过滤页码
  filterPage = code => {
    const { pageArr } = this.state;
    const obj = pageArr.filter(item => item.code == code)[0];
    return obj.reqPageNum;
  };

  //页码数组
  pageNumArr = data => {
    if (data && data.length) {
      return data[0].children.map(item => {
        const obj = {};
        obj.reqPageNum = 1;
        obj.code = item.code;
        return obj;
      });
    }
  };

  //树高度计算
  calcTreeHeight = () => {
    const bodyHeight = document.body.clientHeight;
    const treeHeight = bodyHeight - 48 - 30 - 22 - 80;
    return treeHeight;
  };

  componentDidMount() {
    const { treeData } = this.props;
    const treeHeight = this.calcTreeHeight();
    const pageArr = this.pageNumArr(treeData);
    this.setState(() => {
      return {
        orgTreeData: filterTreeData(treeData || [], {
          keyField: 'key',
          titleField: 'title'
        }),
        pageArr,
        treeHeight,
        selectedKeys: (treeData && treeData[0] && [treeData[0].code]) || []
      };
    });
  }
  //点击展开全部收起全部
  toggleExpand = () => {
    this.setState({
      expandedKeys: this.state.expandedKeys.length ? [] : topNodeKey
    });
  };

  searchTreeDate = value => {
    // const resoult = filterTreeData(this.props.treeData || [], {
    //   keyField: 'key',
    //   titleField: 'title',
    //   filterValue: value
    // });
    // this.setState({ dataSource: resoult.rows });
    if (!value) {
      const dataSource = this.props.treeData;
      this.setState({ expandedKeys: topNodeKey, dataSource });
      return;
    }
    this.loadPageNodes(value, '1', 1, 'search');
  };
}

export default Trees;
