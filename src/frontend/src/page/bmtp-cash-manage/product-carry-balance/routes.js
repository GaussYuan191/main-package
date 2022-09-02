import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/product-carry-balance',
    component: PageComponent,
    title: '产品持仓查询'
  }
];
