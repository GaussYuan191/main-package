import React, { PureComponent } from 'react';
import { message } from 'antd';
import { setFieldsObject, NormalForm ,filterNullElement} from 'yss-biz';
import moment from 'moment';
const { mapOption } = NormalForm;

class FormRule extends PureComponent {
  state = {
    accountType: []
  };
  render() {
    const { isOpenFormModal, treeItemed, bonded } = this.props;
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
        name: 'bondTrusteeshipAccountSn',
        label: '债券托管账户编号',
        type: 'Input',
        // unBind: true,
        props: {
          placeholder: '债券托管账户编号自动生成',
          disabled: true
        }
      },
      {
        name: 'bondTrusteeshipAccount',
        label: '债券托管账户',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '债券托管账户不能为空'
          },
          { pattern: /^.{0,20}$/, message: '允许输入最大长度20' }
        ],
        props: {
          disabled,
          placeholder: '请输入债券托管账户'
        }
      },
      {
        name: 'bondTrusteeshipName',
        label: '债券名称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '债券托管账户名称不能为空'
          },
          { pattern: /^.{0,120}$/, message: '允许输入最大长度120' }
        ],
        props: {
          disabled,
          placeholder: '请输入债券托管账户名称'
        }
      },
      {
        name: 'depositOrganName',
        label: '托管机构',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '托管机构不能为空'
          }
        ],
        props: {
          disabled,
          getDics: 1030007,
          placeholder: '请选择托管机构'
        }
      },
      {
        name: 'tradeMarketName',
        label: '交易市场',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '交易市场不能为空'
          }
        ],
        props: {
          disabled,
          getDics: 1030008,
          placeholder: '请选择交易市场'
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
          disabled,
          // getDics: 1030006,
          placeholder: '请选择账户类型'
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
          placeholder: '请选择开户时间'
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
    ];
    return (
      <NormalForm
        refs={ref => (this.createBondAccount = ref)}
        labelSize="8em"
        lineOf={3}
        formItem={formItems}
      />
    );
  }

  async componentDidMount() {
    const { bonded, isOpenFormModal, treeItemed, asyncHttpBondAccountType } = this.props;
    this.props.onRef(this);
    //账户类型选择框初始化
    asyncHttpBondAccountType().then(data => {
      const { bondAccountType } = this.props;
      const arr = bondAccountType.filter(item => {
        if (treeItemed.floor == 1) {
          // 顶级
          return !['3', '4'].includes(item.dicCode);
        } else {
          // 非顶级
          return ['3', '4'].includes(item.dicCode);
        }
      });
      this.setState({
        accountType: arr
      });
    });

    this.createBondAccount.setValues({
      ...setFieldsObject(bonded, isOpenFormModal.type),
      relatedSubjectCode: treeItemed.code,
      relatedSubjectName: treeItemed.title,
      openingDate: isOpenFormModal.type === 'add' ? null : moment(bonded.openingDate, 'YYYY-MM-DD')
    });
  }

  //点击确定进行增加修改操作
  handleSubmit(e) {
    const {
      asyncHttpAddRow,
      asyncHttpDeleteRow,
      asyncHttpUpdateRow,
      isOpenFormModal,
      openFormModal,
      bonded,
      treeItemed
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type === 'delete') {
      asyncHttpDeleteRow({ params: bonded, type: 'bondAccount' }).then(() => {
        openFormModal({ type: 'add', status: false, sign: '' });
      });
    } else {
      this.createBondAccount.props.form.validateFields((err, values) => {
        if (!err) {
          const action = {
            add: asyncHttpAddRow,
            update: asyncHttpUpdateRow
          };
          let params = {
            ...values,
            openingDate: values['openingDate'].format('YYYY-MM-DD'),
            relatedSubjectType: treeItemed.floor - 1 + '',
            id: isOpenFormModal.type === 'add' ? '' : bonded.id,
            relatedSubjectId:treeItemed.floor>=3 ? treeItemed.key  : '',
          };

          action[isOpenFormModal.type]({
            params:filterNullElement(params),
            type: 'bondAccount',
            list: 'bondList'
          }).then(() => {
            openFormModal({ type: 'add', status: false, sign: '' });
          });
        } else {
          message.error('请按要求填写信息');
        }
      });
    }
  }
}

export default FormRule;
