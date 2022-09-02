/**
 * 应用入口
 * @author daizq
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { service, appModel } from 'bmtp-trade-base';
import { MainPort, ChangeTheme } from 'yss-biz';
import childRouteConfig from './router/config';
import 'bmtp-trade-base/static/css/main.css';
import 'yss-biz/common/style/base.less';
import 'yss-biz/common/style/indexs.less';
import './sofaStyle/commonThemes.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ChildRoutes from './router';
moment.locale('en');

if (!window.singleSpaNavigate) {
  ReactDOM.render(
    <ChangeTheme>
      <MainPort ChildRoutes={ChildRoutes} />
    </ChangeTheme>,
    document.getElementById('root')
  );
}

// if (!window.singleSpaNavigate) {
//   ReactDOM.render(
//     <div className='commonThemes sofaTheme'>
//       <MainPort ChildRoutes={ChildRoutes} />
//     </div>,
//     document.getElementById('root')
//   );
// }

// 提供基础服务
export const baseConfig = {
  service,
  appModel
};

// 导出路由配置
export const routeConfig = {
  childRouteConfig
};
