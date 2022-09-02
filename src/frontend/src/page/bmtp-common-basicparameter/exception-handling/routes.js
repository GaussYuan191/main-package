import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/exception-handling',
    component: PageComponent,
    title: '异常处理',
    exact: true
  }
];
