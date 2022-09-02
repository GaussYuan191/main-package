/**
 * 系统菜单功能 对话框
 * @props handleSearch
 * @props service
 */

import React from 'react';
import { Modal, Form, Row, Col, Input, message } from 'antd';
import { FormValidItem, BizSelect, service } from 'bmtp-trade-base';
import SystemMenuService from '../service/SystemMenuService';

const formItemLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
};

class MenuFuncEditForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { menuFuncEditData } = this.props;

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormValidItem label="菜单编号" {...formItemLayout}>
              {getFieldDecorator('menuCode', {
                initialValue: menuFuncEditData.menuCode
              })(<Input style={{ width: 200 }} disabled />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="菜单名称" {...formItemLayout}>
              {getFieldDecorator('menuName', {
                initialValue: menuFuncEditData.menuName
              })(<Input style={{ width: 200 }} disabled />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="功能名称" {...formItemLayout}>
              {getFieldDecorator('funcName', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: menuFuncEditData.funcName
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="功能类型" {...formItemLayout}>
              {getFieldDecorator('funcType', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: menuFuncEditData.funcType
              })(
                <BizSelect
                  style={{ width: 200 }}
                  dropdownMatchSelectWidth={false}
                  baseURL={service.dfasAuthCenter}
                  dataSource="/funcType/list"
                  method="get"
                  valueKey="funcType"
                  desKey="funcTypeName"
                />
              )}
            </FormValidItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormValidItem label="功能请求地址" {...formItemLayout}>
              {getFieldDecorator('funcUrl', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: menuFuncEditData.funcUrl
              })(<Input style={{ width: 525 }} />)}
            </FormValidItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedMenuFuncEditForm = Form.create()(MenuFuncEditForm);

export default class MenuFuncEditModal extends React.Component {
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

      this.submitMenuFunc(values);
    });
  };

  submitMenuFunc = formData => {
    let funcName = 'addMenuFunc';
    if (!this.props.isAdd) {
      funcName = 'modifyMenuFunc';
      formData = {
        ...this.props.menuFuncRowData,
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
        title={this.props.isAdd ? '新增菜单功能' : '修改菜单功能'}
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
        width={700}
        maskClosable={false}
        visible={this.state.showModal}
        onOk={this.handleOk}
        onCancel={this.hideModal}
        className="standard-fee-setting-modal"
        centered
      >
        <WrappedMenuFuncEditForm
          {...this.props}
          wrappedComponentRef={ref => (this.$menuEditForm = ref)}
        />
      </Modal>
    );
  }
}
