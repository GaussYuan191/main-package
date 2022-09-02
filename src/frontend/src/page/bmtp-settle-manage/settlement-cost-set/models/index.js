import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import settlementVo from './settlementVo.js';
const lugiaxModel = lugiax.register({
  model: 'settlementCostSet',
  state: {
    ...settlementVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
