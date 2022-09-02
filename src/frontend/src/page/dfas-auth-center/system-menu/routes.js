import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/SystemMenuView'));
export default [
  {
    path: '/system-menu',
    component: PageComponent,
    title: '系统菜单管理',
    exact: true
  }
];
