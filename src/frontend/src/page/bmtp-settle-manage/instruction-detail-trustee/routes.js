import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));
export default [
  {
    path: '/instruction-detail-trustee',
    component: PageComponent,
    title: '清分明细',
    exact: true
  }
];
