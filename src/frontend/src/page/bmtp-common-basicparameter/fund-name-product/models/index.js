import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import forexSettingVo from './forexSettingVo';
const ForexSettingModel = lugiax.register({
  model: 'forexSetting',
  state: {
    ...forexSettingVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default ForexSettingModel;
