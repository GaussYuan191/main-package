import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import FlowRemindVo from './FlowRemindVo';

const lugiaxModel = lugiax.register({
  model: 'flowRemind',
  state: {
    ...FlowRemindVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
