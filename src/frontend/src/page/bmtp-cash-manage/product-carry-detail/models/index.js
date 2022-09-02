import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async';
import positionChangeQueryOv from './positionChangeQueryOv';
export default lugiax.register({
  model: 'product-carry-detail',
  state: {
    ...positionChangeQueryOv
  },
  mutations: {
    async,
    sync
  }
});
