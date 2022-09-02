import React, { PureComponent } from 'react';
import { message, Modal } from 'antd';
import { NormalForm, setFieldsObject, selectPageRequest, compute } from 'yss-biz';
import moment from 'moment';
// import async from '../../../control/async';
// const { mapOption } = NormalForm;
const { confirm } = Modal;

export const formLayout_second = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

class FormRule extends PureComponent {
  state = {
    bondCode: '',
    tradeDate: ''
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.boldBalanceNum != nextProps.boldBalanceNum) {
      this.clientForm.setValues({
        proCarryBal: nextProps.boldBalanceNum
      });
    }
    if (this.props.faceRate != nextProps.faceRate) {
      this.clientForm.setValues({
        bondCouponRate: nextProps.faceRate
      });
    }
  }

  render() {
    const {
      isOpenFormModal,
      // toSetBondRelation,
      // bondRelation,
      bondAccoutList,
      // toSetBondAccoutRelation,
      // bondAccoutRelation,
      asyncHttpBoldBalance,
      asyncHttpFaceRate
      // boldBalanceNum,
      // faceRate
    } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';
    const me = this;

    const formItems = [
      {
        name: 'bondAccount',
        label: '债券账号',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '债券账号不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择债券账号',
          onChange(value, { props }) {
            // toSetBondAccoutRelation({ accountName: props.children.split(' - ')[1] });
            me.clientForm.setValues({
              bondAccountName: props.children.split(' - ')[1]
            });
          }
        },
        options: bondAccoutList
      },
      {
        name: 'bondAccountName',
        label: '债券账户名称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '请选择债券账户名称'
          }
        ],
        props: {
          disabled: true,
          placeholder: '债券账户名称'
          // initialValue: bondAccoutRelation.accountName || '',
          // value: bondAccoutRelation.accountName || ''
        }
      },
      {
        name: 'tradeDate',
        label: '付息兑付日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '付息兑付日期不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择付息兑付日期',
          onChange(value) {
            let val = value ? value.format('YYYY-MM-DD') : '';
            me.setState({
              tradeDate: val
            });
            if (me.state.bondCode && val) {
              asyncHttpBoldBalance({
                listCode: me.state.bondCode,
                tradeDate: val
              });
            }
          }
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '债券代码不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择债券代码',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange: async (value, options) => {
            if (!value) {
              return;
            }
            // toSetBondRelation({
            //   proCarryBal: options.props.children ? options.props.children : ''
            // });
            let selectedItem = me.getOptionData(value, options);
            me.clientForm.setValues({
              bondName: options.props.children ? options.props.children.split(' - ')[1] : '',
              bondCouponRate: selectedItem ? selectedItem.couponRate : undefined
            });
            me.setState({
              bondCode: value
            });
            if (me.state.tradeDate) {
              await asyncHttpBoldBalance({
                listCode: value,
                tradeDate: me.state.tradeDate
              });
            }
            // await asyncHttpFaceRate({ code: value });
          }
        }
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '债券名称不能为空'
          }
        ],
        props: {
          disabled: true,
          placeholder: '债券名称'
          // initialValue: bondRelation.securityName || '',
          // value: bondRelation.securityName || ''
        }
      },
      {
        name: 'proCarryBal',
        label: '持仓余额(万元)',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '持仓余额不能为空'
          }
        ],
        props: {
          disabled: true,
          placeholder: '持仓余额'
          // initialValue: boldBalanceNum,
          // value: boldBalanceNum
        }
      },
      {
        name: 'bondPaymentCategory',
        label: '付息兑付种类',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '付息兑付种类不能为空'
          }
        ],
        props: {
          disabled,
          getDics: 1030146,
          placeholder: '请输入付息兑付种类'
        }
      },
      {
        name: 'bondCouponRate',
        label: '票面利率(%)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '票面利率不能为空'
          },
          { pattern: /^[^\.]*(\..{0,12})?$/, message: '允许输入最长12位小数' }
        ],
        props: {
          disabled,
          placeholder: '请输入票面利率',
          max: 100,
          formatter: value =>
            `${value}`
              .replace(/[^\-\.\d]/g, '')
              .replace(/(?!^)\-/g, '')
              .replace(/^(\-)?(\d*)\.(\d*)(.*)$/, '$1$2.$3')
          // initialValue: faceRate,
          // value: faceRate
        }
      },
      {
        name: 'bondExeRate',
        label: '本期执行利率(年利率%)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '本期执行利率不能为空'
          },
          { pattern: /^[^\.]*(\..{0,12})?$/, message: '允许输入最长12位小数' }
        ],
        props: {
          disabled,
          placeholder: '请输入本期执行利率',
          max: 100,
          formatter: value =>
            `${value}`
              .replace(/[^\-\.\d]/g, '')
              .replace(/(?!^)\-/g, '')
              .replace(/^(\-)?(\d*)\.(\d*)(.*)$/, '$1$2.$3')
        }
      },
      {
        name: 'curinterStaDate',
        label: '本期计息起息日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '本期计息起息日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择本期计息起息日'
        }
      },
      {
        name: 'curinterEndDate',
        label: '本期计息结息日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '本期计息结束日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择本期计息结束日'
        }
      },
      {
        name: 'captiPaymentDate',
        label: '资金支付日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '资金支付日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请输入资金支付日'
        }
      },
      {
        name: 'realInterVal',
        label: '实际划付利息(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '实际划付利息不能为空'
          },
          { pattern: /^.{0,35}$/, message: '允许输入最大长度35' }
        ],
        props: {
          placeholder: '请输入实际划付利息',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          // initialValue: 0.0,
          disabled,
          min: 0,
          onChange: value => {
            const form = this.clientForm.props.form;
            let lx = form.getFieldValue('realCaptialVal')
              ? form.getFieldValue('realCaptialVal')
              : 0;
            let bj = compute(value, lx, 'plus');
            form.setFieldsValue({ realCapinterTotal: bj });
          }
        }
      },
      {
        name: 'realCaptialVal',
        label: '实际划付本金(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '实际划付本金不能为空'
          },
          { pattern: /^.{0,35}$/, message: '允许输入最大长度35' }
        ],
        props: {
          disabled,
          placeholder: '请输入实际划付本金',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          min: 0,
          // initialValue: 0.0,
          onChange: value => {
            const form = this.clientForm.props.form;
            let lx = form.getFieldValue('realInterVal') ? form.getFieldValue('realInterVal') : 0;
            let bj = compute(value, lx, 'plus');
            form.setFieldsValue({ realCapinterTotal: bj });
          }
        }
      },
      {
        name: 'realCapinterTotal',
        label: '实际划付本息合计(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '实际划付本息合计不能为空'
          },
          { pattern: /^.{0,35}$/, message: '允许输入最大长度35' }
        ],
        props: {
          disabled: true,
          placeholder: '请输入实际划付本息合计',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          min: 0
          // initialValue: 0.0
        }
      },
      {
        name: 'tempInterVal',
        label: '暂不划付利息(元)',
        type: 'InputNumber',
        rules: [{ pattern: /^.{0,35}$/, message: '允许输入最大长度35' }],
        props: {
          disabled,
          placeholder: '请输入暂不划付利息',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          min: 0,
          // initialValue: 0.0,
          onChange: value => {
            const form = this.clientForm.props.form;
            let lx = form.getFieldValue('tempCaptialVal')
              ? form.getFieldValue('tempCaptialVal')
              : 0;
            let bj = compute(value, lx, 'plus');
            form.setFieldsValue({ tempCapinterTotal: bj });
          }
        }
      },
      {
        name: 'tempCaptialVal',
        label: '暂不划付本金(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '暂不划付本金不能为空'
          },
          { pattern: /^.{0,35}$/, message: '允许输入最大长度35' }
        ],
        props: {
          disabled,
          placeholder: '请输入暂不划付本金',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          min: 0,
          // initialValue: 0.0,
          onChange: value => {
            const form = this.clientForm.props.form;
            let lx = form.getFieldValue('tempInterVal') ? form.getFieldValue('tempInterVal') : 0;
            let bj = compute(value, lx, 'plus');
            form.setFieldsValue({ tempCapinterTotal: bj });
          }
        }
      },
      {
        name: 'tempCapinterTotal',
        label: '暂不划付本息合计(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '暂不划付本息合计不能为空'
          },
          { pattern: /^.{0,35}$/, message: '允许输入最大长度35' }
        ],
        props: {
          disabled: true,
          placeholder: '请输入暂不划付本息合计',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          // initialValue: 0.0
          min: 0
        }
      },
      {
        name: 'fee',
        label: '手续费(元)',
        type: 'InputNumber',
        rules: [{ pattern: /^.{0,35}$/, message: '允许输入最大长度35' }],
        props: {
          disabled,
          placeholder: '请输入手续费',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
          min: 0
          // initialValue: 0.0
        }
      }
    ];
    return (
      <>
        <NormalForm
          refs={ref => (this.clientForm = ref)}
          labelSize="10em"
          lineOf={3}
          formItem={formItems}
        />
      </>
    );
  }

  componentDidMount() {
    const {
      isOpenFormModal,
      rowed,
      toSetBondAccoutRelation,
      toSetBoldBalanceNum,
      toSetFaceRate
      // toSetBondRelation
    } = this.props;
    this.props.onRef(this);
    // const { asyncHttpAllBondList } = this.props;
    // asyncHttpAllBondList({}); //获取债券信息
    //表单初始化
    if (isOpenFormModal.type != 'add') {
      this.clientForm.setValues({
        ...setFieldsObject(rowed, isOpenFormModal.type),
        tradeDate: isOpenFormModal.type == 'add' ? '' : moment(rowed.tradeDate, 'YYYY-MM-DD'),
        curinterStaDate:
          isOpenFormModal.type == 'add' ? '' : moment(rowed.curinterStaDate, 'YYYY-MM-DD'),
        curinterEndDate:
          isOpenFormModal.type == 'add' ? '' : moment(rowed.curinterEndDate, 'YYYY-MM-DD'),
        captiPaymentDate:
          isOpenFormModal.type == 'add' ? '' : moment(rowed.captiPaymentDate, 'YYYY-MM-DD')
      });
      if (isOpenFormModal.type != 'add') {
        this.setState({
          tradeDate: rowed.tradeDate ? moment(rowed.tradeDate, 'YYYY-MM-DD') : '',
          bondCode: rowed.bondCode || ''
        });
        toSetBoldBalanceNum(rowed.proCarryBal || '');
        toSetFaceRate(rowed.bondCouponRate || '');
        // toSetBondRelation({securityName: });
      }
    } else {
      this.clientForm.onReset();
      // toSetBondRelation({});
      toSetBondAccoutRelation({});
      toSetBoldBalanceNum('');
      toSetFaceRate('');
    }
  }

  /**点击确定进行增加修改操作**/
  async handleSubmit(e) {
    const {
      asyncHttpAddRow,
      asyncHttpUpDatRow,
      asyncHttpDeleteRow,
      openFormModal,
      isOpenFormModal,
      rowed,
      toSetBondAccoutRelation,
      toSetBoldBalanceNum,
      toSetFaceRate
      // toSetBondRelation
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type == 'delete') {
      confirm({
        title: '是否确认删除？',
        onOk() {
          asyncHttpDeleteRow(rowed).then(() => {
            openFormModal({ type: 'add', status: false });
          });
        }
      });
    } else {
      this.clientForm.props.form.validateFields((err, values) => {
        if (!err) {
          let end = moment(values.curinterEndDate).format('YYYY-MM-DD');
          let start = moment(values.curinterStaDate).format('YYYY-MM-DD');
          if (moment(end).valueOf() < moment(start).valueOf()) {
            message.error('本期计息结息日不能小于本期计息起息日');
            return;
          }
          const action = {
            add: asyncHttpAddRow,
            update: asyncHttpUpDatRow
          };
          let params = {
            ...values,
            tradeDate: values['tradeDate'].format('YYYY-MM-DD'),
            curinterStaDate: values['curinterStaDate'].format('YYYY-MM-DD'),
            curinterEndDate: values['curinterEndDate'].format('YYYY-MM-DD'),
            captiPaymentDate: values['captiPaymentDate']
              ? values['captiPaymentDate'].format('YYYY-MM-DD')
              : '',
            bondCode: this.state.bondCode,
            tempInterVal: values['tempInterVal'] ? values['tempInterVal'] : 0,
            fee: values['fee'] ? values['fee'] : 0,
            id: rowed.id,
            intreReachStatus: isOpenFormModal.type == 'add' ? '1' : rowed.intreReachStatus
          };
          action[isOpenFormModal.type]({
            params
          }).then(res => {
            openFormModal({ type: 'add', status: false });
            // toSetBondRelation({});
            toSetBondAccoutRelation({});
            toSetBoldBalanceNum('');
            toSetFaceRate('');
          });
        } else {
          message.error('请按要求填写');
        }
      });
    }
  }

  // 搜索债券信息
  // callSearch = value => {
  //   const { asyncHttpAllBondList } = this.props;
  //   asyncHttpAllBondList({
  //     param: { bondCode: value }
  //   });
  // };

  /** 通过下拉框onChange事件参数, 获取选中的源数据对象 */
  getOptionData = (value, options) => {
    let {
      _owner: {
        memoizedState: { dataSource: dataSource }
      }
    } = options || {};
    let selectedItem = (dataSource || []).find(item => {
      return item.value === value;
    });
    return selectedItem || {};
  };
}

export default FormRule;
