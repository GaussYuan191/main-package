import lugiax from '@lugia/lugiax';
import sync from '../control/sync';
import async from '../control/async.js';
import settlementVo from './settlementVo.js';
import consignorVo from './consignorVo.js';
import trusteeshipVo from './trusteeshipVo.js';
const lugiaxModel = lugiax.register({
  model: 'settlementDetailData',
  state: {
    active: '1', //显示页面，默认为1 ，三个tab页分别为1，2，3
    searchDate: '', //查询日期,
    currentTradeDate: '', // 当前系统交易日的时间
    ...settlementVo,
    ...consignorVo,
    ...trusteeshipVo
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
