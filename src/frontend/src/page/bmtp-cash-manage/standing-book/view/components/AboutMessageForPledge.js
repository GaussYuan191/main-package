import React, { PureComponent } from 'react';
import { NormalForm } from 'yss-biz';
import moment from 'moment';
export default class AboutMessageForBusiness extends PureComponent {
  componentWillMount() {}
  handleQuery = () => {};
  render() {
    const { pledgeBondRowd } = this.props;

    const formItem = [
      {
        name: 'item1',
        type: 'DatePicker',
        label: '发生日期',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.createTime ? moment(pledgeBondRowd.createTime) : '',
          placeholder: ''
        }
      },
      {
        name: 'item2',
        type: 'Input',
        label: '首期结算合同编号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.firstInstructId
        }
      },
      {
        name: 'item3',
        type: 'Input',
        label: '债券代码',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.bondCode
        }
      },
      {
        name: 'item4',
        type: 'Input',
        label: '债券名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.bondName
        }
      },
      {
        name: 'item5',
        type: 'InputPart',
        label: '券面总额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.faceValue
        }
      },
      {
        name: 'item6',
        type: 'Input',
        label: '业务品种',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.bizCategoryName
        }
      },
      {
        name: 'item7',
        type: 'Input',
        label: '完成情况',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.finishStatusName
        }
      },
      {
        name: 'item8',
        type: 'DatePicker',
        label: '到期日期',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.secondSettleDate
            ? moment(pledgeBondRowd.secondSettleDate)
            : '',
          placeholder: ''
        }
      },
      {
        name: 'item9',
        type: 'Input',
        label: '剩余期限',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.remainingMaturity
        }
      },
      {
        name: 'item10',
        type: 'Input',
        label: '对手方债券账号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.counterBondAccount
        }
      },
      {
        name: 'item11',
        type: 'Input',
        label: '对手方名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.counterName
        }
      },
      {
        name: 'item12',
        type: 'Input',
        label: '结算机构',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.settleInstitutionName
        }
      },
      {
        name: 'item13',
        type: 'Input',
        label: '产品名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.productName
        }
      },
      {
        name: 'item14',
        type: 'Input',
        label: '管理人',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: pledgeBondRowd.consignorName
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
