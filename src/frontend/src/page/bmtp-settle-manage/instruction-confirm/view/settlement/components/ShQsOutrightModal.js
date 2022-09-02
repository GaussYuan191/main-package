// 上清买断详情
import React, { Component } from 'react';
import { NormalForm, setTableInfo, ConfigableTable, setColumns } from 'yss-biz';
import { Input } from 'antd';
import moment from 'moment';
import '../style/style.less';
const { TextArea } = Input;

export default class ShQsOutrightModal extends Component {
  componentWillReceiveProps(newVal, oldVal) {
    if (newVal.dataDetail && Object.keys(newVal.dataDetail).length > 0) {
      this.clientForm.setValues({
        ...newVal.dataDetail,
        orderCreateTime: newVal.dataDetail.orderCreateTime
          ? moment(newVal.dataDetail.orderCreateTime)
          : '',
        firstSettleDate: newVal.dataDetail.firstSettleDate
          ? moment(newVal.dataDetail.firstSettleDate)
          : '',
        dueSettleDate: newVal.dataDetail.dueSettleDate
          ? moment(newVal.dataDetail.dueSettleDate)
          : ''
      });
    }
  }

  render() {
    const { dataDetail, SQDBInfo } = this.props;

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
        name: 'repurchaseDays',
        label: '回购天数',
        type: 'Input',
        props: {
          disabled: true
        }
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
        label: '债券名称',
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
        name: 'firstSettleAmount',
        label: '首期结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'dueSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首期结算日',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'dueSettleDate',
        label: '到期结算日',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'firstSettleTypeName',
        label: '首期结算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'dueSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      }
    ];

    const columns = [
      {
        title: '回购方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 150,
        ellipsis: true
      },
      {
        title: '债券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 150,
        ellipsis: true
      },
      {
        title: '债券名称',
        dataIndex: 'productName	',
        key: 'productName	',
        width: 150,
        ellipsis: true
      },
      {
        title: '卷面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150,
        ellipsis: true
      },
      {
        title: '质押比例(%)',
        dataIndex: 'pledgeRate',
        key: 'pledgeRate',
        width: 150,
        ellipsis: true
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
        <div className="modalTableTitle">质押券信息</div>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            columns: [...setColumns(columns)],
            dataSource: SQDBInfo,
            pagination: { hideOnSinglePage: true }
          })}
        />
        <div style={{ margin: '10px 0', borderBottom: '1px solid #6b7286' }}></div>
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
    const { asyncHttpSearcAboutInfo, asyncHttpSearcAboutDBList, rowData } = this.props;
    await asyncHttpSearcAboutInfo({ type: 'SQS', params: rowData });
    await asyncHttpSearcAboutDBList({ type: 'SQS', params: rowData });
  }
}
