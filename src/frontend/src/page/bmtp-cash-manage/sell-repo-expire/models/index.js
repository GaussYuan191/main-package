import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import detailedVo from './detailedVo';

const AccountModel = lugiax.register({
  model: 'sell-repo-expire',
  state: {
    ...detailedVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default AccountModel;
