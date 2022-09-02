import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/settlement'));
export default [
  {
    path: '/daily-first',
    component: PageComponent,
    title: '日初',
    exact: true
  }
];
