import React, { PureComponent } from 'react';
import { NormalForm, LabelBody } from 'yss-biz';
export default class AboutMessageForBusiness extends PureComponent {
  render() {
    const { productForm } = this.props;
    let formItems = [
      {
        name: 'productName',
        label: '产品名称',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: productForm.productName || '暂无数据'
        }
      },
      {
        name: 'bondAccount',
        label: '债券账号',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: productForm.bondAccount || '暂无数据'
        }
      },
      {
        name: 'bondAccountName',
        label: '账户名称',
        type: 'Input',
        // unBind: true,
        props: {
          // placeholder: '暂无数据',
          disabled: true,
          initialValue: productForm.bondAccountName || '暂无数据'
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
          initialValue: productForm.usableSubject || 0
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
          initialValue: productForm.accruedSubject || 0
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
          initialValue: productForm.totalBuyBackSubject || 0
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
          initialValue: productForm.pledgeSubject || 0
        }
      },
      {
        name: 'underwritingSubject',
        type: 'Input',
        label: '承销额度（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: productForm.underwritingSubject || 0
        }
      },
      {
        name: 'underwritingAccruedSubject',
        type: 'Input',
        label: '承销额度待付（万元）',
        props: {
          disabled: true,
          // placeholder: '暂无数据',
          initialValue: productForm.underwritingAccruedSubject || 0
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
          initialValue: productForm.freezeSubject || 0
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
          initialValue: productForm.totalLeft || 0
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
