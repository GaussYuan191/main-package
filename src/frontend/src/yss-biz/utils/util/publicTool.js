import regexp from './regexp';
// 获取 default module
export const getDefaultModule = _module => {
  if (typeof _module === 'function') {
    return _module.prototype === undefined ? _module().default : _module;
  }
};

// 类型判断函数
export const getType = v =>
  Object.prototype.toString
    .call(v)
    .replace(/\[object\s(\w+)\]/, '$1')
    .toLowerCase();

export const isArray = v => getType(v) === 'array';

export const isObject = v => getType(v) === 'object';

export const isString = v => getType(v) === 'string';

export const isFunc = v => getType(v) === 'function';

// 睡眠函数
export const sleep = time =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

// 数组删除方法
export const arrayRemove = val => {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
// 判断数组中是否包含某个字符串
export const include = (str, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (str === arr[i]) {
      return true;
    }
  }
  return false;
};

// 拷贝函数
export const merge = (...rest) => {
  let target = rest[0] || {};
  let src;
  let copy;
  let clone;
  let i = 1;
  let deep = false;
  if (typeof target === 'boolean') {
    deep = target;
    target = rest[1] || {};
    i++;
  }
  for (; i < rest.length; i++) {
    let option = rest[i];
    for (let name in option) {
      src = target[name];
      copy = option[name];
      if (deep && copy && typeof copy === 'object') {
        if (isArray(copy)) {
          clone = src && isArray(src) ? src : [];
        } else {
          clone = src && isObject(src) ? src : {};
        }
        target[name] = merge(clone, copy);
      } else if (copy !== undefined) {
        target[name] = copy;
      }
    }
  }
  return target;
};
// 检测是否有该class
export const hasClass = (el, cls) => {
  if (!el || !cls) {
    return false;
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.');
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};
// 移除class
export const removeClass = (el, cls) => {
  if (!el || !cls) {
    return;
  }
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = (curClass || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  }
};
// 添加class
export const addClass = (el, cls) => {
  if (!el) {
    return;
  }
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

// 添加事件
export const addEvent = (dom, event, fn) => {
  dom.addEventListener(event, fn);
};

// 去除事件
export const removeEvent = (dom, event, fn) => {
  dom.removeEventListener(event, fn);
};

// 对象解析为请求字符串
export const parseToUrl = param => {
  let ret = '';
  Object.keys(param).forEach(item => {
    if (item) {
      let val = typeof param[item] === 'object' ? JSON.stringify(param[item]) : param[item];
      ret += encodeURIComponent(item) + '=' + encodeURIComponent(val) + '&';
    }
  });
  return ret.slice(0, ret.length - 1);
};

// 节流函数
export const throttle = (fn, delay = 1000) => {
  let timer = null;
  let me = this;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(me, ...args);
    }, delay);
  };
};

// 设备判断
export const isMobile = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  for (let v = 0; v < Agents.length; v++) {
    // if (userAgentInfo.indexOf(Agents[v]) > 0) return Agents[v];
    if (userAgentInfo.includes(Agents[v])) return Agents[v];
  }
};

/**获取浏览器版本 */
export const browser = () => {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const browsers = ['Opera', 'Edge', 'Firefox', 'Safari', 'Chrome'];
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp['$1']);
    switch (fIEVersion) {
      case 7:
        return 'IE7';
      case 8:
        return 'IE8';
      case 9:
        return 'IE9';
      case 10:
        return 'IE10';
      default:
        return 0;
    }
  } else if (isIE11) {
    return 'IE11';
  } else {
    for (let i = 0, len = browsers.length; i < len; i++) {
      if (userAgent.indexOf(browsers[i]) > -1) {
        return browsers[i];
      }
    }
    return 0;
  }
};

// 获取 cookie
export const getCookie = name => {
  let arr = document.cookie.split(';');
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split('=');
    if (temp[0].trim() === name) {
      return unescape(temp[1]);
    }
  }
};

// 验证
export const validate = (val, name) => regexp[name].test(val);

// 格式化日期
export const formatDate = (val, type) => {
  let date = new Date(val);
  let seperator = '-';
  if (type === 'year') {
    return date.getFullYear() + '';
  } else if (val === 'month') {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    let currentdate = year + seperator + month;
    return currentdate;
  } else if (type === 'date') {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    let currentdate = year + seperator + month + seperator + strDate;
    return currentdate;
  }
};

// 当前日期
export const getNowFormatDate = type => {
  let date = new Date();
  return formatDate(date, type);
};
// 获取前一天日期
export const getPrevDate = date => {
  var day1 = new Date(date);
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  let month = day1.getMonth() + 1;
  let day = day1.getDate();
  month < 10 && (month = '0' + month);
  day < 10 && (day = '0' + day);
  return day1.getFullYear() + '-' + month + '-' + day;
};
// 判断闰月
export const getCountDays = ym => {
  let curDate = new Date(ym);
  /* 获取当前月份 */
  let curMonth = curDate.getMonth();
  /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
  curDate.setMonth(curMonth + 1);
  /* 将日期设置为0 */
  curDate.setDate(0);
  /* 返回当月的天数 */
  return curDate.getDate();
};

// 获取星期几
export const getDay = days => {
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weeks[new Date().getDay()];
};

// base64 解码
class _BASE64 {
  constructor() {
    this._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  }
  encode(input) {
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var output = '';
    var i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }
    return output;
  }
  decode(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  }
  _utf8_encode(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  _utf8_decode(utftext) {
    var string = '';
    var i = 0;
    var c, c2, c3;
    // c = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
export const BASE64 = new _BASE64();

// 合并对象，相同属性的值相加
export const mergeTogether = obj => {
  let temp = [];

  obj.forEach(function (item, index) {
    let skey = item.date + item.state;

    if (typeof temp[skey] === 'undefined') {
      temp[skey] = item;
    } else {
      for (let k in item.result) {
        temp[skey]['result'][k] += item['result'][k];
      }
    }
  });
  let result = [];
  for (let i in temp) {
    result.push(temp[i]);
  }
  return result;
};

/**
 * 处理echarts数据
 * @param {*} option
 * 源数据集 => []
 * @param {*} params
 * 参数集 =>
 * {
 *  x: 以此属性为 x 轴坐标 ,
 *  filter: 以此属性为过滤条件 ,
 *  valid: 取此属性的值组成数组
 * }
 */

// 处理时间集合
const returnAutoX = dateObj => {
  if (isObject(dateObj)) {
    let { type, tagDate, interval = 1 } = dateObj;
    switch (type) {
      case 'minus':
        let minLen = 1440 / interval;
        let hour = 0;
        let minute = 0;
        let change = 60 / interval;
        let minuArr = ['00:00'];
        for (var i = 1; i < minLen; i++) {
          if (!(i % change)) {
            hour++;
            minute = 0;
          } else {
            minute += interval;
          }
          minuArr.push(
            (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
          );
        }
        return minuArr;
      case 'hours':
        let hourArr = [];
        let hLen = 24 / interval;
        for (i = 0; i < hLen; i++) {
          let currentHour = i * interval;
          hourArr[i] = (currentHour < 10 ? '0' + currentHour : '' + currentHour) + ':00';
        }
        return hourArr;
      case 'days':
        let newMonth = tagDate.split('-')[1];
        let days = getCountDays(tagDate);
        let dLen = days / interval;
        let dayArr = [];
        for (i = 0; i < dLen; i++) {
          let currentDay = i * interval + 1;
          dayArr[i] = newMonth + '-' + (currentDay < 10 ? '0' + currentDay : '' + currentDay);
        }
        return dayArr;
      case 'months':
        let monthArr = [];
        let monLen = 12 / interval;
        for (i = 0; i < monLen; i++) {
          let currentMonth = i * interval + 1;
          monthArr[i] = currentMonth < 10 ? '0' + currentMonth : '' + currentMonth;
        }
        return monthArr;
      case 'years':
        return [];
      default:
    }
    return [];
  }
};
export const formatDS = (option = [], params = {}) => {
  if (!isArray(option)) {
    return false;
  }
  params = isObject(params) ? params : false;
  const { x, autoX, y, filter, valid } = params;
  let keys = isObject(option[0]) ? Object.keys(option[0]) : [];
  if (!isArray(keys)) {
    return false;
  }
  let datas = {};
  let addMonth = '';
  let isMonth = isObject(autoX) && autoX.type === 'days';
  if (isMonth) {
    !autoX.tagDate && (autoX.tagDate = getNowFormatDate('month'));
    addMonth = autoX.tagDate.split('-')[1];
  }
  option.forEach((item, index) => {
    keys.forEach(key => {
      if (!isArray(datas[key])) {
        datas[key] = [];
      }
      let xVal = isMonth && item[x].length === 2 ? addMonth + '-' + item[x] : item[x];
      datas[key][index] =
        !x && !y
          ? item[key]
          : key === x || key === y
          ? item[key]
          : !y
          ? [xVal, item[key] === 'null' || item[key] === null ? 0 : item[key]]
          : [item[y], xVal, item[key] === 'null' || item[key] == null ? 0 : item[key]];
    });
  });
  if (!filter) {
    !!x && (datas[x] = returnAutoX(autoX) || datas[x]);
    return datas;
  } else if (x) {
    let filters = {};
    let filtersNames = [];
    datas[filter].map((item, index) => {
      filtersNames[index] = item.length === 3 ? item[2] : item[1];
      return filtersNames;
    });
    filtersNames = Array.from(new Set(filtersNames));
    filtersNames.map((item, index) => {
      filters['datas' + index] = { values: [], name: item };
      return filters;
    });
    option.forEach(item => {
      for (let key in item) {
        let flag = !valid ? key !== filter && key !== x && key !== y : key === valid;
        if (flag) {
          let addMonth = '';
          let isMonth = isObject(autoX) && autoX.type === 'days';
          if (isMonth) {
            !autoX.tagDate && (autoX.tagDate = getNowFormatDate('month'));
            addMonth = autoX.tagDate.split('-')[1];
          }
          let xVal = isMonth && item[x].length === 2 ? addMonth + '-' + item[x] : item[x];
          filters['datas' + filtersNames.indexOf(item[filter])].values.push(
            !y
              ? [xVal, item[key] === 'null' || item[key] == null ? 0 : item[key]]
              : [item[y], xVal, item[key] === 'null' || item[key] == null ? 0 : item[key]]
          );
          return filters;
        }
      }
    });
    filters[x] = Array.from(new Set(datas[x]));
    filters[x] = returnAutoX(autoX) || filters[x];
    !!y && (filters[y] = Array.from(new Set(datas[y])));
    return filters;
  } else {
    return {};
  }
};
//把小数前的数分成4位处理，不足位添0，例如：123456 => 0012,3456
export const cutNum = nums => {
  //判断Number对象是否有cutNum方法
  let num = '' + nums; //this指需要转换的数，然后由number类型转为string类型
  let len = Math.ceil(num.length / 4);
  let arr = [];
  let v_len = num.length;
  while (len > 0) {
    let cut_start = v_len - 4 > 0 ? v_len - 4 : 0;
    let cut_len = v_len - 4 > 0 ? 4 : v_len;
    let v = num.substr(cut_start, cut_len);
    if (v.length !== 4) {
      arr.push(' '.repeat(4 - v.length) + v);
    } else {
      arr.push(v);
    }
    len--;
    v_len -= 4;
  }
  return arr.length !== 1 ? arr.reverse().join(',') : '' + arr;
};

export const numToChinese = nums => {
  //有小数点的分为两部分：小数前的数firstPart和小数后的数secondPart，小数前的数进行cutNum方法处理
  //如果小数前的数不足4位，添0补位
  let $this = '' + nums,
    firstPart = '',
    secondPart = '';
  if (/\./.test($this)) {
    let arrPre = $this.split('.');
    firstPart = arrPre[0];
    if (firstPart.length > 12) {
      return '数字不能超过仟亿';
    }
    secondPart = arrPre[1];
    if (secondPart.length > 2) {
      return '小数点后的数字不能超过2位';
    }
  } else {
    firstPart = $this;
  }
  //第一部分：处理小数前的数
  let firstPartArr = [];
  if (firstPart.length > 4) {
    firstPartArr = cutNum(parseInt(firstPart)).split(','); //firstPart是字符串类型
  } else {
    firstPartArr = firstPartArr.concat(' '.repeat(4 - firstPart.length) + firstPart);
  }
  const arrMap = [
      ['0', '零'],
      ['1', '壹'],
      ['2', '贰'],
      ['3', '叁'],
      ['4', '肆'],
      ['5', '伍'],
      ['6', '陆'],
      ['7', '柒'],
      ['8', '捌'],
      ['9', '玖']
    ],
    unit = ['仟', '佰', '拾', ''];
  let map = new Map(arrMap), //创建Map对象
    splitAddUnit = [], //存放4位分割后的单位
    returnArr = []; //最终返回的值
  if (firstPartArr.length === 3) {
    splitAddUnit = ['亿', '万'];
  } else if (firstPartArr.length === 2) {
    splitAddUnit = ['万'];
  } else {
    splitAddUnit = [''];
  }
  for (let k = 0; k < firstPartArr.length; k++) {
    for (let j = 0; j < firstPartArr[k].length; j++) {
      if (firstPartArr[k][j] !== 0) {
        //利用Map对象映射相应的值
        let newUnit = [...unit];
        firstPartArr[k][j] === ' ' && (newUnit[j] = '');
        returnArr.push(map.get(firstPartArr[k][j]) + newUnit[j]);
      }
    }
    if (splitAddUnit[k]) {
      returnArr.push(splitAddUnit[k]);
    }
  }
  returnArr.push('元');
  //第二部分：处理小数后的数
  if (secondPart) {
    if (/^0+$/.test(secondPart)) {
      //小数后的数全为0时
      returnArr.push('整');
    } else {
      const pointAfterUnit = ['角', '分'];
      for (let j = 0; j < secondPart.length; j++) {
        let val = map.get(secondPart[j]) + pointAfterUnit[j];
        returnArr.push(val);
      }
    }
  } else {
    returnArr.push('整');
  }
  return returnArr.join('').replace(/undefined/g, '');
};

export const getValue = (object, defaultValue) => {
  if (object == null || object === 'undefine') {
    return defaultValue;
  }
  return object;
};
