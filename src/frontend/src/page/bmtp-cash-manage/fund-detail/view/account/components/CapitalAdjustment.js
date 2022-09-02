import React, { Component } from 'react';
import { Form, Row, Col, message } from 'antd';
import {
  modalInfo,
  NormalForm,
  InputPart,
  selectPageRequest,
  Modal,
  setFieldsObject,
  compute,
  keepNDecimals
} from 'yss-biz';
// import moment from 'moment';
import 'yss-biz/common/style/customAntd.less';
import './style.less';

class CapitalAdjustment extends Component {
  state = {
    amountIncurred: 0, //实际发生金额
    changeSubject: '', //变动科目
    directionOfLending: '', //借代方向
    productName: '', //产品名称
    productId: '', //产品id
    settleInstitution: '', //结算机构
    isMoneyNoOk: false
  };
  render() {
    const { isOpenFormModal, account, accountAfter, resetAccont } = this.props;
    const formLayout_fir = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    let formItem = [
      {
        name: 'productId',
        label: '所属产品',
        type: 'Select',
        itemSize: '240px',
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
          onChange: (value, option) => {
            const optionProps = option ? option.props : '';
            const productName = optionProps ? optionProps.children : '';
            let x = productName ? productName.split('-')[1].trim() : ''; //截取产品名称
            this.setState(
              () => {
                // return { productName };
                return { productName: x, productId: value };
              },
              async () => {
                await this.getAccont();
                this.changeAdjustment();
              }
            );
          }
        }
      },
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        itemSize: '240px',
        rules: [
          {
            required: true,
            message: '结算机构不能为空'
          }
        ],
        props: {
          placeholder: '请选择结算机构',
          // getDics: '1030404',
          onChange: value => {
            this.setState(
              () => {
                return { settleInstitution: value + '' };
              },
              async () => {
                await this.getAccont();
                this.changeAdjustment();
              }
            );
          }
        },
        options: [
          { value: '0', label: '上清所' },
          { value: '1', label: '中债登' }
        ]
      },
      {
        name: 'assetAccount',
        label: '资金账号',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: account.assetAccount,
          disabled: true
        }
      },
      {
        name: 'assetAccountName',
        label: '账户名称',
        type: 'Input',
        itemSize: '240px',
        props: {
          disabled: true,
          placeholder: account.assetAccountName
        }
      },
      {
        name: 'assetAccountType',
        label: '账户类型',
        type: 'Select',
        itemSize: '240px',
        props: {
          placeholder: account.accountTypeName,
          showArrow: false,
          getDics: '1030003',
          disabled: true
        }
      },
      {
        name: 'bz',
        label: '币种',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: '人民币',
          disabled: true
        }
      },
      {
        name: 'item',
        label: '变动科目',
        type: 'Select',
        itemSize: '240px',
        rules: [
          {
            required: true,
            message: '变动科目不能为空'
          }
        ],
        props: {
          placeholder: '请选择变动科目',
          getDics: '1030405',
          onChange: (value, option) => {
            this.setState(
              () => {
                return {
                  changeSubject: value + ''
                };
              },
              () => {
                this.changeAdjustment();
              }
            );
          }
        }
      },
      {
        name: 'exceCode',
        label: '成交编号',
        type: 'Input',
        itemSize: '240px',
        rules: [
          {
            pattern: /^[A-Za-z0-9]{1,50}$/,
            message: '仅输入英文/数字，最大长度为50'
          }
        ],
        props: {
          placeholder: '请选择成交编号'
        }
      },
      {
        name: 'borrowingSide',
        label: '借贷方向',
        type: 'Select',
        itemSize: '240px',
        rules: [
          {
            required: true,
            message: '借贷方向不能为空'
          }
        ],
        props: {
          placeholder: '请选择借贷方向',
          getDics: '1030407',
          onChange: (value, option) => {
            this.setState(
              () => {
                return {
                  directionOfLending: value + ''
                };
              },
              () => {
                this.changeAdjustment();
              }
            );
          }
        }
      },
      {
        name: 'transferInstructCode',
        label: '划款指令编号',
        type: 'Input',
        itemSize: '240px',
        rules: [
          {
            pattern: /^[A-Za-z0-9]{1,20}$/,
            message: '仅输入英文/数字，最大长度为20'
          }
        ],
        props: {
          placeholder: '请输入划款指令编号'
        }
      },
      {
        name: 'actualTradeAmount',
        label: '发生金额(元)',
        type: 'InputPart',
        itemSize: '240px',
        rules: [
          {
            required: true,
            message: '发生金额不能为空'
          },
          { pattern: /^.{0,11}$/, message: '允许输入最大长度11' },
          { pattern: /^\d+(\.\d+)?$/, message: '金额格式不正确' }
        ],
        props: {
          type: 'InputNumber',
          placeholder: '请输入发生金额',
          min: 0,
          onChange: value => {
            if (!/^\d+(\.\d+)?$/.test(value)) {
              value = 0;
            }
            this.setState({ amountIncurred: value }, this.changeAdjustment);
          }
        }
      },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Input',
        itemSize: '240px',
        rules: [
          {
            pattern: /^[A-Za-z0-9]{1,50}$/,
            message: '仅输入英文/数字，最大长度为50'
          }
        ],
        props: {
          placeholder: '请输入交易指令编号'
        }
      },
      {
        name: 'tradeType',
        label: '交易类型',
        type: 'Select',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '交易类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择交易类型',
          getDics: '1030408'
        }
      },
      {
        name: 'currentTradeDate', // 目前不存在这个字段, 仅用于显示给用户，之后加上再联调
        label: '交易日',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: this.props.currentTradeDate,
          disabled: true
        }
      },
      {
        name: 'remark',
        label: '备注',
        type: 'Input',
        itemSize: '240px',
        rules: [{ pattern: /^.{0,500}$/, message: '允许输入最大长度500' }],
        props: {
          placeholder: '请输入备注'
        }
      }
    ];

    return (
      <Modal
        {...modalInfo}
        width="1160px"
        title={isOpenFormModal.type == 'add' ? '新增交易流水' : '修改交易流水'}
        visible={isOpenFormModal.status && isOpenFormModal.type != 'see'}
        onOk={this.handleSubmit.bind(this)}
        onCancel={() => {
          const { openFormModal } = this.props;
          openFormModal({ type: '', status: false });
          resetAccont();
        }}
      >
        <div className="content_capitalAdjustment">
          <div className="left_capitalAdjustment">
            <div className="body">
              <Form {...formLayout_fir}>
                <Row className="hr">
                  <div className="title">调整前</div>
                  <Col span={24}>
                    <Form.Item label="总余额(元)">
                      <InputPart disabled value={account.totalAmount} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="可用余额(元)">
                      <InputPart disabled value={account.usableAmount} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="锁定余额(元)">
                      <InputPart disabled value={account.lockedAmount} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="hr">
                  <div className="title">调整后</div>
                  <Col span={24}>
                    <Form.Item label="总余额(元)">
                      <InputPart disabled value={accountAfter.totalAmount} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="可用余额(元)">
                      <InputPart disabled value={accountAfter.usableAmount} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="锁定余额(元)">
                      <InputPart disabled value={accountAfter.lockedAmount} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <div className="right_capitalAdjustment" style={{ position: 'relative', left: '44px' }}>
            <NormalForm formItem={formItem} refs={ref => (this.myForm = ref)} />
          </div>
        </div>
      </Modal>
    );
  }
  async componentDidMount() {
    const { rowed, isOpenFormModal, asyncHttpGetCurTradeDate } = this.props;

    //表单初始化
    this.myForm.props.form.setFieldsValue({
      ...setFieldsObject(rowed, isOpenFormModal.type)
    });
    await asyncHttpGetCurTradeDate();
    /*修改模式下* */
    if (isOpenFormModal.type != 'add') {
      // amountIncurred:实际发生金额changeSubject:变动科目directionOfLending:借代方向
      this.setState(
        () => {
          return {
            productId: rowed.productId,
            settleInstitution: rowed.settleInstitution + '',
            directionOfLending: rowed.borrowingSide + '',
            changeSubject: rowed.item + '',
            amountIncurred: rowed.actualTradeAmount
          };
        },
        async () => {
          await this.getAccont();
          this.changeAdjustment();
        }
      );
    }
  }

  async handleSubmit(e) {
    if (this.state.isMoneyNoOk) {
      message.warn('实际金额填写不正确,请重新填写');
      return;
    }
    const {
      account,
      rowed,
      asyncHttpAddRow,
      asyncHttpUpdateRow,
      isOpenFormModal,
      openFormModal,
      resetAccont
    } = this.props;
    this.myForm.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          ...values,
          id: isOpenFormModal.type == 'add' ? '' : rowed.id, //判断是否增加还是修改主键ID
          actualTradeAmount: this.state.amountIncurred, //实际金额
          assetAccount: account.assetAccount || rowed.assetAccount, //资金账号
          assetAccountSn: account.assetAccountSn || rowed.assetAccountSn, //资金编码
          assetAccountName: account.assetAccountName || rowed.assetAccountName, //资金账号名称
          productName: this.state.productName || rowed.productName, //产品名称
          assetAccountType: account.accountType || '4' //资金账户类型
        };
        delete params['bz'];
        delete params['currentTradeDate']; // 当前不需要交易日字段
        if (isOpenFormModal.type == 'add') {
          delete params['id'];
          asyncHttpAddRow({ params });
        } else {
          asyncHttpUpdateRow({ params });
        }
        openFormModal({ type: '', status: false });
        resetAccont();
      } else {
        message.error('请按要求填写');
      }
    });
  }

  /*判断是否进行调整结算*/
  isAdjustment = () => {
    /**判断这三个值是否都存在当全部存在的时候返回true*/
    if (
      !isNaN(this.state.amountIncurred) &&
      this.state.changeSubject &&
      this.state.directionOfLending
    ) {
      return true;
    }
    return false;
  };

  /**进行调整结算*** */

  changeAdjustment = () => {
    /**重置调整后金额*/
    const { changeAccountAfter, account } = this.props;

    //判断是否有调整后金额
    if (!this.isAdjustment() || account.totalAmount === null) {
      return;
    }
    if (this.state.changeSubject == '0' && this.state.directionOfLending == '0') {
      //  可用 借
      let usableMoney =
        keepNDecimals(compute(account.usableAmount, this.state.amountIncurred, 'minus'), 2) - 0;
      let totalMoney =
        keepNDecimals(compute(account.totalAmount, this.state.amountIncurred, 'minus'), 2) - 0;

      changeAccountAfter({
        usableAmount: isNaN(usableMoney) ? null : usableMoney,
        totalAmount: isNaN(totalMoney) ? null : totalMoney,
        lockedAmount: account.lockedAmount
      });

      if (usableMoney < 0) {
        this.setState({
          isMoneyNoOk: true
        });
        message.error('可用金额不能小于0');
        return;
      }
    } else if (this.state.changeSubject == '0' && this.state.directionOfLending == '1') {
      //可用 贷
      let usableMoney =
        keepNDecimals(compute(account.usableAmount, this.state.amountIncurred), 2) - 0;
      let totalMoney =
        keepNDecimals(compute(account.totalAmount, this.state.amountIncurred), 2) - 0;
      changeAccountAfter({
        usableAmount: isNaN(usableMoney) ? null : usableMoney,
        totalAmount: isNaN(totalMoney) ? null : totalMoney,
        lockedAmount: account.lockedAmount
      });
    } else if (this.state.changeSubject == '1' && this.state.directionOfLending == '0') {
      //锁定 借
      let Money =
        keepNDecimals(compute(account.lockedAmount, this.state.amountIncurred, 'minus'), 2) - 0;
      let totalMoney =
        keepNDecimals(compute(account.totalAmount, this.state.amountIncurred, 'minus'), 2) - 0;

      changeAccountAfter({
        lockedAmount: isNaN(Money) ? null : Money,
        totalAmount: isNaN(totalMoney) ? null : totalMoney,
        usableAmount: account.usableAmount
      });

      if (Money < 0) {
        message.error('锁定定额不能小于0');
        this.setState({
          isMoneyNoOk: true
        });
        return;
      }
    } else if (this.state.changeSubject == '1' && this.state.directionOfLending == '1') {
      //锁定 贷
      let Money = keepNDecimals(compute(account.lockedAmount, this.state.amountIncurred), 2) - 0;
      let totalMoney =
        keepNDecimals(compute(account.totalAmount, this.state.amountIncurred), 2) - 0;
      changeAccountAfter({
        lockedAmount: isNaN(Money) ? null : Money,
        totalAmount: isNaN(totalMoney) ? null : totalMoney,
        usableAmount: account.usableAmount
      });
    }
    this.setState({
      isMoneyNoOk: false
    });
  };
  /**获取资金金额*/
  getAccont = async () => {
    const { asyncHttpGetAccount } = this.props;
    if (this.state.productId && this.state.settleInstitution) {
      let params = {
        productId: this.state.productId,
        subjectType: 2,
        settleInstitution: this.state.settleInstitution
      };
      await asyncHttpGetAccount({
        params
      });
    }
    const { account } = this.props;
    this.myForm.props.form.setFieldsValue({
      // 更新显示
      assetAccount: account.assetAccount,
      assetAccountName: account.assetAccountName,
      assetAccountType: account.accountType
    });
  };
}
const WrappedFormRule = Form.create()(CapitalAdjustment);
export default WrappedFormRule;
