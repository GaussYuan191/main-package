import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));
export default [
  {
    path: '/full-instruction',
    component: PageComponent,
    title: '全额结算指令管理',
    exact: true
  }
];
