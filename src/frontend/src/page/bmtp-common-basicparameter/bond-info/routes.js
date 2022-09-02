import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/bond-info',
    component: PageComponent,
    title: '中债基本信息',
    exact: true
  }
];
