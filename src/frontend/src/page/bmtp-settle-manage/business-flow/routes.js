import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/index'));

export default [
  {
    path: '/business-flow',
    component: PageComponent,
    title: '流程监控',
    exact: true
  }
];
