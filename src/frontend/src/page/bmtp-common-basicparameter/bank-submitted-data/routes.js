import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/bank-submitted-data',
    component: PageComponent,
    title: '报表管理'
  }
];
