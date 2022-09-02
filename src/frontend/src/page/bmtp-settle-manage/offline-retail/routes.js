import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));

export default [
  {
    path: '/offline-retail',
    component: PageComponent,
    title: '网下分销'
  }
];
