/**
 * 角色管理 Controller
 * @author daizq
 */

import React from 'react';
import RoleManageService from '../service/RoleManageService';
import { message, Modal, Icon } from 'antd';
import { bizUtils } from 'bmtp-trade-base';
import { cloneDeep, isEqual } from 'lodash';
import { urlHashToJson, filterWithAuth } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
export default class RoleManageController extends React.Component {
  constructor(props) {
    super(props);

    this.roleManageService = new RoleManageService();

    // 控制选择
    this.checkAllMap = {
      type_all: {
        all: new Set(),
        checked: new Set()
      }
    };
  }

  state = {
    // 查询条件 角色名称
    roleName: '',
    // 角色树数据
    roleTreeData: [],
    // 角色树节点所有key
    roleTreeKeys: [],
    // 控制展开的角色树节点
    treeExpandedKeys: [],
    // 当前选中的角色编号
    treeActiveCode: '',
    // 角色新增/修改对话框初始值
    editData: {},
    // 是否是新增对话框
    isAdd: true,
    // 菜单权限查询条件
    searchFormData: {},
    // 菜单权限树
    oldMenuAuthTreeData: [],
    menuAuthTreeData: [],
    // 菜单权限树节点所有key
    menuAuthTreeKeys: [],
    // 控制展开的菜单权限树节点
    expandedRowKeys: [],
    // 编辑状态
    editing: false,
    // 功能类型
    funcTypeList: [],
    // 按钮权限
    btnAuth: []
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'role-manage', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    this.timer = setTimeout(() => {
      this.getRoleTreeData();
      this.getFuncType();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // 角色名称模糊查询
  handleSearch = roleName => {
    this.setState({
      roleName: roleName.trim()
    });

    this.getRoleTreeData();
  };

  // 角色树展开事件
  onTreeExpand = treeExpandedKeys => {
    this.setState({
      treeExpandedKeys
    });
  };

  // 角色树展开收起切换
  handleToggleTree = () => {
    this.setState({
      treeExpandedKeys: this.state.treeExpandedKeys.length ? [] : this.state.roleTreeKeys
    });
  };

  // 检查是否是编辑状态
  isEditing = () => {
    if (this.state.editing) {
      message.warning('正在编辑！');
      return true;
    }

    return false;
  };

  // 点击左侧树节点
  handleTreeSelect = (selectedKeys, e) => {
    if (!e.node.props.roleCode || this.isEditing()) {
      return;
    }

    this.setState({
      treeActiveCode: selectedKeys[0],
      menuAuthTreeData: []
    });

    this.getMenuTreeData(selectedKeys[0]);
  };

  // 打开新增/修改对话框
  handleShowModal = (record, isAdd) => {
    if (this.isEditing()) {
      return;
    }

    this.setState({
      editData: record,
      isAdd
    });

    this.$roleEditContent.showModal();
  };

  // 删除角色
  handleRemoveRole = node => {
    if (this.isEditing()) {
      return;
    }

    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.roleManageService
          .removeRole({
            roleCode: node.roleCode
          })
          .then(res => {
            if (res.code !== '200') {
              message.error(res.msg);
              return;
            }

            this.getRoleTreeData();
          });
      }
    });
  };

  // 查询菜单功能权限
  handleSearchMenuAuth = searchFormData => {
    this.setState({ searchFormData });

    this.getMenuTreeData(this.state.treeActiveCode, searchFormData);
  };

  // 角色菜单编辑保存
  handleToggleEdit = () => {
    if (!this.state.editing) {
      return this.setState({
        editing: true,
        expandedRowKeys: this.state.menuAuthTreeKeys
      });
    }

    // 注意：grantFlag 无权限时为 null
    if (isEqual(this.state.oldMenuAuthTreeData, this.state.menuAuthTreeData)) {
      return message.warning('当前页面未修改任何内容！');
    }

    this.saveRoleMenuFuncData();
  };

  // 取消编辑
  handleCancelEdit = () => {
    this.setState({
      editing: false,
      menuAuthTreeData: cloneDeep(this.state.oldMenuAuthTreeData)
    });
  };

  // 树形表格节点展开
  onTreeTableExpand = (expanded, record) => {
    if (this.isEditing()) {
      return;
    }

    expanded
      ? this.setState(prevState => ({
          expandedRowKeys: [...prevState.expandedRowKeys, record.key]
        }))
      : this.setState(prevState => {
          const expandedRowKeys = prevState.expandedRowKeys.filter(v => {
            return v !== record.key;
          });
          return {
            expandedRowKeys
          };
        });
  };

  // 角色菜单树表格展开收起切换
  handleToggleTable = () => {
    if (this.isEditing()) {
      return;
    }

    this.setState({
      expandedRowKeys: this.state.expandedRowKeys.length ? [] : this.state.menuAuthTreeKeys
    });
  };

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
              {node.roleName || node.roleCode}
              <span className="tree-node-tools">
                {filterWithAuth(buttonList, this.state.btnAuth)}
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
          titleDom: <span className="org-tree-node">{node.orgName || node.orgCode}</span>
        };
  };

  // 查询机构角色树
  getRoleTreeData = () => {
    this.roleManageService.getRoleTreeData().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      const treeData = bizUtils.filterTreeData(res.data || [], {
        treeNodeRender: this.treeNodeRender,
        filterValue: this.state.roleName
      });
      const treeActiveCode = treeData.keys[treeData.keys.findIndex(v => v.includes('-R'))];

      this.setState(
        {
          roleTreeData: treeData.rows,
          roleTreeKeys: treeData.keys,
          treeExpandedKeys: treeData.keys,
          treeActiveCode
        },
        () => {
          this.getMenuTreeData();
        }
      );
    });
  };

  // 查询条件是否为空
  isEmptyFilterValue = searchFormData => {
    let flag = false;

    Object.keys(searchFormData).forEach(key => {
      flag = flag || searchFormData[key];
    });

    return !flag;
  };

  // 获取符合查询条件数据的 key
  getFilterKeys = (resData, searchFormData) => {
    const { menuName = '', hasAuth } = searchFormData;

    // 查询条件为空，菜单名为空 && 已授权 && 未授权
    if (this.isEmptyFilterValue(searchFormData)) {
      return [];
    }

    const flattenData = bizUtils.flattenTreeData(resData, {
      keyField: 'menuCode'
    });
    let filterKeys = flattenData.filter(item => {
      item.menuName = item.menuName || '';

      if (!hasAuth) {
        return item.menuName.includes(menuName);
      }

      item.menuFuncList = item.menuFuncList || [];

      return (
        item.menuFuncList.find(v => {
          return Number(v.grantFlag) === Number(hasAuth);
        }) && item.menuName.includes(menuName)
      );
    });

    return filterKeys.length
      ? Array.from(
          new Set(
            filterKeys
              .map(item => {
                return item.fullKey;
              })
              .join('#')
              .split('#')
          )
        )
      : [];
  };

  // 查询角色菜单功能树
  getMenuTreeData = (treeActiveCode, searchFormData) => {
    treeActiveCode = treeActiveCode || this.state.treeActiveCode;
    if (!treeActiveCode) {
      return this.setState({
        menuAuthTreeData: [],
        oldMenuAuthTreeData: [],
        menuAuthTreeKeys: [],
        expandedRowKeys: []
      });
    }

    const roleCode = treeActiveCode.split('-')[1];
    searchFormData = searchFormData || this.state.searchFormData;

    this.roleManageService
      .getRoleMenuFuncTreeData({
        roleCode
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        res.data = res.data || [];
        const filterKeys = this.getFilterKeys(res.data, searchFormData);

        const treeTableData =
          this.isEmptyFilterValue(searchFormData) || filterKeys.length
            ? bizUtils.formatTreeTableData(res.data, {
                keyField: 'menuCode',
                filterKeys
              })
            : {
                rows: [],
                keys: []
              };

        this.setState({
          menuAuthTreeData: cloneDeep(treeTableData.rows),
          oldMenuAuthTreeData: cloneDeep(treeTableData.rows),
          menuAuthTreeKeys: treeTableData.keys,
          expandedRowKeys: treeTableData.keys
        });
      });
  };

  /**
   * @returns 返回因查询条件未显示到页面上的有权限的数据
   */
  getHasAuthMenuData = async () => {
    const { treeActiveCode } = this.state;
    const roleCode = treeActiveCode.split('-')[1];
    let searchFormData = {};
    let hasAuthMenu = {};
    // 查询有权限的数据
    searchFormData.hasAuth = '1';
    searchFormData.menuName = undefined;
    return this.roleManageService
      .getRoleMenuFuncTreeData({
        roleCode
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }
        res.data = res.data || [];
        const filterKeys = this.getFilterKeys(res.data, searchFormData);
        const authTreeTableData =
          this.isEmptyFilterValue(searchFormData) || filterKeys.length
            ? bizUtils.formatTreeTableData(res.data, {
                keyField: 'menuCode',
                filterKeys
              })
            : {
                rows: [],
                keys: []
              };

        hasAuthMenu = bizUtils.flattenTreeData(authTreeTableData.rows).filter(item => {
          return item.menuFuncList.length && this.isMenuFuncListHasCheckTrue(item.menuFuncList); //新增判断
        });
        // 获取子项都是有权限的菜单项
        hasAuthMenu = hasAuthMenu.filter(MainMenu => {
          let flag = (MainMenu.menuFuncList || []).some(item => {
            if (item.grantFlag == 0) return true;
          });
          if (!flag) return MainMenu;
        });
        return hasAuthMenu;
      });
  };

  // 查询功能类型
  getFuncType = () => {
    this.roleManageService.getFuncType().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      let funcTypeList = res.data || [];

      // 基础功能列
      const basicFuncTypeNameList = ['查询', '新增', '修改', '删除', '审核', '反审核', '导出'];
      funcTypeList = funcTypeList.filter(item => {
        return basicFuncTypeNameList.includes(item.funcTypeName);
      });
      // const basicFuncTypeNameList = funcTypeList.map((item) => item.funcTypeName);

      funcTypeList.forEach(item => {
        this.checkAllMap['type_' + item.funcType] = {
          all: new Set(),
          checked: new Set()
        };
      });

      // 其他列
      this.checkAllMap['type_other'] = {
        all: new Set(),
        checked: new Set(),
        indeterminate: new Set()
      };

      this.setState({
        funcTypeList,
        basicFuncTypeNameList
      });
    });
  };

  // 保存角色菜单功能权限
  saveRoleMenuFuncData = async () => {
    const roleCode = this.state.treeActiveCode.split('-')[1];
    let flattenData = bizUtils.flattenTreeData(this.state.menuAuthTreeData).filter(item => {
      return item.menuFuncList.length && this.isMenuFuncListHasCheckTrue(item.menuFuncList); //新增判断
    });
    const { searchFormData } = this.state;
    // 获取未显示到页面上的有权限的数据
    let authData = await this.getHasAuthMenuData();
    // 如果查询条件是查无权限的数据时，编辑保存时应加上之前没有出现在编辑页面上的有权限的数据
    if (searchFormData.hasAuth == '0') {
      flattenData = flattenData.concat(authData);
    }
    this.roleManageService
      .saveRoleMenuFuncData({
        roleCode,
        reqListVO: flattenData
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.setState({
          editing: false
        });
        this.getMenuTreeData();
      });
  };

  //判断menuFuncList的grantFlag是否等于1
  isMenuFuncListHasCheckTrue = array => {
    var isCheck = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].grantFlag == '1') {
        isCheck = true;
        break;
      }
    }
    return isCheck;
  };
}
