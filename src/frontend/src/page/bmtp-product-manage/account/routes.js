import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));
export default [
  {
    path: '/account',
    component: PageComponent,
    title: 'account',
    exact: true
  }
];
