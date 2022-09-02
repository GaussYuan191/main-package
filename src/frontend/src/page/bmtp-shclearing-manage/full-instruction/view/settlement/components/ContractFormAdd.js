import React, { Component } from 'react';
import { Modal } from 'antd';
import { NormalForm } from 'yss-biz';

class ContractFormAdd extends Component {
  componentDidMount() {
    // setTimeout(() => {
    //   this.clientForm.setValues({
    //     ...this.props.ids[0]
    //   });
    // }, 10);
  }

  onSubmit = () => {
    const { asyncHttpAddTransactionStatus } = this.props;
    const form = this.clientForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      asyncHttpAddTransactionStatus(values);
      this.props.close();
    });
  };

  render() {
    const formItems = [
      {
        name: 'tradeId',
        label: '交易编号',
        type: 'Input',
        props: {
          disabled: false
        },
        rules: [
          {
            required: true,
            message: '交易编号不能为空'
          }
        ],
        props: {
          placeholder: '请输入交易编号'
        }
      },
      {
        name: 'grossOrderStatus',
        label: '全额结算指令状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '全额结算指令状态不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择全额结算指令状态',
          getDics: 1030311
        }
      },
      // {
      //   name: 'fundSettStatus',
      //   label: '资金结算状态',
      //   type: 'Select',
      //   rules: [
      //     {
      //       required: true,
      //       message: '资金结算状态不能为空'
      //     }
      //   ],
      //   props: {
      //     disabled: false,
      //     placeholder: '请选择资金结算状态',
      //     getDics: 1030313
      //   }
      // },
      // {
      //   name: 'productStatus',
      //   label: '债券结算状态',
      //   type: 'Select',
      //   rules: [
      //     {
      //       required: true,
      //       message: '债券结算状态不能为空'
      //     }
      //   ],
      //   props: {
      //     disabled: false,
      //     placeholder: '请选择债券结算状态',
      //     getDics: 1030312
      //   }
      // },
      {
        name: 'fullOrderType',
        label: '全额指令类型',
        type: 'Select',
        props: {
          disabled: false,
          placeholder: '请选择全额指令类型',
          getDics: 1030314
        }
      },
      {
        name: 'tradeStatus',
        label: '交易状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '交易状态不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择交易状态',
          getDics: 1030303
        }
      },
      // {
      //   name: 'buyerSettleConfirmStatus',
      //   label: '本方状态',
      //   type: 'Select',
      //   props: {
      //     getDics: 1030304,
      //     placeholder: '请选择本方状态'
      //   }
      // },
      // {
      //   name: 'sellerSettleConfirmStatus',
      //   label: '对手方状态',
      //   type: 'Select',
      //   props: {
      //     getDics: 1030304,
      //     placeholder: '请选择对手方状态'
      //   }
      // },
      // {
      //   name: 'payConfirmStatus',
      //   label: '付款确认状态',
      //   type: 'Select',
      //   props: {
      //     getDics: 1030305,
      //     placeholder: '请选择付款确认状态'
      //   }
      // },
      // {
      //   name: 'recvConfirmStatus',
      //   label: '收款确认状态',
      //   type: 'Select',
      //   props: {
      //     getDics: 1030305,
      //     placeholder: '请选择收款确认状态'
      //   }
      // },
      // {
      //   name: 'cashSortFlag',
      //   label: '资金排序标识',
      //   type: 'Input',
      //   props: {
      //     placeholder: ''
      //   }
      // },
      // {
      //   name: 'cashSortStatus',
      //   label: '资金排序状态',
      //   type: 'Input',
      //   props: {
      //     placeholder: ''
      //   }
      // },
      // {
      //   name: 'remark',
      //   label: '指令备注',
      //   type: 'TextArea',
      //   props: {
      //     placeholder: '请输入备注',
      //     autoSize: { minRows: 2, maxRows: 6 },
      //     maxLength: 500
      //   }
      // }
    ];
    return (
      <>
        <Modal
          title="新增全额结算指令"
          visible={this.props.visible}
          width={1200}
          destroyOnClose={true}
          onOk={this.onSubmit}
          onCancel={this.props.close}
        >
          <NormalForm
            labelSize="10em"
            lineOf={3}
            formItem={formItems}
            refs={ref => (this.clientForm = ref)}
          />
        </Modal>
      </>
    );
  }
}

export default ContractFormAdd;
