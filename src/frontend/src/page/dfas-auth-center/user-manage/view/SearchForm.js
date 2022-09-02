/**
 * 用户管理 通用查询表单
 * @props handleSearch
 */

import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormValidItem, DictSelect } from 'bmtp-trade-base';
import { filterWithAuth } from 'yss-biz';
class SearchForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleSearch();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline">
        <FormValidItem label="用户名(编码)">
          {getFieldDecorator('userName', {})(<Input style={{ width: 200 }} />)}
        </FormValidItem>

        <FormValidItem label="用户状态">
          {getFieldDecorator(
            'userStatus',
            {}
          )(<DictSelect style={{ width: 200 }} dict="1000032" />)}
        </FormValidItem>

        <FormValidItem label="锁定状态">
          {getFieldDecorator(
            'lockStatus',
            {}
          )(<DictSelect style={{ width: 200 }} dict="1000033" />)}
        </FormValidItem>

        <div className="ant-row ant-form-item form-valid-item">
          {filterWithAuth(
            <Button icon="search" type="primary" onClick={this.props.handleSearch}>
              查询
            </Button>,
            this.props.btnAuth
          )}
        </div>
        <Button icon="sync" onClick={this.handleReset}>
          重置
        </Button>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
