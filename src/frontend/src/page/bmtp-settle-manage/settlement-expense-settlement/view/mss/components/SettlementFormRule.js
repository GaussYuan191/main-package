import React, { PureComponent } from 'react';
import { message } from 'antd';
import { NormalForm, setFieldsObject, selectPageRequest, compute } from 'yss-biz';
import moment from 'moment';
const { mapOption } = NormalForm;

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
    totalAmount: 0,
    previousUnpaidAmount: 0,
    currentPayableAmount: 0,
    productIdList: [] // 管理人查询产品下拉数据 联动
  };
  render() {
    const { isOpenFormModal } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';

    const formItems = [
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '结算机构不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择结算机构',
          getDics: 1030404
        }
      },
      {
        name: 'chargeType',
        label: '费用类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '费用类型不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择费用类型',
          getDics: 1030137
        }
      },
      {
        name: 'expenseStartDate',
        label: '费用计提开始日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '费用计提开始日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '费用计提开始日'
        }
      },
      {
        name: 'expenseEndDate',
        label: '费用计提截止日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '费用计提截止日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '费用计提截止日'
        }
      },
      {
        name: 'chargeStartDate',
        label: '费用缴纳开始日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '费用缴纳开始日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '费用缴纳开始日'
        }
      },
      {
        name: 'chargeEndDate',
        label: '费用缴纳截止日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '费用缴纳结束日不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '费用缴纳结束日'
        }
      },
      // {
      //   name: 'currentPayableAmount',
      //   label: '本期应缴费金额(元)',
      //   type: 'InputNumber',
      //   rules: [
      //     {
      //       required: true,
      //       message: '本期应缴费金额不能为空'
      //     },
      //     { pattern: /^.{0,11}$/, message: '允许输入最大长度11' }
      //   ],
      //   props: {
      //     disabled,
      //     initialValue: '0.00',
      //     placeholder: '请输入本期应缴费金额',
      //     addonAfter: <div>元</div>,
      //     onChange: value => {
      //       this.setState({ currentPayableAmount: parseFloat(value) || 0 }, () => {
      //         this.setState({
      //           totalAmount: compute(
      //             value, //parseFloat(this.state.currentPayableAmount),
      //             parseFloat(this.state.previousUnpaidAmount),
      //             'plus'
      //           )
      //         });
      //       });
      //     }
      //   }
      // },
      // {
      //   name: 'previousUnpaidAmount',
      //   label: '往期未缴费金额(元)',
      //   type: 'InputNumber',
      //   rules: [
      //     {
      //       required: true,
      //       message: '往期未缴费金额不能为空'
      //     },
      //     { pattern: /^.{0,11}$/, message: '允许输入最大长度11' }
      //   ],
      //   props: {
      //     disabled,
      //     initialValue: '0.00',
      //     placeholder: '请输入往期未缴费金额',
      //     addonAfter: <div>元</div>,
      //     onChange: value => {
      //       this.setState({ previousUnpaidAmount: parseFloat(value) || 0 }, () => {
      //         this.setState({
      //           totalAmount: compute(
      //             parseFloat(this.state.currentPayableAmount),
      //             value, //parseFloat(this.state.previousUnpaidAmount),
      //             'plus'
      //           )
      //         });
      //       });
      //     }
      //   }
      // },
      // {
      //   name: 'payableTotalAmount222', //设置自定义数据展示时，name不能取有值的，否则返回固定内容
      //   label: '应缴费金额合计(元)',
      //   type: 'InputNumber',
      //   rules: [{ pattern: /^.{0,11}$/, message: '允许输入最大长度11' }],
      //   props: {
      //     disabled: true,
      //     // initialValue: this.state.totalAmount,
      //     placeholder: this.state.totalAmount,
      //     addonAfter: <div>元</div>
      //   }
      // },
      {
        name: 'currentPayableAmount',
        label: '应缴费金额(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '应缴费金额不能为空'
          },
          { pattern: /^.{0,11}$/, message: '允许输入最大长度11' }
        ],
        props: {
          disabled,
          initialValue: '0.00',
          min: 0,
          placeholder: '请输入应缴费金额',
          addonAfter: <div>元</div>
          // onChange: value => {
          //   this.setState({ currentPayableAmount: parseFloat(value) || 0 }, () => {
          //     this.setState({
          //       totalAmount: compute(
          //         value, //parseFloat(this.state.currentPayableAmount),
          //         parseFloat(this.state.paidFeeAmount),
          //         'minus'
          //       )
          //     });
          //   });
          // }
        }
      },
      {
        name: 'paidFeeAmount',
        label: '已缴费金额(元)',
        type: 'InputNumber',
        rules: [{ pattern: /^.{0,11}$/, message: '允许输入最大长度11' }],
        props: {
          disabled,
          initialValue: '0.00',
          min: 0,
          placeholder: '请输入已缴费金额',
          addonAfter: <div>元</div>
          // onChange: value => {
          //   this.setState({ paidFeeAmount: parseFloat(value) || 0 }, () => {
          //     this.setState({
          //       totalAmount: compute(
          //         parseFloat(this.state.currentPayableAmount),
          //         value, //parseFloat(this.state.paidFeeAmount),
          //         'minus'
          //       )
          //     });
          //   });
          // }
        }
      },
      {
        name: 'previousUnpaidAmount',
        label: '未缴费金额(元)',
        type: 'InputNumber',
        rules: [{ pattern: /^.{0,11}$/, message: '允许输入最大长度11' }],
        props: {
          disabled,
          initialValue: '0.00',
          min: 0,
          placeholder: '请输入未缴费金额',
          addonAfter: <div>元</div>
        }
      },
      {
        name: 'payableTotalAmount', //设置自定义数据展示时，name不能取有值的，否则返回固定内容
        label: '缴费金额(元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '缴费金额不能为空'
          },
          { pattern: /^.{0,11}$/, message: '允许输入最大长度11' }
        ],
        props: {
          disabled,
          initialValue: '0.00',
          min: 0,
          placeholder: '请输入缴费金额',
          addonAfter: <div>元</div>
        }
      },

      {
        name: 'beneficiaryName',
        label: '收款人',
        type: 'Input',
        rules: [{ pattern: /^.{0,50}$/, message: '允许输入最大长度50' }],
        props: {
          disabled,
          placeholder: '请输入收款人'
        }
      },

      {
        name: 'beneficiaryAccount',
        label: '收款账号',
        type: 'Input',
        rules: [{ pattern: /^.{0,25}$/, message: '允许输入最大长度25' }],
        props: {
          disabled,
          placeholder: '请输入收款账号'
        }
      },

      {
        name: 'beneficiaryBankName',
        label: '开户行名称',
        type: 'Input',
        rules: [{ pattern: /^.{0,25}$/, message: '允许输入最大长度25' }],
        props: {
          disabled,
          placeholder: '请输入开户行名称'
        }
      },

      {
        name: 'beneficiaryBankCode',
        label: '开户行行号',
        type: 'Input',
        rules: [{ pattern: /^.{0,50}$/, message: '允许输入最大长度50' }],
        props: {
          disabled,
          placeholder: '请输入开户行行号'
        }
      },
      {
        name: 'remark',
        label: '附言',
        type: 'Input',
        rules: [{ pattern: /^.{0,250}$/, message: '允许输入最大长度250' }],
        props: {
          disabled,
          placeholder: '请输入附言称'
        }
      },
      {
        name: 'paymentNotice',
        label: '缴费通知编号',
        type: 'Input',
        rules: [{ pattern: /^.{0,100}$/, message: '允许输入最大长度100' }],
        props: {
          disabled,
          placeholder: '请输入缴费通知编号'
        }
      },
      {
        isLine: true
      },
      {
        name: 'managerCode',
        label: '所属管理人',
        type: 'Select',
        props: {
          placeholder: '请选择所属管理人',
          configDics: selectPageRequest,
          type: 'consignor',
          onChange: value => {
            let params = {
              isDataAuth: '0',
              refManagerCode: value
            };
            if (value) {
              this.props.asyncHttpGetProductIdFromConsigor(params).then(() => {
                const list = this.props.productIdList.map(item => ({
                  label: item.productName,
                  value: item.productCode
                }));
                this.setState({
                  productIdList: list
                });
              });
            } else {
              this.setState({ productIdList: [] });
              // this.clientForm.setValues({ productId: null });
              this.clientForm.onReset(['productId']);
            }
          }
        }
      },
      {
        name: 'productId',
        label: '所属产品',
        type: 'Select',
        props: {
          placeholder: '请选择所属产品'
          // configDics: selectPageRequest,
          // extrParam: {
          //   isDataAuth: '0',
          //   refManagerCode: this.state.refManagerCode
          // },
          // type: 'product'
          // isOK: this.productIdList ? false : true
        },
        options: this.state.productIdList
      },
      {
        isLine: true
      }
    ];
    return (
      <>
        <NormalForm
          refs={ref => (this.clientForm = ref)}
          labelSize="12em"
          lineOf={3}
          formItem={formItems}
        />
      </>
    );
  }

  componentDidMount() {
    const { isOpenFormModal, rowed } = this.props;
    this.props.onRef(this);
    // console.log(rowed, 'rowed', isOpenFormModal);
    const { expenseStartDate, expenseEndDate, chargeStartDate, chargeEndDate } = rowed;
    const momentExpenseStartDate = expenseStartDate ? moment(expenseStartDate, 'YYYY-MM-DD') : null;
    const momentExpenseEndDate = expenseEndDate ? moment(expenseEndDate, 'YYYY-MM-DD') : null;
    const momentChargeStartDate = chargeStartDate ? moment(chargeStartDate, 'YYYY-MM-DD') : null;
    const momentChargeEndDate = chargeEndDate ? moment(chargeEndDate, 'YYYY-MM-DD') : null;
    this.setState({
      totalAmount: isOpenFormModal.type == 'add' ? 0 : rowed.payableTotalAmount,
      previousUnpaidAmount: isOpenFormModal.type == 'add' ? 0 : rowed.previousUnpaidAmount,
      currentPayableAmount: isOpenFormModal.type == 'add' ? 0 : rowed.currentPayableAmount
    });
    //表单初始化
    this.clientForm.setValues({
      ...setFieldsObject(rowed, isOpenFormModal.type),
      expenseStartDate: isOpenFormModal.type == 'add' ? '' : momentExpenseStartDate,
      expenseEndDate: isOpenFormModal.type == 'add' ? '' : momentExpenseEndDate,
      chargeStartDate: isOpenFormModal.type == 'add' ? '' : momentChargeStartDate,
      chargeEndDate: isOpenFormModal.type == 'add' ? '' : momentChargeEndDate
    });
  }

  /**点击确定进行增加修改操作**/
  async handleSubmit(e) {
    const {
      asyncHttpAddRow,
      asyncHttpUpDateRow,
      asyncHttpDeleteRow,
      openFormModal,
      isOpenFormModal,
      rowed
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type === 'delete') {
      asyncHttpDeleteRow({ params: rowed }).then(res => {
        openFormModal({ type: 'add', status: false });
      });
    } else {
      this.clientForm.props.form.validateFields((err, values) => {
        if (!err) {
          if (values.chargeStartDate.valueOf() > values.chargeEndDate.valueOf()) {
            message.error('费用缴纳开始日期不能大于截止日');
            return;
          }
          if (values.expenseStartDate.valueOf() > values.expenseEndDate.valueOf()) {
            message.error('费用计提开始日期不能大于截止日');
            return;
          }
          const action = {
            add: asyncHttpAddRow,
            update: asyncHttpUpDateRow
          };
          let params = {
            ...values,
            id: rowed.id,
            chargeStartDate: values.chargeStartDate.format('YYYY-MM-DD'),
            chargeEndDate: values.chargeEndDate.format('YYYY-MM-DD'),
            expenseStartDate: values.expenseStartDate.format('YYYY-MM-DD'),
            expenseEndDate: values.expenseEndDate.format('YYYY-MM-DD'),
            payableTotalAmount: this.state.totalAmount
          };
          action[isOpenFormModal.type]({
            params
          }).then(res => {
            openFormModal({ type: 'add', status: false });
          });
        } else {
          message.error('请按要求填写');
        }
      });
    }
  }
}

export default FormRule;
