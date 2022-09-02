/**
 * @lzx
 * 自带样式的 tabs 组件
 */
import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const TabsParent = props => {
  const tabParent = Array.isArray(props.children) ? props.children : [props.children];
  return (
    <Tabs {...props}>
      {tabParent.map((child, index) => {
        if (child) {
          const childProps = child.props;
          return (
            <TabPane tab={childProps.tab} key={child.key || index}>
              {child}
            </TabPane>
          );
        } else {
          return null;
        }
      })}
    </Tabs>
  );
};
TabsParent.TabPane = props => (
  <div className={props.noPadding ? '' : 'f-tab-space'}>{props.children}</div>
);
export default TabsParent;
