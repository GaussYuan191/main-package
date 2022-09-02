import React, { PureComponent, Fragment } from 'react';

import { Form, Input, Radio } from 'antd';

class TimeLog extends PureComponent {
  componentDidMount() {}

  componentWillReceiveProps(props) {
    if (props.serverPath !== this.props.serverPath) {
      if (props.serverPath) {
        clearInterval(this.time);
        this.time = setInterval(() => {
          const { asyncHttpTimeLogData } = this.props;
          asyncHttpTimeLogData({ serverPath: props.serverPath, size: 100 }).then(() => {
            const logContentDiv = document.getElementById('timeLogContent');
            if (logContentDiv && logContentDiv.scrollHeight) {
              logContentDiv.scrollTop = logContentDiv.scrollHeight;
            } else {
              clearInterval(this.time);
            }
          });
        }, 1000);
      }
    }
  }

  onChange = e => {
    const { saveChecked } = this.props;
    saveChecked({ checked: e.target.value });
    if (e.target.value) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { asyncHttpTimeLogData, serverPath } = this.props;
          const size = Number(values['size']);
          const intervalTime = Number(values['intervalTime']);
          this.time = setInterval(() => {
            asyncHttpTimeLogData({ serverPath, size });
          }, intervalTime);
        }
      });
    } else {
      clearInterval(this.time);
    }
  };

  componentWillUnmount() {
    clearInterval(this.time);
    this.time = null;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { logContent, checked } = this.props;
    return (
      <Fragment>
        {logContent && (
          <div className="time-log">
            <Form className="log-header" layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item label="显示日志条数">
                {getFieldDecorator('size', {
                  rules: [{ pattern: /^\d+$/, message: '只能输入正整数' }],
                  initialValue: '100'
                })(<Input type="text" />)}
                <span className="log-text">&nbsp;条</span>
              </Form.Item>

              <Form.Item label=" 刷新间隔">
                {getFieldDecorator('intervalTime', {
                  rules: [{ pattern: /^\d+$/, message: '只能输入正整数' }],
                  initialValue: '1000'
                })(<Input type="text" />)}
                <span className="log-text">&nbsp; 毫秒</span>
              </Form.Item>

              <Form.Item>
                <Radio.Group onChange={this.onChange}>
                  <Radio value={true} checked={checked}>
                    启动
                  </Radio>
                  <Radio value={false}>停止</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>

            <div
              id="timeLogContent"
              className="log-content"
              dangerouslySetInnerHTML={{
                __html: logContent
              }}
            />
          </div>
        )}
      </Fragment>
    );
  }
}
const WrappedTimeLogForm = Form.create({ name: 'time_log' })(TimeLog);
export default WrappedTimeLogForm;
