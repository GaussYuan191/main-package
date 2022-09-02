import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));
export default [
  {
    path: '/daily-knots',
    component: PageComponent,
    title: '日结',
    exact: true
  }
];
