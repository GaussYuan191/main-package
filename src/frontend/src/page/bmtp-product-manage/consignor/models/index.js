import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import consignorVo from './consignorVo.js';
import documentVo from './documentVo';
import contractVo from './contractVo';
import enclosureVo from './enclosureVo';
const consignorModel = lugiax.register({
  model: 'consignor1',
  state: {
    ...consignorVo,
    ...documentVo,
    ...contractVo,
    ...enclosureVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default consignorModel;
