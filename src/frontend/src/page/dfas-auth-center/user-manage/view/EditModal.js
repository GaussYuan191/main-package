/**
 * 用户管理 新增/修改对话框
 * @props editData 表单数据
 * @props orgTreeData 机构树结构数据
 * @props isAdd 是否新增
 * @props loadData 主模块数据加载
 */

import React from 'react';
import { Col, Form, Input, message, Modal, Row, TreeSelect } from 'antd';
import { DictSelect, FormValidItem } from 'bmtp-trade-base';
import UserManageService from '../service/UserManageService';
import { RegExConst, ValidatorFactory } from 'yss-biz';
const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

class EditForm extends React.Component {
  state = {
    editData: this.props.editData,
    isAdd: this.props.isAdd
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editData } = this.state;
    const that = this;

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormValidItem label="用户编码" {...formItemLayout}>
              {getFieldDecorator('userCode', {
                rules: [
                  { required: true, message: '不能为空' },
                  { validator: ValidatorFactory.lengthValidator(50) }
                ],
                initialValue: editData.userCode
              })(<Input style={{ width: 200 }} disabled={!this.props.isAdd} />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="用户姓名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: '不能为空' },
                  { validator: ValidatorFactory.lengthValidator(50) }
                ],
                initialValue: editData.userName
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="用户密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  { required: this.props.isAdd, message: '不能为空' },
                  {
                    validator: ValidatorFactory.formatValidator(
                      RegExConst.PASSWORD,
                      '必须包含字母、数字，长度6~18位'
                    )
                  }
                ],
                initialValue: editData.password
              })(<Input.Password style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="确认密码" {...formItemLayout}>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    required:
                      this.props.isAdd ||
                      (!this.props.isAdd && this.props.form.getFieldValue('password')),
                    message: '不能为空'
                  },
                  {
                    validator: (rule, value) => {
                      let pwd = that.props.form.getFieldValue('password');
                      if (pwd && value && pwd !== value) {
                        return Promise.reject('两次输入密码不一致！');
                      }
                      return Promise.resolve();
                    }
                  }
                ],
                initialValue: editData.confirmPassword
              })(<Input.Password style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormValidItem label="用户类型" {...formItemLayout}>
              {getFieldDecorator('userType', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: editData.userType
              })(<DictSelect style={{ width: 200 }} dict="1000031" />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="所属机构" {...formItemLayout}>
              {getFieldDecorator('orgCodeList', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: (editData.orgList || []).map(item => {
                  return {
                    value: item.orgCode,
                    lable: item.orgName
                  };
                })
              })(
                <TreeSelect
                  style={{ width: 200, height: 32 }}
                  treeData={this.props.orgTreeData}
                  allowClear={true}
                  treeCheckable={true}
                  searchPlaceholder="请选择"
                  maxTagCount={1}
                  maxTagTextLength={3}
                  treeDefaultExpandAll={!this.props.isAdd}
                  treeCheckStrictly={true}
                  filterTreeNode={(input, option) =>
                    option.props.title.toLowerCase().includes(input.toLowerCase())
                  }
                />
              )}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="在职状态" {...formItemLayout}>
              {getFieldDecorator('userStatus', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: editData.userStatus
              })(<DictSelect style={{ width: 200 }} dict="1000032" />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="邮箱" {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    validator: ValidatorFactory.formatValidator(
                      RegExConst.EMAIL,
                      '请输入正确的邮箱地址'
                    )
                  },
                  { validator: ValidatorFactory.lengthValidator(50) }
                ],
                initialValue: editData.email
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="联系方式" {...formItemLayout}>
              {getFieldDecorator('contactInfo', {
                rules: [
                  {
                    validator: ValidatorFactory.formatValidator(
                      RegExConst.CONTACT_INFO,
                      '请输入正确的电话或手机号'
                    )
                  },
                  { validator: ValidatorFactory.lengthValidator(50) }
                ],
                initialValue: editData.contactInfo
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                rules: [{ validator: ValidatorFactory.lengthValidator(100) }],
                initialValue: editData.remark
              })(<Input style={{ width: 500 }} />)}
            </FormValidItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create()(EditForm);

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.uerManageService = new UserManageService();
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
    let funcName = 'addUser';
    formData = {
      ...formData,
      orgCodeList: formData.orgCodeList.map(item => {
        return item.value;
      })
    };

    if (!this.props.isAdd) {
      funcName = 'modifyUser';
      formData = {
        ...this.props.editData,
        ...formData
      };
    }

    this.uerManageService[funcName](formData).then(res => {
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
        title={this.props.isAdd ? '新增用户' : '修改用户'}
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
        <WrappedEditForm {...this.props} wrappedComponentRef={ref => (this.$editForm = ref)} />
      </Modal>
    );
  }
}
