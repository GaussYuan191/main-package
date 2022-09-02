import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/index'));
export default [
  {
    path: '/url-config',
    component: PageComponent,
    title: 'url配置管理',
    exact: true
  }
];
