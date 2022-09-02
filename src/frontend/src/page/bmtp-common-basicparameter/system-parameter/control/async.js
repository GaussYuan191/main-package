import {
  axiosParamClass,
  axiosParamClassDetail,
  axiosParamList,
  axiosTableSelectList,
  axiosEditTableRow,
  axiosExport,
  axiosAudit,
  axiosUnaudit
} from '../services';
import { handleExport } from 'yss-biz';
import { message } from 'antd';
export default {
  async getParamClass(state) {
    const response = await axiosParamClass();
    let datas = response.data;
    datas = Object.keys(datas || {}).map(key => ({
      label: key,
      value: datas[key]
    }));
    return state.setIn(['systemParamQueryList', 'paramClass'], datas);
  },
  async getParamClassDetail(state, params) {
    const response = await axiosParamClassDetail(params);
    let datas = response.data;
    datas = Object.keys(datas || {}).map(key => ({
      label: key,
      value: datas[key]
    }));
    return state.setIn(['systemParamQueryList', 'paramDetailClass'], datas);
  },
  async getTablesDatas(state, params, { mutations, getState }) {
    const response = await axiosParamList(params);
    const loopDatas = async list => {
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        item.key = item.id;
        if (item.parameterValueType === '2') {
          const listValues = await axiosTableSelectList('/' + item.parameterValueBound);
          let selectListObj = (listValues || {}).data || {};
          let selectList = [];
          Object.keys(selectListObj).forEach(key => {
            selectList.push({
              value: key,
              label: selectListObj[key]
            });
          });
          item.parameterValueBound = selectList;
        }
        if (!!item.childBusinessParameter) {
          item.children = await loopDatas(item.childBusinessParameter);
        }
      }
      return list;
    };
    // let datas = response.data || {};
    const { data = {}, msg, winRspType } = response;
    if (winRspType === 'SUCC') {
      // let tableList = await loopDatas(data.list || []);
      let tableList = data.list || [];
      state = getState();
      return state
        .setIn(['paramTable', 'dataSource'], tableList)
        .setIn(['paramTable', 'total'], data.total || 0)
        .setIn(['paging', 'reqPageNum'], params.reqPageNum)
        .setIn(['paging', 'reqPageSize'], params.reqPageSize);
    } else {
      message.error(msg || '数据错误');
    }
  },
  async hanleTaleValueChange(state, params, { getState }) {
    const { id, parameterValue } = params;
    const response = await axiosEditTableRow({ id, parameterValue });
    state = getState();
    return state.set('callbackForTableChange', response);
  },
  async hanleExport(state, params, { getState }) {
    const response = await axiosExport(params);
    handleExport(response, '系统参数设置');
  },
  async handleAudit(state, params, { getState }) {
    const response = await axiosAudit(params);
    state = getState();
    return state.set('callbackForTableChange', response);
  },
  async handleUnaudit(state, params, { getState }) {
    const response = await axiosUnaudit(params);
    state = getState();
    return state.set('callbackForTableChange', response);
  }
};
