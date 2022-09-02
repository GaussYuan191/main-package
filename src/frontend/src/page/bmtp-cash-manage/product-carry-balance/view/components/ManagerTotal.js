import React, { PureComponent } from 'react';
import { NormalForm, LabelBody } from 'yss-biz';
export default class AboutMessageForBusiness extends PureComponent {


  render() {
    const { bondForm } = this.props;

    let formItems = [
      {
        name: 'consignorName',
        label: '管理人',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: bondForm.consignorName || '暂无数据'
        }
      },
      {
        name: 'bondName',
        label: '债券简称',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: bondForm.bondName || '暂无数据'
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          readOnly: true,
          disabled: true,
          initialValue: bondForm.bondCode || '暂无数据'
          // style: {
          //   border: 0,
          //   backgroundColor: 'transparent'
          // }
        }
      },
      {
        name: 'usableSubject',
        label: '可用科目（万元）',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: bondForm.usableSubject || 0
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
          initialValue: bondForm.accruedSubject || 0
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
          initialValue: bondForm.totalBuyBackSubject || 0
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
          initialValue: bondForm.pledgeSubject || 0
        }
      },
      {
        name: 'underwritingSubject',
        type: 'Input',
        label: '承销额度（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: bondForm.underwritingSubject || 0
        }
      },
      {
        name: 'underwritingAccruedSubject',
        type: 'Input',
        label: '承销额度待付（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: bondForm.underwritingAccruedSubject || 0
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
          initialValue: bondForm.freezeSubject || 0
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
          initialValue: bondForm.totalLeft || 0
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
