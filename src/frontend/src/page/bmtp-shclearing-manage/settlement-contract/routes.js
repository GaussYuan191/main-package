import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));

export default [
  {
    path: '/settlement-contract',
    component: PageComponent,
    title: '中债登合同管理',
    exact: true
  }
];
