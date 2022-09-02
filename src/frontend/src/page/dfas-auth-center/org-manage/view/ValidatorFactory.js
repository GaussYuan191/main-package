export default class ValidatorFactory {
  /**
   * 长度校验  （maxlength == minlength 时将限制长度为固定值）
   * @param maxlength  最大长度
   * @param minlength 最小长度
   */
  static lengthValidator(maxlength, minlength = 0) {
    if (maxlength === minlength) {
      return (rule, value) => {
        if (value && value.length !== maxlength) {
          return Promise.reject(`长度必须为${maxlength}`);
        }
        return Promise.resolve();
      };
    } else {
      return (rule, value) => {
        if (value && value.length > maxlength) {
          return Promise.reject(`长度不能超过${maxlength}`);
        }
        if (value && value.length < minlength) {
          return Promise.reject(`长度不能小于${minlength}`);
        }
        return Promise.resolve();
      };
    }
  }

  /**
   * 正则表达式格式校验
   * @param regex  用于校验的正则表达式
   * @param errMsg 校验失败提示信息
   *
   */
  static formatValidator(regex, errMsg) {
    return (rule, value) => {
      if (value && !regex.test(value)) {
        return Promise.reject(errMsg);
      }
      return Promise.resolve();
    };
  }

  /**
   * 确认密码校验
   * @param form    表单对象
   * @param pwdFieldName  表单密码字段名（当前字段为确认密码）
   * @param errMsg 校验失败提示信息
   *
   */
  static confirmPwdValidator(form, pwdFieldName, errMsg = '两次输入密码不一致！') {
    return (rule, value) => {
      let pwd = form.getFieldValue(pwdFieldName);
      if (pwd && value && pwd !== value) {
        return Promise.reject(errMsg);
      }
      return Promise.resolve();
    };
  }
}
