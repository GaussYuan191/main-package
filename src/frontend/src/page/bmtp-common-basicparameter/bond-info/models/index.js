import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async';
import bondInfoVo from './bondInfoVo';

export default lugiax.register({
  model: 'bondInfo',
  state: { ...bondInfoVo },
  mutations: {
    async: async,
    sync: sync
  }
});
