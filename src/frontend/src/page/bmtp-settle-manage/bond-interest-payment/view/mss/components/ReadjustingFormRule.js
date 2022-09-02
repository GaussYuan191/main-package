import React, { PureComponent } from 'react';
import { Row, message, Input } from 'antd';
import {
  NormalForm,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  ConfigableTable,
  compute
} from 'yss-biz';

import 'yss-biz/common/style/customAntd.less';
class ContractModal extends PureComponent {
  state = {
    bzId: '',
    realInterVal: 0, //实际划付利息
    realCaptialVal: 0, //实际划付本金
    realInterestsList: [], //实际划付利息数组
    realVCorpusList: [], //实际划付本金数组
    tempInterVal: 0, //暂不划付利息
    tempCaptialVal: 0, //暂不划付本金
    withholdInterestsList: [], //暂不划付利息数组
    withholdCorpusList: [], //暂不划付本金数组
    remarkArr: [], //备注数组
    meltInBondInterest: 0, //融入券应付利息
    meltInBondList: [], //融入券应付利息
    realList: [], //排序之后,当前的数据顺序
    realCapinterVal: 0, //实际划付本息合计
    realCapinterList: [], //实际划付本息合计数组
    tempCapinterVal: 0, //暂不划付本息合计
    tempCapinterList: [] //暂不划付本息合计数组
  };

  render() {
    const { readjustingColumn, readjustingList, selectRow } = this.props;
    const columns = [
      ...setColumns(readjustingColumn),
      {
        title: '实际划付利息(元)',
        key: 'realInterVal',
        width: 150,
        align: 'right',
        dataIndex: 'realInterVal',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <Input
              disabled={selectRow.intreReachStatus == 2 ? false : true}
              defaultValue={record.realInterVal}
              onChange={e => {
                let realInterestsList = this.state.realInterestsList;
                realInterestsList[index] = parseFloat(e.target.value) || 0;
                let realCapinterList = this.state.realCapinterList;
                realCapinterList[index] = compute(
                  e.target.value,
                  this.state.realVCorpusList[index],
                  'plus'
                );
                this.setState(
                  {
                    realInterestsList
                  },
                  () => {
                    this.computedCountMoney(realInterestsList, 'realInterVal');
                    this.computedCountMoney(realCapinterList, 'realCapinterVal');
                  }
                );
              }}
            ></Input>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.realInterVal}</span>
          );
        }
      },
      {
        title: '融入券应付利息(元)',
        key: 'meltInBondInterest',
        width: 150,
        align: 'right',
        dataIndex: 'meltInBondInterest',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <Input
              defaultValue={record.meltInBondInterest}
              disabled={
                selectRow.intreReachStatus == 2 && record.meltInBondInterest != 0 ? false : true
              }
              onChange={e => {
                let meltInBondList = this.state.meltInBondList;
                meltInBondList[index] = parseFloat(e.target.value) || 0;
                this.setState(
                  {
                    meltInBondList
                  },
                  () => {
                    this.computedCountMoney(meltInBondList, 'meltInBondInterest');
                  }
                );
              }}
            ></Input>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.meltInBondInterest}</span>
          );
        }
      },
      {
        title: '实际划付本金(元)',
        key: 'realCaptialVal',
        width: 150,
        align: 'right',
        dataIndex: 'realCaptialVal',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <Input
              defaultValue={record.realCaptialVal}
              disabled={selectRow.intreReachStatus == 2 ? false : true}
              onChange={e => {
                let realVCorpusList = this.state.realVCorpusList;
                realVCorpusList[index] = parseFloat(e.target.value) || 0;
                let realCapinterList = this.state.realCapinterList;
                realCapinterList[index] = compute(
                  e.target.value,
                  this.state.realInterestsList[index],
                  'plus'
                );
                this.setState(
                  {
                    realVCorpusList
                  },
                  () => {
                    this.computedCountMoney(realVCorpusList, 'realCaptialVal');
                    this.computedCountMoney(realCapinterList, 'realCapinterVal');
                  }
                );
              }}
            ></Input>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.realCaptialVal}</span>
          );
        }
      },
      {
        title: '实际划付本息合计(元)',
        key: 'realCapinterTotal',
        width: 150,
        align: 'center',
        dataIndex: 'realCapinterTotal',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <span style={{ color: '#E6A23C' }}>{this.state.realCapinterList[index] || 0}</span>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.realCapinterVal || 0}</span>
          );
        }
      },
      {
        title: '暂不划付利息(元)',
        key: 'tempInterVal',
        width: 150,
        align: 'right',
        dataIndex: 'tempInterVal',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <Input
              defaultValue={record.tempInterVal}
              disabled={selectRow.intreReachStatus == 2 ? false : true}
              onChange={e => {
                let withholdInterestsList = this.state.withholdInterestsList;
                withholdInterestsList[index] = parseFloat(e.target.value) || 0;
                let tempCapinterList = this.state.tempCapinterList;
                tempCapinterList[index] = compute(
                  e.target.value,
                  this.state.withholdCorpusList[index],
                  'plus'
                );
                this.setState(
                  {
                    withholdInterestsList
                  },
                  () => {
                    this.computedCountMoney(withholdInterestsList, 'tempInterVal');
                    this.computedCountMoney(tempCapinterList, 'tempCapinterVal');
                  }
                );
              }}
            ></Input>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.tempInterVal}</span>
          );
        }
      },
      {
        title: '暂不划付本金(元)',
        key: 'tempCaptialVal',
        width: 150,
        align: 'right',
        dataIndex: 'tempCaptialVal',
        render: (row, record, index) => {
          return index < readjustingList.length ? (
            <Input
              defaultValue={record.tempCaptialVal}
              disabled={selectRow.intreReachStatus == 2 ? false : true}
              onChange={e => {
                let withholdCorpusList = this.state.withholdCorpusList;
                withholdCorpusList[index] = parseFloat(e.target.value) || 0;
                let tempCapinterList = this.state.tempCapinterList;
                tempCapinterList[index] = compute(
                  e.target.value,
                  this.state.withholdInterestsList[index],
                  'plus'
                );
                this.setState(
                  {
                    withholdCorpusList
                  },
                  () => {
                    this.computedCountMoney(withholdCorpusList, 'tempCaptialVal');
                    this.computedCountMoney(tempCapinterList, 'tempCapinterVal');
                  }
                );
              }}
            ></Input>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.tempCaptialVal}</span>
          );
        }
      },
      {
        title: '暂不划付本息合计(元)',
        key: 'tempCapinterTotal',
        width: 250,
        align: 'center',
        dataIndex: 'tempCapinterTotal',
        render: (row, d, index) => {
          return index < readjustingList.length ? (
            <span style={{ color: '#E6A23C' }}>{this.state.tempCapinterList[index] || 0}</span>
          ) : (
            <span style={{ color: '#E6A23C' }}>{this.state.tempCapinterVal || 0}</span>
          );
        }
      },
      {
        title: '人工调整备注',
        key: 'remark',
        width: 200,
        align: 'center',
        dataIndex: 'remark',
        render: (row, record, index) => {
          let remarkArr = this.state.remarkArr;
          return index < readjustingList.length ? (
            <Input
              disabled={selectRow.intreReachStatus == 2 ? false : true}
              defaultValue={record.remark}
              onChange={e => {
                remarkArr[index] = e.target.value;
                this.setState({
                  remarkArr
                });
              }}
              onBlur={() => {
                this.setState({
                  bzId: ''
                });
              }}
            ></Input>
          ) : (
            ''
          );
          // return this.state.bzId == record.id ? (
          //   <Input
          //     defaultValue={record.remark}
          //     onChange={e => {
          //       remarkArr[index] = e.target.value;
          //       this.setState({
          //         remarkArr
          //       });
          //     }}
          //     onBlur={() => {
          //       this.setState({
          //         bzId: ''
          //       });
          //     }}
          //   ></Input>
          // ) : (
          //   <span
          //     onClick={() => {
          //       this.setState({
          //         bzId: record.id
          //       });
          //     }}
          //     style={{ color: 'red' }}
          //   >
          //     {remarkArr[index]}
          //   </span>
          // );
        }
      }
    ];

    /**合计**/
    const totalRow = {
      id: String(Math.random()),
      serialNumber: '合计'
    };

    let formItems = [
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          disabled: true,
          placeholder: selectRow.bondCode
        }
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Input',
        props: {
          disabled: true,
          placeholder: selectRow.bondName
        }
      },

      {
        name: 'tradeDate',
        label: '付息兑付日期',
        type: 'DatePicker',
        props: {
          disabled: true,
          placeholder: selectRow.tradeDate
        }
      },

      {
        name: 'bondPaymentCategoryName',
        label: '兑付类别',
        type: 'Select',
        props: {
          disabled: true,
          placeholder: selectRow.bondPaymentCategoryName
        }
      },
      {
        name: 'realInterestsTotal',
        label: '实际划付利息(元)',
        type: 'Input',
        props: {
          placeholder: selectRow.realInterVal,
          disabled: true
        }
      },

      {
        name: 'realVCorpusTotal',
        label: '实际划付本金(元)',
        type: 'Input',
        props: {
          placeholder: selectRow.realCaptialVal,
          disabled: true
        }
      },
      {
        name: 'withholdInterestsTotal',
        label: '暂不划付利息(元)',
        type: 'Input',
        props: {
          placeholder: selectRow.tempInterVal,
          disabled: true
        }
      },
      {
        name: 'withholdCorpusTotal',
        label: '暂不划付本金(元)',
        type: 'Input',
        props: {
          placeholder: selectRow.tempCaptialVal,
          disabled: true
        }
      }
    ];
    let rowSelection = rowSelectionFunc.call(this);

    let _this = this;
    return (
      <>
        <Row className="hr">
          <NormalForm
            refs={ref => (this.createForm = ref)}
            labelSize="8em"
            lineOf={3}
            formItem={formItems}
          />
        </Row>
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: [...readjustingList, totalRow],
              rowSelection,
              rowKey: 'id',
              pagination: { hideOnSinglePage: true },
              scroll: { x: 800, y: 40 },
              onChange(pagination, filters, sorter, extra) {
                //每次调整排序时，将对应的数据（实际划付本息合计、暂不划付本息合计）也排序
                const { currentDataSource } = extra;
                let startList = _this.state.realList;
                let len = readjustingList.length;
                let arr = []; //调整顺序之后的对应关系（第i条数据调整后变成了第j条）
                let newarr1 = [],
                  newarr2 = [],
                  newarr3 = [],
                  newarr4 = [],
                  newarr5 = [],
                  newarr6 = [],
                  newarr7 = [],
                  newarr8 = [];
                for (let i = 0; i < len; i++) {
                  for (let j = 0; j < len; j++) {
                    if (currentDataSource[i].id == startList[j].id) {
                      arr.push(j);
                    }
                  }
                  newarr1[i] = _this.state.realCapinterList[arr[i]];
                  newarr2[i] = _this.state.tempCapinterList[arr[i]];
                  newarr3[i] = _this.state.realInterestsList[arr[i]];
                  newarr4[i] = _this.state.realVCorpusList[arr[i]];
                  newarr5[i] = _this.state.withholdInterestsList[arr[i]];
                  newarr6[i] = _this.state.withholdCorpusList[arr[i]];
                  newarr7[i] = _this.state.remarkArr[arr[i]];
                  newarr8[i] = _this.state.meltInBondList[arr[i]];
                }
                _this.setState({
                  realCapinterList: newarr1,
                  tempCapinterList: newarr2,
                  realInterestsList: newarr3,
                  realVCorpusList: newarr4,
                  withholdInterestsList: newarr5,
                  withholdCorpusList: newarr6,
                  remarkArr: newarr7,
                  meltInBondList: newarr8,
                  realList: currentDataSource.slice(0, -1),
                  mapRalation: arr
                });
              }
            })}
          />
        </Row>
      </>
    );
  }

  async componentDidMount() {
    this.props.onRef(this);
    this.initializationData();
  }

  // 初始化赋值
  initializationData = () => {
    const { readjustingList } = this.props;
    if (readjustingList.length < 1) {
      message.error('目前没有可调整的数据');
      return;
    }

    let arr1 = [],
      arr2 = [],
      arr3 = [],
      arr4 = [],
      arr5 = [],
      arr6 = [],
      arr7 = [],
      arr8 = [];
    let value1 = 0,
      value2 = 0,
      value3 = 0,
      value4 = 0,
      value5 = 0,
      value7 = 0,
      value8 = 0;
    readjustingList.map(item => {
      arr1.push(item.realInterVal);
      value1 += Number(item.realInterVal);
      arr2.push(item.realCaptialVal);
      value2 = value2 + parseFloat(item.realCaptialVal);
      arr3.push(item.tempInterVal);
      value3 = value3 + parseFloat(item.tempInterVal);
      arr4.push(item.tempCaptialVal);
      value4 = value4 + parseFloat(item.tempCaptialVal);
      arr5.push(item.remark);
      arr6.push(item.meltInBondInterest);
      value5 = value5 + parseFloat(item.meltInBondInterest);
      arr7.push(item.realCapinterTotal);
      value7 += Number(item.realCapinterTotal);
      arr8.push(item.tempCapinterTotal);
      value8 += Number(item.tempCapinterTotal);
    });
    this.setState({
      realInterVal: this.fixFloatCalcRudely(value1),
      realCaptialVal: this.fixFloatCalcRudely(value2),
      tempInterVal: this.fixFloatCalcRudely(value3),
      tempCaptialVal: this.fixFloatCalcRudely(value4),
      meltInBondInterest: this.fixFloatCalcRudely(value5),
      realCapinterVal: this.fixFloatCalcRudely(value7),
      tempCapinterVal: this.fixFloatCalcRudely(value8),
      realInterestsList: arr1,
      realVCorpusList: arr2,
      withholdInterestsList: arr3,
      withholdCorpusList: arr4,
      meltInBondList: arr6,
      remarkArr: arr5,
      realCapinterList: arr7,
      tempCapinterList: arr8,
      realList: readjustingList
    });
  };

  // 解决0.1+0.2!=0.3的精度问题
  fixFloatCalcRudely(num) {
    if (typeof num == 'number') {
      var str = num.toString(),
        match = str.match(/\.(\d*?)(9|0)\2{5,}(\d{1,5})$/);
      if (match != null) {
        return num.toFixed(match[1].length) - 0;
      }
    }
    return num;
  }

  // 提交还原值
  async handleSubmit(e) {
    e.preventDefault();
    const {
      readjustingList,
      selectRow,
      asyncHttpSaveAjustResult,
      openFormModal,
      asyncHttpGetList
    } = this.props;
    const {
      realInterestsList,
      realVCorpusList,
      withholdInterestsList,
      withholdCorpusList,
      remarkArr,
      meltInBondList,
      realList,
      realCapinterList,
      tempCapinterList
    } = this.state;
    if (readjustingList.length < 1) {
      message.error('目前没有可调整的数据');
      return;
    }

    if (selectRow.intreReachStatus != 2) {
      message.error('只有已拆分的数据才可以手工调整！');
      return;
    }

    for (let i = 0; i < readjustingList.length; i++) {
      if (realList[i].meltInBondInterest == 0 && this.state.meltInBondList[i] != 0) {
        message.error('无融入券，不能调整融入利息');

        return;
      }
      if (realList[i].meltInBondInterest != 0 && this.state.meltInBondList[i] == 0) {
        message.error('有融入券，不可以把融入利息调成0');
        return;
      }
    }
    if (
      selectRow.realInterVal != this.state.realInterVal ||
      selectRow.realCaptialVal != this.state.realCaptialVal ||
      selectRow.tempInterVal != this.state.tempInterVal ||
      selectRow.tempCaptialVal != this.state.tempCaptialVal
      // selectRow.meltInBondInterest != this.state.meltInBondInterest
    ) {
      message.error('手动调整金额有误，请重新核对!');
      return;
    }
    // if(selectRow.realInterestsTotal){

    // }
    let params = [];
    // let list = [...readjustingList];
    let list = [...realList];
    list.map((val, idx) => {
      val.realInterVal = realInterestsList[idx].toString();
      val.realCaptialVal = realVCorpusList[idx].toString();
      val.meltInBondInterest = meltInBondList[idx].toString();
      val.realCapinterTotal = realCapinterList[idx].toString();
      val.tempInterVal = withholdInterestsList[idx].toString();
      val.tempCaptialVal = withholdCorpusList[idx].toString();
      val.tempCapinterTotal = tempCapinterList[idx].toString();
      val.remark = remarkArr[idx];
      params.push({
        batchNo: val.batchNo,
        bondAccount: val.bondAccount,
        bondAccountName: val.bondAccountName,
        bondCode: val.bondCode,
        bondName: val.bondName,
        fee: val.fee,
        id: val.id,
        meltInBondInterest: val.meltInBondInterest,
        parentAssetUnitId: val.parentAssetUnitId,
        parentid: val.parentid,
        proCarryBal: val.proCarryBal,
        realCapinterTotal: val.realCapinterTotal,
        realCaptialVal: val.realCaptialVal,
        realInterVal: val.realInterVal,
        refManagerCode: val.refManagerCode,
        refProductId: val.refProductId,
        remark: val.remark,
        tempCapinterTotal: val.tempCapinterTotal,
        tempCaptialVal: val.tempCaptialVal,
        tempInterVal: val.tempInterVal,
        tradeDate: val.tradeDate,
        transComStatus: val.transComStatus
      });
      return val;
    });
    // this.setState({
    //   readjustingList: list
    // });
    asyncHttpSaveAjustResult &&
      asyncHttpSaveAjustResult({ params }).then(() => {
        openFormModal({ type: 'add', status: false });
        asyncHttpGetList({});
      });
  }

  /****计算调整后的总额 */
  computedCountMoney = (arr, countType) => {
    let sum = 0;
    if (!arr) {
      return;
    }

    arr.forEach(item => {
      sum = compute(sum, Number(item), 'plus');
    });
    this.setState({
      [countType]: sum
    });
  };
}

export default ContractModal;
