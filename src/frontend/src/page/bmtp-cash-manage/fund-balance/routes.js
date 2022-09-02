import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));

export default [
  {
    path: '/fund-balance',
    component: PageComponent,
    title: '资金账户余额查询',
    exact: true
  }
];
