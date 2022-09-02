/**
 * 机构管理 Controller
 * @author daizq
 */

import React from 'react';
import OrgManageService from '../service/OrgManageService';
import { message, Modal } from 'antd';
import { bizUtils } from 'bmtp-trade-base';
import { urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

export default class OrgManageController extends React.Component {
  constructor(props) {
    super(props);
    this.orgManageService = new OrgManageService();
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
    orgTableData: [],
    // 机构新增/修改对话框初始值
    editData: {},
    isAdd: true,
    btnAuth: []
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'org-manage', functionCode, source })
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
    this.getOrgByOrgCode(selectedKeys[0]);
  };

  // 打开新增/修改对话框
  handleShowModal = (record, isAdd) => {
    this.setState({
      editData: record,
      isAdd
    });

    this.$editContent.showModal();
  };

  // 删除机构
  handleRemove = record => {
    Modal.confirm({
      title: '确认',
      centered: true,
      content: '请确认是否删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.orgManageService.removeOrg(record.orgCode).then(res => {
          if (res.code !== '200') {
            message.error(res.msg);
            return;
          }

          this.getOrgTreeData();
        });
      }
    });
  };

  // 查询机构
  getOrgTreeData = () => {
    this.orgManageService.getOrgTreeData().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      if (!res.data || !res.data.length) {
        return this.setState({
          orgTreeData: [],
          orgTableData: []
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
        treeExpandedKeys: this.state.orgName ? orgTreeData.keys : [],
        orgTreeKeys: orgTreeData.keys,
        activeOrgCode: activeRowData.orgCode
      });

      this.getOrgByOrgCode(activeRowData.orgCode);
    });
  };

  // 根据父机构编码查询机构
  getOrgByOrgCode = orgCode => {
    if (!orgCode) {
      return this.setState({
        orgTableData: []
      });
    }

    this.orgManageService
      .getOrgByOrgCode({
        orgCode
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.setState({
          orgTableData: bizUtils.formatTreeTableData(res.data || []).rows
        });
      });
  };
}
