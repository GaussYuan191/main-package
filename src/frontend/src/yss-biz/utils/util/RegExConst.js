/*
  正则表达式常量类
 */

export class RegExConst {
  // 手机号
  static MOBILE_PHONE = /^1[3456789]\d{9}$/;

  // 电话号 0731-12345678
  static TELEPHONE = /^\d{3,4}-\d{7,8}$/;

  // 手机号或电话号
  static CONTACT_INFO = /(^\d{3,4}-\d{7,8}$)|(^1[3456789]\d{9}$)/;

  // 邮箱
  static EMAIL = /^([a-zA-Z0-9_*-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

  // 18位统一社会信用代码
  static CREDIT_CODE = /^[0-9A-Z]{18}$/;

  // 密码
  static PASSWORD = /^(?![0-9\W]+$)(?![a-zA-Z\W]+$)[0-9A-Za-z\W]{6,18}$/;
}
