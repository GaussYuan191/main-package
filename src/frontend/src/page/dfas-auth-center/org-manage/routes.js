import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/OrgManageView'));
export default [
  {
    path: '/org-manage',
    component: PageComponent,
    title: '机构管理',
    exact: true
  }
];
