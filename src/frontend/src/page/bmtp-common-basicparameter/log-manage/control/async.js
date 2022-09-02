import {
  getTimeLogTree,
  timeLogData,
  historyLogData,
  getHistoryLogTree,
  downloadLog,
  envConfig
} from '../services/index';
import { message } from 'antd';

export default {
  // 实时日志：日志数
  async httpTimeLogTreeData(state, params, { mutations }) {
    try {
      let result = await getTimeLogTree();
      const { msg, winRspType, data } = result;
      if (winRspType == 'SUCC') {
        return state.set('timeLogTree', data);
      } else {
        message.error(msg || '数据错误');
      }
    } catch (error) {
      message.error(error || '数据错误');
    }
  },
  // 实时日志：获取日志
  async httpTimeLogData(state, params, { mutations }) {
    try {
      let result = await timeLogData(params);
      const { msg, winRspType, data } = result;
      if (winRspType == 'SUCC') {
        const logContent = data.replace(/\n/g, '<br/>');
        const log = logContent.replace(/\tat/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        return state.set('logContent', log);
      } else {
        message.error(msg || '数据错误');
      }
    } catch (error) {
      message.error(error || '数据错误');
    }
  },

  /**历史日志：加载日志树数据**/
  async httpLogTreeMount(state) {
    try {
      const result = await getHistoryLogTree();
      const { winRspType, data } = result;
      if (winRspType != 'SUCC') {
        return;
      }
      return state.set('historyLogTree', data);
    } catch (e) {
      message.error('请求错误');
    }
  },

  //历史日志：日志下载
  async httpDownloadLog(state, params, { mutations }) {
    let result = await downloadLog(params);
    const blob = new Blob([result], { type: 'application/zip' });
    let href = (window.URL || window.webkitURL).createObjectURL(blob);
    if (window.navigator.msSaveOrOpenBlob) {
      // IE10+下载
      const fileName = 'download.zip';
      navigator.msSaveBlob(blob, fileName);
    } else {
      // 非IE下载
      const fileName = 'download';
      let downloadElement = document.createElement('a');
      downloadElement.href = href;
      downloadElement.download = fileName; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
  },

  // 历史日志：获取历史数据
  async httpHistoryLogData(state, params, { mutations }) {
    try {
      let result = await historyLogData(params);
      const { msg, winRspType, data } = result;
      if (winRspType == 'SUCC') {
        return state.set('logContent', data);
      } else {
        message.error(msg || '数据错误');
      }
    } catch (error) {
      message.error(error || '数据错误');
    }
  },
  // 环境配置：
  async httpEnvConfigData(state, params, { mutations }) {
    try {
      let result = await envConfig(params);
      const { msg, winRspType, data } = result;
      if (winRspType == 'SUCC') {
        return state.set('logContent', JSON.stringify(JSON.parse(data), null, '\t'));
      } else {
        message.error(msg || '数据错误');
      }
    } catch (error) {
      message.error(error || '数据错误');
    }
  }
};
