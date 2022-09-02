import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import dailyKnotsVo from './dailyKnotsVo.js';
import aboutMessageVo from './aboutMessageVo.js';
const SettlementModel = lugiax.register({
  model: 'settlement3',
  state: {
    ...aboutMessageVo,
    ...dailyKnotsVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
