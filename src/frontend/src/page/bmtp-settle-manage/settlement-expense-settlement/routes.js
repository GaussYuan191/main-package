import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/mss/index'));

export default [
  {
    path: '/settlement-expense-settlement',
    component: PageComponent,
    title: '结算费用结算',
    exact: true
  }
];
