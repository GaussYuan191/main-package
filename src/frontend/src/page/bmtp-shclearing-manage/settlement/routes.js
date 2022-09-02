import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));

export default [
  {
    path: '/settlement',
    component: PageComponent,
    title: '中债登结算指令',
    exact: true
  }
];
