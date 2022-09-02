import lugiax from '@lugia/lugiax';
import sync from './sync';
import async from './async.js';
import { page } from 'yss-biz';

const lugiaxModel = lugiax.register({
  model: 'dataRoleManage',
  state: {
    // 查询条件 角色名称
    roleName: '',
    // 角色树数据
    roleTreeData: [],
    // 当前选中的角色编号
    treeActiveCode: '',

    // 权限查询条件
    queryParam: { ...page },

    // 角色权限数据列表
    roleAuthList: [],
    roleAuthListTotal: 0,

    // 机构下拉树列表
    orgPullDownList: [],
    // 产品列表
    productList: {
      list: [],
      total: 0
    },
    synchronizeFlag: false
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
