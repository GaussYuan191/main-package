import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/ParamCacheView'));
export default [
  {
    path: '/param-cache',
    component: PageComponent,
    title: '参数缓存',
    exact: true
  }
];
