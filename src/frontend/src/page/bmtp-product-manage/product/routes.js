import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/client'));

export default [
  {
    path: '/product',
    component: PageComponent,
    title: 'product',
    exact: true
  }
];
