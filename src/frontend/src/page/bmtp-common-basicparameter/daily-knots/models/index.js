import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import dailyKnotsVo from './dailyKnotsVo.js';
import aboutMessageVo from './aboutMessageVo.js';
const DailyKnotsModel = lugiax.register({
  model: 'dailyKnots',
  state: {
    ...aboutMessageVo,
    ...dailyKnotsVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default DailyKnotsModel;
