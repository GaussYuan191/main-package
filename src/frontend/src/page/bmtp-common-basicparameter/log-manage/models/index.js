import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import logManageVo from './logeManageVo';
const LogModel = lugiax.register({
  model: 'logManage',
  state: {
    ...logManageVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default LogModel;
