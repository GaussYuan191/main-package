/**
 * @file 统一错误处理入口
 * @author lzx
 */
import { message } from 'antd';

const requestErrMes = {
  0: '您的网络发生异常，无法连接服务器!',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '数据源不存在，请联系管理员。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。'
};

const notTokenMes = '您还没有登录';

// 服务端错误处理函数
const commonErr = msg => message.error(msg);

// 请求错误处理函数
const requestErr = {};
Object.keys(requestErrMes).forEach(key => {
  requestErr[key] = () => message.error(requestErrMes[key]);
});

const notToken = flag => {
  message.error(notTokenMes);
  return flag;
};

export { requestErr, commonErr, notToken };
