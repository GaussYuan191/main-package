import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));

export default [
  {
    path: '/fund-detail',
    component: PageComponent,
    title: '资金明细'
  }
];


