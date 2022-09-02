import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import cashSaleVo from './cashSaleVo.js';
import collateralisedRepoVo from './collateralisedRepoVo';
import outrightRepoVo from './outrightRepoVo';
import distribution from './distributionVo';
import bondLendingVo from './bondLendingVo';
import bondResaleVo from './bondResaleVo';
const AccountModel = lugiax.register({
  model: 'execution-report',
  state: {
    ...cashSaleVo,
    ...collateralisedRepoVo,
    ...outrightRepoVo,
    ...distribution,
    ...bondLendingVo,
    ...bondResaleVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default AccountModel;
