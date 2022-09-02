import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/mss/index'));

export default [
  {
    path: '/bond-interest-payment',
    component: PageComponent,
    title: '债券付息兑付',
    exact: true
  }
];
