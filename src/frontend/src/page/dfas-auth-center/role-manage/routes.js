import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/RoleManageView'));
export default [
  {
    path: '/role-manage',
    component: PageComponent,
    title: '角色管理',
    exact: true
  }
];
