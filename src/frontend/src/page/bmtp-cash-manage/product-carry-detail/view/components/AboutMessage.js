import React, { PureComponent } from 'react';
import { NormalForm } from 'yss-biz';
export default class AboutMessageForBusiness extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.aboutMessage) !== JSON.stringify(this.props.aboutMessage)) {
      this.handleSetValues(nextProps.aboutMessage);
    }
  }
  handleSetValues = aboutMessage => {
    if(!Object.keys(aboutMessage).length) {
      this.normalForm.onReset();
      return;
    }
    this.normalForm.setValues(aboutMessage);
  };
  render() {
    const formItem = [
      {
        name: 'tradeDate',
        type: 'Input',
        label: '查询日期',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'createTime',
        type: 'Input',
        label: '时间',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'bondCode',
        type: 'Input',
        label: '证券代码',
        labelSize: '8em',
        props: {
          // style: {
          //   border: 0,
          //   backgroundColor: 'transparent'
          // },
          // readOnly: true,
          disabled: true,
          initialValue: '暂无数据'
        }
      },
      {
        name: 'bondName',
        type: 'Input',
        label: '证券名称',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'instructId',
        type: 'Input',
        label: '结算指令/合同编号',
        labelSize: '8em',
        props: {
          // style: {
          //   border: 0,
          //   backgroundColor: 'transparent'
          // },
          // readOnly: true,
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'tradeTypeName',
        type: 'Input',
        label: '交易类型',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'productName',
        type: 'Input',
        label: '产品名称',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'consignorName',
        type: 'Input',
        label: '管理人',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'periodTotal',
        type: 'InputPart',
        label: '发生额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'usableSubject',
        type: 'InputPart',
        label: '可用科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'accruedSubject',
        type: 'InputPart',
        label: '待付科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'totalBuyBackSubject',
        type: 'InputPart',
        label: '全额待购回科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'pledgeSubject',
        type: 'InputPart',
        label: '质押科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'freezeSubject',
        type: 'InputPart',
        label: '冻结科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'bondBalance',
        type: 'InputPart',
        label: '债券余额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'beginningBalance',
        type: 'InputPart',
        label: '期初余额（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          initialValue: 0
        }
      },
      {
        name: 'underWritingAccruedSubject',
        type: 'InputPart',
        label: '承销待付科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'underWritingSubject',
        type: 'InputPart',
        label: '承销科目（万元）',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: 0
        }
      },
      {
        name: 'settleInstitutionName',
        type: 'Input',
        label: '结算机构',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'bondAccount',
        type: 'Input',
        label: '债券账号',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      },
      {
        name: 'bondAccountName',
        type: 'Input',
        label: '账户名称',
        labelSize: '8em',
        props: {
          disabled: true,
          placeholder: '暂无数据'
        }
      }
    ];
    return (
      <div className="f-flex-center f-mt30">
        <NormalForm
          refs={res => (this.normalForm = res)}
          lineOf={3}
          formItem={formItem}
          marginRight="100px"
        />
      </div>
    );
  }
}
