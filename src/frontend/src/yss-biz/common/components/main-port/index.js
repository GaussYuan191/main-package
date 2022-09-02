/**
 * 主应用组件
 * @props baseConfig 基础服务配置
 * @props getRouteConfig 获取子模块的路由配置
 * @author daizq
 */

import React from 'react';
import { ConfigProvider } from 'antd';
import { Routes, appModel, antdConfig } from 'bmtp-trade-base';

const { self, top } = window;

export default class AppComponent extends React.Component {
  state = {
    baseConfig: this.props.baseConfig || {}
  };

  componentDidMount() {
    if (self !== top) {
      this.onMessage();
      const themeColor = localStorage.getItem('theme-color');
      themeColor === 'light' && this.changeThemeColor(themeColor);
    }
  }

  onMessage = () => {
    self.addEventListener('message', event => {
      if (event.data.operation === 'change-theme-color') {
        this.changeThemeColor(event.data.themeColor);
      }
    });
  };

  changeThemeColor = themeColor => {
    self.less.modifyVars(
      themeColor === 'light' ? antdConfig.lightThemeConfig : antdConfig.darkThemeConfig
    );
  };

  isDev = () => {
    return 'development' === process.env.NODE_ENV;
  };

  render() {
    const topProps = {
      baseParth: '',
      appModel: this.state.baseConfig.appModel || appModel,
      isDev: this.isDev(),
      isSingle: this.isDev()
    };
    const { ChildRoutes = [] } = this.props;
    return (
      <ConfigProvider {...antdConfig}>
        <section className="darkStyle">
          <Routes
            productName="赢·多级托管"
            childRoutes={() => <ChildRoutes {...topProps} />}
            {...topProps}
          />
        </section>
      </ConfigProvider>
    );
  }
}
