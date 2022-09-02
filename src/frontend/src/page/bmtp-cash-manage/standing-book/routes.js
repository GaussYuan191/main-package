import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));
export default [
  {
    path: '/standing-book',
    component: PageComponent,
    title: '台账查询'
  }
];
