import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));
export default [
  {
    path: '/instruction-manturity-confirm',
    component: PageComponent,
    title: '到期全额结算指令管理',
    exact: true
  }
];
