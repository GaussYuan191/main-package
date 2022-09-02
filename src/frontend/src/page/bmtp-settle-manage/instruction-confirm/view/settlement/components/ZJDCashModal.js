// 中债登现券详情
import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { Input } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

export default class ZJDCashModal extends Component {
  componentWillReceiveProps(newVal, oldVal) {
    if (newVal.dataDetail && Object.keys(newVal.dataDetail).length > 0) {
      this.clientForm.setValues({
        ...newVal.dataDetail,
        instrDate: newVal.dataDetail.instrDate ? moment(newVal.dataDetail.instrDate) : '',
        settleDate: newVal.dataDetail.settleDate ? moment(newVal.dataDetail.settleDate) : ''
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
        name: 'line',
        isLine: true
      },
      {
        name: 'instrDate',
        label: '指令日期',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'instrId',
        label: '指令编号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
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
        name: 'settleDate',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'counterAccountCode',
        label: '对手方账号',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'counterAccountName',
        label: '对手方账号名称',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'counterStatusName',
        label: '对手方状态',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settleTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'line',
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
        name: 'bondAccountasdfffffffffffff',
        label: 'ISIN码',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bondAmount',
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'accruedInterestaaaaaaaaaaaaa',
        label: '应计利息(元/百元面值)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'netPrice',
        label: '净价金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'fullPrice',
        label: '全加金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'bondAccount1231222222',
        label: '计息日',
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
            <TextArea rows={4} disabled value={dataDetail.remark} />
          </div>
        </div>
      </>
    );
  }

  async componentDidMount() {
    const { asyncHttpSearcAboutInfo, rowData } = this.props;
    await asyncHttpSearcAboutInfo({ type: 'ZJD', params: rowData });
  }
}
