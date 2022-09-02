/**
 * 表单 校验 FormValidItem
 * @author daizq
 * @props validPlacement 校验提示框位置，默认right
 */

import React from 'react';
import { Form, Tooltip } from 'antd';

export default class FormValidItem extends React.Component {
  state = {
    validPlacement: this.props.validPlacement || 'right'
  };

  // 获取校验提示内容
  getValidMessage = () => {
    const children = this.props.children;
    if (!children) {
      return '';
    }

    const dataField = children.props['data-__field'];

    if (!dataField) {
      return '';
    }

    return (
      (dataField.errors &&
        dataField.errors
          .map(v => {
            return v.message;
          })
          .join(';')) ||
      ''
    );
  };

  render() {
    const cssClassList = ['form-valid-item'];
    if (this.props.className) {
      cssClassList.push(this.props.className);
    }

    const formItemConfig = {
      colon: false,
      ...this.props,
      className: cssClassList.join(' ')
    };

    Object.keys(this.state).forEach(key => {
      delete formItemConfig[key];
    });
    return (
      <section style={this.props.style}>
        <Tooltip
          overlayClassName="has-error"
          placement={this.state.validPlacement}
          title={this.getValidMessage()}
          visible={!!this.getValidMessage()}
        >
          {this.props.children}
        </Tooltip>
      </section>
    );
  }
}
