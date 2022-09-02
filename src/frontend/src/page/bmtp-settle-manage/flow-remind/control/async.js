import { filterNullElement } from 'yss-biz';
import { message } from 'antd';
import {
  getRemindTastList,
  getDetailById,
  addRemindTask,
  startRemindTask,
  stopRemindTask,
  updateRemindTask,
  deleteRemindTask,
  getFlowConfig,
  getTaskFlowConfig,
  getSequence
} from '../serices/index';
// 对象数组去重
function filterRepeatEle(objArray = [], keyField) {
  let keyList = [];
  return objArray.filter(item => {
    if (!keyList.includes(item[keyField])) {
      keyList.push(item[keyField]);
      return true;
    } else {
      return false;
    }
  });
}
export default {
  // 查询任务列表分页
  async httpGetTaskList(state, params) {
    try {
      let queryElement = {
        ...state.get('queryElement').toJS(),
        ...params
      };
      let result = await getRemindTastList(filterNullElement(queryElement));
      const { data, winRspType, msg } = result;
      if (winRspType != 'SUCC') {
        message.error(msg || '网络或数据错误');
        return;
      }
      return state
        .setIn(['dataList', 'list'], data.list)
        .setIn(['dataList', 'total'], data.total)
        .setIn(['queryElement', 'reqPageNum'], queryElement.reqPageNum);
    } catch (e) {
      message.error('请求错误');
    }
  },

  // 查询单个任务详情
  async httpGetDetailById(state, id) {
    let result = await getDetailById(id);
    const { data, winRspType, msg } = result || {};
    if (winRspType != 'SUCC') {
      message.error(msg || '网络或数据错误');
      return;
    }
    return state.set('dataDetail', data);
  },

  // 新增任务
  async httpCreateTask(state, { values, callback }) {
    const result = await addRemindTask(filterNullElement(values));
    const { winRspType, msg } = result || {};
    if (winRspType === 'SUCC') {
      message.success(msg);
      typeof callback === 'function' && callback();
    } else {
      message.error(msg || '网络或数据错误');
    }
  },

  // 删除单个任务
  async httpDeleteTask(state, id) {
    const result = await deleteRemindTask(id);
    const { winRspType, msg } = result || {};
    if (winRspType === 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '网络或数据错误');
    }
  },

  // 修改任务状态
  async httpChangeTaskStatus(state, params) {
    const { id, status } = params;
    const result = status ? await startRemindTask(id) : await stopRemindTask(id);
    const { winRspType, msg } = result || {};
    if (winRspType === 'SUCC') {
      message.success(msg);
    } else {
      message.error(msg || '网络或数据错误');
    }
  },

  // 更新任务数据
  async httpUpdateTask(state, { values, callback }) {
    const result = await updateRemindTask(filterNullElement(values));
    const { winRspType, msg } = result || {};
    if (winRspType === 'SUCC') {
      message.success(msg);
      typeof callback === 'function' && callback();
    } else {
      message.error(msg || '网络或数据错误');
    }
  },

  // 获取监控配置表总数据
  async httpGetFlowConfigData(state) {
    const result = await getFlowConfig({ reqPageNum: 1, reqPageSize: 1000 });
    const { winRspType, msg, data } = result || {};
    if (winRspType === 'SUCC') {
      // 剔除多管理人因素
      const flowMap = data.list.reduce((tempMap, item) => {
        if (!tempMap[item.tradeType]) {
          tempMap[item.tradeType] = item;
        } else {
          tempMap[item.tradeType].flowConfigList.push(...item.flowConfigList);
        }
        return tempMap;
      }, {});
      const list = Object.values(flowMap).map(item => {
        item.flowConfigList = filterRepeatEle(item.flowConfigList, 'flowCode');
        return item;
      });
      return state.set('flowConfigAllData', list || []);
    } else {
      message.warn(msg || '网络或数据错误');
    }
    /*
    监控节点配置表数据源, 后端接口返回格式如下
    [
      {
        flowConfigList: [
          {
            flowCode: '节点编码',
            flowName: '节点名称',
            managerCode: '管理人编码',
            tradeType: '交易类型编号'
          },
          ...
        ],
        managerCode: '管理人编码',
        managerName: '管理人名称',
        tradeType: '交易类型编号',
        tradeTypeName: '交易类型名'
      },
      ...
    ];
    交易类型:监控节点 = 1:n, 同时 管理人:交易类型 = 1:n;
    因此需剔除多管理人因素, 仅根据交易类型显示所有监控节点, 因此需要汇集一下数据
    */
  },

  // 获取任务的流程节点配置数据
  async httpGetTaskFlowNodeList(state, code) {
    const result = await getTaskFlowConfig({ code, reqPageNum: 1, reqPageSize: 1000 });
    const { winRspType, msg, data } = result || {};
    if (winRspType === 'SUCC') {
      return state.set('flowNodeDetail', data.list || []);
    } else {
      message.warn(msg || '网络或数据错误');
    }
  },

  // 获取随机序号
  async httpGetSequence(state) {
    const result = await getSequence();
    const { winRspType, msg, data } = result || {};
    if (winRspType === 'SUCC') {
      return state.set('sequence', data);
    } else {
      message.warn(msg || '网络或数据错误');
    }
  }
};
