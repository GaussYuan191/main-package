/**
 * @lzx
 * 普通的 Select 组件
 * 主要配合 NormeForm 和 SearchForm 使用
 */
import { Select } from 'antd';
import React, { PureComponent } from 'react';
export default class SelectNorm extends PureComponent {
  render() {
    const { options } = this.props;
    return (
      <Select
        {...this.props}
        filterOption={(input, option) => {
          return (
            // option.key.toLowerCase().indexOf(input.toLowerCase()) > 0 ||
            // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            option.key.toLowerCase().includes(input.toLowerCase()) ||
            option.props.children.toLowerCase().includes(input.toLowerCase())
          );
        }}
        allowClear
      >
        {(options || []).map(item => (
          <Select.Option key={item.value} disabled={item.disabled || false}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
