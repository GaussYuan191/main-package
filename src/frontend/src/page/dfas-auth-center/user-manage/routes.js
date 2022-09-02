import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/UserManageView'));
export default [
  {
    path: '/user-manage',
    component: PageComponent,
    title: '用户管理',
    exact: true
  }
];
