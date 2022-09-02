import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/data-read',
    component: PageComponent,
    title: '数据读取',
    exact: true
  }
];
