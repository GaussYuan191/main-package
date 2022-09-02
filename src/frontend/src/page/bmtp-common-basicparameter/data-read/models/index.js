import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import dataReadVo from './dataReadVo';
import filePreviewVo from './filePreviewVo';
const DataReadModel = lugiax.register({
  model: 'dataRead',
  state: {
    ...dataReadVo,
    ...filePreviewVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default DataReadModel;
