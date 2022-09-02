import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/log-manage',
    component: PageComponent,
    title: '日志管理',
    exact: true
  }
];
