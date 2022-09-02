/**
 * 全额结算指令管理-更新状态
 */
import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Modal } from 'antd';

class UpdateStatusForm extends Component {
  onSubmit = () => {
    const { asyncHttpUpdateStatus } = this.props;
    const form = this.clientForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const params = values;
      asyncHttpUpdateStatus(params);
      this.props.close();
    });
  };

  render() {
    const { type } = this.props;

    const formItems = [
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '成交编号不能为空'
          }
        ],
        props: {
          placeholder: '请输入成交编号',
          allowClear: true
        }
      },
      {
        name: 'settlementOrderId',
        label: '全额结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入全额结算指令编号',
          allowClear: true
        }
      },
      {
        name: 'fullOrderType',
        label: '全额结算指令类型',
        type: 'Select',
        rules: [
          {
            required: type === 'contract' ? true : false,
            message: '全额结算指令类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择全额结算指令类型',
          getDics: 1030314,
          allowClear: true,
          initialValue: type === 'contract' ? '0' : '1'
        }
      },
      {
        name: 'grossOrderStatus',
        label: '全额结算指令状态',
        type: 'Select',
        rules: [
          {
            required: type === 'contract' ? true : false,
            message: '全额结算指令状态不能为空'
          }
        ],
        props: {
          placeholder: '请选择全额结算指令状态',
          getDics: 1030311,
          allowClear: true,
          initialValue: 'S'
        }
      },
      // {
      //   name: 'fundSettStatus',
      //   label: '资金结算状态',
      //   type: 'Select',
      //   rules: [
      //     {
      //       required: type === 'contract' ? true : false,
      //       message: '资金结算状态不能为空'
      //     }
      //   ],
      //   props: {
      //     placeholder: '请选择资金结算状态',
      //     getDics: 1030313,
      //     allowClear: true,
      //     initialValue: '8'
      //   }
      // },
      // {
      //   name: 'productStatus',
      //   label: '产品结算状态',
      //   type: 'Select',
      //   rules: [
      //     {
      //       required: type === 'contract' ? true : false,
      //       message: '产品结算状态不能为空'
      //     }
      //   ],
      //   props: {
      //     placeholder: '请选择产品结算状态',
      //     getDics: 1030312,
      //     allowClear: true,
      //     initialValue: '8'
      //   }
      // },
      {
        name: 'buyerSettleConfirmStatus',
        label: '买方结算确认状态',
        type: 'Select',
        props: {
          getDics: 1030304,
          placeholder: '请选择',
          initialValue: 'C'
        }
      },
      {
        name: 'sellerSettleConfirmStatus',
        label: '卖方结算确认状态',
        type: 'Select',
        props: {
          getDics: 1030304,
          placeholder: '请选择',
          initialValue: 'C'
        }
      },
      {
        name: 'payConfirmStatus',
        label: '付款确认状态',
        type: 'Select',
        props: {
          getDics: 1030305,
          placeholder: '请选择付款确认状态',
          initialValue: '0'
        }
      },
      {
        name: 'recvConfirmStatus',
        label: '收款确认状态',
        type: 'Select',
        props: {
          getDics: 1030305,
          placeholder: '请选择收款确认状态',
          initialValue: '0'
        }
      }
    ];

    return (
      <>
        <Modal
          title="更新状态"
          visible={this.props.updateStatus}
          width={1100}
          destroyOnClose={true}
          onOk={this.onSubmit}
          onCancel={this.props.close}
        >
          <NormalForm
            labelSize="7em"
            lineOf={3}
            formItem={formItems}
            refs={ref => (this.clientForm = ref)}
          />
        </Modal>
      </>
    );
  }
}

export default UpdateStatusForm;
