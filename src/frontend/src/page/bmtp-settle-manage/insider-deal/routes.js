import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/mss'));
export default [
  {
    path: '/insider-deal',
    component: PageComponent,
    title: '内转交易',
    exact: true
  }
];
