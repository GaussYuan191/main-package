import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view'));

export default [
  {
    path: '/settlement-charge-item',
    component: PageComponent,
    title: '费用条目'
  }
];
