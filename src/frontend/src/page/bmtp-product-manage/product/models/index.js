import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import poductVo from './poductVo.js';
import accountVo from './accountVo.js';
import subjectVo from './subjectVo.js';
import documentVo from './documentVo';
import enclosureVo from './enclosureVo';
const consignorModel = lugiax.register({
  model: 'product',
  state: {
    ...poductVo,
    ...accountVo,
    ...subjectVo,
    ...documentVo,
    ...enclosureVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default consignorModel;
