import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Modal } from 'antd';
import moment from 'moment';

class InstructionSettlementStatus extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.clientForm.setValues({
        ...this.props.ids[0],
        lastupdtm: moment().format('YYYY-MM-DD HH:mm:ss'),
        settleInstitution: 'SQS',
        tradeStatus: 'Y'
      });
    }, 10);
  }

  onSubmit = () => {
    const { asyncHttpSettlementStatus } = this.props;
    const form = this.clientForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const params = {
        data1: {
          tradeId: values.tradeId,
          buyerStatus: values.buyerStatus,
          sellerStatus: values.sellerStatus,
          tradeStatus: values.tradeStatus
        },
        settleInstitution: values.settleInstitution,
        lastupdtm: values.lastupdtm
      };
      asyncHttpSettlementStatus(params);
      this.props.close();
      this.props.toEmptySelect();
    });
  };

  render() {
    const formItems = [
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'lastupdtm',
        label: '最新修改时间',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        props: {
          disabled: true
        },
        options: [{ label: '上清所', value: 'SQS' }]
      },
      {
        isLine: true
      },
      {
        name: 'buyerStatus',
        label: '买方状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '买方状态不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择买方状态',
          initialValue: 'Y',
          getDics: 1030303,
        },
      },
      {
        name: 'sellerStatus',
        label: '卖方状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '卖方状态不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择卖方状态',
          initialValue: 'Y',
          getDics: 1030303,
        },
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
          initialValue: 'Y',
          getDics: 1030302,
        },
      }
    ];

    return (
      <>
        <Modal
          title="推送结算状态"
          visible={this.props.visible}
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

export default InstructionSettlementStatus;
