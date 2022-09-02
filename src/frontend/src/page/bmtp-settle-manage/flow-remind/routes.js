import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/index'));

export default [
  {
    path: '/flow-remind',
    component: PageComponent,
    title: '流程提醒任务',
    exact: true
  }
];
