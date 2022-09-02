/**
 * 参数缓存 通用查询表单
 * @props handleSearch
 * @props handleRefreshCache
 */

import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormValidItem } from 'bmtp-trade-base';

class SearchForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleSearch();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline">
        <FormValidItem label="">
          {getFieldDecorator('key', {})(<Input placeholder="关键字搜索" style={{ width: 200 }} />)}
        </FormValidItem>

        <FormValidItem>
          <Button type="primary" onClick={this.props.handleSearch}>
            查询
          </Button>
        </FormValidItem>

        <FormValidItem>
          <Button onClick={this.handleReset}>重置</Button>
        </FormValidItem>

        <FormValidItem>
          <Button type="primary" icon="sync" onClick={() => this.props.handleRefreshCache()}>
            刷新缓存
          </Button>
        </FormValidItem>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
