/**
 * 系统菜单管理 Controller
 * @author daizq
 */

import React from 'react';
import SystemMenuService from '../service/SystemMenuService';
import { message, Modal } from 'antd';
import { bizUtils } from 'bmtp-trade-base';

export default class SystemMenuController extends React.Component {
  constructor(props) {
    super(props);

    this.systemMenuService = new SystemMenuService();
  }

  state = {
    // 查询条件 菜单名称
    searchMenuName: '',
    // 菜单树数据
    menuTreeData: [],
    // 菜单树节点key
    menuTreeKeys: [],
    // 控制展开的树节点
    treeExpandedKeys: [],
    // 当前选中的左侧菜单编号
    activeMenuCode: '',
    // 菜单树形表格数据
    menuTableData: [],
    // 菜单树形表格keys
    menuTableKeys: [],
    // 选中菜单行数据
    menuRowData: {},

    // 菜单新增/修改对话框初始值
    menuEditData: {},
    // 菜单功能数据
    menuFuncList: [],
    // 选中菜单功能行数据
    menuFuncRowData: {},
    // 菜单功能新增/修改对话框初始值
    menuFuncEditData: {},
    isAdd: true
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getSystemMenuTreeData();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleSearch = searchMenuName => {
    this.setState({
      searchMenuName: searchMenuName.trim()
    });

    this.getSystemMenuTreeData();
  };

  onTreeExpand = treeExpandedKeys => {
    this.setState({
      treeExpandedKeys
    });
  };

  handleToggleTree = () => {
    this.setState({
      treeExpandedKeys: this.state.treeExpandedKeys.length ? [] : this.state.menuTreeKeys
    });
  };

  handleTreeSelect = selectedKeys => {
    this.setState({
      activeMenuCode: selectedKeys[0]
    });
    this.getMenuByParMenuCode(selectedKeys[0]);
  };

  onClickMenuRow = (event, record) => {
    this.setState({
      menuRowData: record
    });

    this.getMenuFunc({
      menuCode: record.menuCode
    });
  };

  // 打开菜单新增/修改对话框
  handleShowMenuModal = (record, isAdd) => {
    this.setState({
      menuEditData: record,
      isAdd
    });

    this.$menuEditModal.showModal();
  };

  // 删除菜单
  handleMenuRemove = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.systemMenuService.removeSystemMenu(record.menuCode).then(res => {
          if (res.code !== '200') {
            message.error(res.msg);
            return;
          }

          this.getSystemMenuTreeData();
        });
      }
    });
  };

  onClickMenuFuncRow = (event, record) => {
    this.setState({
      menuFuncRowData: record
    });
  };

  // 打开菜单功能新增/修改对话框
  handleShowMenuFuncModal = (record, isAdd) => {
    if (!Object.keys(this.state.menuRowData).length) {
      return message.error('未选择需要操作的菜单！');
    }

    this.setState({
      menuFuncEditData: {
        ...this.state.menuRowData,
        ...record
      },
      isAdd
    });

    this.$menuFuncEditModal.showModal();
  };

  // 删除菜单功能
  handleMenuFuncRemove = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.systemMenuService.removeMenuFunc(record.id).then(res => {
          if (res.code !== '200') {
            message.error(res.msg);
            return;
          }

          this.getMenuFunc({
            menuCode: this.state.menuRowData.menuCode
          });
        });
      }
    });
  };

  // 查询系统菜单
  getSystemMenuTreeData = () => {
    this.systemMenuService.getSystemMenuTreeData().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      if (!res.data || !res.data.length) {
        return this.setState({
          menuTreeData: [],
          menuTableData: [],
          menuFuncList: []
        });
      }

      const treeData = bizUtils.filterTreeData(res.data || [], {
        keyField: 'menuCode',
        titleField: 'menuName',
        filterValue: this.state.searchMenuName
      });
      const activeRowData =
        bizUtils.flattenTreeData(treeData.rows).find(item => {
          return item.key === this.state.activeMenuCode;
        }) ||
        treeData.rows[0] ||
        {};

      this.setState({
        menuTreeData: treeData.rows,
        menuTreeKeys: treeData.keys,
        treeExpandedKeys: this.state.searchMenuName ? treeData.keys : [],
        activeMenuCode: activeRowData.menuCode
      });

      this.getMenuByParMenuCode(activeRowData.menuCode);
    });
  };

  // 根据父菜单编码查询菜单
  getMenuByParMenuCode = parentMenuCode => {
    if (!parentMenuCode) {
      return this.setState({
        menuTableData: [],
        menuFuncList: []
      });
    }

    this.systemMenuService.getMenuByParMenuCode(parentMenuCode).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      if (!res.data || !res.data.length) {
        return this.setState({
          menuTableData: [],
          menuFuncList: []
        });
      }

      const treeTableData = bizUtils.formatTreeTableData(res.data || []);
      const activeRowData =
        bizUtils.flattenTreeData(treeTableData.rows).find(item => {
          return item.key === this.$menuTable.state.activeKeys;
        }) ||
        treeTableData.rows[0] ||
        {};
      this.setState({
        menuRowData: activeRowData,
        menuTableData: treeTableData.rows,
        menuTableKeys: treeTableData.keys
      });

      this.getMenuFunc({
        menuCode: activeRowData.menuCode
      });
    });
  };

  // 查询菜单功能
  getMenuFunc = menuInfo => {
    this.systemMenuService.getMenuFunc(menuInfo).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      this.setState({
        menuFuncList: (res.data || []).map((item, index) => {
          return {
            ...item,
            key: index + 1 + ''
          };
        })
      });
    });
  };

  changeMenuTable = (node, checkNodes) => {
    console.log(checkNodes);
    // console.log(s)
    // let keys=checkNodes.children.map(item=>item.key);
    // // this.setState({
    // //   menuTableKeys:keys
    // // })
  };
}
