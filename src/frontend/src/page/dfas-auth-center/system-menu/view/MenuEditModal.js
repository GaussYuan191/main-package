/**
 * 系统菜单管理 对话框
 * @props handleSearch
 * @props service
 */

import React from 'react';
import { Modal, Form, Row, Col, Input, TreeSelect, message } from 'antd';
import { FormValidItem, DictSelect } from 'bmtp-trade-base';
import SystemMenuService from '../service/SystemMenuService';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

class MenuEditForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { menuEditData } = this.props;

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormValidItem label="菜单编号" {...formItemLayout}>
              {getFieldDecorator('menuCode', {
                initialValue: menuEditData.menuCode
              })(<Input style={{ width: 200 }} disabled />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="菜单名称" {...formItemLayout}>
              {getFieldDecorator('menuName', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: menuEditData.menuName
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <FormValidItem
            label="菜单URL"
            labelCol={{ sm: { span: 3 } }}
            wrapperCol={{ sm: { span: 21 } }}
          >
            {getFieldDecorator('menuAddress', {
              initialValue: menuEditData.menuAddress
            })(<Input style={{ width: 500 }} />)}
          </FormValidItem>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="菜单图标" {...formItemLayout}>
              {getFieldDecorator('menuIcon', {
                rules: [],
                initialValue: menuEditData.menuIcon
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="上级菜单" {...formItemLayout}>
              {getFieldDecorator('parentMenuCode', {
                rules: [],
                initialValue: menuEditData.parentMenuCode
              })(
                <TreeSelect
                  style={{ width: 200 }}
                  treeData={this.props.menuTreeData}
                  allowClear
                  treeDefaultExpandAll={!this.props.isAdd}
                />
              )}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="菜单属性" {...formItemLayout}>
              {getFieldDecorator('tabFlag', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: menuEditData.tabFlag
              })(<DictSelect style={{ width: 200 }} dict="1000030" />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="菜单描述" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: menuEditData.remark
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedMenuEditForm = Form.create()(MenuEditForm);

export default class MenuEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.systemMenuService = new SystemMenuService();
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
    this.$menuEditForm.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.submitSystemMenu(values);
    });
  };

  submitSystemMenu = formData => {
    let funcName = 'addSystemMenu';
    if (!this.props.isAdd) {
      funcName = 'modifySystemMenu';
      formData = {
        ...this.props.menuRowData,
        ...formData
      };
    }

    this.systemMenuService[funcName](formData).then(res => {
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
        title={this.props.isAdd ? '新增菜单' : '修改菜单'}
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
        <WrappedMenuEditForm
          {...this.props}
          wrappedComponentRef={ref => (this.$menuEditForm = ref)}
        />
      </Modal>
    );
  }
}
