import React, { Component } from 'react';
import { Row, message, Input } from 'antd';
import {
  NormalForm,
  setColumns,
  setTableInfo,
  // rowSelectionFunc,
  ConfigableTable,
  computedTotalRow,
  keepNDecimals,
  compute
} from 'yss-biz';

import 'yss-biz/common/style/customAntd.less';
class AdjustModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readjustingList: [],
      chargeFormList: [],
      splitChargeAmountSum: '',
      adjustChargeAmountSum: ''
    };
  }

  render() {
    const { readjustingColumn } = this.props;
    const { readjustingList } = this.state;
    const columns = [
      ...setColumns(readjustingColumn),
      {
        title: '费用金额(元)',
        dataIndex: 'splitChargeAmount',
        width: 150,
        render: value => {
          return keepNDecimals(value, 2);
        }
      },
      {
        title: '调整后金额(元)',
        dataIndex: 'adjustChargeAmount',
        width: 150,
        render: (text, record, index) => {
          const { serialNumber, id } = record;
          const { chargeFormList } = this.state;
          // TODO: 优化点,用对象或Map储存chargeFormList, 避免遍历匹配
          const idx = chargeFormList.findIndex(item => item.id === id);
          const isSumColumn = serialNumber && serialNumber === '合计';
          return isSumColumn ? (
            keepNDecimals(record.adjustChargeAmount, 2)
          ) : (
            <Input
              defaultValue={keepNDecimals(
                chargeFormList[idx] && chargeFormList[idx].adjustChargeAmount,
                2
              )}
              onChange={e => {
                if (chargeFormList[idx]) {
                  chargeFormList[idx].adjustChargeAmount = parseFloat(e.target.value) || 0;
                  this.setState({ chargeFormList }, () => {
                    this.computedCountMoney(
                      chargeFormList,
                      'adjustChargeAmount',
                      'adjustChargeAmountSum'
                    );
                  });
                }
              }}
            ></Input>
          );
        }
      },
      {
        title: '人工调整备注',
        dataIndex: 'remark',
        width: 150,
        render: (text, record, index) => {
          const { serialNumber, id } = record;
          const { chargeFormList } = this.state;
          const idx = chargeFormList.findIndex(item => item.id == id);
          let showRemark = (chargeFormList[idx] && chargeFormList[idx].remark) || '';
          if (showRemark === 'null' || showRemark === 'undefined') {
            showRemark = '';
          }
          const isSumColumn = serialNumber && serialNumber === '合计';
          return isSumColumn ? (
            ''
          ) : (
            <Input
              defaultValue={showRemark}
              onChange={e => {
                if (chargeFormList[idx]) {
                  chargeFormList[idx].remark = e.target.value || '';
                  this.setState({ chargeFormList });
                }
              }}
            ></Input>
          );
        }
      }
    ];

    const totalRow = {
      id: String(Math.random()),
      serialNumber: '合计',
      splitChargeAmount: this.state.splitChargeAmountSum, //计算列的总合
      adjustChargeAmount: this.state.adjustChargeAmountSum //计算列的总合
    };

    const rowed = readjustingList[0] || {};

    const { settleInstitutionName = '', chargeTypeName = '' } = rowed;
    const { splitChargeAmountSum = '', adjustChargeAmountSum = '' } = this.state;

    let formItems = [
      {
        name: 'settleInstitutionName',
        label: '结算机构',
        type: 'Input',
        props: {
          disabled: true,
          placeholder: settleInstitutionName
        }
      },

      {
        name: 'chargeTypeName',
        label: '费用类型',
        type: 'Select',
        props: {
          disabled: true,
          placeholder: chargeTypeName
        }
      },
      {
        name: 'splitChargeAmount',
        label: '费用总额(元)',
        type: 'Input',
        props: {
          placeholder: splitChargeAmountSum,
          disabled: true
        }
      },

      {
        name: 'adjustChargeAmount',
        label: '调整后费用总额(元)',
        type: 'Input',
        props: {
          placeholder: adjustChargeAmountSum,
          disabled: true
        }
      }
    ];
    // let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <Row className="hr">
          <NormalForm
            refs={ref => (this.createForm = ref)}
            labelSize="9em"
            lineOf={2}
            formItem={formItems}
          />
        </Row>
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: [...readjustingList, totalRow],
              // rowSelection,
              rowKey: 'id',
              height: 300
            })}
            pagination={false} // 显示所有表单
          />
        </Row>
      </>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetChargeProductAll } = this.props;
    this.props.onRef(this);
    await asyncHttpGetChargeProductAll();
    this.initializationData();
  }

  // 初始化赋值
  initializationData = () => {
    const { readjustingList } = this.props;
    if (readjustingList.length < 1) {
      message.error('目前没有可调整的数据');
      return;
    }

    // 先初始化合计列显示；
    const splitChargeAmountSum = computedTotalRow(readjustingList, 'splitChargeAmount');
    const adjustChargeAmountSum = computedTotalRow(readjustingList, 'adjustChargeAmount');

    let chargeFormList = []; // 初始化调整的数据
    readjustingList.forEach(item => {
      chargeFormList.push({
        id: item.id,
        parentId: item.parentId,
        refProductCode: item.refProductCode,
        refProductName: item.refProductName,
        splitChargeAmount: item.splitChargeAmount,
        adjustChargeAmount: item.adjustChargeAmount,
        remark: item.remark
      });
    });

    this.setState({
      readjustingList,
      chargeFormList,
      splitChargeAmountSum,
      adjustChargeAmountSum
    });
  };

  async handleSubmit(e) {
    const { isOpenFormModal, asyncHttpChargeProductUpdate, openFormModal } = this.props;
    e.preventDefault();
    this.createForm.props.form.validateFields((err, values) => {
      if (!err) {
        const action = {
          update: asyncHttpChargeProductUpdate
        };
        const { chargeFormList, readjustingList } = this.state;
        const paramsArray = [];
        chargeFormList.forEach((item, index) => {
          const idx = readjustingList.findIndex(row => row.id === item.id);
          // 仅提交用户修改过的数据
          if (
            item.adjustChargeAmount != readjustingList[idx].adjustChargeAmount ||
            item.remark != readjustingList[idx].remark
          ) {
            paramsArray.push({
              ...item,
              splitChargeAmount: item.splitChargeAmount + '',
              adjustChargeAmount: item.adjustChargeAmount + '',
              remark: item.remark + ''
            });
          }
        });
        // 获取调整后合计金额，并判断其是否相等；
        const { splitChargeAmountSum, adjustChargeAmountSum } = this.state;
        if (splitChargeAmountSum !== adjustChargeAmountSum) {
          message.error(
            `注意：费用金额（总）（${splitChargeAmountSum}）与调整后金额（总）（${adjustChargeAmountSum}） 不相等请注意！`
          );
          return;
        }

        // 后端指定的目标params {id,refProductCode,splitChargeAmount,adjustChargeAmount,remark}
        action[isOpenFormModal.type]({
          params: paramsArray
        }).then(res => {
          openFormModal({ type: 'update', status: false, sign: 'read' });
        });
      } else {
        message.error('请按要求填写');
      }
    });
  }
  /****计算调整后的总额 */
  computedCountMoney = (arr, countType, resultType) => {
    let sum = 0;
    if (!arr) {
      return;
    }

    arr.forEach(item => {
      sum = compute(sum, Number(item[countType]));
    });
    this.setState({
      [resultType]: sum
    });
  };
}

export default AdjustModal;
