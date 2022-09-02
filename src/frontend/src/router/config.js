/**
 * @file 路由配置
 * @author lzx
 */

export default [
  // bmtp-product-manage
  'bmtp-product-manage/account', //账户管理
  'bmtp-product-manage/consignor', //管理人管理
  'bmtp-product-manage/product', //产品创设

  // bmtp-cash-manage
  'bmtp-cash-manage/fund-balance', //产品账户余额查询
  'bmtp-cash-manage/fund-detail', //交易明细查询
  'bmtp-cash-manage/money-order', //划款指令管理
  'bmtp-cash-manage/product-carry-balance', //产品持仓查询
  'bmtp-cash-manage/product-carry-detail', //产品持仓明细查询
  'bmtp-cash-manage/sell-repo-expire', //正回购到期业务查询
  'bmtp-cash-manage/standing-book', //台账查询

  // bmtp-common-basicparameter
  'bmtp-common-basicparameter/bank-submitted-data', //人行报送
  'bmtp-common-basicparameter/bond-info', //证券基本资料
  'bmtp-common-basicparameter/cache-content', //缓存内容管理
  'bmtp-common-basicparameter/daily-first', //任务调度处理
  'bmtp-common-basicparameter/daily-knots', //日结处理
  'bmtp-common-basicparameter/data-read', //数据读取
  'bmtp-common-basicparameter/exception-handling', //外部消息管理
  'bmtp-common-basicparameter/fund-name-product', //外汇系统基金设置
  'bmtp-common-basicparameter/log-manage', //控制台管理
  'bmtp-common-basicparameter/system-parameter', //系统参数管理

  // bmtp-settle-manage
  'bmtp-settle-manage/execution-report', //成交查询--tab切换
  'bmtp-settle-manage/instruction-detail-trustee', //清分明细
  'bmtp-settle-manage/instruction-confirm', //结算确认
  'bmtp-settle-manage/carry-check', //持仓核对
  'bmtp-settle-manage/settlement-cost-set', //结算费用设置
  'bmtp-settle-manage/settlement-expense-settlement', //结算费用结算
  'bmtp-settle-manage/bond-interest-payment', //债券付息兑付
  'bmtp-settle-manage/insider-deal', //内转交易管理
  'bmtp-settle-manage/offline-retail', //网下分销
  'bmtp-settle-manage/bond-sale-back', //债券回售
  'bmtp-settle-manage/process-manage', //流程管理
  'bmtp-settle-manage/business-flow', //流程监控
  'bmtp-settle-manage/flow-remind', //流程提醒任务
  'bmtp-settle-manage/settlement-charge-item', //费用条目

  // bmtp-shclearing-manage
  'bmtp-shclearing-manage/full-instruction', //全额结算指令
  'bmtp-shclearing-manage/instruction-manturity-confirm', //全额到期结算指令
  'bmtp-shclearing-manage/settlement', //中债登结算指令管理
  'bmtp-shclearing-manage/settlement-contract', //中债登合同管理
  'bmtp-shclearing-manage/supernatant-settlement', //上清所交易指令管理

  // bmtp-open-platform
  'bmtp-open-platform/url-config', //url配置管理
  // dfas-auth-center
  'dfas-auth-center/data-role-manage', //数据权限管理
  'dfas-auth-center/org-manage', //机构管理
  'dfas-auth-center/role-manage', //角色管理
  'dfas-auth-center/system-menu', //系统菜单管理
  'dfas-auth-center/user-manage', //用户管理
  'dfas-auth-center/user-role-auth', //数据角色管理
  // dfas-base-biz
  // 'dfas-base-biz/data-dictionary', //数据字典
  // 'dfas-base-biz/param-cache', //参数缓存
  // 'dfas-base-biz/param-parameter', //参数表
  // 'dfas-base-biz/param-parameter-log', //参数操作日志表
  // 'dfas-base-biz/sys-version-publish', //系统版本发布信息表
  'dfas-base-biz/trade-day' //交易日历
];
