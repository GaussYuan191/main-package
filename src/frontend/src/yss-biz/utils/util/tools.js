import React from 'react';
import update from 'immutability-helper';
import { typeStatue, checkStatue } from './constant';
import { message } from 'antd';
import { isObject, page, isFunc, ConfirmModal } from 'yss-biz';
import '../../../sofaStyle/tool.less';
// import { appModel } from 'bmtp-trade-base';

// 审核反审核
export const hanbleConfirm = (options = {}) => {
  const {
    rowChecked = [],
    done = () => {},
    then = () => {},
    title = '请确认您的操作',
    success = '',
    error = '',
    response = 'callbackForTableChange'
  } = options;
  if (!rowChecked.length) return message.error('请选择需要操作的数据');
  ConfirmModal({
    title,
    onOk: async () => {
      const data = await done(rowChecked);
      let res = data.get(response);
      if (!res) {
        res = data;
      }
      switch (res.winRspType) {
        case 'SUCC':
          message.success(success || res.msg);
          return then();
        default:
          return message.error(error || res.msg);
      }
    }
  });
};

/**设置字体颜色**/
export const fontColor = (title, color) => {
  return <span style={{ color: color }}>{title}</span>;
};

/**计算列的总和***/
export const computedTotalRow = (list, type) => {
  let sum = 0;
  list.forEach(element => {
    sum = compute(sum, Number(element[type]));
  });
  return sum;
};
/**
 * 保留n位下小数的处理方法
 */

export const keepNDecimals = (value, n) => {
  if (value === undefined || value === null || !n) {
    console.warn(`keepNDecimals入参异常，当前入参依次为value=${value},n=${n}`);
    return value;
  }
  const m = Math.pow(10, n);
  let targetValue = Math.round(Number(value) * m) / m;

  targetValue += '';

  const decimals = targetValue.split('.')[1];
  if (decimals) {
    const length = decimals.length;
    if (length < n) {
      targetValue += '0'.repeat(n - length);
    }
  } else {
    targetValue += '.' + '0'.repeat(n);
  }
  return targetValue;
};

/**数字千分位*/
export const formatNumber = num => {
  if (isNaN(parseFloat(num))) {
    return '0';
  }

  num += '';
  const integer = num.split('.')[0] || '0';
  const decimals = num.split('.')[1] || '';

  const existDecimals = decimals && decimals.length > -1;

  return (
    ('' + Number(integer)).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') +
    (existDecimals ? '.' + decimals : '')
  );
};

/***设置表头信息 */
export const setColumns = function (array, newRenderData = {}) {
  if (isObject(array)) {
    let { list, datas, index } = array;
    list[index] = { ...list[index], ...datas };
    return list;
  }
  let newArray = array || [];
  if (!newArray.length) {
    return;
  }
  const columns = newArray.map((item, index) => {
    let r = /.*\(.*元.*\)$/g;
    let renderData = { ...newRenderData };
    if (item.title === '序号') {
      return {
        title: item.title,
        width: 70,
        dataIndex: item.dataIndex,
        key: item.dataIndex,
        fixed: item.fixed ? item.fixed : false,
        // sorter: (a, b) => {
        //   console.log(idx);
        //   return a[item.dataIndex] > b[item.dataIndex];
        // },
        render: (text, record, index) => {
          if (record.serialNumber == '合计') {
            return (
              <span className="columnLight" style={{ fontWeight: 'bolder' }}>
                合计
              </span>
            );
            // return <span style={{ color: '#E6A23C', fontWeight: 'bolder' }}>合计</span>;
          } else {
            return ++index; //++index相当于index+1
          }
        }
      };
    } else if (item.title === '状态') {
      // 1:启用, 2:停用 3:注销, 若'状态'字段的情况不符合该枚举,
      // 则该字段勿用setColumns进行处理, 或title利用空格'状态 ', 绕开匹配
      return {
        title: '状态',
        dataIndex: item.dataIndex,
        key: item.dataIndex,
        width: item.width,
        sorter: (a, b) => {
          return sortFunction(a[item.dataIndex], b[item.dataIndex]);
        },
        render: column => (
          <span style={{ color: typeStatue[column] }}>
            {column === '1' ? '启用' : column === '2' ? '停用' : '注销'}
          </span>
        )
      };
    } else if (item.title === '审核状态') {
      // 使用注意同上
      return {
        title: '审核状态',
        dataIndex: item.dataIndex,
        key: item.dataIndex,
        width: item.width,
        sorter: (a, b) => {
          return sortFunction(a[item.dataIndex], b[item.dataIndex]);
        },
        render: (column, record, index) => {
          //审核字段可传checkStatus或checkStatusName
          return (
            <span style={{ color: checkStatue[record.checkStatus] }}>
              {record.checkStatus === '2' ? '未审核' : record.checkStatus === '1' ? '已审核' : ''}
            </span>
          );
        }
      };
    } else if (r.test(item.title) || !!item.isAmountType) {
      // 根据字段的标题或手动添加isAmountType参数, 对金额显示进行格式化
      return {
        title: item.title,
        dataIndex: item.dataIndex,
        key: item.dataIndex,
        width: item.width,
        align: 'right',
        ellipsis: true,
        sorter: (a, b) => {
          // 把字符金额转成数字
          return sortFunction(Number(a[item.dataIndex]), Number(b[item.dataIndex]));
        },
        // render: column => <span style={{ color: '#E6A23C' }}>{formatNumber(column)}</span>
        render: column => <span className="columnLight">{formatNumber(column)}</span>
      };
    } else {
      renderData = renderData['all'] || renderData['col' + index] || {};
      return {
        ...item,
        ellipsis: true,
        title:
          typeof renderData.renderTitle === 'function'
            ? renderData.renderTitle(item, index)
            : item.title,
        sorter: (a, b) => {
          return sortFunction(a[item.dataIndex], b[item.dataIndex]);
        },
        render: (text, record, index) => {
          if (item.render) {
            //如果有自定义的render，则直接使用。
            return item.render(text, record, index);
          } else {
            if (
              Object.keys(renderData).length > 0 &&
              typeof renderData.renderContent === 'function'
            ) {
              return renderData.renderContent(text, record, index);
            } else {
              return <span>{text}</span>;
            }
          }
        }
      };
    }
  });
  return columns;
};

/*******表格排序********/

export const sortFunction = function (a, b) {
  // 修复数字金额为0 不排序
  if (!a && a != 0) {
    a = '';
    return false;
  }
  if (!b && b != 0) {
    b = '';
    return false;
  }
  if (typeof a !== 'number') {
    return a.localeCompare(b);
  } else {
    return a - b;
  }
};

/***设置表格属性 */

export const setTableInfo = function (params) {
  let $this = params.target || this;
  return {
    ...params,
    scroll: {
      x: 100,
      y: params.height - (params.tableHeader ? 50 : 20) || 430
    },
    bordered: true,
    pagination: {
      showSizeChanger: true,
      size: 'small',
      ...params.pagination
    },
    onHeaderCellMove: (dragIndex, hoverIndex) => {
      const { columns } = $this.state;
      const dragColumn = columns[dragIndex];
      const hoverColumn = columns[hoverIndex];
      $this.setState(
        update($this.state, {
          columns: {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragColumn],
              [hoverIndex > dragIndex ? hoverIndex - 1 : hoverIndex + 1, 1],
              [dragIndex, 0, hoverColumn]
            ]
          }
        })
      );
    },
    onRowMove: (dragIndex, hoverIndex) => {
      const { dataSource } = $this.state;
      const dragRow = dataSource[dragIndex];
      const hoverRow = dataSource[hoverIndex];
      $this.setState(
        update($this.state, {
          dataSource: {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow],
              [hoverIndex > dragIndex ? hoverIndex - 1 : hoverIndex + 1, 1],
              [dragIndex, 0, hoverRow]
            ]
          }
        })
      );
    },
    onResize: (index, _, { size }) => {
      $this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width
        };
        return { columns: nextColumns };
      });
    },
    rowClassName: (record, index) => (index % 2 === 0 ? 'tableRowBlue' : '')
  };
};

// 设置行字体颜色
export const setRowColor = color => {
  const colorType = {
    error: typeStatue[3],
    warning: typeStatue[2],
    success: typeStatue[1],
    info: typeStatue[0]
  };
  let newColor = isFunc(color) ? color(colorType) : color;
  return { color: colorType[newColor] || newColor };
};

/***勾选表格单选框列获取已经勾选的id */
export const rowSelectionFunc = function (callback) {
  return {
    selectedRowKeys: this.state ? this.state.keys : [],
    onChange: (selectedRowKeys, selectedRows) => {
      //获取批量选择中的批量的Id号;
      let ids = selectedRows.map(item => {
        return item;
      });
      if (typeof callback === 'function') {
        this.setState(() => {
          return { ids, keys: selectedRowKeys };
        });
        return callback(ids);
      } else {
        this.setState(() => {
          return { ids, keys: selectedRowKeys };
        });
      }
    }
  };
};

// 获取当前展示表格的字段值
export const cloumsFunc = function (listName) {
  return {
    currentColums: listName,
    getCurrentColums: ({ type, data }) => {
      this.setState({ [type]: data });
    }
  };
};

/**
 * 过滤对象空的属性
 * @param {object} object 过滤前的对象
 * @param {boolean?} isStrict 启用严格过滤,将空数组和空对象一同过滤
 * @returns {object} 过滤后的对象
 */
export const filterNullElement = (object, isStrict) => {
  let newObject = {};
  for (let key in object) {
    if (
      typeof object[key] === 'number' ||
      typeof object[key] === 'boolean' ||
      (!!object[key] && (isStrict ? Object.keys(object[key]).length : true))
    ) {
      newObject[key] = object[key];
    }
  }
  return newObject;
};

// 过滤对象的分页属性（导出全部用）
export const filterPageElement = object => {
  let newObject = {};
  for (let key in object) {
    if (object[key] && key != 'reqPageSize' && key != 'reqPageNum') {
      newObject[key] = object[key];
    }
  }
  return newObject;
};

/***设置验证表单数据*****/
export const setFieldsObject = (object, type) => {
  let newObject = {};
  Object.keys(object).forEach(item => {
    /*判断当时增加的时候初始化返回空**/
    newObject[item] = type === 'add' ? '' : object[item];
  });
  return newObject;
};

/**对象重置 */
export const restQueryElement = obj => {
  // if (!obj.constructor === Object) {
  //   return;
  // }
  let query = obj;
  let newQuery = {};
  for (let key in query) {
    newQuery[key] = '';
  }
  newQuery.reqPageNum = page.reqPageNum;
  newQuery.reqPageSize = page.reqPageSize;
  return newQuery;
};

/***点击表格复选框，获取选中的行ID,return array代表能能够进行http请求，returen boolean代表存在重复的不能进行http请求***/
export const isCheckTrue = (params, type, sign = 'checkStatus') => {
  let ids = [];
  let isNoCheck = true;
  params.forEach(item => {
    if (item[sign] === type) {
      isNoCheck = false;
      return;
    } else {
      ids.push(item.id);
    }
  });
  if (isNoCheck) {
    return ids;
  } else {
    return isNoCheck;
  }
};

// 格式化表格数据
export const formatTableDatas = (datas = [], prefix = '') => {
  return datas.map((item, index) => {
    item.key = prefix + index;
    return item;
  });
};

/**
 * @description 处理数据的加法和减法运算
 * @params 要计算的参数1
 * @params 要计算的参数2
 * @params 计算的手段，加法 plus[默认是plus] 减法 minus
 * @returns 数字类型处理后的结果
 *
 * @todo 后续可以考虑扩展 乘法 和 除法运算
 */

export const compute = (arg1, arg2, way = 'plus') => {
  arg1 += '';
  arg2 += '';

  if (arg1 == '') arg1 = 0;
  if (arg2 == '') arg2 = 0;

  let r1, r2, m;
  try {
    r1 = arg1.split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2));

  let result = 0;

  switch (way) {
    case 'minus': {
      result = (Math.round(arg1 * m) - Math.round(arg2 * m)) / m;
      break;
    }
    case 'plus':
    default: {
      result = (Math.round(arg1 * m) + Math.round(arg2 * m)) / m;
      break;
    }
  }
  return result;
};

// 获取菜单code
export const getMenuCode = (type, userMenuList) => {
  let code = '';
  // let userMenuList = appModel && (appModel.getState().toJS().userMenuList || []);
  userMenuList &&
    userMenuList.length > 0 &&
    userMenuList.map(item => {
      item.children &&
        item.children.map(val => {
          val.children &&
            val.children.map(v => {
              let arr = v.menuAddress.split('/');
              let str = arr[arr.length - 1];
              if (str == type) {
                code = v.menuCode;
              }
            });
        });
    });
  return code;
};

// url上hash参数转对象方法
export const urlHashToJson = () => {
  let url = window.location.href;
  let toTransUrl;
  if (url) {
    toTransUrl = url.split('?')[1];
  }
  if (toTransUrl) {
    let paramsUrl = toTransUrl.replace('?', '');
    const arr = paramsUrl.split('&').map(item => {
      return item.split('=');
    });
    let result = {};
    for (let [key, value] of Object.values(arr)) {
      if (key) {
        result[key] = decodeURI(value);
      }
    }
    return result;
  } else {
    return {};
  }
};

//设置localStorage
export const setStorage = (name, value) => {
  return localStorage.setItem(name, value);
};

//获取localStorage值
export const getStorage = name => {
  return localStorage.getItem(name);
};

// CST时间格式转换为GMT（中国标准时间）
export const getTaskTime = strDate => {
  if (null == strDate || '' == strDate) {
    return '';
  }
  var dateStr = strDate.trim().split(' ');
  var strGMT =
    dateStr[0] +
    ' ' +
    dateStr[1] +
    ' ' +
    dateStr[2] +
    ' ' +
    dateStr[5] +
    ' ' +
    dateStr[3] +
    ' GMT+0800';
  var date = new Date(Date.parse(strGMT));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? '0' + second : second;

  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

/**
 * 权限过滤
 * @param {reactDom[]} buttonList 待过滤dom
 * @param {object} btnAuth dom权限数据
 * @returns {reactDom[]} 过滤后的dom
 */
export const filterWithAuth = (buttonList, btnAuth) => {
  let newButtonList = [];
  if (!Array.isArray(buttonList)) {
    buttonList = [buttonList];
  }
  btnAuth.deleteBtnList = btnAuth.deleteBtnList || [];
  if (btnAuth?.allFunc) {
    buttonList.forEach(item => {
      let funcName = item.props.funcname || item.props.children;
      if (!btnAuth.deleteBtnList.includes(funcName)) {
        newButtonList.push(item);
      }
    });
  } else {
    buttonList.forEach(item => {
      let funcName = item.props.funcname || item.props.children;
      (btnAuth?.children || []).some(val => {
        if (funcName == val['funcName']) {
          newButtonList.push(item);
          return true;
        }
      });
    });
  }
  return newButtonList;
};
