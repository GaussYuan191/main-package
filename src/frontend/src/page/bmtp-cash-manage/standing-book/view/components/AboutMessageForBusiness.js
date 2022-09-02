import React, { PureComponent } from 'react';
import { NormalForm } from 'yss-biz';
import moment from 'moment';
export default class AboutMessageForBusiness extends PureComponent {
  componentWillMount() {}
  handleQuery = () => {};
  render() {
    const { businessRowd } = this.props;

    const formItem = [
      {
        name: 'firstSettleDate',
        type: 'DatePicker',
        label: '首期结算日期',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.firstSettleDate ? moment(businessRowd.firstSettleDate) : '',
          placeholder: ''
        }
      },
      {
        name: 'firstInstructId',
        type: 'Input',
        label: '首期结算指令/合同编号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.firstInstructId
        }
      },
      {
        name: 'bondCode',
        type: 'Input',
        label: '债券代码',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.bondCode
        }
      },
      {
        name: 'bondName',
        type: 'Input',
        label: '债券名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.bondName
        }
      },
      {
        name: 'faceValue',
        type: 'InputPart',
        label: '券面总额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.faceValue
        }
      },
      {
        name: 'bizCategory',
        type: 'Input',
        label: '业务品种',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.bizCategoryName
        }
      },
      {
        name: 'accountType',
        type: 'Input',
        label: '台账类型',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.accountTypeName
        }
      },
      {
        name: 'finishStatus',
        type: 'Input',
        label: '完成情况',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.finishStatusName
        }
      },
      {
        name: 'secondSettleDate',
        type: 'DatePicker',
        label: '到期结算日期',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.secondSettleDate ? moment(businessRowd.secondSettleDate) : '',
          placeholder: ''
        }
      },
      {
        name: 'remainingMaturity',
        type: 'Input',
        label: '剩余期限',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.remainingMaturity
        }
      },
      {
        name: 'counterBondAccount',
        type: 'Input',
        label: '对手方债券账号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.counterBondAccount
        }
      },
      {
        name: 'counterName',
        type: 'Input',
        label: '对手方名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.counterName
        }
      },
      {
        name: 'settleInstitution',
        type: 'Input',
        label: '结算机构',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.settleInstitutionName
        }
      },
      {
        name: 'productName',
        type: 'Input',
        label: '产品名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.productName
        }
      },
      {
        name: 'consignorName',
        type: 'Input',
        label: '管理人',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: businessRowd.consignorName
        }
      }
    ];
    const newFormItem = formItem.map(item => {
      item.props.title = item.props.initialValue;
      return item;
    });
    return (
      <div className="f-flex-center f-mt30">
        <NormalForm lineOf={3} formItem={newFormItem} marginRight="100px" />
      </div>
    );
  }
}
