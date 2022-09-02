import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import detailedVo from './detailedVo';

const retailModel = lugiax.register({
  model: 'offline-retail',
  state: {
    ...detailedVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default retailModel;
