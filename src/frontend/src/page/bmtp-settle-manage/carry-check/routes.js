import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));

export default [
  {
    path: '/carry-check',
    component: PageComponent,
    title: '持仓核对',
    exact: true
  }
];
