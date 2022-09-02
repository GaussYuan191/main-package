import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async';
import businessAccountVo from './businessAccountVo';
import pledgeBondVo from './pledgeBondVo';
import distributionVo from './distributionVo';

export default lugiax.register({
  model: 'standing-book',
  state: {
    ...businessAccountVo,
    ...pledgeBondVo,
    ...distributionVo,
    clickIds: [], //选中数据项
    tabType: '1' //默认为业务台账
  },
  mutations: {
    async,
    sync
  }
});
