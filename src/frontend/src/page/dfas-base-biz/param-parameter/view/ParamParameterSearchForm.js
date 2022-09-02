/**
 * 参数表 查询
 * @props handleSearch
 * @props prodTreeSelectData
 */

import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormValidItem, BizSelect, service } from 'bmtp-trade-base';

class ParamParameterSearchForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleSearch();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" className="search-form">
        <FormValidItem label="参数类型">
          {getFieldDecorator(
            'paramType',
            {}
          )(
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

        <FormValidItem label="参数编码">
          {getFieldDecorator('paramCode', {})(<Input style={{ width: 200 }} />)}
        </FormValidItem>

        <FormValidItem label="参数名称">
          {getFieldDecorator('paramName', {})(<Input style={{ width: 200 }} />)}
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

export default Form.create()(ParamParameterSearchForm);
