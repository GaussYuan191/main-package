const proxy = require('http-proxy-middleware'); // 代理插件为0.20版本, 需采用老版proxy写法

// 代理目标服务器配置
const serverConfig = {
  refector: 'http://192.168.8.107:10018',
  refectorHX: 'http://192.168.7.158:10018',
  refectorMS: 'http://192.168.8.110:10018'
};
const destinationAddress = serverConfig.refector;
const isDev = false; // 是否用dev token调接口

/**http-proxy-middleware基础配置 */
const baseOption = {
  changeOrigin: true, // 注意该配置仅切换host头
  // 消除代理模块存在的默认超时
  proxyTimeout: 1000 * 60 * 30,
  timeout: 1000 * 60 * 30
};

/**认证服务接口代理, 单独拿出来是因为嵌入版多级没有认证中心, 需利用其他服务器获取token */
const authProxy = proxy('/dfas-auth-center', {
  target: destinationAddress,
  ...baseOption,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Origin', destinationAddress); // 适配后端添加的跨域校验规则
  }
});

/**主要接口代理中间件 */
const mainApiProxy = proxy(
  [
    '/bmtp-cash-manage', // 头寸
    '/bmtp-common-basicparameter', // 公共基础
    '/bmtp-product-manage', // 产品
    '/bmtp-settle-manage', // 通用结算
    '/bmtp-clearingorg-manage', // 结算机构 上清中债
    '/bmtp-open-platform', // 开放平台
    '/dfas-base-biz',
    '/dfas-common-file',
    '/dfbp-info-manage'
  ], //匹配路径
  {
    target: destinationAddress, // 目标接口服务器地址
    ...baseOption,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Origin', destinationAddress); // 适配后端添加的跨域校验规则
      isDev && proxyReq.setHeader('Authorization', 'dev'); // 以开发模式身份调用后端接口
    }
  }
);

module.exports = function (app) {
  /* ########### 单独接口覆写区 ########### */

  /* ####################################### */
  /**
   * 绕过网关, 连接服务真实端口
   * 让接口不走鉴权(网关), 同时会绕过后端的跨域校验, 场景同本地swagger;
   * 使用场景:
   * 1.后端挂了本地服务到服务器上导致接口拿不到数据;
   * 2.网关服务挂掉了的情况;
   * ps: auth-center服务的一些接口需要鉴权才能正常返回数据
   */
  // app.use(
  //   proxy("/服务名", {
  //     target: destinationAddress.replace("10018", "服务真实端口号"),
  //     pathRewrite: { "^/服务名": "" },
  //     ...baseOption,
  //   })
  // );

  app.use(mainApiProxy);
  app.use(authProxy);
};
