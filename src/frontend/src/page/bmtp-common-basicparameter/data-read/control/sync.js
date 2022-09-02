import { page } from 'yss-biz/utils/util/constant';
export default {
  // 保存需要切换的tab
  changeTab(state, { value }) {
    return state.set('active', value);
  },

  /***点击一行进行保存**/
  changTableRow(state, { value }) {
    return state.set('rowed', value);
  },

  openFormModal(state, { type, status, sign }) {
    return state.merge({
      isOpenFormModal: {
        type,
        status,
        sign
      }
    });
  },
  changeActive(state, { value }) {
    return state.set('active', value);
  },
  changeQueryElement(state, params) {
    const { type, value } = params;
    return state.setIn(['queryElement', type], value);
  },
  // 调整上传相关的参数值
  changeUploadParams(state, params) {
    const { type, value } = params;
    return state.setIn(['uploadParams', type], value);
  },
  // 重置功能
  toReasetSearch(state, params) {
    return state.merge({
      queryElement: {
        ...page,
        ...params
      }
    });
  },
  // 保存checkList
  toSaveCheck(state, values) {
    return state.set('checkList', values);
  },
  // 清除预览表格数据
  cleanPreviewList(state, params) {
    return state.setIn(['previewList', 'list'], []).setIn(['previewList', 'total'], 0);
  }
};
