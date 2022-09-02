import loadable from '@loadable/component';
const PageComponent = loadable(() => import('./view/TradeDayTypeView'));
export default [
  {
    path: '/trade-day',
    component: PageComponent,
    title: '交易日历',
    exact: true
  }
];
