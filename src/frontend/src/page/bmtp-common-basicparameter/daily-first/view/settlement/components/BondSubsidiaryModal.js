import React, { PureComponent } from 'react';
import { Input, Form, Row, Col, TimePicker } from 'antd';
// import { NormalForm, setFieldsObject } from 'yss-biz';
import { Select } from 'antd';
// import moment from 'moment';

const { Option } = Select;
class ModalMessage extends PureComponent {
  constructor() {
    super();
    this.state = {
      flag: -1
    };
  }

  render() {
    // const disabled = false;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };

    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <>
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="编号">
                {getFieldDecorator('index')(<Input disabled={true} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="日初业务处理项">
                {getFieldDecorator('jobName')(<Input disabled={true} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态">
                {getFieldDecorator('jobStatus')(
                  <Select disabled={true}>
                    <Option value="0">待执行</Option>
                    <Option value="1">执行中</Option>
                    <Option value="2">执行成功</Option>
                    <Option value="3">执行失败</Option>
                    <Option value="4">执行警告</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="创建人">
                {getFieldDecorator('updateUserName')(<Input disabled={true} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="创建时间">
                {getFieldDecorator('updateTime')(<Input disabled={true} />)}
              </Form.Item>
            </Col>
          </Row>

          {/* 分割线 */}
          <div
            className="u-hr"
            style={{ float: 'left', width: '100%', clear: 'both', marginBottom: '8px' }}
          ></div>

          <Row gutter={24}>
            {/* <Col span={8}>
              <Form.Item label="计划类型">
                {getFieldDecorator('jobTypes', {
                  initialValue: '0',
                  rules: [{ required: true, message: '请选择计划类型' }]
                })(
                  <Select>
                    <Option value="0">按天</Option>
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item label="每天重复">
                {getFieldDecorator('repeatType', {
                  rules: [{ required: true, message: '请选择执行方式' }]
                })(
                  <Select onChange={this.timeChange}>
                    <Option value="1">执行一次</Option>
                    <Option value="2">执行多次</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            {this.state.flag == 1 ? (
              <Col span={8}>
                <Form.Item label="执行时间">
                  {getFieldDecorator('stime', {
                    rules: [{ required: true, message: '请选择执行时间' }]
                  })(<TimePicker format="HH:mm" />)}
                </Form.Item>
              </Col>
            ) : this.state.flag == 2 ? (
              <Col span={8}>
                <Form.Item label="每隔">
                  <Input.Group compact>
                    {getFieldDecorator('timeNum', {
                      rules: [{ required: true, message: '请输入' }]
                    })(<Input type="text" style={{ width: '50%' }}></Input>)}
                    {getFieldDecorator('timeType', {
                      rules: [{ required: true, message: '请选择' }]
                    })(
                      <Select style={{ width: '50%' }}>
                        <Option value="hour">小时</Option>
                        <Option value="minute">分钟</Option>
                        <Option value="second">秒</Option>
                      </Select>
                    )}
                  </Input.Group>
                </Form.Item>
              </Col>
            ) : null}
          </Row>
        </Form>
      </>
    );
  }

  componentWillReceiveProps(props) {
    if (props.rowed !== this.props.rowed) {
      const data = props.rowed[0] || this.props.rowed[0];
      this.setState({ flag: data.repeatType });
    }
  }
  componentDidMount() {
    //加载时，根据repeatType不同设置时间字段
    const data = this.props.rowed[0];
    this.setState({ flag: data.repeatType });
  }

  timeChange = value => {
    this.setState({ flag: value });
  };
}
const ModalForm = Form.create({ name: 'form_in_modal' })(ModalMessage);
export default ModalForm;
