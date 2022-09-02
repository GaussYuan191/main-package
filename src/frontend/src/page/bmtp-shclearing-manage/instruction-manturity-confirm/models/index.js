import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import aboutMessageVo from './aboutMessageVo.js';
import manturityInstructionVo from './manturityInstructionVo.js';
const ManturitySettleModel = lugiax.register({
  model: 'manturityInstruction',
  state: {
    ...aboutMessageVo,
    ...manturityInstructionVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default ManturitySettleModel;
