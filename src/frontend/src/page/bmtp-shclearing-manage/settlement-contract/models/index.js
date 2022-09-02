import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import aboutMessageVo from './aboutMessageVo.js';
import contractVo from './contractVo';
const SettlementModel = lugiax.register({
  model: 'settlementContract',
  state: {
    ...aboutMessageVo,
    ...contractVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
