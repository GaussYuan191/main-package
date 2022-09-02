import lugiax from '@lugia/lugiax';
import sync from './sync';
import async from './async.js';
import { page } from 'yss-biz';

const lugiaxModel = lugiax.register({
  model: 'userRoleAuth',
  state: {
    // 左侧机构树数据
    orgTreeData: [],
    orgTreeAllKeys: [], // 机构树所有展开键

    // 当前选中的左侧机构编号
    activeOrgCode: '',
    // 用户列表查询条件
    queryParam: {
      userCode: '', // 用户名
      ...page
    },
    // 数据权限启用参数
    isEnableDataAuth: false,

    // 用户列表
    userTableData: [],
    userTableTotal: 0,

    // 角色树数据(授权时获取)
    roleTreeData: [],
    roleTreeDataAllKeys: [], // 角色树所有展开键

    // 互斥角色列表查询结果
    mutexRoleCodeList: [],

    // 角色授权对话框状态参数
    modalInfo: {
      isBatch: false, // 是否批量授权
      type: 'funcAuth', // 功能角色授权funcAuth | 数据角色授权dataAuth
      visible: false,
      userCodeList: [] // 用户授权时用户编码
    }
  },
  mutations: {
    async: async,
    sync: sync
  }
});

export default lugiaxModel;
