import { getProcessTableData } from '../services';
import { message } from 'antd';
import { isObject, filterNullElement } from 'yss-biz';
export default {
  /*** 流程管理表格接口 */
  async httpGetProcessTableData(state, paging, { getState }) {
    let processQueryForm = { ...state.get('processQueryForm').toJS() };
    let params = filterNullElement({ ...processQueryForm, ...paging });
    let result = await getProcessTableData({ ...params });
    const { data, winRspType, msg } = result;
    const { list } = data;
    if (winRspType == 'SUCC') {
      list.map((item, index) => (item.index = index + 1));
      let newList = !list || isObject(list) ? [] : list;
      return state.setIn(['processTable', 'data'], newList).set('total', data.total);
    } else {
      message.error(msg || '请求错误');
    }
  }
};
