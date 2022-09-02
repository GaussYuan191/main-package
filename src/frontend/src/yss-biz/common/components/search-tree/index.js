/**
 *
 * 带有搜索功能的树列表筛选组件
 *
 */
import React, { PureComponent } from 'react';
import { Icon, AutoComplete, Button, Tree } from 'antd';
import './styles.less';
const { TreeNode } = Tree;
const { Option } = AutoComplete;

/**
 *组件可配置属性说明：
 * title 【string】组件顶部显示的名字, 默认显示接口群列表
 * treeData 【array】要显示的树的原始数据，其结构，参考antd的tree
 * expandedKeys [array] (受控)展开指定的树节点
 * autoExpandParent [boolean] 是否展开树形结构的父级节点
 * displayValue [string] 树形数据中的后端处理交互值相关的字段的标识；用于构建autoComplete 相关组件
 * displayTitle [string] 树形数据中的显示值相关的字段的标识；用于构建autoComplete 相关组件
 * isAllSelect [boolean] 是否显示 触发全选的按钮
 * onlySelectLeaf [boolean] 是否在出现勾选时，只返回叶子节点的key
 *
 *
 * onReset 【func】 重置触发时的回调函数；
 * onSelect 【func】 选择 autoComplete 组件下拉值时，触发的行为
 * onSelectTree [func] 点击复选框选择树节点时，方法入参为当前选中的信息
 *
 */

export default class SearchTree extends PureComponent {
  constructor(props) {
    super(props);
    this.childrenEle = [];
    this.state = {
      dataSource: this.props.treeData, //输入匹配
      childEle: null, // autoComplete中要显示的数据
      selectVal: '', //选中的值
      changeToggle: false, // 收起面板的行为触发控制，当其值为true时，标识被收起；
      expandedKeys: props.expandedKeys, //（受控）展开指定的树节点
      checkedKeys: [] // 同antd Tree 的check 属性的含义
    };
  }

  renderTreeNodes = data => {
    const { displayValue, displayTitle } = this.props;
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item[displayTitle]} key={item[displayValue]} dataRef={item} selectable>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item[displayValue]} {...item} />;
    });
  };

  toChangeSearchTree = () => {
    this.setState({
      changeToggle: !this.state.changeToggle
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.treeData !== this.state.dataSource) {
      this.setState({ dataSource: nextProps.treeData });
    }
  }

  render() {
    const { changeToggle, childEle, selectVal } = this.state;
    const { width = 300, title, autoExpandParent = true, isAllSelect = false } = this.props;

    return (
      <div style={{ width: `${!changeToggle ? width : '60'}px` }} className="search-tree-box">
        <div className={`st-name-opt ${changeToggle ? 'st-toggle-opt' : ''}`}>
          {!changeToggle ? <div className="st-name-txt">{title ? title : '接口群列表'}</div> : null}
          <Icon
            type={!changeToggle ? 'double-right' : 'double-left'}
            className="st-toggle-btn"
            onClick={this.toChangeSearchTree}
          />
        </div>
        {!changeToggle ? (
          <div className="input-matching">
            <AutoComplete
              value={selectVal}
              optionLabelProp="value"
              style={{ width: 170 }}
              onSearch={this.autoCompleteSearch}
              // onSelect={this.autoCompleteSelect}//无用逻辑
              onChange={this.autoOnChange}
              className="auto-match-input"
              // filterOption={(inputValue, option) => option.props.children.includes(inputValue)}
            >
              {childEle}
            </AutoComplete>
            {isAllSelect ? (
              <Button
                type="primary"
                style={{ marginLeft: '5px' }}
                size={'small'}
                onClick={this.allSelect}
              >
                全选
              </Button>
            ) : (
              ''
            )}
            <Button size={'small'} style={{ marginLeft: '5px' }} onClick={this.toReset}>
              重置
            </Button>
          </div>
        ) : null}
        {!changeToggle ? (
          <Tree
            allowClear
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
            {this.renderTreeNodes(this.state.dataSource)}
          </Tree>
        ) : null}
      </div>
    );
  }

  async componentDidMount() {
    const { dataSource = [] } = this.state;
    await this.toGetNode(dataSource);
  }

  /**
   * @description 根据树形结构的数据，形成autocomplete组件下拉的数据
   * @param data 树形结构的数据[{children:[]}]结构
   * @param k 要过滤掉的数据，根据数据红的title字段进行匹配
   *
   * @return undefined  更新状态中的 childEle中的值存储，以及后续渲染使用
   */
  toGetNode = async (data, k) => {
    const { displayValue, displayTitle } = this.props;
    // const me = this;
    await this.getChildEle(data, k);
    let arr = this.childrenEle;
    // let a = [];
    arr.map(item => {});

    arr = arr.map((item, idx) => (
      // <Option key={item[displayValue]} value={`${item[displayTitle]}${me.sameValueDeal(idx)}`}>
      <Option key={item[displayValue]} value={`${item[displayTitle]}`}>
        <span>{item[displayTitle]}</span>
      </Option>
    ));
    this.setState({
      childEle: arr
    });
  };

  sameValueDeal = idx => {
    let str = '';
    for (let i = 0; i < idx; i++) {
      str += ' ';
    }
    return str;
  };

  /**
   * @description 根据树形结构递归获取所有树形的叶子节点，并将其维护在childrenEle的全局存储变量中
   * @param data 树形结构的数据[{children:[]}]结构
   * @param k 要过滤掉的数据，根据数据红的title字段进行匹配
   */
  getChildEle = (data, k) => {
    let keys = data.map(item => {
      if (item.children) {
        this.getChildEle(item.children, k);
      } else {
        if (k !== undefined && k !== null) {
          if (item.title.indexOf(k) !== -1) {
            return item;
          }
        } else {
          return item;
        }
      }
    });
    keys = keys.filter(v => v);
    this.childrenEle.push(...keys);
  };

  /**
   * @description autoComplete 组件变动时，触发将变动值，写入到状态树中，
   * 作为查询条件存储；并清空checkedKeys的值
   */
  autoOnChange = value => {
    // const { onSelect, displayTitle = 'key' } = this.props;

    this.setState({
      selectVal: value.trim(),
      checkedKeys: []
    });
    this.matchTree(this.props.treeData, value);
    // onSelect && onSelect(value.trim());
  };

  /**
   * @description 当选择补全的数据时触发的处理，并对外触发配置的Onselct事件；
   * @returns onSelect(option[displayValue])
   */
  autoCompleteSelect = (value, option) => {
    const { onSelect } = this.props;

    this.setState({
      // selectVal: value,
      checkedKeys: []
    });
    onSelect && onSelect(value, option);
    this.matchTree(this.props.treeData, value);
  };

  /**
   * @description 在触发autoComplete组件的自动补全时，触发构建补全信息；
   */
  autoCompleteSearch = async val => {
    const { dataSource = [] } = this.state;
    // this.setState({
    //   selectVal: val
    // });
    this.childrenEle = [];
    await this.toGetNode(dataSource, val);
  };

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = (checkedKeys, info) => {
    const { onSelectTree, onlySelectLeaf } = this.props;
    let leafChecked = [];
    this.setState({ checkedKeys });
    if (onlySelectLeaf) {
      const { checkedNodes } = info;
      leafChecked = this.getLeafCheckKeys(checkedNodes);
      onSelectTree && onSelectTree(leafChecked);
    } else {
      onSelectTree && onSelectTree(checkedKeys);
    }
  };

  getLeafCheckKeys = checkedNodes => {
    return (
      checkedNodes &&
      checkedNodes
        .map(node => {
          const { key, props } = node;
          if (props) {
            const { children } = props;
            if (!(children && children.length > 0)) {
              return key;
            }
          }
        })
        .filter(item => item)
    );
  };

  //全选
  allSelect = async () => {
    const { onAllSelect } = this.props;
    const { dataSource } = this.state;
    let arr = [];
    arr = await this.toAllSelect(dataSource, arr);
    this.setState({ checkedKeys: arr, selectVal: '' });
    onAllSelect && onAllSelect(arr);
  };

  toAllSelect = (data, arr) => {
    const { displayValue } = this.props;

    data.map(item => {
      if (item.children) {
        this.toAddEle(item.children, arr);
      } else {
        arr.push(item[displayValue]);
      }
    });
    return arr;
  };
  // 重置
  toReset = async () => {
    const { onReset } = this.props;
    // const { dataSource } = this.state;
    const dataSource = this.props.treeData;
    this.setState({
      selectVal: '',
      checkedKeys: []
    });
    this.childrenEle = [];
    await this.toGetNode(dataSource);
    onReset && onReset();
  };

  matchTree = (treeData, searchValue) => {
    const newTreeData = this.treeFilter(treeData, searchValue);
    // console.info(newTreeData, 'newTreeData');
    if (searchValue === '') {
      this.setState({ dataSource: this.props.treeData });
    } else {
      this.setState({ dataSource: newTreeData });
    }
  };

  /**
   * @description 根据autoComplete中的数据，对树的结构进行筛选匹配
   *
   */
  treeFilter = (treeData, searchValue) => {
    const { displayTitle } = this.props;
    let result = [];
    treeData &&
      treeData.forEach(item => {
        const showValue = item[displayTitle] || '';
        if (item.children && item.children.length > 0) {
          const newNodeChildren = this.treeFilter(item.children, searchValue);
          const newNode = {
            ...item,
            children: newNodeChildren
          };
          if (newNodeChildren && newNodeChildren.length > 0) {
            result.push(newNode);
          }
        } else {
          if (this.match(showValue, searchValue)) {
            result.push(item);
          }
        }
      });
    return result;
  };

  /**
   * @description 根据传入类型匹配2个数据是否相似
   * @param 被匹配的值
   * @param 匹配的参照字段
   * @param type 匹配的方式或者手段，默认的匹配模式为like
   */

  match = (value, searchValue, type = 'like') => {
    let result = false;
    value += '';
    searchValue += '';

    switch (type) {
      case 'startsWith':
        result = value.startsWith(searchValue);
        break;
      case 'endsWith':
        result = value.endsWith(searchValue);
        break;
      case 'ignoreMatchCase':
        const targetValue = value.toLowerCase();
        const targetSearchValue = searchValue.toLowerCase();
        result = targetValue.includes(targetSearchValue);
        break;
      case 'like':
      default:
        result = value.includes(searchValue);
    }
    return result;
  };

  /*
   **************************************************************分割线****************************************************************
   */

  //还有操作bug出现，目前暂不使用
  onSelect = (selectedKeys, info) => {
    const { treeData } = this.props;
    let arr = [...this.state.checkedKeys];
    let isSelect,
      valKey = info.node.props.eventKey;
    if (this.findIdx(arr, valKey) !== null) {
      isSelect = false;
    } else {
      isSelect = true;
    }
    let ref = (info.node.props.dataRef && info.node.props.dataRef.children) || null;
    if (isSelect) {
      if (arr.indexOf(valKey) === -1) {
        arr.push(valKey);
        if (info.node.props.dataRef) {
          arr = this.toAddEle(ref, arr);
          this.setState({ checkedKeys: arr });
        } else {
          this.treeFilter(treeData, arr, valKey);
        }
      } else {
        //
      }
    } else {
      let a = info.node.props.dataRef;
      if (a) {
        if (this.findIdx(arr, a.key) !== null) {
          arr.splice(this.findIdx(arr, a.key), 1);
          arr = arr.filter(v => v);
        }
        this.removeParentEle(treeData, arr, valKey);
        arr = this.toDeleteEle(ref, arr).filter(v => v);
        this.setState({ checkedKeys: arr });
      } else {
        let key = info.node.props.eventKey;
        if (this.findIdx(arr, key) !== null) {
          arr.splice(this.findIdx(arr, key), 1);
          arr = arr.filter(v => v);
          this.setState({ checkedKeys: arr });
        }
      }
    }
  };

  removeParentEle = (data, arr, key) => {
    data.map(() => {});
  };

  toAddEle = (data, arr) => {
    data.map(item => {
      if (item.children) {
        if (this.findIdx(arr, item.key) === null) {
          arr.push(item.key);
        }
        this.toAddEle(item.children, arr);
      } else {
        if (this.findIdx(arr, item.key) === null) {
          arr.push(item.key);
        }
      }
    });
    return arr;
  };

  toDeleteEle = (data, arr) => {
    data.map(item => {
      if (item.children) {
        if (this.findIdx(arr, item.key) !== null) {
          arr[this.findIdx(arr, item.key)] = null;
        }
        this.toDeleteEle(item.children, arr);
      } else {
        if (this.findIdx(arr, item.key) !== null) {
          arr[this.findIdx(arr, item.key)] = null;
        }
      }
    });
    return arr;
  };

  // treeFilter = (data, arr, key, parentKey) => {
  //   data.map((item: any) => {
  //     if (item.key !== key && item.children && item.children.length > 0) {
  //       this.treeFilter(item.children, arr, key, item.key);
  //     } else if (item.key === key) {
  //       if (parentKey) {
  //         let a = [];
  //         data.map(val => {
  //           if (arr.indexOf(val.key) != -1) {
  //             a.push(val.key);
  //           }
  //         });
  //         if (a.length === data.length) {
  //           arr.push(parentKey);
  //         } else {
  //           if (this.findIdx(arr, parentKey) !== null) {
  //             arr[this.findIdx(arr, parentKey)] = null;
  //             arr = arr.filter(v => v && v);
  //           }
  //         }
  //         this.setState({ checkedKeys: arr });
  //       }
  //     }
  //   });
  // };

  findIdx = (arr, obj) => {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return i;
      }
    }
    return null;
  };
}
