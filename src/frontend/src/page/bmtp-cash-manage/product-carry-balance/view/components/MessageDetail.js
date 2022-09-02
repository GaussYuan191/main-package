import React, { PureComponent } from 'react';
import { NormalForm, LabelBody } from 'yss-biz';
export default class AboutMessageForBusiness extends PureComponent {
  render() {
    const { clickRow } = this.props;

    const formItems = [
      {
        name: 'bondName',
        type: 'Input',
        label: '债券简称',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.bondName
        }
      },
      {
        name: 'bondCode',
        type: 'Input',
        label: '债券代码',
        props: {
          // style: {
          //   border: 0,
          //   backgroundColor: 'transparent'
          // },
          readOnly: true,
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.bondCode
        }
      },
      {
        name: 'productName',
        type: 'Input',
        label: '产品名称',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.productName
        }
      },
      {
        name: 'usableSubject',
        type: 'InputPart',
        label: '可用科目（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.usableSubject
        }
      },
      {
        name: 'accruedSubject',
        type: 'InputPart',
        label: '待付科目（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.accruedSubject
        }
      },
      {
        name: 'totalBuyBackSubject',
        type: 'InputPart',
        label: '全额待购回科目（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.totalBuyBackSubject
        }
      },
      {
        name: 'pledgeSubject',
        type: 'InputPart',
        label: '质押科目（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.pledgeSubject
        }
      },
      {
        name: 'freezeSubject',
        type: 'InputPart',
        label: '冻结科目（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.freezeSubject
        }
      },
      {
        name: 'underwritingSubject',
        type: 'InputPart',
        label: '承销额度（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.underwritingSubject
        }
      },
      {
        name: 'underwritingAccruedSubject',
        type: 'InputPart',
        label: '承销额度待付（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.underwritingAccruedSubject
        }
      },
      {
        name: '1111',
        type: 'InputPart',
        label: '债券余额（万元）',
        props: {
          disabled: true,
          placeholder: '暂无数据'
          // initialValue: clickRow.
        }
      },
      {
        name: 'consignorName',
        type: 'Input',
        label: '管理人',
        props: {
          disabled: true,
          placeholder: '暂无数据',
          initialValue: clickRow.consignorName
        }
      },
      {
        name: 'bondAccount',
        type: 'Input',
        label: '债券账号',
        props: {
          disabled: true,
          initialValue: clickRow.bondAccount
        }
      },
      {
        name: 'bondAccountName',
        type: 'Input',
        label: '账户名称',
        props: {
          disabled: true,
          initialValue: clickRow.bondAccountName
        }
      }
    ];
    return (
      <LabelBody title="合计" margin="25px auto">
        <NormalForm lineOf={3} formItem={formItems} labelSize="11em" marginRight="50px" />
      </LabelBody>
    );
  }
}
