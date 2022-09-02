import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import instructionVo from './instructionVo.js';
const SettlementModel = lugiax.register({
  model: 'settlement',
  state: {
    ...instructionVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
