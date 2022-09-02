import React, { PureComponent } from 'react';
import { NormalForm, UploadModal, setFieldsObject } from 'yss-biz';
import moment from 'moment';
const { mapOption } = NormalForm;

export const formLayout_second = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

class ClientFormRule extends PureComponent {
  //文档类型
  state = {
    files: {},
    type: '', //选择上传的文件的类型,
    docs: [],
    parentName: '' //母公司全称
  };
  render() {
    const {
      isOpenFormModal
      // parentNameDownList
      // organizationNamelList,
      // changeConsignorDownList,
      // consignorDownList
    } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';
    const formItems = [
      {
        label: '管理人名称',
        name: 'fullNameCn',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '管理人名称不能为空'
          },
          { pattern: /^.{0,100}$/, message: '允许输入最大长度100' }
        ],
        props: {
          placeholder: '请输入管理人名称'
        }
        // options: mapOption(consignorDownList, 'fullNameCn', 'code'),
        // props: {
        //   // onChange: (value, option) => {
        //   //   changeConsignorDownList({ value, option });
        //   // },
        //   placeholder: '请选择管理人',
        //   disabled: isOpenFormModal.type === 'add' ? false : true
        // }
      },
      {
        name: 'code',
        label: '机构代码',
        type: 'Input',
        // unBind: true,
        rules: [
          {
            required: true,
            message: '机构代码不能为空'
          },
          { pattern: /^.{0,30}$/, message: '允许输入最大长度30' }
        ],
        props: {
          placeholder: '请输入机构代码',
          disabled: isOpenFormModal.type != 'add'
          // value: consignorDownRelation.publisherCode || consignorDownRelation.code,
          // disabled: true
        }
      },
      {
        name: 'shortNameCn',
        label: '机构简称',
        type: 'Input',
        // unBind: true,
        rules: [{ pattern: /^.{0,40}$/, message: '允许输入最大长度40' }],
        props: {
          placeholder: '请输入机构简称'
          // value: consignorDownRelation.shortNameCn
          // disabled: true
        }
      },
      {
        name: 'shortNameEn',
        label: '英文简称',
        type: 'Input',
        // unBind: true,
        rules: [{ pattern: /^.{0,100}$/, message: '允许输入最大长度100' }],
        props: {
          placeholder: '请输入英文简称'
          // value: consignorDownRelation.shortNameEn,
          // disabled: true
        }
      },
      {
        name: 'publisherType',
        label: '机构类型',
        type: 'Select',
        // unBind: true,
        // rules: [
        //   {
        //     required: true,
        //     message: '机构类型不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选择机构类型',
          getDics: 1030024
          // value: consignorDownRelation.publisherType,
          // disabled: true
        }
      },
      {
        name: 'foundDate',
        label: '成立时间',
        // unBind: true,
        type: 'DatePicker',
        // rules: [
        //   {
        //     required: true,
        //     message: '成立时间不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选择成立时间',
          format: 'YYYY-MM-DD'
          // value: consignorDownRelation.foundDate,
          // disabled: true
        }
      },
      {
        label: '准入日期',
        name: 'admittanceDate',
        type: 'DatePicker',
        // rules: [
        //   {
        //     required: true,
        //     message: '准入时间不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选择准入日期',
          disabled,
          format: 'YYYY-MM-DD'
        }
      },
      {
        label: '人行备案日期',
        name: 'pbcRecordDate',
        type: 'DatePicker',
        // rules: [
        //   {
        //     required: true,
        //     message: '人行备案日期不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选人行备案日期',
          disabled,
          format: 'YYYY-MM-DD'
        }
      },
      {
        isLine: true
      },
      {
        name: 'unifiedSocialCreditCode',
        label: '社会统一信用代码',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '统一社会信用代码不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,36}$/, message: '允许输入最大长度36' }],
        props: {
          disabled,
          placeholder: '请输入社会统一信用代码'
        }
      },
      {
        name: 'registerCapital',
        label: '注册资本',
        type: 'InputPart',
        // rules: [
        //   {
        //     required: true,
        //     message: '注册资本不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,11}$/, message: '允许输入最大长度11' }],
        props: {
          disabled,
          type: 'InputNumber',
          placeholder: '请输入注册资本'
        }
      },
      {
        name: 'assetsCurrencyCode',
        label: '资本币种',
        type: 'Select',
        // rules: [
        //   {
        //     required: true,
        //     message: '资本币种不能为空'
        //   }
        // ],
        props: {
          disabled,
          placeholder: '请选择资本币种',
          getDics: 1030005
        }
      },
      {
        name: 'legalPerson',
        label: '法人代表',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '法人代表不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,32}$/, message: '允许输入最大长度32' }],
        props: {
          disabled,
          placeholder: '请输入法人代表'
        }
      },
      {
        name: 'legalPersonCertType',
        label: '法人代表证件类型',
        type: 'Select',
        // rules: [
        //   {
        //     required: true,
        //     message: '法人代表证件类型不能为空'
        //   }
        // ],
        props: {
          disabled,
          placeholder: '请选择法人代表证件类型',
          getDics: 1030011
        }
      },
      {
        name: 'legalPersonCertId',
        label: '法人代表证件号码',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '法人代表证件号码不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,50}$/, message: '允许输入最大长度50' }],
        props: {
          disabled,
          placeholder: '请输入法人代表证件号码'
        }
      },
      {
        name: 'registerAddress',
        label: '注册地址',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '注册地址不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,255}$/, message: '允许输入最大长度255' }],
        props: {
          disabled,
          placeholder: '请输入注册地址'
        }
      },
      // {
      //   name: 'parentCode',
      //   label: '母公司',
      //   type: 'Select',
      //   options: mapOption(parentNameDownList, 'fullNameCn', 'publisherCode'),
      //   props: {
      //     disabled,
      //     placeholder: '请选择母公司',
      //     onChange: (value, option) => {
      //       this.setState({
      //         parentName: option.props.children
      //       });
      //     }
      //   }
      // },
      {
        name: 'parentName',
        label: '母公司名称',
        type: 'Input',
        props: {
          disabled,
          placeholder: '请输入母公司名称'
        }
      },
      {
        isLine: true
      },
      {
        name: 'linkman',
        label: '联系人',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '联系人不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,30}$/, message: '允许输入最大长度30' }],
        props: {
          disabled,
          placeholder: '请输入联系人'
        }
      },
      {
        name: 'officePhone',
        label: '联系电话',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '联系电话不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,20}$/, message: '允许输入最大长度20' }],
        props: {
          disabled,
          placeholder: '请输入联系电话'
        }
      },
      {
        name: 'email',
        label: '电子邮箱',
        type: 'Input',
        rules: [{ pattern: /^.{0,50}$/, message: '允许输入最大长度50' }],
        props: {
          disabled,
          placeholder: '请输入电子邮箱'
        }
      },
      {
        name: 'mobilePhone',
        label: '手机号码',
        type: 'Input',
        rules: [{ pattern: /^.{0,32}$/, message: '允许输入最大长度32' }],
        props: {
          disabled,
          placeholder: '请输入手机号码'
        }
      },
      {
        name: 'faxAddress',
        label: '传真地址',
        type: 'Input',
        rules: [{ pattern: /^.{0,32}$/, message: '允许输入最大长度32' }],
        props: {
          disabled,
          placeholder: '请输入传真地址'
        }
      },
      {
        name: 'officeAddress',
        label: '办公地址',
        type: 'Input',
        // rules: [
        //   {
        //     required: true,
        //     message: '办公地址不能为空'
        //   }
        // ],
        rules: [{ pattern: /^.{0,255}$/, message: '允许输入最大长度255' }],
        props: {
          disabled,
          placeholder: '请输入办公地址'
        }
      },
      {
        name: 'remark',
        label: '备注',
        type: 'TextArea',
        itemSize: '460px',
        rules: [{ pattern: /^.{0,500}$/, message: '允许输入最大长度500' }],
        props: {
          disabled,
          placeholder: '请输入备注'
        }
      }
    ];
    return (
      <>
        <NormalForm
          refs={ref => (this.clientForm = ref)}
          labelSize="8em"
          lineOf={3}
          formItem={formItems}
        />
        {/* {isOpenFormModal.type === 'add' ? (
          <Row>
            <div style={{ paddingLeft: '100px' }}>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>1.营业执照</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(1);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files['1'] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files['1']}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(1);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>2、金融业务许可证</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(2);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files[2] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files[2]}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(2);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>3、法人证件</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(3);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files[3] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files[3]}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(3);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>4、人行备案证明</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(4);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files[4] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files[4]}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(4);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>5、尽调报告</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(5);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files[5] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files[5]}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(5);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Col span={4}>6、其他</Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.uploadFiles(6);
                  }}
                >
                  添加附件
                </Button>
                {this.state.files[6] ? (
                  <div style={{ padding: '10px 0 10px 204px' }}>
                    <Icon type="paper-clip" />
                    {this.state.files[6]}{' '}
                    <span
                      className="deleteFj"
                      onClick={() => {
                        this.deleteFiles(6);
                      }}
                    >
                      删除
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Row>
        ) : (
          ''
        )} */}
        {/**上传组件** */}
        {/* <UploadModal
          uploadList={this.addUploadFiles}
          action="/dfas-common-file/files/uploadBatchFile"
        /> */}
        {/**上传组件** */}
      </>
    );
  }

  componentDidMount() {
    const { isOpenFormModal, consignored, asyncHttpParentCode } = this.props;
    this.props.onRef(this);
    // 表单初始化
    if (isOpenFormModal.type != 'add') {
      this.clientForm.setValues({
        ...consignored,
        admittanceDate: consignored.admittanceDate
          ? moment(consignored.admittanceDate, 'YYYY-MM-DD')
          : null,
        pbcRecordDate: consignored.pbcRecordDate
          ? moment(consignored.pbcRecordDate, 'YYYY-MM-DD')
          : null,
        foundDate: consignored.foundDate ? moment(consignored.foundDate, 'YYYY-MM-DD') : null
      });
    }
    asyncHttpParentCode();
  }

  //将上传的文件保存到state
  addUploadFiles = data => {
    if (!data[0].id) {
      return;
    }
    this.setState(
      () => {
        this.state.files[this.state.type] = data.length && data[0].fileName;
        this.state.docs.push({
          files: [
            {
              id: (data.length && data[0].id[0]) || '',
              name: (data.length && data[0].fileName) || ''
            }
          ],
          type: this.state.type
        });
        return {
          files: this.state.files,
          docs: this.state.docs
        };
      },
      () => {
        this.forceUpdate(); //强制渲染页面
      }
    );
  };

  /**删除文件**/
  deleteFiles = type => {
    let files = this.state.files;
    let docs = this.state.docs.filter(item => item.type != type);
    delete files[type];
    this.setState({
      files,
      docs
    });
  };

  /**打开上传组件*/
  uploadFiles = type => {
    this.setState({
      type: type
    });
    UploadModal.show();
  };

  /**点击确定进行增加修改操作**/
  async handleSubmit(e) {
    const {
      asyncHttpAddClientRow,
      asyncHttpUpDateClientRow,
      asyncHttpDeleteClientRow,
      openFormModal,
      isOpenFormModal,
      consignored
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type === 'delete') {
      asyncHttpDeleteClientRow({ params: consignored }).then(res => {
        openFormModal({ type: 'add', status: false });
      });
    } else {
      this.clientForm.props.form.validateFields((err, values) => {
        if (!err) {
          const action = {
            add: asyncHttpAddClientRow,
            update: asyncHttpUpDateClientRow
          };
          let params = {
            ...values,
            admittanceDate: values['admittanceDate']
              ? values['admittanceDate'].format('YYYY-MM-DD')
              : '',
            pbcRecordDate: values['pbcRecordDate']
              ? values['pbcRecordDate'].format('YYYY-MM-DD')
              : '',
            // fullNameCn: isOpenFormModal.type == 'add' ? values.fullNameCn : consignored.fullNameCn, //机构全称?
            // code: isOpenFormModal.type == 'add' ? values.code : consignored.code, //机构coed
            // shortNameCn:
            //   isOpenFormModal.type == 'add' ? values.shortNameCn : consignored.shortNameCn, //机构简称,
            // shortNameEn:
            //   isOpenFormModal.type == 'add' ? values.shortNameEn : consignored.shortNameEn, //英文简称
            // publisherType:
            //   isOpenFormModal.type == 'add' ? values.publisherType : consignored.publisherType, //机构类型
            foundDate: values['foundDate'] ? values['foundDate'].format('YYYY-MM-DD') : '',
            // parentName: this.setState.parentName
            //   ? this.setState.parentName
            //   : consignored.parentName, //母公司
            id: isOpenFormModal.type != 'add' ? consignored.id : '',
            docs: this.state.docs
          };
          action[isOpenFormModal.type]({
            params
          }).then(res => {
            openFormModal({ type: 'add', status: false });
          });
        }
      });
    }
  }
}

export default ClientFormRule;
