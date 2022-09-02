import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import holdPositionsVo from './holdPositionsVo';
const AccountModel = lugiax.register({
  model: 'accountModel',
  state: {
    ...holdPositionsVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default AccountModel;
