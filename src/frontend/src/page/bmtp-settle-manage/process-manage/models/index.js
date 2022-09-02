import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import processVo from './processVo.js';
const PeocessModel = lugiax.register({
  model: 'peocessManage',
  state: {
    ...processVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default PeocessModel;
