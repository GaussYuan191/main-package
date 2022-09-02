/**
 * 系统版本发布信息表 查询
 * @props handleSearch
 * @props prodTreeSelectData
 */

import React from 'react';
import { Form, Button, Input, DatePicker } from 'antd';
import { FormValidItem } from 'bmtp-trade-base';

class SearchForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleSearch();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { RangePicker } = DatePicker;

    return (
      <Form layout="inline" className="search-form">
        <FormValidItem label="版本号">
          {getFieldDecorator('version', {})(<Input style={{ width: 200 }} />)}
        </FormValidItem>

        <FormValidItem label="版本日期">
          {getFieldDecorator('publishDate', {})(<RangePicker />)}
        </FormValidItem>

        <FormValidItem label="版本说明">
          {getFieldDecorator('publishInfo', {})(<Input style={{ width: 200 }} />)}
        </FormValidItem>

        <FormValidItem>
          <Button type="primary" icon="search" onClick={this.props.handleSearch}>
            查询
          </Button>
        </FormValidItem>
        <FormValidItem>
          <Button icon="sync" onClick={this.handleReset}>
            重置
          </Button>
        </FormValidItem>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
