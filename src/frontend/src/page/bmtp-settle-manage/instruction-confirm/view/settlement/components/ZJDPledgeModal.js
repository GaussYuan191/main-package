// 中债登质押详情
import React, { Component } from 'react';
import { NormalForm, setTableInfo, ConfigableTable, setColumns } from 'yss-biz';
import { Input } from 'antd';
import moment from 'moment';
import '../style/style.less';
const { TextArea } = Input;

export default class ZJDPledgeModal extends Component {
  componentWillReceiveProps(newVal, oldVal) {
    if (newVal.dataDetail && Object.keys(newVal.dataDetail).length > 0) {
      this.clientForm.setValues({
        ...newVal.dataDetail,
        instrDate: newVal.dataDetail.instrDate ? moment(newVal.dataDetail.instrDate) : '',
        firstSettleDate: newVal.dataDetail.firstSettleDate
          ? moment(newVal.dataDetail.firstSettleDate)
          : '',
        expireSettleDate: newVal.dataDetail.expireSettleDate
          ? moment(newVal.dataDetail.expireSettleDate)
          : ''
      });
    }
  }
  render() {
    const { dataDetail, ZJPledgeInfo } = this.props;

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
        name: 'firstSettleTypeName',
        label: '首期结算方式',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'expireSettleTypeName',
        label: '到期结算方式',
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
        name: 'expireSettleAmount',
        label: '到期结算金额(元)',
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
        name: 'rate',
        label: '利率(%)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首期交割日',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'expireSettleDate',
        label: '到期交割日',
        type: 'DatePicker',
        props: {
          disabled: true,
          style: { width: '100%' }
        }
      },
      {
        name: 'bondAccountssssssssssss',
        label: '回购期限',
        type: 'Input',
        props: {
          disabled: true
        }
      }
    ];

    const columns = [
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 130,
        ellipsis: true
      },
      {
        title: 'ISIN码',
        dataIndex: 'bondIsin',
        key: 'bondIsin',
        width: 130,
        ellipsis: true
      },
      {
        title: '债券简称',
        dataIndex: 'bondShortName',
        key: 'bondShortName',
        width: 160,
        ellipsis: true
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'bondAmount',
        key: 'bondAmount',
        width: 100,
        ellipsis: true
      },
      {
        title: '质押比例(%)',
        dataIndex: 'bondPledgeRate',
        key: 'bondPledgeRate',
        width: 100,
        ellipsis: true
      },
      {
        title: '质押金额(元)',
        dataIndex: 'item6',
        key: 'item6',
        width: 100,
        ellipsis: true
      },
      {
        title: '应计利息(元/百元面值)',
        dataIndex: 'bondAccruedInterest11111111111',
        key: 'bondAccruedInterest111111111111',
        width: 100,
        ellipsis: true
      },
      {
        title: '计息日',
        dataIndex: 'bondValueDate',
        key: 'bondValueDate',
        width: 120,
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
            dataSource: ZJPledgeInfo,
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
    const { asyncHttpSearcAboutInfo, asyncHttpSearchAboutZJList, rowData } = this.props;
    await asyncHttpSearcAboutInfo({ type: 'ZJD', params: rowData });
    await asyncHttpSearchAboutZJList({ type: 'ZJD', params: rowData });
  }
}
