import { page } from 'yss-biz';
import { message } from 'antd';
export default {
  /**是否展示弹框*/
  openFormModal(state, { sign }) {
    return state.merge({
      isOpenFormModal: {
        sign
      }
    });
  },

  /**选择一条表格账户记录进行保存*/
  saveRowProduct(state, value) {
    return state.set('selectPro', value);
  },

  /**账户-获取账户树性结构code*/
  getAccountCodes(state, { value }) {
    return state.set('accountCodes', value);
  },

  /**修改弹框金额*/
  changeMoney(state, { value }, { getState }) {
    let newState = getState();
    let newList = newState.get('batchRefundList').toJS
      ? newState.get('batchRefundList').toJS()
      : newState.get('batchRefundList');
    // 当前数据中最小的可用余额
    let minUsableAmount = newList.reduce((pre, cur) => {
      if (pre > cur.usableAmount) return cur.usableAmount;
      else return pre;
    }, Number.MAX_VALUE)
    let val = value.split(',').join('');
    if (val < 0) {
      message.error("请输入正数");
      return;
    } else if (val > minUsableAmount) {
      message.error("输入值大于当前最小可用余额");
      return;
    }
    let newList2 = newList.map(item => {
      let money;
      if (item.toJS) {
        money = item.toJS();
      } else {
        money = item;
      }
      return {
        ...money,
        drawingMoney: val,
        drawingAfterMoney: pointProblem(money.usableAmount, val),
        drawingAfterTotalMoney: pointProblem(money.totalAmount, val)
      };
    });

    function pointProblem(arg1, arg2, type) {
      if (arg1 == '') arg1 = 0;
      if (arg2 == '') arg2 = 0;
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
    return state.set('batchRefundList', newList2);
  },

  /**修改行信息中的编辑修改*/
  changeMoneyByEdit(state, { value, rowId }, { getState }) {
    let newState = getState();
    let newList = newState.get('batchRefundList').toJS
      ? newState.get('batchRefundList').toJS()
      : newState.get('batchRefundList');
    let newList2 = newList.map(item => {
      const { id } = item;
      if (id === rowId) {
        let money;
        let val = value.split(',').join('');
        if (item.toJS) {
          money = item.toJS();
        } else {
          money = item;
        }
        if (val < 0) {
          message.error("请输入正数");
          return money;
        } else if (val > item.usableAmount) {
          message.error("输入值大于当前可用余额");
          return money;
        }


        return {
          ...money,
          drawingMoney: val,
          drawingAfterMoney: pointProblem(money.usableAmount, val),
          drawingAfterTotalMoney: pointProblem(money.totalAmount, val)
        };
      } else {
        return {
          ...(item.toJS ? item.toJS() : item)
        };
      }
    });

    function pointProblem(arg1, arg2, type) {
      if (arg1 == '') arg1 = 0;
      if (arg2 == '') arg2 = 0;
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
    return state.set('batchRefundList', newList2);
  },

  /**选择一条表格账户记录进行保存*/
  // changeTableRow (state, { type, value }) {
  //   return state.set(type, value);
  // },

  /**账户-修改状态*/
  changeaCountStatus(state, { value, type }) {
    return state.setIn([type, 'accountStatus'], value);
  },

  /**账户-修改审核状态*/
  changecheckStatus(state, { value, type }) {
    return state.setIn([type, 'checkStatus'], value);
  },

  /**账户-修改账户主体*/
  changeRelatedSubjectCodes(state, { type, value }) {
    // return state.set(state.get("queryCapitalElement").get("relatedSubjectCodes"), value);
  },

  /**现券买卖-成交编号与债券名称*/
  changeTransactionNumberList(state, { value, sing, type }) {
    return state.setIn([sing, type], value);
  },

  /**现券买卖-交易方向*/
  changeTradeDirection(state, { sing, value }) {
    return state.setIn([sing, 'tradeDirection'], value);
  },

  /**切换指令查询***/
  changeClearingStatus(state, { value, sing }) {
    return state.setIn([sing, 'clearingStatus'], value);
  },

  /**修改加载***/
  changeSpinning(state, { value }, { getState }) {
    state = getState();
    return state.set('isSpinning', value);
  },

  /**获取当前页面***/
  changeReqPageNum(state, { value, sing }) {
    return state.setIn([sing, 'reqPageNum'], value);
  },
  setQueryElement(state, values, { getState }) {
    state = getState();
    let queryElement = state.get('queryElement').toJS();

    return state.merge({
      queryElement: { ...queryElement, ...values }
    });
  },
  // 设置表格数据
  setTableDatas(state, rows, { getState }) {
    return state.merge({
      batchRefundList: Array.isArray(rows) ? rows : [rows]
    });
  },
  // 重置
  toResetSearch(state, queryElement) {
    return state.merge({
      queryElement: {
        ...page,
        ...queryElement
      }
    });
  },
  setPageQueryParam(state, page) {
    const { reqPageNum, reqPageSize } = page;
    if (!reqPageSize) {
      return state.setIn(['pageReqParm', 'reqPageNum'], reqPageNum);
    } else {
      return state
        .setIn(['pageReqParm', 'reqPageNum'], reqPageNum)
        .setIn(['pageReqParm', 'reqPageSize'], reqPageSize);
    }
  },
};
