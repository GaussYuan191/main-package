import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import instructionVo from './instructionVo.js';
import instructionZJDVo from './instructionZJDVo';
const SettlementModel = lugiax.register({
  model: 'settlement1',
  state: {
    ...instructionVo,
    ...instructionZJDVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
