import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/ParamParameterView'));
export default [
  {
    path: '/param-parameter',
    component: PageComponent,
    title: '参数表',
    exact: true
  }
];
