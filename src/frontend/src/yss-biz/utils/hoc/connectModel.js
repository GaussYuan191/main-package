/**
 * @ description: 获取page页面的model层state与mutations
 * @ param (Components) 组件
 * @ param (file) page文件夹下的需要获取的文件目录
 * @ author: win
 * @ update: 2019/12/11
 */

import React, { PureComponent } from 'react';
import { connect } from '@lugia/lugiax';

export default (Components, file, bindProps = []) => {
  class RoleControl extends PureComponent {
    render() {
      let props = this.props || {};
      bindProps.map(item => {
        return (props[item] = this.props[item]);
      });
      return <Components {...props} />;
    }
  }
  return connect(
    require(`../../../page/${file}/models`).default,
    state => {
      let statejs = state.toJS();
      return Object.keys(statejs).reduce((pre, cur) => {
        if (bindProps && bindProps.length) {
          if (bindProps.includes(cur)) {
            pre[cur] = statejs[cur];
          }
        } else {
          pre[cur] = statejs[cur];
        }
        return pre;
      }, {});
    },
    mutations => {
      return Object.keys(mutations).reduce((pre, cur) => {
        if (bindProps && bindProps.length) {
          if (bindProps.includes(cur)) {
            pre[cur] = mutations[cur];
          }
        } else {
          pre[cur] = mutations[cur];
        }
        return pre;
      }, {});
    }
  )(RoleControl);
};
