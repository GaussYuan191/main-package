import React, { PureComponent } from 'react';
import { message } from 'antd';
import { NormalForm, setFieldsObject, selectPageRequest, filterNullElement } from 'yss-biz';
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

const getNowTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}-${month}-${day}`;
};

class FormRule extends PureComponent {
  render() {
    const { isOpenFormModal } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';
    // 此处要求根据费用类型字段不同，显示不同的新增效果，一种三种效果，分别定义为formItemsForDefault,formItemsForMaintenanceCharges,formItems3
    // 费用类型一共有4个可能的值，1（结算过户服务费），2（逐笔全额清算手续费），3（账户维护费），4（发行登记费），5（付息兑付服务费）
    const formItemsForDefault = [
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
        name: 'settleType',
        label: '结算方式',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '结算方式不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择结算方式',
          getDics: 1030150
        }
      },
      {
        name: 'tradingProduct',
        label: '交易品种',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '交易品种不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择交易品种',
          getDics: 1030138
        }
      },
      {
        name: 'chargeObject',
        label: '收费对象',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '收费对象不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择收费对象',
          getDics: 1030139
        }
      },
      {
        name: 'chargeFrequency',
        label: '费用收取频率',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '费用收取频率不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择费用收取频率',
          getDics: 1030141
        }
      },
      {
        name: 'chargeTarget',
        label: '收费标的',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '收费标的不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择收费标的',
          getDics: 1030140
        }
      },
      {
        name: 'chargeStandard',
        label: '收费标准',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '收费标准不能为空'
          },
          { pattern: /^.{0,11}$/, message: '允许输入最大长度11' },
          { type: 'number', message: '只能输入数字', transform: value => Number(value) }
        ],
        props: {
          disabled,
          placeholder: '请选择收费标准',
          initialValue: '0.00',
          addonAfter: <div>元</div>
        }
      },
      {
        name: 'paymentDay',
        label: '费用缴纳时间',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '费用缴纳时间不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择费用缴纳时间',
          getDics: 1030142
        }
      },
      {
        label: '开始日期',
        name: 'startDate',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '开始日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择开始日期',
          disabled,
          format: 'YYYY-MM-DD'
        }
      },
      {
        label: '结束日期',
        name: 'endDate',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '结束日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择结束日期',
          disabled,
          format: 'YYYY-MM-DD'
        }
      },
      {
        name: 'chargeAlgorithmType',
        label: '拆分计算方式',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '收拆分计算方式不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择拆分计算方式',
          getDics: 1050011,
          initialValue: '1'
        }
      },
      {
        isLine: true
      }
      // {
      //   name: 'managerCode',
      //   label: '所属管理人',
      //   type: 'Select',
      //   props: {
      //     disabled,
      //     placeholder: '请选择所属管理人',
      //     configDics: selectPageRequest,
      //     type: 'consignor'
      //   }
      // },
      // {
      //   name: 'productId',
      //   label: '所属产品',
      //   type: 'Select',
      //   props: {
      //     disabled,
      //     placeholder: '请选择所属产品',
      //     configDics: selectPageRequest,
      //     extrParam: {
      //       isDataAuth: '0'
      //     },
      //     type: 'product'
      //   }
      // },
      // {
      //   isLine: true
      // }
    ];
    // todo 下面 2中新增面板的形式，暂不考虑实现，故先注释代码
    // const formItemsForMaintenanceCharges = [
    //   {
    //     name: 'settleInstitution',
    //     label: '结算机构',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '结算机构不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择结算机构',
    //       getDics: 1030404
    //     }
    //   },
    //   {
    //     name: 'chargeType',
    //     label: '费用类型',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用类型不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用类型',
    //       getDics: 1030137
    //     }
    //   },
    //   {
    //     name: 'paymentDay',
    //     label: '费用缴纳时间',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用缴纳时间不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用缴纳时间',
    //       getDics: 1030142
    //     }
    //   },
    //   {
    //     name: 'accountType',
    //     label: '账户类型',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '账户类型不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择账户类型',
    //       getDics: 1030143
    //     }
    //   },
    //   {
    //     name: 'chargeTarget',
    //     label: '收费标的',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '收费标的不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择收费标的',
    //       getDics: 1030140
    //     }
    //   },
    //   {
    //     name: 'chargeStandard',
    //     label: '收费标准',
    //     type: 'Input',
    //     rules: [
    //       {
    //         required: true,
    //         message: '收费标准不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择收费标准',
    //       addonAfter: <div>元</div>
    //     }
    //   },
    //   {
    //     name: 'chargeFrequency',
    //     label: '费用收取频率',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用收取频率不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用收取频率',
    //       getDics: 1030141
    //     }
    //   },
    //   {
    //     label: '开始日期',
    //     name: 'startDate',
    //     type: 'DatePicker',
    //     rules: [
    //       {
    //         required: true,
    //         message: '开始日期不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请开始日期',
    //       disabled,
    //       format: 'YYYY-MM-DD'
    //     }
    //   },
    //   {
    //     label: '结束日期',
    //     name: 'endDate',
    //     type: 'DatePicker',
    //     rules: [
    //       {
    //         required: true,
    //         message: '结束日期不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请结束日期',
    //       disabled,
    //       format: 'YYYY-MM-DD'
    //     }
    //   },
    //   {
    //     isLine: true
    //   },
    //   {
    //     name: 'managerCode',
    //     label: '所属管理人',
    //     type: 'Select',
    //     props: {
    //       placeholder: '请选择所属管理人',
    //       config: selectRequest,
    //       type: 'consignor',
    //       onChange(value) {}
    //     }
    //   },
    //   {
    //     name: 'productCode',
    //     label: '所属产品',
    //     type: 'Select',
    //     props: {
    //       placeholder: '请选择所属产品',
    //       config: selectRequest,
    //       type: 'product',
    //       onChange(value) {}
    //     }
    //   },
    //   {
    //     isLine: true
    //   }
    // ];
    // const formItemsForOthers = [
    //   {
    //     name: 'settleInstitution',
    //     label: '结算机构',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '结算机构不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择结算机构',
    //       getDics: 1030404
    //     }
    //   },
    //   {
    //     name: 'chargeType',
    //     label: '费用类型',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用类型不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用类型',
    //       getDics: 1030137
    //     }
    //   },
    //   {
    //     name: 'paymentDay',
    //     label: '费用缴纳时间',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用缴纳时间不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用缴纳时间',
    //       getDics: 1030142
    //     }
    //   },
    //   {
    //     name: 'productDeadline',
    //     label: '产品期限',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '产品期限不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择产品期限',
    //       getDics: 1030148
    //     }
    //   },
    //   {
    //     name: 'chargeRange',
    //     label: '收费范围',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '收费范围不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择收费范围',
    //       getDics: 1030149
    //     }
    //   },
    //   {
    //     name: 'chargeRate',
    //     label: '费率（万分之）',
    //     type: 'Input',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费率不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费率',
    //       initialValue: '0.00'
    //     }
    //   },
    //   {
    //     name: 'chargeFrequency',
    //     label: '费用收取频率',
    //     type: 'Select',
    //     rules: [
    //       {
    //         required: true,
    //         message: '费用收取频率不能为空'
    //       }
    //     ],
    //     props: {
    //       disabled,
    //       placeholder: '请选择费用收取频率',
    //       getDics: 1030141
    //     }
    //   },
    //   {
    //     label: '开始日期',
    //     name: 'startDate',
    //     type: 'DatePicker',
    //     rules: [
    //       {
    //         required: true,
    //         message: '开始日期不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请开始日期',
    //       disabled,
    //       format: 'YYYY-MM-DD'
    //     }
    //   },
    //   {
    //     label: '结束日期',
    //     name: 'endDate',
    //     type: 'DatePicker',
    //     rules: [
    //       {
    //         required: true,
    //         message: '结束日期不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请结束日期',
    //       disabled,
    //       format: 'YYYY-MM-DD'
    //     }
    //   },
    //   {
    //     isLine: true
    //   },
    //   {
    //     name: 'managerCode',
    //     label: '所属管理人',
    //     type: 'Select',
    //     props: {
    //       placeholder: '请选择所属管理人',
    //       config: selectRequest,
    //       type: 'consignor',
    //       onChange(value) {}
    //     }
    //   },
    //   {
    //     name: 'productCode',
    //     label: '所属产品',
    //     type: 'Select',
    //     props: {
    //       placeholder: '请选择所属产品',
    //       config: selectRequest,
    //       type: 'product',
    //       onChange(value) {}
    //     }
    //   },
    //   {
    //     isLine: true
    //   }
    // ];
    return (
      <>
        <NormalForm
          refs={ref => (this.clientForm = ref)}
          labelSize="12em"
          lineOf={3}
          formItem={formItemsForDefault}
        />
      </>
    );
  }

  componentDidMount() {
    const { isOpenFormModal, rowed } = this.props;
    this.props.onRef(this);
    // 表单初始化
    this.clientForm.setValues({
      ...setFieldsObject(rowed, isOpenFormModal.type),
      startDate: isOpenFormModal.type == 'add' ? '' : moment(rowed.startDate, 'YYYY-MM-DD'),
      endDate: isOpenFormModal.type == 'add' ? '' : moment(rowed.endDate, 'YYYY-MM-DD')
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
          const action = {
            add: asyncHttpAddRow,
            update: asyncHttpUpDateRow
          };
          let params = {
            ...values,
            id: rowed.id,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate.format('YYYY-MM-DD')
          };
          action[isOpenFormModal.type]({
            params: filterNullElement(params)
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
