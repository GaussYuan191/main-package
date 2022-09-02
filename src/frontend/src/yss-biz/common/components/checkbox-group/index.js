import React from 'react';
import { Form, Checkbox } from 'antd';
import { formLayout_fir } from 'yss-biz/utils/util/constant';
const checkBoxGroup = props => {
  const { getFieldDecorator } = props.form;
  const itemPos = props.pos || 'right';
  typeof props.handleChecked !== 'function' && (props.handleChecked = function () {});
  return (
    <Form {...formLayout_fir} className="checkboxGroup rowStyle">
      <Form.Item wrapperCol={{ span: 24 }}>
        {getFieldDecorator('checkbox-group', {
          initialValue: []
        })(
          <div className={'f-text-' + itemPos}>
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={values => props.handleChecked(values)}
            >
              {(props.group || []).map((item, index) => {
                return (
                  <Checkbox value={item.value} key={index}>
                    {item.name}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default Form.create()(checkBoxGroup);
