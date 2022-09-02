import React, { Component } from 'react';
import { Modal } from 'antd';
import { NormalForm, selectPageRequest, getNowFormatDate } from 'yss-biz';

const { mapOption } = NormalForm;
class CapitalAdjustment extends Component {
  state = {
    totalBalance: 0, //总余额
    availableBalanceBefroe: 0, //调整前可用余额
    lockInBalanceBefroe: 0, //调整前锁定余额
    availableBalance: 0, //可用余额
    lockInBalance: 0, //锁定余额
    withdrawals: 0, //提款金额
    type: '' //提款类型
  };
  componentDidMount() {
    this.props.onRef(this);
    const { rowed, isOpenFormModal } = this.props;
    const { asyncHttpGetCurTradeDate } = this.props;
    asyncHttpGetCurTradeDate();
    if (!!isOpenFormModal.sign) {
      if (JSON.stringify(rowed) !== JSON.stringify(this.props.row)) {
        if (this.calcInput) {
          this.calcInput.setValues({
            drawingMoneyAfter: rowed.usableAmount,
            date: this.props.currentTradeDate,
            ...rowed
          });
          this.setState({
            totalBalance: rowed.totalAmount,
            availableBalanceBefroe: rowed.usableAmount,
            availableBalance: rowed.usableAmount,
            lockInBalanceBefroe: rowed.lockedAmount,
            lockInBalance: rowed.lockedAmount
          });
        }
      }
    }
  }
  render() {
    // const { isOpenFormModal, assetAccount } = this.props;
    let leftFormItem = [
      {
        isLine: true,
        hidden: true,
        render: <h2>提款前</h2>
      },
      {
        name: 'allSum',
        label: '总余额(元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.totalBalance,
          disabled: true
        }
      },
      {
        name: 'canUseSum',
        label: '可用余额(元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.availableBalanceBefroe,
          disabled: true
        }
      },
      {
        name: 'lockSum',
        label: '锁定余额(元)',
        unBind: true,
        itemMargin: '20px',
        type: 'InputPart',
        props: {
          value: this.state.lockInBalanceBefroe,
          disabled: true
        }
      },
      {
        isLine: true
      },
      {
        isLine: true,
        hidden: true,
        render: <h2>提款后</h2>
      },
      {
        name: 'afterAllSum',
        label: '总余额(元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.totalBalance,
          disabled: true
        }
      },
      {
        name: 'afterLockSum',
        label: '锁定余额(元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.lockInBalance,
          disabled: true
        }
      }
    ];
    let rightFormItem = [
      {
        name: 'tradeType',
        label: '交易类型',
        type: 'Input',
        props: {
          placeholder: '日间提款',
          disabled: true
        }
      },
      {
        name: 'accountType',
        label: '账户类型',
        type: 'Select',
        // rules: [
        //   {
        //     required: true,
        //     message: '账户类型不能为空'
        //   }
        // ],
        props: {
          disabled: true,
          placeholder: '请选择账户类型',
          getDics: "1030003"
        }
      },
      {
        name: 'productId',
        label: '所属产品',
        type: 'Select',
        // rules: [
        //   {
        //     required: true,
        //     message: '所属产品不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选择所属产品',
          type: 'product',
          configDics: selectPageRequest,
          disabled: true
        }
      },
      {
        name: 'assetAccountSn', // 资金账户编号
        label: '资金账户',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '资金账户不能为空'
        //   }
        // ],
        props: {
          disabled: true,
          placeholder: '请选择资金账户',
          allowClear: true
        }
      },
      {
        name: 'assetAccountSnName', // 资金账户名称
        label: '账户名称',
        type: 'Input',
        disabled: true,
        props: {
          placeholder: '请选择账户名称',
          disabled: true
        }
      },
      {
        name: 'withdrawalsType',
        label: '提款类型',
        type: 'Select',
        props: {
          placeholder: '请选择提款类型',
          initialValue: '按金额提款',
          getDics: '1030406',
          onChange: value => {
            this.setState({ type: value + '' });
          }
        }
      },
      {
        name: 'drawingMoneyAfter',
        label: '提款后可用金额(元)',
        type: 'InputPart',
        disabled: true,
        rules:
          this.state.type == 1
            ? [
                {
                  required: true,
                  message: '提款后可用金额不能为空'
                }
              ]
            : '',
        props: {
          placeholder: '请选择提款后可用金额',
          disabled: this.state.type == 1 ? false : true,
          type: 'InputNumber',
          initialValue: this.state.availableBalance,
          max: this.state.availableBalanceBefroe,
          min: 0,
          onChange: value => {
            this.calcAccount(value, 1);
          }
        }
      },
      {
        name: 'actualTradeAmount',
        label: '提款金额(元)',
        type: 'InputPart',
        rules:
          this.state.type != 1
            ? [
                {
                  required: true,
                  message: '提款金额不能为空'
                }
              ]
            : '',
        props: {
          style: { textAlign: 'right' },
          placeholder: '请输入提款金额',
          disabled: this.state.type != 1 ? false : true,
          type: 'InputNumber',
          max: this.state.availableBalanceBefroe,
          min: 0,
          initialValue: this.state.withdrawals,
          onChange: value => {
            this.calcAccount(value, 2);
          }
        }
      },
      {
        name: 'currency',
        label: '币种',
        type: 'Input',
        props: {
          placeholder: '人民币',
          disabled: true
        }
      },
      {
        name: 'date',
        label: '交易日',
        type: 'Input',
        props: {
          placeholder: '请输入交易日',
          disabled: true
        }
      },
      {
        name: 'remark',
        label: '备注',
        type: 'TextArea',
        itemSize: '100% - 8em',
        itemMargin: '0',
        props: {
          placeholder: '请输入备注'
        }
      },
      {
        name: 'assetAccount',
        hidden: true,
        label: '资金账号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'productName',
        hidden: true,
        label: '产品名称',
        type: 'Input',
        props: {
          placeholder: '产品名称',
          disabled: true
        }
      },
    ];
    return (
      <div className="f-clearfix">
        <div
          className="f-left"
          style={{
            marginRight: '30px',
            width: '420px',
            borderRight: '1px solid #4c515f'
          }}
        >
          <NormalForm labelSize="10em" lineOf={1} formItem={leftFormItem} refs={ref => {}} />
        </div>
        <div className="f-block-hide">
          <NormalForm
            labelSize="8em"
            lineOf={2}
            formItem={rightFormItem}
            refs={ref => {
              this.calcInput = ref;
            }}
          />
        </div>
      </div>
    );
  }

  handleSubmit = () => {
    const { asyncSubmitDaytimeWithdrawals } = this.props;
    this.calcInput.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      asyncSubmitDaytimeWithdrawals({
        assetAccount: values.assetAccount,
        productId: values.productId,
        productName: values.productName,
        assetAccountType: values.accountType,
        actualTradeAmount: values.actualTradeAmount,
        assetAccountSn: values.assetAccountSn,
        assetAccountName: values.assetAccountSnName,
        remark: values.remark
      });
      this.props.closeDayTimeModal(true);
    });
  };

  /*判断是否进行调整结算*/
  isAdjustment = () => {
    /**判断这三个值是否都存在当全部存在的时候返回true*/
    if (this.state.amountIncurred && this.state.changeSubject && this.state.directionOfLending) {
      return true;
    }
    return false;
  };

  /** 计算值 ***/
  calcAccount = (value, type) => {
    let {
      // totalBalance, // 总余额
      availableBalanceBefroe, // 调整前可用余额
      lockInBalanceBefroe, // 调整前锁定余额
      lockInBalance, // 锁定余额
      availableBalance, // 可用余额
      withdrawals
    } = this.state;

    if (value > availableBalanceBefroe) {
      // message.warning(`提款金额的最大值为${availableBalanceBefroe}，请注意！`,1);
      Modal.warning({
        title: '提示信息',
        content: `提款金额的最大值为${availableBalanceBefroe}，请注意！`
      });
    }

    value > availableBalanceBefroe && (value = availableBalanceBefroe);

    // 提款金额 等于 调整前提款余额 减去 提款后可用余额
    withdrawals = Math.round((availableBalanceBefroe - value).toFixed(2) * 100) / 100;
    // 1 为按余额提款  2为按金额提款
    switch (type) {
      case 1:
        lockInBalance = +lockInBalanceBefroe + +withdrawals;
        break;
      case 2:
      default:
        lockInBalance = +lockInBalanceBefroe + +value;
    }
    // 提款后可用金额 等于 调整前可用余额 减去提款金额
    availableBalance = Math.round((availableBalanceBefroe - value).toFixed(2) * 100) / 100;
    lockInBalance = Math.round(lockInBalance.toFixed(2) * 100) / 100;

    this.calcInput.setValues({
      actualTradeAmount: withdrawals,
      drawingMoneyAfter: availableBalance
    });
    this.setState({
      lockInBalance
    });
  };
}
export default CapitalAdjustment;
