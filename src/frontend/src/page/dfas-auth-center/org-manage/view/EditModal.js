/**
 * 机构管理 对话框
 * @props handleSearch
 * @props service
 */

import React from 'react';
import { Modal, Form, Row, Col, Input, TreeSelect, message } from 'antd';
import { FormValidItem } from 'bmtp-trade-base';
import OrgManageService from '../service/OrgManageService';
import { ValidatorFactory } from 'yss-biz';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};
class EditForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { editData } = this.props;

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormValidItem label="机构代码" {...formItemLayout}>
              {getFieldDecorator('orgCode', {
                initialValue: editData.orgCode
              })(<Input style={{ width: 200 }} disabled />)}
            </FormValidItem>
          </Col>

          <Col span={12}>
            <FormValidItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('orgName', {
                rules: [
                  { required: true, message: '不能为空' },
                  { validator: ValidatorFactory.lengthValidator(50) }
                ],
                initialValue: editData.orgName
              })(<Input style={{ width: 200 }} />)}
            </FormValidItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormValidItem label="上级机构" {...formItemLayout}>
              {getFieldDecorator('parentOrgCode', {
                initialValue: editData.parentOrgCode
              })(
                <TreeSelect
                  style={{ width: 200 }}
                  treeData={this.props.orgTreeData}
                  allowClear={true}
                  showSearch={true}
                  filterTreeNode={(input, option) =>
                    option.props.title.toLowerCase().includes(input.toLowerCase())
                  }
                  treeDefaultExpandAll={!this.props.isAdd}
                />
              )}
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

    this.orgManageService = new OrgManageService();
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
    let funcName = 'addOrg';
    if (!this.props.isAdd) {
      funcName = 'modifyOrg';
      formData = {
        ...this.props.editData,
        ...formData
      };
    }

    this.orgManageService[funcName](formData).then(res => {
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
        title={this.props.isAdd ? '新增机构' : '修改机构'}
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
