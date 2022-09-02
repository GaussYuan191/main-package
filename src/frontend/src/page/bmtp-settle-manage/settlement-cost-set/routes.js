import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/mss/index'));

export default [
  {
    path: '/settlement-cost-set',
    component: PageComponent,
    title: '结算费用设置',
    exact: true
  }
];
