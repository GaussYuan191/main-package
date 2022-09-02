import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/ParamParameterLogView'));
export default [
  {
    path: '/param-parameter-log',
    component: PageComponent,
    title: '参数操作日志表',
    exact: true
  }
];
