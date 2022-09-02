import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import urlConfigVo from './urlConfigVo';
const SettlementModel = lugiax.register({
  model: 'urlConfig',
  state: {
    ...urlConfigVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
