import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/fund-name-product',
    component: PageComponent,
    title: '外汇系统基金设置',
    exact: true
  }
];
