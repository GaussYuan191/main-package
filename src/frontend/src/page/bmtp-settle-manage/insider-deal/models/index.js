import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import insideVo from './insideVo';
import aboutMessageVo from './aboutMessageVo.js';
const SettlementModel = lugiax.register({
  model: 'settlement',
  state: {
    ...aboutMessageVo,
    ...insideVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
