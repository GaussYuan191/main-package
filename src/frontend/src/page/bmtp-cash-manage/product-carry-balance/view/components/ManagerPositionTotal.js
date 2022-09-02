import React, { PureComponent } from 'react';
import { NormalForm, LabelBody } from 'yss-biz';
export default class AboutMessageForBusiness extends PureComponent {
  render() {
    const { consignorForm } = this.props;
    let formItems = [
      {
        name: 'consignorName',
        label: '管理人',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.consignorName || '暂无数据'
        }
      },
      {
        isLine: true,
        hidden: true
      },
      {
        name: 'usableSubject',
        label: '可用科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.usableSubject || 0
        }
      },
      {
        name: 'accruedSubject',
        label: '待付科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.accruedSubject || 0
        }
      },
      {
        name: 'totalBuyBackSubject',
        label: '全额待购回科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.totalBuyBackSubject || 0
        }
      },
      {
        name: 'pledgeSubject',
        label: '质押科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.pledgeSubject || 0
        }
      },
      {
        name: 'underwritingSubject',
        type: 'Input',
        label: '承销额度（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: consignorForm.underwritingSubject || 0
        }
      },
      {
        name: 'underwritingAccruedSubject',
        type: 'Input',
        label: '承销额度待付（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: consignorForm.underwritingAccruedSubject || 0
        }
      },
      {
        name: 'freezeSubject',
        label: '冻结科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.freezeSubject || 0
        }
      },
      {
        name: 'totalLeft',
        label: '债券余额（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: consignorForm.totalLeft || 0
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
