/**
 * 用户管理 Controller
 * @author daizq
 */

import React from 'react';
import UserManageService from '../service/UserManageService';
import { message, Modal } from 'antd';
import { bizUtils } from 'bmtp-trade-base';
import { urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
export default class UserManageController extends React.Component {
  constructor(props) {
    super(props);

    this.uerManageService = new UserManageService();
  }

  state = {
    // 查询条件 机构名称
    orgName: '',
    // 左侧机构树数据
    orgTreeData: [],
    orgTreeKeys: [],
    // 控制展开的树节点
    treeExpandedKeys: [],
    // 当前选中的左侧机构编号
    activeOrgCode: '',
    // 机构树形表格数据
    userTableData: [],
    userTotal: 0,
    // 机构新增/修改对话框初始值
    editData: {},
    isAdd: true,
    // 按钮权限
    btnAuth: []
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'user-manage', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    this.timer = setTimeout(() => {
      this.getOrgTreeData();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleSearch = orgName => {
    this.setState({
      orgName: orgName.trim()
    });

    this.getOrgTreeData();
  };

  onTreeExpand = treeExpandedKeys => {
    this.setState({
      treeExpandedKeys
    });
  };

  handleToggleTree = () => {
    this.setState({
      treeExpandedKeys: this.state.treeExpandedKeys.length ? [] : this.state.orgTreeKeys
    });
  };

  handleTreeSelect = selectedKeys => {
    this.setState({
      activeOrgCode: selectedKeys[0]
    });
    this.getUserByOrgCode(selectedKeys[0]);
  };

  // 打开新增/修改对话框
  handleShowModal = (record, isAdd) => {
    record.orgList = record.orgList || [];

    this.setState({
      editData: record,
      isAdd
    });

    this.$editContent.showModal();
  };

  // 删除用户
  handleRemove = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.uerManageService.removeUser(record.id).then(res => {
          if (res.code !== '200') {
            message.error(res.msg);
            return;
          }

          this.getUserByOrgCode();
        });
      }
    });
  };

  // 用户锁定
  lockUser = record => {
    this.uerManageService.lockUser(record.userCode).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      message.success('用户已锁定！');
      this.getUserByOrgCode();
    });
  };

  // 用户解锁
  unlockUser = record => {
    this.uerManageService.unlockUser(record.userCode).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      message.success('用户已解锁！');
      this.getUserByOrgCode();
    });
  };

  // 重置密码
  handleResetPwd = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否重置为默认初始密码？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.uerManageService.resetUserPwd(record.userCode).then(res => {
          message[res.code !== '200' ? 'error' : 'success'](res.msg);
        });
      }
    });
  };
  //刷新权限
  handRefreshAuth = record => {
    let param = {
      userCodeList: [record.userCode]
    };

    this.uerManageService.refreshAuth(param).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      message.success(res.msg);
    });
  };
  // 用户注销
  handleLogOff = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: `请确认是否注销【${record.userName || record.userCode}】用户？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.uerManageService.userLogOff(record.userCode).then(res => {
          if (res.code !== '200') {
            message.error(res.msg || '注销失败');
            return;
          }

          message.success(res.msg || '修改用户状态为注销成功');
          this.getUserByOrgCode();
        });
      }
    });
  };

  // 查询机构
  getOrgTreeData = () => {
    this.uerManageService.getOrgTreeData().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      if (!res.data || !res.data.length) {
        return this.setState({
          orgTreeData: [],
          userTableData: [],
          userTotal: 0
        });
      }

      const orgTreeData = bizUtils.filterTreeData(res.data || [], {
        keyField: 'orgCode',
        titleField: 'orgName',
        filterValue: this.state.orgName
      });
      const activeRowData =
        bizUtils.flattenTreeData(orgTreeData.rows).find(item => {
          return item.key === this.state.activeOrgCode;
        }) ||
        orgTreeData.rows[0] ||
        {};

      this.setState({
        orgTreeData: orgTreeData.rows,
        orgTreeKeys: orgTreeData.keys,
        treeExpandedKeys: orgTreeData.keys,
        activeOrgCode: activeRowData.orgCode
      });

      this.getUserByOrgCode(activeRowData.orgCode);
    });
  };

  // 根据机构查询用户
  getUserByOrgCode = (orgCode, page = 1, pageSize = 20) => {
    orgCode = orgCode || this.state.activeOrgCode;

    if (!orgCode) {
      return this.setState({
        userTableData: [],
        userTotal: 0
      });
    }

    const fromData = this.$searchForm?.props?.form?.getFieldsValue() || {};

    this.uerManageService
      .getUserByOrgCode({
        orgCode,
        reqPageNum: page || this.$userTable?.state?.reqPageNum,
        reqPageSize: pageSize || this.$userTable?.state?.reqPageSize,
        ...fromData
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.setState({
          userTableData: (res.data.list || []).map((item, index) => {
            return {
              ...item,
              key: index + 1
            };
          }),
          userTotal: res.data.todal
        });
      });
  };
}
