import React, { PureComponent } from 'react';
import { Row } from 'antd';
import { NormalForm } from 'yss-biz';
class Relation extends PureComponent {
  render() {
    const { businessInfo } = this.props;
    let nameArr = [];
    if (businessInfo.detailList && businessInfo.detailList.length > 0) {
      businessInfo.detailList.map(item => {
        nameArr.push(item.productName);
      });
    }

    let formItem = [
      // {
      //   name: 'tradeType',
      //   label: '产品名称',
      //   type: 'Input',
      //   props: {
      //     initialValue: nameArr.join(','),
      //     title: nameArr.join(','),
      //     disabled: true
      //   }
      // },
      {
        name: 'transferTypeName',
        label: '交易类型',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferTypeName,
          disabled: true
        }
      },
      {
        name: 'transferDate',
        label: '交易日期',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferDate,
          disabled: true
        }
      },

      {
        name: 'batchNo',
        label: '批次号',
        type: 'Input',
        props: {
          initialValue: businessInfo.batchNo,
          disabled: true
        }
      },
      {
        name: 'paymentAccount',
        label: '付款方账号',
        type: 'Input',
        props: {
          initialValue: businessInfo.paymentAccount,
          disabled: true
        }
      },
      {
        name: 'beneficiaryAccount',
        label: '收款方账号',
        type: 'Input',
        props: {
          initialValue: businessInfo.beneficiaryAccount,
          disabled: true
        }
      },
      {
        name: 'transferStateName',
        label: '划款状态',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferStateName,
          disabled: true
        }
      },
      {
        name: 'transferInstructCode',
        label: '划款指令编号',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferInstructCode,
          disabled: true
        }
      },
      {
        name: 'paymentAccountName',
        label: '付款方名称',
        type: 'Input',
        props: {
          initialValue: businessInfo.paymentAccountName,
          disabled: true
        }
      },

      {
        name: 'beneficiaryAccountName',
        label: '收款方名称',
        type: 'Input',
        props: {
          initialValue: businessInfo.beneficiaryAccountName,
          disabled: true
        }
      },
      {
        name: 'transferAmount',
        label: '划款金额(元)',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferAmount,
          disabled: true
        }
      },
      {
        name: 'transferCommandStateName',
        label: '划款指令执行状态',
        type: 'Input',
        props: {
          initialValue: businessInfo.transferCommandStateName,
          disabled: true
        }
      }
    ];

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <NormalForm
            formItem={formItem}
            labelSize="8em"
            itemSize="200px"
            lineOf="4"
            refs={ref => {}}
          />
        </Row>
      </>
    );
  }
}

export default Relation;
