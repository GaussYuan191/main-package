/**
 * @lzx
 * 自动返回数据字典的下拉框
 * 接收一个参数 code ( 后台对应参数是 parentCode ) 对应的
 */
import React, { PureComponent } from 'react';
import { DictSelect } from 'bmtp-trade-base';
export default class SelectMapDics extends PureComponent {
  componentDidUpdate(prevProps) {
    prevProps.code !== this.props.code && this.$dics.getDictData();
  }
  render() {
    return (
      <DictSelect
        ref={ref => {
          this.$dics = ref;
        }}
        {...this.props}
        dict={this.props.code}
      />
    );
  }
}
