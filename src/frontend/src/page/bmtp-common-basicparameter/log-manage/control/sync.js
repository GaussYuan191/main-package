const { fromJS } = require('immutable');
export default {
  saveServerPath(state, serverPath) {
    return state.set('serverPath', serverPath);
  },
  clearLogContent(state) {
    return state.set('logContent', '');
  },
  saveChecked(state, inParam) {
    const { checked } = inParam;
    return state.set('checked', checked);
  },
  //历史日志：保存勾选
  handleCheckCode(state, { code, type }) {
    const checkCode = state.get('checkCode');
    let temp;
    if (type == 'add') {
      temp = checkCode.push(code);
    } else {
      temp = checkCode.filter(item => {
        if (item !== code) {
          return item;
        }
      });
    }
    return state.set('checkCode', fromJS(temp));
  },
  //历史日志：清空勾选
  clearCheckCode(state, inParam) {
    return state.set('checkCode', fromJS([]));
  },
  handleServerPath(state, inParam) {
    const tempServerPath = inParam;
    return state.set('tempServerPath', tempServerPath);
  }
};
