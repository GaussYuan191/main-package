import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import expenseEntryVo from './expenseEntryVo';
const lugiaxModel = lugiax.register({
  model: 'settlementExpenseEntry',
  state: {
    ...expenseEntryVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
