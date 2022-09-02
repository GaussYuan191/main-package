import React, { Component } from 'react';
import { NormalForm, selectPageRequest } from 'yss-biz';
import { Modal, message } from 'antd';
import moment from 'moment';

class CashSaleFormSplit extends Component {
  state = {
    buyerProductName: '',
    sellerProductName: '',
    fetching: false
  };
  render() {
    const { currentTradeDate, openModalType } = this.props;
    const formItems = [
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          disabled: false
        }
        // rules: [{ required: true, message: '成交编号不能为空' }]
      },
      {
        name: 'execDate',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          disabled: false,
          format: 'YYYY-MM-DD',
          initialValue: moment(currentTradeDate)
        },
        rules: [{ required: true, message: '成交日期不能为空' }]
      },
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '业务类别不能为空' }],
        options: [{ label: '现券内转', value: 6 }]
      },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Input',
        props: {
          disabled: false
        }
        // rules: [{ required: true, message: '交易指令编号不能为空' }]
      },
      {
        name: 'bondCode',
        label: '债券代码', //
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          disabled: false,
          onChange: (e, option) => {
            let name = option ? option.props.children : option;
            const form = this.clientForm.props.form;
            form.setFieldsValue({ bondName: name });
          },
          optionLabelProp: 'value',
          filterOption: false
        },
        rules: [{ required: true, message: '债券代码不能为空' }]
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Input',
        props: {
          disabled: true
        },
        rules: [{ required: true, message: '债券名称不能为空' }]
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          disabled: false,
          format: 'YYYY-MM-DD',
          initialValue: moment(currentTradeDate)
        },
        rules: [{ required: true, message: '结算日期不能为空' }]
      },
      {
        name: 'settleType',
        label: '结算方式',
        type: 'Select',
        props: {
          disabled: false,
          getDics: 1030310
        },
        rules: [{ required: true, message: '结算方式不能为空' }]
      },
      {
        name: 'faceValue',
        label: '券面总额',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '券面总额不能为空' }]
      },
      {
        name: 'tradeAmount',
        label: '交易金额',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '交易金额不能为空' }]
      },
      {
        name: 'settleAmount',
        label: '结算金额',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '结算金额不能为空' }]
      },
      {
        name: 'totalAccruedInterest',
        label: '应计利息总额',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '应计利息总额不能为空' }]
      },
      {
        name: 'accruedInterest',
        label: '应计利息(元)',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '应计利息不能为空' }]
      },
      {
        name: 'dirtyPrice',
        label: '全价(元)',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '全价不能为空' }]
      },
      {
        name: 'netPrice',
        label: '净价(元)',
        type: 'InputNumber',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '净价不能为空' }]
      },
      {
        name: 'tradeFee',
        label: '交易费用(元)',
        type: 'InputNumber'
      },
      {
        name: 'settleFee',
        label: '结算费用(元)',
        type: 'InputNumber'
      },
      {
        name: 'buyerProductId',
        label: '买入方产品名称',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'product',
          dropdownWidth: 300,
          disabled: false,
          onChange: (e, option) => {
            const optionData = option?.props?.origindata;
            const { productName } = optionData;
            this.setState({ buyerProductName: productName });
          }
        },
        rules: [{ required: true, message: '买入方产品名称不能为空' }]
      },
      {
        name: 'sellerProductId',
        label: '卖出方产品名称',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'product',
          dropdownWidth: 300,
          disabled: false,
          onChange: (e, option) => {
            const optionData = option?.props?.origindata;
            const { productName } = optionData;
            this.setState({ sellerProductName: productName });
          }
        },
        rules: [{ required: true, message: '卖出方产品名称不能为空' }]
      }
    ];

    return (
      <>
        <Modal
          title={'现券内转--' + (openModalType == 'edit' ? '修改' : '新增')}
          visible={this.props.visibleFormAdd}
          width={1100}
          destroyOnClose={true}
          onOk={this.onSubmit}
          maskClosable={false}
          onCancel={this.props.closeFormAdd}
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

  componentDidMount() {
    const { ids } = this.props;
    if (this.props.openModalType == 'edit') {
      this.setState({
        buyerProductName: ids[0].buyerProductName,
        sellerProductName: ids[0].sellerProductName
      });
      // 设置表单的值
      setTimeout(() => {
        const form = this.clientForm.props.form;

        form.setFieldsValue({
          ...this.props.ids[0],
          execDate: moment(this.props.ids[0].execDate) ? moment(this.props.ids[0].execDate) : null,
          settleDate: moment(this.props.ids[0].settleDate)
            ? moment(this.props.ids[0].settleDate)
            : null,
          dirtyPrice: this.props.ids[0].dirtyPrice ? this.props.ids[0].dirtyPrice : 0,
          netPrice: this.props.ids[0].netPrice ? this.props.ids[0].netPrice : 0
        });
      }, 10);
    }
  }

  // 表单提交
  onSubmit = () => {
    const { asyncHttpFormAdd } = this.props;

    // 校验表单 避免没有选择拆分规则
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }
      const params = {
        ...val,
        execDate: moment(val.execDate).format('YYYY-MM-DD'),
        settleDate: moment(val.settleDate).format('YYYY-MM-DD'),
        sellerProductName: this.state.sellerProductName,
        buyerProductName: this.state.buyerProductName
      };
      if (this.props.openModalType == 'add') {
        await asyncHttpFormAdd({ type: 'add', params });
      } else {
        if (val.tradeInstrId) {
          await asyncHttpFormAdd({ type: 'edit', params: { ...params, id: this.props.ids[0].id } });
        } else {
          message.error('交易指令编号不能为空');
          return;
        }
      }
      this.props.closeFormAdd();
      this.props.toEmptySelect();
    });
  };
  // 设置加载状态
  setLoading = value => {
    this.setState({ fetching: value });
  };
}

export default CashSaleFormSplit;
