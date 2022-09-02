/**
 * @file 文件处理
 *
 *
 *
 */
import React from 'react';
import { $ajax } from 'yss-biz';
import { message, Modal, Progress } from 'antd';
import { CancelToken } from 'axios';

export const handleExport = (result, title) => {
  if (!result) return false;
  const aLink = document.createElement('a');
  let blob = new Blob([result], { type: 'application/vnd.ms-excel' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, title + '.xlsx');
  } else {
    aLink.href = URL.createObjectURL(blob);
    aLink.download = title;
    aLink.click();
    document.body.appendChild(aLink);
  }
};

/**
 * 按条件：导出全部或导出当前页
 * @param {string} url 导出接口地址
 * @param {*} params 导出请求的参数
 * @param {string} title 导出文件名
 * @param {boolean} isAll 是否为导出全部
 * @param {number} total 导出总条数
 * @param {string} executeUrl 导出控制接口, 用于查询导出进度以及通知后端停止导出, 默认替换导出接口关键字获得
 * @returns
 */
export const exportFile = async (url, params, title, isAll, total, executeUrl) => {
  delete params['clearingStatus'];
  let result;
  if (isAll) {
    // 导出全部, 一次仅能存在一个导出'进程'

    const infoUrl =
      executeUrl || url.replace(/\/((condition)|(\w{3,}))$/, '/getExportInfoByExecuteID');
    // 判断是否存在导出进度记录
    let hasTask = false;
    let exportProgress = getExportProgress(url);
    const cancelImportSource = CancelToken.source();

    if (exportProgress) {
      hasTask = true;
    } else {
      // 创建并储存导出记录
      exportProgress = { executeID: getSequence(), url, percent: 0, total: ' ... ' };
      setExportProgress(url, exportProgress);
      message.warning('开始导出, 请等待...');
    }

    let modal = {};
    let timer = -1;

    modal = Modal.confirm({
      title: '导出任务进行中 [请不要刷新或关闭页面]',
      content: (
        <div>
          <Progress
            percent={exportProgress.percent}
            status={exportProgress.percent < 100 ? 'active' : 'success'}
          />
          <span>共{exportProgress.total}条</span>
        </div>
      ),
      okText: '最小化',
      cancelText: '取消导出',
      onOk: () => {
        clearInterval(timer);
        setExportProgress(exportProgress.url, exportProgress); // 暂存进度信息
      },
      onCancel: () => {
        // 取消下载
        clearInterval(timer);
        httpExecuteInfo(infoUrl, exportProgress.executeID, 'stop').then(progressResult => {
          const { winRspType } = progressResult || {};
          if (winRspType === 'SUCC') {
            message.success('取消导出成功');
          }
        });
        setExportProgress(exportProgress.url, null);
      }
    });
    // 周期性更新导出进度
    timer = setInterval(() => {
      query(infoUrl, exportProgress, modal, timer);
    }, 3000);
    // 初始化该次导出数量和进度(在调用导出接口后执行)
    setTimeout(() => {
      query(infoUrl, exportProgress, modal, timer);
    }, 500);

    if (hasTask) {
      // 重复点击导出
      message.warn(`您有进行中的导出任务, 请等待其完成`);
      return;
    } else {
      window.onbeforeunload = function () {
        // 用户刷新页面, 清除该导出状态
        setExportProgress(exportProgress.url, null);
      };
    }

    // 心跳查询导出是否取消(本地取消+本地主动断开)
    let isCancelled = false;
    const cancelTimer = setInterval(() => {
      if (!getExportProgress(exportProgress.url)) {
        cancelImportSource.cancel();
        isCancelled = true;
        clearInterval(cancelTimer);
      }
    }, 1000);

    // 获取导出数据
    delete params['reqPageNum'];
    delete params['reqPageSize'];
    params['executeID'] = exportProgress.executeID;
    result = await $ajax(exportProgress.url, params, 'post', {
      responseType: 'arraybuffer',
      timeout: 0,
      cancelToken: cancelImportSource.token,
      mask: false
    });

    // 关闭导出进度对话框
    clearInterval(timer);
    modal.destroy && modal.destroy();

    // 生成导出文件
    if (getExportProgress(exportProgress.url) && !isCancelled) {
      // 简单校验文件是否正确
      if (result.byteLength && result.byteLength > 500) {
        handleExport(result, title);
        Modal.success({
          title: `导出完成, 请检查下载文件`,
          onOk: () => {}
        });
      } else {
        Modal.error({
          title: `导出失败`,
          content: '网络或服务器错误',
          onOk: () => {}
        });
      }
    }

    // 善后
    window.onbeforeunload = function () {};
    clearInterval(cancelTimer);
    setExportProgress(exportProgress.url, null); // 移除导出记录
  } else {
    //导出当前页
    params['executeID'] = getSequence();
    result = await $ajax(url, params, 'post', { responseType: 'arraybuffer' });
    handleExport(result, title);
  }
};

/**
 * 导出选中行
 * @param {*} url
 * @param {*} params
 * @param {*} title
 * @param {boolean} status 为true，则直接根据接收的params发起请求，否则构造之后再发请求
 */
export const exportSelectFile = async (url, params, title, status = false) => {
  if (!status) {
    if (!params.rows.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    let newParams = [];
    params.rows.forEach(element => {
      newParams.push(element.id);
    });
    let result = await await $ajax(
      url,
      { selectList: newParams, includeFieldList: params.includeFieldList },
      'post',
      { responseType: 'arraybuffer' }
    );
    handleExport(result, title);
  } else {
    let result = await await $ajax(url, params, 'post', { responseType: 'arraybuffer' });
    handleExport(result, title);
  }
};

// 导出全部和当前页，文件名根据后端接口返回
export const exportFileWithNoName = async (url, params, isAll) => {
  let title = '';
  if (isAll) {
    delete params['reqPageNum'];
    delete params['reqPageSize'];
  }
  delete params['clearingStatus'];
  let result = await $ajax(url, params, 'post', { responseType: 'arraybuffer' });
  if (localStorage.getItem('content-disposition')) {
    let filename = localStorage.getItem('content-disposition');
    title = decodeURIComponent(filename.split('=')[1]);
  }
  handleExport(result, title);
};

// 导出选择行
export const exportSelectFileOpening = async (url, params, title) => {
  if (!params.length) {
    message.error('请选择需要导出的项目');
    return;
  }
  let result = await await $ajax(url, params, 'post', { responseType: 'arraybuffer' });
  handleExport(result, title);
};

/** 导出控制接口
 * @param {string} infoUrl 接口地址
 * @param {string} executeID 导出批次号
 * @param {"query"|"stop"} control  查询进度或停止导出
 */
function httpExecuteInfo(infoUrl, executeID, control = 'query') {
  return $ajax(infoUrl, executeID, 'post', {
    params: {
      operate: control
    },
    mask: false
  });
}

/**
 * 进度查询与数据更新
 * @param {string} queryUrl 查询进度的url地址
 * @param {object} exportProgress 导出进程记录的 对象引用
 * @param {object} modal 要更新的Modal组件
 * @param {number} timer 要清除的定时器
 */
function query(queryUrl, exportProgress, modal, timer) {
  httpExecuteInfo(queryUrl, exportProgress.executeID, 'query').then(progressResult => {
    const { data, winRspType } = progressResult || {};
    if (winRspType === 'SUCC') {
      if (data === null) {
        exportProgress.percent = 100;
      } else if (typeof data === 'object') {
        // 暂存状态状态
        exportProgress.percent = Math.round(data.rate || 0);
        exportProgress.total = data.total || ' ... ';
      }
      modal.update &&
        modal.update({
          content: (
            <div>
              <Progress
                percent={exportProgress.percent}
                status={exportProgress.percent < 100 ? 'active' : 'success'}
              />
              <span>共{exportProgress.total}条</span>
            </div>
          )
        });

      if (exportProgress.percent == 100) {
        clearInterval(timer);
        modal.destroy && modal.destroy();
      }
    } else {
      // 网络出错情况下停止查询, 防止大量请求导致页面卡顿
      clearInterval(timer);
      message.warn('查询导出进度失败, 请重试');
      modal.destroy && modal.destroy();
    }
  });
}

// ### tools ###
/** 时间戳加随机序列生成16位随机批次号 */
function getSequence() {
  let timestamp = new Date().getTime().toString();
  timestamp = timestamp.substring(timestamp.length - 11);
  const randomStamp = Math.random().toString().substring(2, 7);
  return timestamp + randomStamp;
}

/** 通过url, 读取Storage中的exportList对应记录 */
function getExportProgress(url) {
  let exportList = JSON.parse(sessionStorage.getItem('exportList') || '[]');
  const exportRecord = exportList.find(item => item.url == url);
  return exportRecord;
}

/** 处理Storage中的exportList记录 */
function setExportProgress(url, record) {
  let exportList = JSON.parse(sessionStorage.getItem('exportList') || '[]');
  const idx = exportList.findIndex(item => item.url == url);
  if (idx > -1) {
    if (record) {
      exportList[idx] = record; // 更新记录
    } else {
      exportList.splice(idx, 1); // 移除记录
    }
  } else {
    if (record) {
      exportList.push(record); // 新增记录
    } else {
      return;
    }
  }
  sessionStorage.setItem('exportList', JSON.stringify(exportList));
}

/**
 *
 * @param {*} result 二进制流
 * @param {*} title 下载文件标题
 * @param {*} fileType 下载文件类型
 * @returns
 */
const handleDownload = (result, title, fileType) => {
  if (!result) return false;
  const aLink = document.createElement('a');
  let blob = new Blob([result], { type: fileType.content });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, title + '.' + fileType.type);
  } else {
    aLink.href = URL.createObjectURL(blob);
    aLink.download = title;
    aLink.click();
    document.body.appendChild(aLink);
  }
};

/**
 *
 * @param {*} checkedList  [] 需要下载模板的字段 必填
 * @param {*} downloadFileList {交易日历: 'trading_calendar',...} 下载的模板信息 必填
 * @param {*} downloadUrl
 * @returns
 */
export const downloadFile = async (
  checkedList = [],
  downloadFileList = {},
  downloadUrl = '/bmtp-common-basicparameter/biz/template/download'
) => {
  if (checkedList.length == 0) {
    message.error('请选择需要下载的文件模板');
    return;
  }
  let fileType = '',
    title = '下载模板';
  let result = await $ajax(downloadUrl, checkedList, 'post', {
    responseType: 'arraybuffer',
    timeout: 0
  });
  // 设置文件下载类型 单个文件为xlsx 多个文件为zip
  if (checkedList.length >= 2) {
    fileType = {
      content: 'application/zip',
      type: 'zip'
    };
  } else {
    fileType = {
      content: 'application/vnd.ms-excel',
      type: 'xlsx'
    };
    title = findKey(downloadFileList, checkedList[0]) + '-' + title;
  }
  // 简单校验文件是否正确
  if (result.byteLength && result.byteLength > 500) {
    handleDownload(result, title, fileType);
    Modal.success({
      title: `文件下载完成, 请检查下载文件`,
      onOk: () => {}
    });
  } else {
    Modal.error({
      title: `导出失败`,
      content: '网络或服务器错误',
      onOk: () => {}
    });
  }
};
/** 根据值找对应的键 用于处理下载文件名*/
const findKey = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find(k => compare(obj[k], value));
};
