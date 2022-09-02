import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/account'));
export default [
  {
    path: '/sell-repo-expire',
    component: PageComponent,
    title: '正回购到期业务查询',
    exact: true
  }
];
