import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import cacheContentVo from './cacheContentVo';
const SettlementModel = lugiax.register({
  model: 'cacheContent',
  state: {
    ...cacheContentVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default SettlementModel;
