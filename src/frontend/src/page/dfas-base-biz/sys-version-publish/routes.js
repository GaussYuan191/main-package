import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/SysVersionPublishView'));
export default [
  {
    path: '/sys-version-publish',
    component: PageComponent,
    title: '系统版本发布信息表',
    exact: true
  }
];
