import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import bondSaleBack from './bondSaleBackVo';

const lugiaxModel = lugiax.register({
  model: 'bondSaleBack',
  state: {
    ...bondSaleBack
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
