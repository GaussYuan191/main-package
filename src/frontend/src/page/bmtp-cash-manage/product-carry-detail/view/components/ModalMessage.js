import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { modalInfo } from 'yss-biz/utils/util/constant';
import { NormalForm, selectPageRequest } from 'yss-biz';
import moment from 'moment';
import { execCodeArr, tradeInstructIdArr, cashArr } from './TradeType';
class CapitalAdjustment extends Component {
  state = {
    changeSubject: '可用',
    totalBalance: 0, //总余额
    afterTotalBalance: 0,
    beforeChangeSubject: 0, //提款前变动科目
    afterChangeSubject: 0, //提款后变动科目
    periodTotal: 0, //发生金额
    borrowingSide: '借', //借贷方向
    productName: '',
    getProductId: '',
    getSettleInstitution: '',
    getBondCode: '',
    bondName: '',
    showCode: true,
    tradeDate: moment().format('YYYY-MM-DD'),
    productDetails: {}
  };
  async componentDidMount() {
    await this.getModalValues();
    this.getProductBalance();
  }
  // 修改时设置数据回填
  getModalValues = () => {
    const {
      asyncSetAboutMessage,
      isOpenFormModal,
      asyncGetBondAccountByProductId,
      selectRows,
      setTrDatas
    } = this.props;
    if (isOpenFormModal.sign === 'edit') {
      setTrDatas({ row: selectRows[0] });
      asyncSetAboutMessage({ type: 'edit' }).then(res => {
        const { modalMessage } = this.props;

        // 设置表单需使用moment类型数据
        !!modalMessage.tradeDate &&
          (modalMessage.tradeDate = moment(new Date(modalMessage.tradeDate), 'YYYY-MM-DD'));
        // 债券账户取接口获取到的
        delete modalMessage.bondAccount;
        delete modalMessage.bondAccountName;

        this.setState({ showCode: this.filterCode(modalMessage.tradeType) }, () => {
          this.handleSetValues(modalMessage);
        });

        this.setState(
          {
            totalBalance: modalMessage.totalBalance,
            beforeChangeSubject: modalMessage.usableSubject,
            periodTotal: modalMessage.periodTotal,
            afterTotalBalance: modalMessage.periodTotal,
            borrowingSide: modalMessage.borrowingSide,
            afterChangeSubject: modalMessage.afterChangeSubject,
            productName: modalMessage.productName,
            getProductId: modalMessage.productId,
            bondName: modalMessage.bondName,
            getBondCode: modalMessage.bondCode,
            getSettleInstitution: modalMessage.settleInstitution,
            tradeDate: moment(modalMessage.tradeDate).format('YYYY-MM-DD')
          },
          () => {
            this.calcAccount();
          }
        );
        asyncGetBondAccountByProductId({
          productId: modalMessage.productId,
          settleInstitution: modalMessage.settleInstitution
        });
      });
    } else {
      this.setState({ tradeDate: this.props.currentTradeDate });
    }
  };
  handleSetValues = aboutMessage => {
    this.calcInput.setValues(aboutMessage);
  };

  //修改数据时获取getProductCarryBalance接口数据
  getProductBalance = () => {
    const { isOpenFormModal, asyncHttpGetTotalBalance, modalMessage } = this.props;
    if (isOpenFormModal && isOpenFormModal.sign === 'edit') {
      //修改数据时调取接口
      asyncHttpGetTotalBalance({
        params: {
          productId: modalMessage.productId,
          bondCode: modalMessage.bondCode,
          bondAccount: modalMessage.bondAccount,
          // tradeDate: this.props.currentTradeDate
          tradeDate: moment(modalMessage.tradeDate).format('YYYY-MM-DD')
        },
        cb: data => {
          this.setState(
            {
              totalBalance: data.bondTotalSubject || 0,
              beforeChangeSubject: data.usableSubject || 0,
              productDetails: data,
              changeSubject: modalMessage.changeSubjectName //更改changeSubject
            },
            () => {
              this.calcAccount();
            }
          );
        }
      });
    }
  };

  toGetTotalBalance = async bondAccount => {
    const { asyncHttpGetTotalBalance } = this.props;
    if (
      this.state.getProductId &&
      this.state.getBondCode &&
      bondAccount.bondTrusteeshipAccountSn &&
      this.state.tradeDate
    ) {
      await asyncHttpGetTotalBalance({
        params: {
          productId: this.state.getProductId,
          bondCode: this.state.getBondCode,
          bondAccount: bondAccount.bondTrusteeshipAccountSn,
          tradeDate: this.state.tradeDate
        },
        cb: data => {
          this.setState(
            {
              totalBalance: data.bondTotalSubject || 0,
              beforeChangeSubject: data.usableSubject || 0,
              productDetails: data
            },
            () => {
              this.calcAccount();
            }
          );
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.bondAccount.bondTrusteeshipAccountSn !=
      nextProps.bondAccount.bondTrusteeshipAccountSn
    ) {
      this.calcInput.setValues({
        bondAccount: nextProps.bondAccount.bondTrusteeshipAccountSn
      });
      this.toGetTotalBalance(nextProps.bondAccount);
    }
    if (this.props.bondAccount.bondTrusteeshipName != nextProps.bondAccount.bondTrusteeshipName) {
      this.calcInput.setValues({
        bondAccountName: nextProps.bondAccount.bondTrusteeshipName
      });
    }
  }

  /**根据交易类型处理成交编号与交易指令联动 */
  filterCode = value => {
    let execCodeObj, tradeInstructIdObj, cashArrObj;
    execCodeObj = execCodeArr.find(item => {
      return item.dicCode == value;
    });

    tradeInstructIdObj = tradeInstructIdArr.find(item => {
      return item.dicCode == value;
    });

    cashArrObj = cashArr.find(item => {
      return item.dicCode == value;
    });

    // showCode: true展示成交编号, false展示交易指令编号, 'null'不展示
    let showCode = execCodeObj ? true : tradeInstructIdObj ? false : cashArrObj ? 'null' : true;
    return showCode;
  };

  render() {
    const { isOpenFormModal, asyncGetBondAccountByProductId, bondAccount } = this.props;
    const me = this;

    let leftFormItem = [
      {
        isLine: true,
        hidden: true,
        render: <h2>调整前</h2>
      },
      {
        name: 'allSum',
        label: '总余额(万元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.totalBalance,
          disabled: true
        }
      },
      {
        name: 'canUseSum',
        label: this.state.changeSubject + '科目(万元)',
        unBind: true,
        type: 'InputPart',
        itemMargin: '70px',
        props: {
          value: this.state.beforeChangeSubject,
          disabled: true
        }
      },
      {
        isLine: true
      },
      {
        isLine: true,
        hidden: true,
        render: <h2>调整后</h2>
      },
      {
        name: 'afterAllSum',
        label: '总余额(万元)',
        unBind: true,
        type: 'InputPart',
        props: {
          value: this.state.afterTotalBalance,
          disabled: true
        }
      },
      {
        name: 'afterLockSum',
        label: this.state.changeSubject + '科目(万元)',
        unBind: true,
        type: 'InputPart',
        itemMargin: '70px',
        props: {
          value: this.state.afterChangeSubject,
          disabled: true
        }
      }
    ];

    let rightFormItem = [
      {
        name: 'tradeType',
        label: '交易类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '交易类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择交易类型',
          initialValue: '0',
          getDics: 1030409,
          disabled: isOpenFormModal.sign === 'edit' ? true : false,
          onChange: value => {
            let tempShowCode = this.filterCode(value);
            this.setState({ showCode: tempShowCode });
          }
        }
      },
      {
        name: 'borrowingSide',
        label: '借贷方向',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '借贷方向不能为空'
          }
        ],
        props: {
          placeholder: '请选择借贷方向',
          getDics: 1030407,
          // initialValue: this.state.borrowingSide,
          onChange: value => {
            this.setState({ borrowingSide: value }, () => {
              this.calcAccount();
            });
          }
        }
      },
      {
        name: 'productId',
        label: '所属产品',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '所属产品不能为空'
          }
        ],
        props: {
          placeholder: '请选择所属产品',
          type: 'product',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange: async (value, option) => {
            this.setState({
              productName: option?.props?.origindata?.productName || '',
              getProductId: value
            });
            if (value && me.state.getSettleInstitution) {
              await asyncGetBondAccountByProductId({
                productId: value,
                settleInstitution: me.state.getSettleInstitution
              });
            }
          }
        }
      },
      {
        name: 'periodTotal',
        label: '发生额(万元)',
        type: 'InputPart',
        rules: [
          {
            required: true,
            message: '发生额不能为空'
          },
          { pattern: /^.{0,11}$/, message: '允许输入最大长度11' },
          { pattern: /^\d+(\.\d+)?$/, message: '金额格式不正确' }
        ],
        props: {
          placeholder: '请输入发生额',
          type: 'InputNumber',
          min: 0,
          initialValue: this.state.periodTotal,
          disabled: !this.state.borrowingSide,
          onChange: value => {
            if (!/^\d+(\.\d+)?$/.test(value)) {
              value = 0;
            }
            console.log(value);
            me.setState({ periodTotal: value }, () => {
              me.calcAccount();
            });
          }
        }
      },
      {
        name: 'bondAccount',
        label: '债券账号',
        type: 'Input',
        props: {
          // initialValue: bondAccount.bondTrusteeshipAccountSn,
          disabled: true
        }
      },
      {
        name: 'bondCurrency',
        label: '币种',
        type: 'Input',
        props: {
          disabled: true,
          initialValue: '人民币'
        }
      },
      {
        name: 'bondAccountName',
        label: '账户名称',
        type: 'Input',
        disabled: true,
        props: {
          // initialValue: bondAccount.bondTrusteeshipName,
          disabled: true
        }
      },

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
          placeholder: '请选择结算机构',
          getDics: '1030404',
          onChange: async value => {
            me.setState({
              getSettleInstitution: value
            });
            if (value && me.state.getProductId) {
              await asyncGetBondAccountByProductId({
                productId: me.state.getProductId,
                settleInstitution: value
              });
            }
          }
        }
      },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '债券名称不能为空'
          }
        ],
        props: {
          placeholder: '请选择债券名称',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange: (value, option) => {
            me.setState(
              {
                getBondCode: !!value ? value : '',
                bondName: !!option ? option.props.children.split('-')[1] : ''
              },
              () => {
                this.toGetTotalBalance(bondAccount);
              }
            );
            me.handleSetValues({
              bondName: !!option ? option.props.children.split('-')[1] : ''
            });
          },
          filterOption: false
        }
        // options: this.props.bondCodes
      },
      {
        name: this.state.showCode ? 'execCode' : 'tradeInstructId',
        label: this.state.showCode ? '成交编号' : '交易指令编号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '编号不能为空'
          },
          { pattern: /^.{0,50}$/, message: '允许输入最大长度50' },
          { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字和英文' }
        ],
        props: {
          placeholder: '请填写编号'
        }
      },
      // {
      //   name: 'tradeInstructId',
      //   label: '交易指令编号',
      //   type: 'Input',
      //   rules: [
      //     {
      //       required: true,
      //       message: '交易指令编号不能为空'
      //     },
      //     { pattern: /^.{0,50}$/, message: '允许输入最大长度50' },
      //     { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字和英文' }
      //   ],
      //   props: {
      //     placeholder: '请填写交易指令编号'
      //   }
      // },
      {
        name: 'tradeDate',
        label: '业务日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '业务日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择业务日期',
          initialValue: moment(this.props.currentTradeDate, 'YYYY-MM-DD'),
          allowClear: false,
          onChange: value => {
            this.setState(
              {
                tradeDate: (value && value.format('YYYY-MM-DD')) || this.props.currentTradeDate
              },
              () => {
                this.toGetTotalBalance(bondAccount);
              }
            );
          }
        }
      },
      {
        name: 'changeSubject',
        label: '变动科目',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '变动科目不能为空'
          }
        ],
        props: {
          getDics: 1030410,
          placeholder: '请选择变动科目',
          initialValue: '可用',
          // initialValue: this.state.changeSubject,
          onChange: (value, option) => {
            this.setState({ changeSubject: !!option ? option.props.children : '可用' }, () => {
              this.calcAccount();
            });
          }
        }
      },
      {
        name: 'remarks',
        label: '备注',
        type: 'TextArea',
        itemSize: '100% - 8em',
        itemMargin: '0',
        rules: [
          {
            required: true,
            message: '备注不能为空'
          },
          { pattern: /^.{0,500}$/, message: '允许输入最大长度500' }
        ],
        props: {
          placeholder: '请输入备注'
        }
      }
    ];

    //业务类型为付息兑付时，删除成交编号和交易指令编号
    if (this.state.showCode == 'null') {
      rightFormItem = rightFormItem.filter(
        item => item.name !== 'execCode' && item.name !== 'tradeInstructId'
      );
    }

    return (
      <Modal
        {...modalInfo}
        width="1160px"
        title={isOpenFormModal.title + '交易流水'}
        visible={!!isOpenFormModal.sign}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        destroyOnClose
      >
        <div className="f-clearfix">
          <div
            className="f-left"
            style={{
              marginRight: '30px',
              width: '420px',
              borderRight: '1px solid #4c515f'
            }}
          >
            <NormalForm labelSize="10em" lineOf={1} formItem={leftFormItem} />
          </div>
          <div className="f-block-hide">
            <NormalForm
              labelSize="8em"
              lineOf={2}
              formItem={rightFormItem}
              refs={ref => (this.calcInput = ref)}
            />
          </div>
        </div>
      </Modal>
    );
  }

  onCancel = () => {
    const { openFormModal, toEmptybond } = this.props;
    toEmptybond && toEmptybond();
    openFormModal({
      sign: ''
    });
  };
  onSubmit = () => {
    const { form } = this.calcInput.props;
    const { openFormModal, asyncToOptDetail, isOpenFormModal, selectRows, toEmptybond } =
      this.props;
    //变动科目映射 0-可用，1-待付，2-全额待购回，3-冻结，4-质押
    form.validateFields((err, values) => {
      if (!err) {
        const selectRow = selectRows[0];
        let params = {
          ...values,
          periodTotal: values['periodTotal'] + '',
          tradeDate: values['tradeDate'].format('YYYY-MM-DD'),
          id: isOpenFormModal.sign === 'add' ? '' : selectRow['id'],
          productName: this.state.productName,
          remarks: values['remarks'] || '',
          changeSubject: values['changeSubject'] == '可用' ? '0' : values['changeSubject'],
          bondName: this.state.bondName
        };

        asyncToOptDetail({
          type: isOpenFormModal.sign,
          params
        }).then(() => {
          openFormModal({ sign: '', title: '' });
          toEmptybond && toEmptybond();
        });
      } else {
        message.error('请按要求填写信息');
      }
    });
  };
  /** 计算值 ***/
  calcAccount = () => {
    // const { modalMessage } = this.props;
    let changeSubject = 0;
    let afterChangeSubject = 0;
    let afterTotalBalance = 0;
    const data = this.state.productDetails;
    switch (this.state.changeSubject) {
      case '可用':
        changeSubject = data.usableSubject || 0;
        break;
      case '待付':
        changeSubject = data.accruedSubject || 0;
        break;
      case '冻结':
        changeSubject = data.freezeSubject || 0;
        break;
      case '质押':
        changeSubject = data.pledgeSubject || 0;
        break;
      case '全额待购回':
        changeSubject = data.totalBuyBackSubject || 0;
        break;
      case '承销':
        changeSubject = data.underWritingSubject || 0;
        break;
      case '承销待付':
        changeSubject = data.underWritingAccruedSubject || 0;
        break;
      case '融入':
        changeSubject = data.meltInSubject || 0;
        break;
      case '融出':
        changeSubject = data.meltOutSubject || 0;
        break;
      default:
    }
    // if (!this.state.borrowingSide) return;
    // switch (this.state.borrowingSide) {
    //   case '0': //借 调整前科目 + 发生额 = 调整后的科目    //贷 调整前科目 - 发生额 = 调整后的科目
    //     afterChangeSubject = +changeSubject - +this.state.periodTotal;
    //     afterTotalBalance = +this.state.totalBalance - +this.state.periodTotal;
    //     break;
    //   default:
    //     afterChangeSubject = +changeSubject + +this.state.periodTotal;
    //     afterTotalBalance = +this.state.totalBalance + +this.state.periodTotal;
    // }
    // afterChangeSubject = Math.round(afterChangeSubject.toFixed(2) * 100) / 100;
    // afterTotalBalance = Math.round(afterTotalBalance.toFixed(2) * 100) / 100;

    if (!this.state.borrowingSide) return;

    switch (this.state.borrowingSide) {
      case '0': //贷 调整前科目 - 发生额 = 调整后的科目
        afterChangeSubject = changeSubject - this.state.periodTotal;
        //融入/融出时，总余额不需要相减
        if (this.state.changeSubject !== '融入' && this.state.changeSubject !== '融出') {
          afterTotalBalance = this.state.totalBalance - this.state.periodTotal;
        } else {
          afterTotalBalance = this.state.totalBalance;
        }
        break;
      case '1': //借 调整前科目 + 发生额 = 调整后的科目
        afterChangeSubject = changeSubject + this.state.periodTotal;
        //融入/融出时，总余额不需要相加
        if (this.state.changeSubject !== '融入' && this.state.changeSubject !== '融出') {
          afterTotalBalance = this.state.totalBalance + this.state.periodTotal;
        } else {
          afterTotalBalance = this.state.totalBalance;
        }
        break;
      default:
        break;
    }
    afterChangeSubject = Math.round(afterChangeSubject.toFixed(2) * 100) / 100;
    afterTotalBalance = Math.round(afterTotalBalance.toFixed(2) * 100) / 100;

    this.setState({
      afterChangeSubject,
      afterTotalBalance,
      beforeChangeSubject: changeSubject
    });
  };
}
export default CapitalAdjustment;
