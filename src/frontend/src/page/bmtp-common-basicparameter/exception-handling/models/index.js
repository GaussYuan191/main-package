import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import exceptionHandlingVo from './exceptionHandlingVo';
import receiveHandlingVo from './receiveHandlingVo';
const ExceptionHandingModel = lugiax.register({
  model: 'exceptionHanding',
  state: {
    ...exceptionHandlingVo,
    ...receiveHandlingVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default ExceptionHandingModel;
