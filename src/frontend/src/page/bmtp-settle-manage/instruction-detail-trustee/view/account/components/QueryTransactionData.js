import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Modal } from 'antd';
import moment from 'moment';

class QueryTransactionData extends Component {
  render() {
    const { currentTradeDate } = this.props;
    const formItem = [
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号'
        },
        rules: [{ required: true, message: '成交编号不能为空' }]
      },
      {
        name: 'tradeDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请输入交易日期',
          initialValue: moment(currentTradeDate)
        },
        rules: [{ required: true, message: '交易日期不能为空' }]
      }
    ];
    return (
      <>
        <Modal
          title="查询交易数据"
          visible={this.props.visibleQueryData}
          width={800}
          destroyOnClose={true}
          onOk={this.onSubmit}
          maskClosable={false}
          onCancel={this.props.closeQueryData}
        >
          <NormalForm
            labelSize="7em"
            lineOf={2}
            formItem={formItem}
            refs={ref => (this.clientForm = ref)}
          />
        </Modal>
      </>
    );
  }

  onSubmit = () => {
    const form = this.clientForm.props.form;
    const { asyncHttpQueryData } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        ...values,
        tradeDate: moment(values.tradeDate).format('YYYY-MM-DD')
      };
      asyncHttpQueryData(param).then(() => this.props.closeQueryData());
    });
  };
}

export default QueryTransactionData;
