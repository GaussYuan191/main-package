import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Select, message, DatePicker } from 'antd';
import { setFieldsObject, filterNullElement, SelectMapDics } from 'yss-biz';
import moment from 'moment';
const { Option } = Select;
const formLayout_fir = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 14
  }
};

export const formLayout_second = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

class AccountFormRule extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      // accountTypeList,
      // accountNatureList,
      // tradeMarketNameList,
      openingInstitutionNameList,
      // moneyTypeList,
      isOpenFormModal
    } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';
    // const formItem = [
    //   {
    //     name: 'defaultField',
    //     label: '产品代码',
    //     type: 'Input',
    //     rules: [
    //       {
    //         required: true,
    //         message: '产品代码不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请输入产品代码',
    //       disabled
    //     }
    //   },
    //   {
    //     name: 'productName',
    //     label: '产品',
    //     type: 'Input',
    //     rules: [
    //       {
    //         required: true,
    //         message: '产品代码不能为空'
    //       }
    //     ],
    //     props: {
    //       placeholder: '请输入产品代码',
    //       disabled
    //     }
    //   }
    // ];
    return (
      <Form {...formLayout_fir}>
        <Row className="hr">
          <Col span={8} className="relative">
            <Form.Item label="产品代码">
              {getFieldDecorator('defaultField', {
                rules: [
                  {
                    required: true,
                    message: '产品代码不能为空'
                  }
                ]
              })(<Input disabled={disabled} placeholder="请输入产品代码" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="产品全称">
              {getFieldDecorator('productName', {
                rules: [
                  {
                    required: true,
                    message: '产品全称不能为空'
                  }
                ]
              })(<Input disabled={disabled} placeholder="请输入产品全称" autocomplete="off" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="账户编号">
              {getFieldDecorator(
                'productShortName',
                {}
              )(<Input disabled={disabled} placeholder="请输入产品简称" autocomplete="off" />)}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="账户代码1">
              {getFieldDecorator(
                'productType',
                {}
              )(<Input disabled={disabled} placeholder="请输入账户代码" autocomplete="off" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="账户名称">
              {getFieldDecorator(
                'accountName',
                {}
              )(<Input disabled={disabled} placeholder="请输入账户名称" autocomplete="off" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="账户类型">
              {getFieldDecorator('accountTypeName')(
                <SelectMapDics
                  disabled={disabled}
                  allowClear
                  code="1030022"
                  placeholder="请输入账户类型"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="交易市场">
              {getFieldDecorator('tradeMarketName')(
                <SelectMapDics
                  disabled={disabled}
                  allowClear
                  code="1030008"
                  placeholder="请输入交易市场"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="账户性质">
              {getFieldDecorator('accountNature', {
                rules: [
                  {
                    required: true,
                    message: '账户性质不能为空'
                  }
                ]
              })(
                <SelectMapDics
                  disabled={disabled}
                  allowClear
                  code="103004"
                  placeholder="请输入账户性质"
                />
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="开户机构">
              {getFieldDecorator('openingInstitutionName', {
                rules: [
                  {
                    required: true,
                    message: '开户机构不能为空'
                  }
                ]
              })(
                <Select placeholder="请选择开户机构" disabled={disabled} allowClear>
                  {openingInstitutionNameList.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="开户行">
              {getFieldDecorator('openingBankName', {
                rules: [
                  {
                    required: true,
                    message: '开户行不能为空'
                  }
                ]
              })(<Input disabled={disabled} placeholder="请输入开户行" autocomplete="off" />)}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="支付系统行号">
              {getFieldDecorator('paymentSystemBankNumber')(
                <Input disabled={disabled} placeholder="请输入支付系统行号" autocomplete="off" />
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="币种">
              {getFieldDecorator('moneyType', {
                rules: [
                  {
                    required: true,
                    message: '币种不能为空'
                  }
                ]
              })(
                <SelectMapDics
                  disabled={disabled}
                  allowClear
                  code="1030005"
                  placeholder="请输入币种"
                />
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="开户日期">
              {getFieldDecorator('openingDate')(
                <DatePicker placeholder="请选择到期日期" disabled={disabled} format="YYYY-MM-DD" />
              )}
            </Form.Item>
          </Col>
          <Col span={19}>
            <Form.Item label="账户备注" labelCol={{ span: 4 }}>
              {getFieldDecorator('remark', {
                rules: []
              })(<Input disabled={disabled} placeholder="请输入备注" />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  componentDidMount() {
    const { isOpenFormModal, accounted } = this.props;
    this.props.onRef(this);
    //表单初始化
    this.props.form.setFieldsValue({
      ...setFieldsObject(accounted, isOpenFormModal.type),
      openingDate: isOpenFormModal.type == 'add' ? '' : moment(accounted.openingDate, 'YYYY-MM-DD')
    });
  }

  // //点击确定进行增加修改操作
  handleSubmit(e) {
    const {
      asyncHttpUpDateAccount,
      asyncHttpAddAccount,
      asyncHttpDeleteAccount,
      accounted,
      openFormModal,
      isOpenFormModal
    } = this.props;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const action = {
          add: asyncHttpAddAccount,
          update: asyncHttpUpDateAccount,
          delete: asyncHttpDeleteAccount
        };
        let params = {
          ...values,
          openingDate: values['openingDate'].format('YYYY-MM-DD'),
          id: accounted.id ? accounted.id : ''
        };

        action[isOpenFormModal.type]({
          params: filterNullElement(params)
        }).then(() => {
          openFormModal({ type: 'add', status: false });
        });
      } else {
        message.error('请按要求填写信息');
      }
    });
  }
}
const WrappedFormRule = Form.create()(AccountFormRule);

export default WrappedFormRule;
