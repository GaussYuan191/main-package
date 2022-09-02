/**
 * 参数表 新增/修改对话框表单
 */

import React from 'react';
import { Form, Row, Col, Input, Modal } from 'antd';
import { FormValidItem, BizSelect, service } from 'bmtp-trade-base';
import ParamParameterModalController from '../controller/ParamParameterModalController';

const formItemLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
};

class ParamParameterEditForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const paramParameter = this.props.editData;
    return (
      <div>
        <Form colon={false}>
          <Row>
            <Col span={12}>
              <FormValidItem label="参数编码" {...formItemLayout}>
                {getFieldDecorator('paramCode', {
                  initialValue: paramParameter.paramCode
                })(<Input disabled={true} style={{ width: 200 }} />)}
              </FormValidItem>
            </Col>
            <Col span={12}>
              <FormValidItem label="参数类型" {...formItemLayout}>
                {getFieldDecorator('paramType', {
                  initialValue: paramParameter.paramType
                })(
                  <BizSelect
                    style={{ width: 200 }}
                    dropdownMatchSelectWidth={false}
                    baseURL={service.dfasBaseBiz}
                    dataSource="/parameter/type/list"
                    valueKey="paramType"
                    desKey="paramTypeName"
                  />
                )}
              </FormValidItem>
            </Col>
            <Col span={12}>
              <FormValidItem label="参数名称" {...formItemLayout}>
                {getFieldDecorator('paramName', {
                  initialValue: paramParameter.paramName
                })(<Input style={{ width: 200 }} />)}
              </FormValidItem>
            </Col>
            <Col span={12}>
              <FormValidItem label="参数值" {...formItemLayout}>
                {getFieldDecorator('paramValue', {
                  initialValue: paramParameter.paramValue
                })(<Input style={{ width: 200 }} />)}
              </FormValidItem>
            </Col>
            <Col span={12}>
              <FormValidItem label="参数描述" {...formItemLayout}>
                {getFieldDecorator('paramExplain', {
                  initialValue: paramParameter.paramExplain
                })(<Input style={{ width: 200 }} />)}
              </FormValidItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedParamParameterEditForm = Form.create()(ParamParameterEditForm);

export default class ParamParameterModal extends ParamParameterModalController {
  render() {
    return (
      <Modal
        title={`参数表`}
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
        width={1080}
        maskClosable={false}
        visible={this.state.showModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered
      >
        <WrappedParamParameterEditForm
          {...this.props}
          {...this.state}
          wrappedComponentRef={ref => (this.$paramParameterEditForm = ref)}
        />
      </Modal>
    );
  }
}
