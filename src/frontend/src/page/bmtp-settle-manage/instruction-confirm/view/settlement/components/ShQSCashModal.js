// 上清现券详情
import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Input } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

export default class ShQSCashModal extends Component {
  componentWillReceiveProps(newVal, oldVal) {
    if (newVal.dataDetail && Object.keys(newVal.dataDetail).length > 0) {
      this.clientForm.setValues({
        ...newVal.dataDetail,
        orderCreateTime: newVal.dataDetail.orderCreateTime
          ? moment(newVal.dataDetail.orderCreateTime)
          : '',
        settlementDate: newVal.dataDetail.settlementDate
          ? moment(newVal.dataDetail.settlementDate)
          : ''
      });
    }
  }
  render() {
    const { dataDetail } = this.props;

    const formItems = [
      {
        name: 'consignorName',
        label: '管理人',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'productName',
        label: '产品',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        isLine: true
      },
      {
        name: 'orderCreateTime',
        label: '指令日期',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'srcTradeId',
        label: '源成交编号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'clearTypeName',
        label: '清算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      },

      {
        name: 'offsetAccount',
        label: '对手方账号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'offsetAccountShortName',
        label: '对手方账号名称',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'offsetTradeStatusName',
        label: '对手方状态',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settlementTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settlementDate',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        isLine: true
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '债券简称',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bondTotalAmount',
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'cleanPrice',
        label: '百元净价(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bondAccountaaaaaaaaaaaaaaaaaaa',
        label: '百元应计利息(元/百元面值)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'fullPrice',
        label: '百元全价(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息总额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settlementValue',
        label: '结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      }
    ];

    return (
      <>
        <NormalForm
          refs={ref => (this.clientForm = ref)}
          labelSize="8em"
          itemSize="250px"
          lineOf={3}
          formItem={formItems}
        />
        <div style={{ marginBottom: '10px', borderBottom: '1px solid #6b7286' }}></div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>备注</div>
          <div style={{ flex: 1 }}>
            <TextArea rows={4} disabled value={dataDetail && dataDetail.remark || ''}/>
          </div>
        </div>
      </>
    );
  }

  async componentDidMount() {
    const { asyncHttpSearcAboutInfo, rowData } = this.props;
    await asyncHttpSearcAboutInfo({ type: 'SQS', params: rowData });
  }
}
