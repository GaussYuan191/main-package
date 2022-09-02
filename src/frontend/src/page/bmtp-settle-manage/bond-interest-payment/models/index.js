import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import settlementVo from './settlementVo.js';
import aboutVo from './aboutVo.js';
import bondSaleBack from './bondSaleBack.js';
const lugiaxModel = lugiax.register({
  model: 'bondInterestPayment',
  state: {
    ...settlementVo,
    ...aboutVo,
    ...bondSaleBack,
    currentTradeDate: '' //当前交易日
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
