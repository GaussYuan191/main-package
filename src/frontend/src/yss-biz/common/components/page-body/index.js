/**
 * @lzx
 * 基础的页面布局组件
 *  - PageSide 左侧栏
 *  - PageMain 页面主体
 *  - Container 带内边距的容器
 */
import React from 'react';
const PageBody = props => (
  <div className={props.className + ' layoutColumns'}>{props.children}</div>
);

PageBody.PageSide = props => <div className={props.className + ' side'}>{props.children}</div>;
PageBody.PageMain = props => (
  <div className={props.className + ' main'}>
    <div style={{ height: props.height || '100%' }}>{props.children}</div>
  </div>
);

PageBody.Container = props => <div className="f-tab-space">{props.children}</div>;

export default PageBody;
