import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/cache-content',
    component: PageComponent,
    title: '缓存内容管理',
    exact: true
  }
];
