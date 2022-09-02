import React, { PureComponent } from 'react';
import { message } from 'antd';
import moment from 'moment';
import { setFieldsObject, NormalForm, filterNullElement } from 'yss-biz';
const { mapOption } = NormalForm;

class FormRule extends PureComponent {
  state = {
    accountType: [],
    selectAccountType: ''
  };

  render() {
    const { isOpenFormModal, treeItemed } = this.props;
    const { selectAccountType } = this.state;
    // console.log(treeItemed)
    const disabled =
      isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see' ? true : false;
    let label =
      treeItemed.floor == 1 || treeItemed.floor == 2
        ? '机构'
        : treeItemed.floor == 3
        ? '产品'
        : '资产单元';

    let formItems = [
      {
        name: 'relatedSubjectCode',
        label: `${label}代码`,
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'relatedSubjectName',
        label: `${label}名称`,
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        isLine: true
      },
      {
        name: 'assetAccountSn',
        label: '资金账户编号',
        type: 'Input',
        // unBind: true,
        props: {
          disabled: true,
          placeholder: '编号自动生成'
        }
      },
      {
        name: 'accountType',
        label: '账户类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '账户类型不能为空'
          }
        ],
        options: mapOption(this.state.accountType, 'dicExplain', 'dicCode'),
        props: {
          // disabled,
          //getDics: 1030003,
          placeholder: '请选择账户类型',
          onChange: value => {
            this.setState({ selectAccountType: value });
          }
        }
      },
      {
        name: 'assetAccount',
        label: '资金账号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '资金账号不能为空'
          },
          { pattern: /^.{0,255}$/, message: '允许输入最大长度255' }
        ],
        props: {
          disabled,
          placeholder: '请输入资金账号'
        }
      },
      {
        name: 'assetAccountName',
        label: '资金账号名称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '资金账号名称不能为空'
          },
          { pattern: /^.{0,255}$/, message: '允许输入最大长度255' }
        ],
        props: {
          disabled,
          placeholder: '请输入资金账号名称'
        }
      },
      {
        name: 'openingInstitutionName',
        label: '开户机构',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '开户机构不能为空'
          },
          { pattern: /^.{0,120}$/, message: '允许输入最大长度120' }
        ],
        props: {
          disabled,
          placeholder: '请输入开户机构'
        }
      },
      {
        name: 'openingBankName',
        label: '开户行',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '开户行不能为空'
          },
          { pattern: /^.{0,255}$/, message: '允许输入最大长度255' }
        ],
        props: {
          disabled,
          placeholder: '请输入开户行'
        }
      },
      selectAccountType != 4 && selectAccountType != 7
        ? {
            name: 'paymentSystemBankNumber',
            label: '支付系统行号',
            type: 'Input',
            rules: [
              {
                required: true,
                message: '支付系统行号不能为空'
              },
              { pattern: /^.{0,50}$/, message: '允许输入最大长度50' }
            ],
            props: {
              disabled,
              placeholder: '请输入支付系统行号'
            }
          }
        : undefined,
      {
        name: 'accountNature',
        label: '账户性质',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '账户性质不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择账户性质',
          getDics: 1030004
        }
      },
      {
        name: 'moneyType',
        label: '币种',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '币种不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择币种',
          getDics: 1030005
        }
      },
      {
        name: 'openingDate',
        label: '开户时间',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '开户时间不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择开户时间',
          format: 'YYYY-MM-DD'
        }
      },
      {
        isLine: true,
        hidden: true
      },
      {
        name: 'remarks',
        label: '备注',
        type: 'TextArea',
        itemSize: '460px',
        rules: [{ pattern: /^.{0,500}$/, message: '允许输入最大长度500' }],
        props: {
          disabled,
          placeholder: '请输入备注'
        }
      }
    ].filter(Boolean);

    return (
      <NormalForm
        refs={ref => (this.createAccount = ref)}
        labelSize="9em"
        lineOf={3}
        formItem={formItems}
      />
    );
  }

  componentDidMount() {
    const { capitaled, isOpenFormModal, treeItemed, asyncHttpCapitalAccountType } = this.props;
    this.props.onRef(this);
    // console.log(treeItemed)
    asyncHttpCapitalAccountType().then(() => {
      const { capitalAccountType } = this.props;
      //账户类型下拉框初始化
      const arr = capitalAccountType.filter(item => {
        if (treeItemed.floor == 1) {
          //顶级(托管行)
          return ['3', '6', '8'].includes(item.dicCode);
        } else if (treeItemed.floor == 2) {
          //管理人
          return ['5'].includes(item.dicCode);
        } else {
          //产品级
          return ['1', '4', '7'].includes(item.dicCode);
        }
      });
      this.setState({
        accountType: arr
      });
    });

    this.createAccount.setValues({
      ...setFieldsObject(capitaled, isOpenFormModal.type),
      relatedSubjectCode: treeItemed.code,
      relatedSubjectName: treeItemed.title,
      openingDate:
        isOpenFormModal.type == 'add' ? null : moment(capitaled.openingDate, 'YYYY-MM-DD')
    });
  }

  //点击确定进行增加修改操作
  async handleSubmit(e) {
    const {
      asyncHttpAddRow,
      asyncHttpDeleteRow,
      asyncHttpUpdateRow,
      openFormModal,
      isOpenFormModal,
      treeItemed,
      capitaled
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type === 'delete') {
      asyncHttpDeleteRow({ params: capitaled, type: 'assetAccount' }).then(() => {
        openFormModal({ type: 'add', status: false, sign: '' });
      });
    } else {
      this.createAccount.props.form.validateFields((err, value) => {
        if (!err) {
          const action = {
            add: asyncHttpAddRow,
            update: asyncHttpUpdateRow
          };
          let params = {
            ...value,
            openingDate: value['openingDate'].format('YYYY-MM-DD'),
            relatedSubjectType: treeItemed.floor - 1 + '',
            id: isOpenFormModal.type == 'add' ? '' : capitaled.id,
            relatedSubjectId: treeItemed.floor >= 3 ? treeItemed.key : '',
            createTime: isOpenFormModal.type == 'add' ? '' : capitaled && capitaled.createTime,
            deleteFlag: capitaled.deleteFlag
          };
          action[isOpenFormModal.type]({
            params: filterNullElement(params),
            type: 'assetAccount',
            list: 'capitalList'
          }).then(() => {
            openFormModal({ type: 'add', status: false, sign: '' });
          });
        } else {
          message.error('请按要求填写');
        }
      });
    }
  }
}
export default FormRule;
