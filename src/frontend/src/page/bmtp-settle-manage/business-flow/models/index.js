import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import BusinessFlowVo from './BusinessFlowVo';

const lugiaxModel = lugiax.register({
  model: 'businessFlow',
  state: {
    ...BusinessFlowVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
