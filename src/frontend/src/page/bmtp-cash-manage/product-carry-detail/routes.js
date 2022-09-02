import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/product-carry-detail',
    component: PageComponent,
    title: '产品持仓变动明细查询'
  }
];
