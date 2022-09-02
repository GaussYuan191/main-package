import React, { PureComponent } from 'react';
import { NormalForm } from 'yss-biz';
import moment from 'moment';
export default class AboutMessageForBusiness extends PureComponent {
  componentWillMount() {}
  handleQuery = () => {};
  render() {
    const { distributionRowd } = this.props;

    const formItem = [
      {
        name: 'item1',
        type: 'DatePicker',
        label: '结算日期',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.settleDate ? moment(distributionRowd.settleDate) : '',
          placeholder: ''
        }
      },
      {
        name: 'item2',
        type: 'Input',
        label: '交易指令编号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.tradingInstructionsNumber
        }
      },
      {
        name: 'item21',
        type: 'Input',
        label: '首期结算指令/合同编号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.instrId
        }
      },
      {
        name: 'item3',
        type: 'Input',
        label: '债券代码',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.bondCode
        }
      },
      {
        name: 'item4',
        type: 'Input',
        label: '债券名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.bondName
        }
      },
      // {
      //   name: 'item6',
      //   type: 'Input',
      //   label: '业务品种',
      //   labelSize: '8em',
      //   props: {
      //     disabled: true,
      //     initialValue: distributionRowd.bussinessTypeName
      //   }
      // },
      {
        name: 'item61',
        type: 'Input',
        label: '台账类型',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.bussinessTypeName
        }
      },
      {
        name: 'item62',
        type: 'Input',
        label: '分销面额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.bondAmount
        }
      },
      {
        name: 'item7',
        type: 'Input',
        label: '完成情况',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.completeStatusName
        }
      },
      {
        name: 'item8',
        type: 'Input',
        label: '上市情况',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.listingStatusName
        }
      },
      {
        name: 'item9',
        type: 'Input',
        label: '对手方债券账号',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.counterAccountCode
        }
      },
      {
        name: 'item11',
        type: 'Input',
        label: '对手方名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.counterAccountName
        }
      },
      {
        name: 'item12',
        type: 'Input',
        label: '结算机构',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.clearingInstitutionName
        }
      },
      // {
      //   name: 'item13',
      //   type: 'Input',
      //   label: '结算方式',
      //   labelSize: '8em',
      //   props: {
      //     disabled: true,
      //     initialValue: distributionRowd['wait']
      //   }
      // },
      {
        name: 'item14',
        type: 'Input',
        label: '产品名称',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.productName
        }
      },
      {
        name: 'item15',
        type: 'Input',
        label: '管理人',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: distributionRowd.consignorName
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
