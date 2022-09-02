import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import systemParamVo from './systemParamVo';
export default lugiax.register({
  model: 'systemParam',
  state: {
    ...systemParamVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});
