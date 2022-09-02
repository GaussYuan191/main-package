/**
 * 角色管理 新增/修改对话框
 * @props editData 表单数据
 * @props orgTreeData 机构树结构数据
 * @props isAdd 是否新增
 * @props loadData 主模块数据加载
 */

import React from 'react';
import { Modal, Form, Row, Col, Input, TreeSelect, message, Select } from 'antd';
import { FormValidItem, BizSelect, service, bizUtils } from 'bmtp-trade-base';
import RoleManageService from '../service/RoleManageService';
import OrgManageService from '../../org-manage/service/OrgManageService';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

class RoleEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.orgManageService = new OrgManageService();
    this.roleManageService = new RoleManageService();
  }

  state = {
    editData: this.props.editData || {},
    orgTreeData: [],
    mutexCode: {},
    roleTypeList: [], //角色类别
    diffRole: []
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getOrgTreeData();
      this.getOrgByRoleCode();
      this.getMutexRole();
      this.getRoleType();
      this.getDifferentRole();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // 获取所有角色列表，根据当前角色过滤出其他可选角色（互斥角色）
  getDifferentRole = () => {
    const { editData } = this.state;
    this.roleManageService.getRoleList({}).then(res => {
      let arr = res.data.filter(item => item.roleCode != editData.roleCode);
      this.setState({ diffRole: arr });
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
          orgTreeData: []
        });
      }

      const orgTreeData = bizUtils.filterTreeData(res.data || [], {
        keyField: 'orgCode',
        titleField: 'orgName'
      });

      this.setState({
        orgTreeData: orgTreeData.rows
      });
    });
  };

  //根据角色编码查询互斥角色

  getMutexRole = roleCode => {
    const { editData } = this.state;
    if (!editData.roleCode) {
      return;
    }
    this.roleManageService.getMutexRole(editData.roleCode).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      //当没有互斥的
      if (!res.data.length) {
        return;
      }

      this.setState(
        () => {
          return {
            mutexCode: {
              value: res.data[0].mutexRoleCode,
              lable: res.data[0].mutexRoleName
            }
          };
        },
        () => {
          this.forceUpdate();
        }
      );
    });
  };

  //获取角色类别
  getRoleType = () => {
    if (this.state.roleTypeList.length) {
      return;
    }
    this.roleManageService.getRoleType().then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      } else {
        this.setState({
          roleTypeList: res.data
        });
      }
    });
  };

  // 根据角色编号查询机构
  getOrgByRoleCode = () => {
    const { editData } = this.state;
    if (!editData.roleCode) {
      return;
    }

    this.roleManageService.getOrgByRoleCode(editData.roleCode).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      this.setState({
        editData: {
          ...editData,
          orgList: res.data[0].orgCode //单选
          // orgList: (res.data || []).map(item => {
          //     return {
          //         value: item.orgCode,
          //         lable: item.orgName
          //     };
          // })
        }
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editData, orgTreeData, mutexCode } = this.state;
    // console.log(editData);
    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormValidItem label="角色编码" {...formItemLayout}>
              {getFieldDecorator('roleCode', {
                initialValue: editData.roleCode
              })(<Input style={{ width: 200 }} disabled placeholder="自动生成" />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="角色名称" {...formItemLayout}>
              {getFieldDecorator('roleName', {
                rules: [
                  { required: true, message: '不能为空' },
                  { pattern: /^.{0,50}$/, message: '允许输入最大长度50' }
                ],
                initialValue: editData.roleName
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="所属机构" {...formItemLayout}>
              {getFieldDecorator('orgCodeList', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: editData.orgList || ''
              })(
                <TreeSelect
                  style={{ width: 200, height: 32 }}
                  treeData={orgTreeData}
                  allowClear={true}
                  multiple={false}
                  searchPlaceholder="请选择"
                  maxTagCount={1}
                  maxTagTextLength={3}
                  treeDefaultExpandAll={!this.props.isAdd}
                  // treeCheckStrictly={true}
                  // filterTreeNode={(input, option) =>
                  //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  // }
                />
              )}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="互斥角色" {...formItemLayout}>
              {getFieldDecorator('mutexRoleCode', {
                // initialValue: editData.mutexRoleCode
                initialValue: mutexCode?.lable
              })(
                // <BizSelect
                //   style={{ width: 200 }}
                //   dropdownMatchSelectWidth={false}
                //   baseURL={service.dfasAuthCenter}
                //   dataSource="/sysRole/list"
                //   method="post"
                //   valueKey="roleCode"
                //   desKey="roleName"
                // />
                <Select style={{ width: 200 }}>
                  {this.state.diffRole.map(item => {
                    return (
                      <Option key={item.roleType} lable={item.roleName} value={item.roleCode}>
                        {item.roleName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormValidItem>
          </Col>
        </Row>
        {/* <Row>
          <Col span={12}>
            <FormValidItem label="角色类型 " {...formItemLayout}>
              {getFieldDecorator('roleType', {
                initialValue: editData?.roleType || ''
              })(
                <Select allowClear style={{ width: 200 }}>
                  {this.state.roleTypeList.map(item => {
                    return (
                      <Option key={item.roleType} lable={item.roleType} value={item.roleType}>
                        {item.roleTypeName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormValidItem>
          </Col>
        </Row> */}

        <Row>
          <Col span={12}>
            <FormValidItem label="备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                rules: [{ pattern: /^.{0,100}$/, message: '允许输入最大长度100' }],
                initialValue: editData.remark
              })(<Input style={{ width: 500 }} />)}
            </FormValidItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedRoleEditForm = Form.create()(RoleEditForm);

export default class RoleEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.roleManageService = new RoleManageService();
  }

  state = {
    showModal: false
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleOk = () => {
    this.$editForm.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.submitInfo(values);
    });
  };
  submitInfo = formData => {
    let funcName = 'addRole';
    // const orgCodeList = formData.orgCodeList.map(item => {
    //     return {
    //         orgCode: item.value
    //     };
    // });

    let orgRoleAddReqVO = [{ orgCode: formData.orgCodeList }];
    delete formData['orgCodeList'];
    if (!this.props.isAdd) {
      funcName = 'modifyRole';
      formData = {
        ...this.props.editData,
        ...formData,
        orgRoleUpdateListReqVO: orgRoleAddReqVO
      };
    } else {
      formData = {
        ...formData,
        orgRoleAddReqVO: orgRoleAddReqVO
      };
    }
    this.roleManageService[funcName](formData).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      this.hideModal();
      this.props.loadData && this.props.loadData();
    });
  };

  render() {
    return (
      <Modal
        title={this.props.isAdd ? '新增角色' : '修改角色'}
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
        width={650}
        maskClosable={false}
        visible={this.state.showModal}
        onOk={this.handleOk}
        onCancel={this.hideModal}
        className="standard-fee-setting-modal"
        centered
      >
        <WrappedRoleEditForm
          {...this.props}
          {...this.state}
          wrappedComponentRef={ref => (this.$editForm = ref)}
        />
      </Modal>
    );
  }
}
