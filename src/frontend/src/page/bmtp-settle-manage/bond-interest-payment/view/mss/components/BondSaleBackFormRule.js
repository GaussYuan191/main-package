import React, { PureComponent } from 'react';
// import { message } from 'antd';
import { NormalForm, setFieldsObject } from 'yss-biz';
import moment from 'moment';

class FormRule extends PureComponent {
  render() {
    // const {} = this.props;

    const me = this;

    const disabled = false; //全局控制是弹窗项否可操作

    const formItems = [
      {
        name: 'bondAccount1',
        label: '管理人',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '管理人不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择管理人'
        }
      },
      {
        name: 'bondAccount2',
        label: '产品名称',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '产品名称不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择产品名称'
        }
      },
      {
        name: 'bondAccount3',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          disabled,
          placeholder: '请选择成交日期'
        }
      },
      {
        name: 'bondAccount4',
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
          placeholder: '请选择付息兑付日期'
        }
      },
      {
        name: 'bondAccount5',
        label: '证券代码',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '证券代码不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择证券代码',
          onChange(value, { props }) {
            me.bondClientForm.setValues({
              bondAccountName: props.children.split(' - ')[1]
            });
          }
        }
      },
      {
        name: 'bondAccountName',
        label: '证券名称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '证券名称不能为空'
          }
        ],
        props: {
          disabled: true,
          placeholder: '证券名称'
        }
      },
      {
        name: 'bondAccount6',
        label: '成交编号',
        type: 'Input',
        props: {
          disabled,
          placeholder: '请输入成交编号'
        }
      },
      {
        name: 'bondAccount7',
        label: '源成交编号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '源成交编号不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请输入源成交编号'
        }
      },
      {
        name: 'bondAccount8',
        label: '券面总额（万元）',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '券面总额不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请输入券面总额',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')
        }
      },
      {
        name: 'bondAccount9',
        label: '交易金额（元）',
        type: 'InputNumber',
        props: {
          disabled,
          placeholder: '请输入交易金额',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3')
        }
      },
      {
        name: 'bondAccount0',
        label: '结算金额（元）',
        type: 'InputNumber',
        props: {
          disabled,
          placeholder: '请输入结算金额',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3')
        }
      },
      {
        name: 'bondAccount11',
        label: '应计利息（元）',
        type: 'InputNumber',
        props: {
          disabled,
          placeholder: '请输入应计利息',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3')
        }
      },
      {
        name: 'bondAccount12',
        label: '交易费用（元）',
        type: 'InputNumber',
        props: {
          disabled,
          placeholder: '请输入交易费用',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3')
        }
      },
      {
        name: 'bondAccount13',
        label: '结算费用（元）',
        type: 'InputNumber',
        props: {
          disabled,
          placeholder: '请输入结算费用',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3')
        }
      }
    ];

    return (
      <>
        <NormalForm
          refs={ref => (this.bondClientForm = ref)}
          labelSize="10em"
          lineOf={3}
          formItem={formItems}
        />
      </>
    );
  }

  componentDidMount() {
    // 组件加载时，根据操作类型判断是否填充数据
    // console.log(this.props);
    this.props.onRef(this);
    const { rowed, isBondOpenFormModal } = this.props;
    if (isBondOpenFormModal.type !== 'add') {
      this.bondClientForm.setValues({
        ...setFieldsObject(rowed, isBondOpenFormModal.type),
        bondAccount3: moment(rowed.bondAccount3, 'YYYY-MM-DD')
      });
    } else {
      this.bondClientForm.onReset();
    }
  }

  // 提交按钮
  async handleSubmit(e) {
    e.preventDefault();
    // const { isBondOpenFormModal } = this.props;
    // if (isBondOpenFormModal.type === 'delete') {
    //   //删除操作
    // } else {
    //   let form = this.bondClientForm.props.form;
    //   form.validateFields((err, value) => {
    //     const params = {
    //       ...value,
    //       bondAccount3: value['bondAccount3'].format('YYYY-MM-DD')
    //     };
    //     // console.log(params);
    //     if (err) {
    //       return;
    //     }
    //   });
    // }
  }
}

export default FormRule;
