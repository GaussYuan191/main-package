import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async';
import positionBalanceQueryOv from './positionBalanceQueryOv';
export default lugiax.register({
  model: 'product-carry-balance',
  state: {
    ...positionBalanceQueryOv
  },
  mutations: {
    async,
    sync
  }
});
