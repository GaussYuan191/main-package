import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));

export default [
  {
    path: '/instruction-confirm',
    component: PageComponent,
    title: '结算确认',
    exact: true
  }
];
