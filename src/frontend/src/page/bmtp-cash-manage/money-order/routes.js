import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/mss'));
export default [
  {
    path: '/money-order',
    component: PageComponent,
    title: '划款指令',
    exact: true
  }
];
