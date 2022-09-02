import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/system-parameter',
    component: PageComponent,
    title: '系统参数设置'
  }
];
