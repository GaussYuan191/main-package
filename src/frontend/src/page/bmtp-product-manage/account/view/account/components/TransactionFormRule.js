import React, { PureComponent } from 'react';
import moment from 'moment';
import { NormalForm, setFieldsObject } from 'yss-biz';
class TransactionFormRule extends PureComponent {
  render() {
    const { isOpenFormModal, treeItemed } = this.props;
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
        name: '',
        label: '交易账户编号',
        type: 'Input',
        unBind: true,
        props: {
          disabled: true,
          placeholder: '编号自动生成'
        }
      },
      {
        name: 'tradeAccount',
        label: '交易账户代码',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '交易账户代码不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请输入交易账户代码'
        }
      },
      {
        name: 'tradeName',
        label: '交易账户名称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '交易账户名称不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请输入交易账户名称'
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
        name: 'limitMoney',
        label: '限额（万元）',
        type: 'InputPart',
        props: {
          disabled,
          type: 'InputNumber',
          placeholder: '请输入限额（万元）'
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
        name: 'expireDate',
        label: '到期日',
        type: 'DatePicker',
        props: {
          disabled,
          placeholder: '请选择到期日',
          format: 'YYYY-MM-DD'
        }
      },
      {
        name: 'delistingDate',
        label: '退市日',
        type: 'DatePicker',
        props: {
          disabled,
          placeholder: '请选择退市日',
          format: 'YYYY-MM-DD'
        }
      },
      {
        isLine: true,
        hidden: true
      },
      {
        name: 'remark',
        label: '备注',
        type: 'TextArea',
        itemSize: '460px',
        props: {
          disabled,
          placeholder: '请输入备注'
        }
      }
    ];
    return (
      <NormalForm
        refs={ref => (this.createTransactionAccount = ref)}
        labelSize="8em"
        lineOf={3}
        formItem={formItems}
      />
    );
  }

  componentDidMount() {
    const { transactioned, isOpenFormModal, treeItemed } = this.props;
    this.props.onRef(this);
    //表单初始化
    this.createTransactionAccount.setValues({
      ...setFieldsObject(transactioned, isOpenFormModal.type),
      relatedSubjectCode: treeItemed.code,
      relatedSubjectName: treeItemed.title,
      expireDate:
        isOpenFormModal.type == 'add' ? '' : moment(transactioned.expireDate, 'YYYY-MM-DD'),
      delistingDate:
        isOpenFormModal.type == 'add' ? '' : moment(transactioned.delistingDate, 'YYYY-MM-DD')
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
      transactioned,
      treeItemed
    } = this.props;
    e.preventDefault();
    this.createTransactionAccount.props.form.validateFields((err, values) => {
      if (!err) {
        const action = {
          add: asyncHttpAddRow,
          update: asyncHttpUpdateRow,
          delete: asyncHttpDeleteRow
        };
        let params = {
          ...values,
          // relatedSubjectType: '2',
          delistingDate: values['delistingDate'].format('YYYY-MM-DD'),
          expireDate: values['expireDate'].format('YYYY-MM-DD'),
          relatedSubjectType: treeItemed.floor - 1 + '',
          id: !isOpenFormModal.add ? transactioned.id : ''
        };

        action[isOpenFormModal.type]({
          params,
          type: 'tradeAccount',
          list: 'transactionList'
        }).then(() => {
          openFormModal({ type: 'add', status: false, sign: '' });
        });
      }
    });
  }
}

export default TransactionFormRule;
