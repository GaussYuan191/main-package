/**
 * @lzx
 * 带分割符的输入框组件
 * 默认为 input 当 type 接收 'InputNumber' 时 为InputNumber
 */
import React, { PureComponent } from 'react';
import { Input, InputNumber } from 'antd';
export default class PartInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  resetValue = value => {
    let reg = value.toString().indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
    return value.toString().replace(reg, '$1,');
  };
  onChange = e => {
    let value =
      isNaN(e) && typeof e === 'object' ? (e.target.value || '').replace(/,/g, '') : e + '';
    value = this.resetValue(value);
    this.setState({ value });
  };
  componentDidMount() {
    this.onChange(this.props.value);
  }
  componentWillReceiveProps(nextProps) {
    let newProps = JSON.stringify(nextProps);
    let oldwProps = JSON.stringify(this.props);
    if (newProps !== oldwProps) {
      this.onChange(nextProps.value);
    }
  }
  render() {
    this.resetProps = { ...this.props };
    let InputType;
    switch (this.resetProps.type) {
      case 'InputNumber':
        InputType = InputNumber;
        this.resetProps.parser = value => (value || '').replace(/,/g, '');
        this.resetProps.formatter = value => this.resetValue(value);
        break;
      default:
        InputType = Input;
        !!this.resetProps.value && (this.resetProps.value = this.state.value);
        break;
    }
    return (
      <div style={{ textAlign: 'right' }}>
        <InputType {...this.resetProps} style={{ width: '100%' }} />
      </div>
    );
  }
}
