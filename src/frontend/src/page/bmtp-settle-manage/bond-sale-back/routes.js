import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/index'));

export default [
  {
    path: '/bond-sale-back',
    component: PageComponent,
    title: '债券回售',
    exact: true
  }
];
