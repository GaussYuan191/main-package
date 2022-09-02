import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));
export default [
  {
    path: '/supernatant-settlement',
    component: PageComponent,
    title: '上清所结算',
    exact: true
  }
];
