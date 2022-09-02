import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/DataDictionaryView'));
export default [
  {
    path: '/data-dictionary',
    component: PageComponent,
    title: '数据字典',
    exact: true
  }
];
