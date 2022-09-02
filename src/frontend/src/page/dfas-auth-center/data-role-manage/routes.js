import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/data-role-manage',
    component: PageComponent,
    title: '数据权限管理',
    exact: true
  }
];
