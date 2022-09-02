import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/consignor'));
export default [
  {
    path: '/consignor',
    component: PageComponent,
    title: 'consignor',
    exact: true
  }
];
