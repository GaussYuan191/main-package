/**
 * @file api地址定义
 * @author lzx
 */

// 方便后续更改api前缀，可设置 proxyTable 代理， 相关配置在 config/index.js
const proxy = {
  gitDics: 'dfas-base-biz'
};

// 数据字典
const gitDis = {
  getDicsById: `${proxy['gitDics']}/dics`,
  getDicsByCode: `${proxy['gitDics']}/dics/listAllSub`
};

// 相关请求地址,可以分模块，自行解决
export default {
  ...gitDis
};
