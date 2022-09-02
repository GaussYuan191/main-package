import React, { PureComponent } from 'react';
import { FormValidItem } from 'bmtp-trade-base';
import { InputPart } from 'yss-biz';
export default class InputRange extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { before, after } = this.props;
    return (
      <ul className="f-clearfix" style={{ height: '100%' }}>
        <li className="f-left" style={{ width: 'calc(50% - 12px)' }}>
          <FormValidItem style={{ marginBottom: 0 }}>
            {getFieldDecorator(before.name, { ...before.rules })(
              <InputPart type="InputNumber" {...before.props} />
            )}
          </FormValidItem>
        </li>
        <li className="f-left" style={{ width: '24px', heighe: '100%', textAlign: 'center' }}>
          ~
        </li>
        <li className="f-left" style={{ width: 'calc(50% - 12px)' }}>
          <FormValidItem style={{ marginBottom: 0 }}>
            {getFieldDecorator(after.name, { ...after.rules })(
              <InputPart type="InputNumber" {...after.props} />
            )}
          </FormValidItem>
        </li>
      </ul>
    );
  }
}
