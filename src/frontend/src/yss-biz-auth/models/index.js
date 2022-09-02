/**
 * 权限状态
 */
import lugiax from '@lugia/lugiax';
import { message } from 'antd';
import { getMenuCode, customerFilterRule } from 'yss-biz';
import {
  getMenuList,
  getMenuAuth,
  getSofaMenuAuth,
  permitVerity,
  getCustomCode
} from '../services/index';
const { fromJS } = require('immutable');

const authModels = lugiax.register({
  model: 'authModels',
  state: {
    btnAuth: {},
    userMenuList: [],
    authMsg: { flag: false, msg: '' }
  },
  mutations: {
    sync: {},
    async: {
      // 权限控制
      async httpGetMenuAuth(state, { type, code, source }, { mutations }) {
        let result = source == 'sofa' ? await getSofaMenuAuth(code) : await getMenuAuth(code);
        let pageRule = customerFilterRule[type]; //获取根据用户编码屏蔽按钮的配置信息
        const { winRspType, data, msg } = result;
        if (winRspType == 'SUCC') {
          if (pageRule) {
            let customCode = await getCustomCode().then(res => res?.data);
            if (data.allFunc) {
              //如果是管理员用户则记录要删除的按钮列表
              data.deleteBtnList = pageRule[customCode];
            } else {
              //不是管理员用户则根据客户编码规则过滤
              data.children = (data?.children || []).filter(
                item => !pageRule[customCode].includes(item['funcName'])
              );
            }
          }
          return state.set('btnAuth', fromJS(data)).setIn(['authMsg', 'flag'], fromJS(false));
        } else {
          message.error(msg || '数据错误');
          return state
            .setIn(['authMsg', 'flag'], fromJS(true))
            .setIn(['authMsg', 'msg'], fromJS(msg));
        }
      },

      //许可认证
      async httpPermitVerity(state, { type, functionCode, source }, { mutations }) {
        let code;
        //sofa系统
        if (source == 'sofa') {
          if (functionCode) {
            code = functionCode;
          }
        } else {
          //非sofa系统，独立版多级托管
          const menuList = await getMenuList();
          let userMenuList = menuList && menuList.data;
          code = getMenuCode(type, userMenuList);
        }
        let result = await permitVerity(code);
        const { winRspType, msg } = result;
        if (winRspType == 'SUCC') {
          await mutations.asyncHttpGetMenuAuth({ type, code, source });
        } else {
          return state
            .setIn(['authMsg', 'flag'], fromJS(true))
            .setIn(['authMsg', 'msg'], fromJS(msg || '网络或数据错误'));
        }
      }
    }
  }
});

export { authModels };
