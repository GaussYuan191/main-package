import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Modal } from 'antd';
import moment from 'moment';

class InstructionSettlementStatus extends Component {
  componentDidMount() {
    let d = moment().format();
    setTimeout(() => {
      this.clientForm.setValues({
        ...this.props.ids[0],
        lastupdtm: d.split('+')[0] + '.000',
        settleInstitution: 'ZZD',
        instrid: this.props.ids[0].instrId
      });
    }, 10);

    // console.log(this.props, this.props.clientForm);
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
          ctrCnfrmind: values.ctrCnfrmind,
          orgtrCnfrmind: values.orgtrCnfrmind,
          instrsts: values.instrsts,
          instrid: values.instrid
        },
        settleInstitution: values.settleInstitution,
        lastupdtm: values.lastupdtm
      };
      asyncHttpSettlementStatus(params);
      this.props.close();
    });
  };

  render() {
    const formItems = [
      {
        name: 'instrid',
        label: '结算指令编号',
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
        options: [{ label: '中债登', value: 'ZZD' }]
      },
      {
        isLine: true
      },
      {
        name: 'ctrCnfrmind',
        label: '对手方确认标识',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '对手方确认标识不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择对手方确认标识'
        },
        options: [
          { label: '无', value: 'IC00' },
          { label: '已确认', value: 'IC01' },
          { label: '未确认', value: 'IC02' }
        ]
      },
      {
        name: 'orgtrCnfrmind',
        label: '发令方确认标识',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '发令方确认标识不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择发令方确认标识'
        },
        options: [
          { label: '无', value: 'IC00' },
          { label: '已确认', value: 'IC01' },
          { label: '未确认', value: 'IC02' }
        ]
      },
      {
        name: 'instrsts',
        label: '指令处理状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '指令处理状态不能为空'
          }
        ],
        props: {
          disabled: false,
          placeholder: '请选择指令处理状态'
        },
        options: [
          { label: '成功', value: 'IS00' },
          { label: '待复核', value: 'IS01' },
          { label: '已复核', value: 'IS02' },
          { label: '待确认', value: 'IS03' },
          { label: '已确认', value: 'IS04' },
          { label: '合法', value: 'IS05' },
          { label: '非法', value: 'IS06' },
          { label: '作废', value: 'IS07' },
          { label: '撤销', value: 'IS08' }
        ]
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
