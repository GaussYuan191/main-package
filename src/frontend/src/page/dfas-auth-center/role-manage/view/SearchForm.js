/**
 * 角色管理 通用查询表单
 * @props handleSearch
 */

import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { FormValidItem } from 'bmtp-trade-base';
import { filterWithAuth } from 'yss-biz';
class SearchForm extends React.Component {
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.handleSearch(values);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleSearch({});
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editing } = this.props;

    return (
      <Form layout="inline">
        <FormValidItem label="功能名称">
          {getFieldDecorator('menuName', {})(<Input style={{ width: 200 }} disabled={editing} />)}
        </FormValidItem>

        <FormValidItem>
          {getFieldDecorator(
            'hasAuth',
            {}
          )(
            <Radio.Group disabled={editing}>
              <Radio value="1">已授权</Radio>
              <Radio value="0">未授权</Radio>
            </Radio.Group>
          )}
        </FormValidItem>

        <div className="ant-row ant-form-item form-valid-item">
          {filterWithAuth(
            <Button icon="search" type="primary" disabled={editing} onClick={this.handleSearch}>
              查询
            </Button>,
            this.props.btnAuth
          )}
        </div>
        <Button icon="sync" disabled={editing} onClick={this.handleReset}>
          重置
        </Button>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
