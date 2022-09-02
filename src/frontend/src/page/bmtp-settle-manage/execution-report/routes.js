import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));
export default [
  {
    path: '/execution-report',
    component: PageComponent,
    title: '成交回报',
    exact: true
  }
];
