import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import commonVo from './commonVo';
import capitalVo from './capitalVo.js';
import bondVo from './bondVo.js';
import transactionVo from './transactionVo.js';
const AccountModel = lugiax.register({
  model: 'accoun333t',
  state: {
    ...commonVo,
    ...capitalVo,
    ...bondVo,
    ...transactionVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default AccountModel;
