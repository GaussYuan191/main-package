import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));

export default [
  {
    path: '/process-manage',
    component: PageComponent,
    title: '流程配置',
    exact: true
  }
];
