import { service } from 'bmtp-trade-base';
// import { commonErr } from './status';
import apiUrl from './apiUrl';
const $ajax = async (url, data, type, obj) => {
  if (!type && typeof data === 'string' && ['get', 'post', 'delete', 'put'].includes(data)) {
    type = data;
  }

  let urlArr = url.split('.');
  url = urlArr[0];
  let afterUrl = urlArr[1];
  let getUrl = apiUrl[url] || url;
  !!afterUrl && (getUrl = getUrl + '/' + afterUrl);

  return new Promise((resolve, reject) => {
    // console.log(
    service
      .httpService({
        url: getUrl,
        method: type || 'get',
        data,
        ...obj
      })
      .then(res => {
        // 当请求结果中的状态码为正常的时候，返回请求的 data 结果
        if (
          res.winRspType === 'SUCC' ||
          Object.prototype.toString.call(res) === '[object ArrayBuffer]'
        ) {
          return resolve(res);
        } else {
          // 如果请求状态码不正常，根据状态码分派到各个处理函数
          return resolve(res);
        }
      })
      .finally(xx => {
        resolve({
          code: '',
          data: {}
        });
      });
    // )
  });
};
export { $ajax };
