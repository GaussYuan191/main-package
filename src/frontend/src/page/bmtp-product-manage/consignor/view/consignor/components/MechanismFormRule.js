import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { setFieldsObject } from 'yss-biz/utils/util/tools';
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

class ClientFormRule extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isOpenClientsModal } = this.props;
    return (
      <Form {...formLayout_fir}>
        <Row className="hr">
          <Col span={8} className="relative">
            <Form.Item label="委托人名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '委托人名称不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入委托人名称"
                />
              )}
            </Form.Item>
            {isOpenClientsModal.type == 'add' ? <Button className="last">新增机构</Button> : ''}
          </Col>
          <Col span={8}>
            <Form.Item label="机构代码">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="机构简称">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="英文简称">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="机构类型">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="成立日期">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="准入日期">
              {getFieldDecorator('admittanceDate', {
                rules: [
                  {
                    required: true,
                    message: '准入日期不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入准入日期"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="人行备案日期">
              {getFieldDecorator('pbcRecordDate', {
                rules: [
                  {
                    required: true,
                    message: '人行备案日期不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入人行备案日期"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row className="hr">
          <Col span={8}>
            <Form.Item label="统一社会信用代码">
              {getFieldDecorator('unifiedSocialCreditCode', {
                rules: [
                  {
                    required: true,
                    message: '统一社会信用代码不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入统一社会信用代码"
                />
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="注册资本">
              {getFieldDecorator('registerCapital', {
                rules: [
                  {
                    required: true,
                    message: '注册资本不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入注册资本"
                />
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="资本币种">
              {getFieldDecorator('assetsCurrencyCode', {
                rules: [
                  {
                    required: true,
                    message: '资本币种不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入资本币种"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="*法人代表">
              {getFieldDecorator('legalPerson', {
                rules: [
                  {
                    required: true,
                    message: '法人代表不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入法人代表"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="法人代表证件类型">
              {getFieldDecorator('legalPersonCertType', {
                rules: [
                  {
                    required: true,
                    message: '法人代表证件类型不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入法人代表证件类型"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="法人代表证件号码">
              {getFieldDecorator('legalPersonCertId', {
                rules: [
                  {
                    required: true,
                    message: '"法人代表证件号码不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入支付系统行号"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="注册地址">
              {getFieldDecorator('registerAddress', {
                rules: [
                  {
                    required: true,
                    message: '注册地址不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入注册地址"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="母公司">
              {getFieldDecorator('parentCompany', {
                rules: []
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入母公司"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row className="hr">
          <Col span={8}>
            <Form.Item label="联系人">
              {getFieldDecorator('linkman', {
                rules: [
                  {
                    required: true,
                    message: '联系人不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入联系人"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="联系电话">
              {getFieldDecorator('officePhone', {
                rules: [
                  {
                    required: true,
                    message: '联系电话不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入联系电话"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="电子邮箱">
              {getFieldDecorator('paymentSystemBankNumber', {
                rules: []
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入电子邮箱"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="手机号码">
              {getFieldDecorator('mobilePhone', {
                rules: [{}]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入手机号码"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="传真地址">
              {getFieldDecorator('faxAddress', {
                rules: []
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入传真地址"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="办公地址" labelCol={{ span: 3 }}>
              {getFieldDecorator('officeAddress', {
                rules: [
                  {
                    required: true,
                    message: '办公地址不能为空'
                  }
                ]
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入办公地址不能为空"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="备注" labelCol={{ span: 3 }}>
              {getFieldDecorator('remark', {
                rules: []
              })(
                <Input
                  disabled={
                    isOpenClientsModal.type == 'delete' || isOpenClientsModal.type == 'see'
                      ? true
                      : false
                  }
                  placeholder="请输入备注"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        {isOpenClientsModal.type == 'add' ? (
          <Row>
            <div style={{ paddingLeft: '100px' }}>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>1.营业执照</Col>
                <Button>添加附件</Button>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>2、金融业务许可证</Col>
                <Button>添加附件</Button>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>3、法人证件</Col>
                <Button>添加附件</Button>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>4、人行备案证明</Col>
                <Button>添加附件</Button>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>5、尽调报告</Col>
                <Button>添加附件</Button>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>6、其他</Col>
                <Button>添加附件</Button>
              </div>
            </div>
          </Row>
        ) : (
          ''
        )}
      </Form>
    );
  }
  handleChange = e => {
    // const val = e.target.value.toUpperCase();
  };
  componentDidMount() {
    const { isOpenClientsModal, cliented } = this.props;
    this.props.onRef(this);
    //表单初始化
    this.props.form.setFieldsValue(setFieldsObject(cliented, isOpenClientsModal.type));
  }

  // //点击确定进行增加修改操作
  // handleSubmit(e) {
  //   const { asyncHttpAddRow, asyncHttpDeleteRow, asyncHttpUpdateRow, addItem, deleteItem, updateItem, openCapitalModal, isOpenClientsModal, capitaled, treeItemed } = this.props;
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {

  //     let params = {
  //       ...values,
  //       relatedSubjectType: "2",
  //       relatedSubjectName: treeItemed.title,
  //       relatedSubjectCode: treeItemed.code,
  //       openingDate: "2019-12-27"
  //     }
  //     if (!err) {
  //       //判断是否添加一条数据
  //       if (isOpenClientsModal.type == "add") {
  //         asyncHttpAddRow({ params, type: "assetAccount" }).then(res => {
  //           addItem({ params, type: "capitalList" });
  //         })
  //         //判断是否修改一条数据
  //       } else if (isOpenClientsModal.type == "update") {
  //         let newParams = {
  //           id: capitaled.id,
  //           ...params

  //         }
  //         asyncHttpUpdateRow({ params: newParams, type: "assetAccount" }).then(res => {
  //           updateItem({ updateParams: newParams, type: "capitalList" });
  //         })

  //       }
  //       //判断是否删除一条数据
  //       else if (isOpenClientsModal.type == "delete") {
  //         asyncHttpDeleteRow({ id: capitaled.id, type: "assetAccount" }).then(res => {
  //           deleteItem({ id: capitaled.id, type: "capitalList" });
  //         })
  //       }
  //       openCapitalModal({ type: "add", status: false })

  //     } else {
  //       message.error('请按要求填写信息');
  //     }
  //   });
  // };
}
const WrappedFormRule = Form.create()(ClientFormRule);

export default WrappedFormRule;
