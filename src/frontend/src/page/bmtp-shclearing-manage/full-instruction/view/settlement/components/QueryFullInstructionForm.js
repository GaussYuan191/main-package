/**查询全额结算指令表单 */
import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';

class QueryFullInstructionFrom extends Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }
  handleSubmit = () => {
    const form = this.normalForm.props.form;
    const { asyncHttpQueryFullInstruction, closeQueryInstructionModal } = this.props;
    form.validateFields((err, params) => {
      if (err) {
        return;
      }
      asyncHttpQueryFullInstruction({ params }).then(() => closeQueryInstructionModal());
    });
  };
  render() {
    const formItem = [
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
          placeholder: '请输入成交编号'
        }
      }
    ];
    return (
      <NormalForm
        formItem={formItem}
        labelSize="10em"
        itemSize="280px"
        lineOf="1"
        refs={ref => {
          this.normalForm = ref;
        }}
      />
    );
  }
}

export default QueryFullInstructionFrom;
