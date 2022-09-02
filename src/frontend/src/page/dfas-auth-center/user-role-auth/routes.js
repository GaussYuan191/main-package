import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/user-role-auth',
    component: PageComponent,
    title: '数据角色管理',
    exact: true
  }
];
