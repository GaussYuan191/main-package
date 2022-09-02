import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import settlementVo from './settlementVo.js';
import aboutVo from './aboutVo.js';
const lugiaxModel = lugiax.register({
  model: 'settlementExpenseSettment',
  state: {
    ...settlementVo,
    ...aboutVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
