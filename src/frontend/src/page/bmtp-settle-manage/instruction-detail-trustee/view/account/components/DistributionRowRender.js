import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, setColumns, fontColor } from 'yss-biz';

export default class expandedRowRender extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpSearchQfListFX, row } = this.props;
    const me = this;
    asyncHttpSearchQfListFX({
      params: row,
      type: 'onlineExecutReport',
      cb: data => {
        me.setState({
          dataSource: data.onlineDistrInstructRepPageInfo?.list || [],
          isShowData: data.isAllData
        });
      }
    });
  }
  render() {
    const columns = [
      // {
      //   title: '交易指令编号',
      //   dataIndex: 'tradeInstrId',
      //   key: 'tradeInstrId',
      //   width: 200,
      //   ellipsis: true
      // },
      // {
      //   title: '成交编号',
      //   dataIndex: 'execCode',
      //   key: 'execCode',
      //   width: 200,
      //   ellipsis: true
      // },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 160,
        ellipsis: true
      },
      {
        title: '管理人',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 160,
        ellipsis: true
      },
      // {
      //   title: '交易指令编号',
      //   dataIndex: 'tradeInstrId',
      //   key: 'tradeInstrId',
      //   width: 200,
      //   ellipsis: true
      // },
      // {
      //   title: '资产单元',
      //   dataIndex: 'assetUnitName',
      //   key: 'assetUnitName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '业务品种',
      //   dataIndex: 'bizCategoryName',
      //   key: 'bizCategoryName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '交易方向',
      //   dataIndex: 'tradeDirectionName',
      //   key: 'tradeDirectionName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '债券代码',
      //   dataIndex: 'bondCode',
      //   key: 'bondCode',
      //   width: 150,
      //   ellipsis: true
      // },
      // {
      //   title: '债券名称',
      //   dataIndex: 'boneName',
      //   key: 'boneName',
      //   width: 160,
      //   ellipsis: true
      // },
      // {
      //   title: '成交日期',
      //   dataIndex: 'execDate',
      //   key: 'execDate',
      //   width: 150,
      //   ellipsis: true
      // },
      // {
      //   title: '分销价格(元)',
      //   dataIndex: 'distributionPrice',
      //   key: 'distributionPrice',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '分销面额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 150,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 150,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 150,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 150,
        ellipsis: true,
        align: 'right'
      }
      // {
      //   title: '结算方式',
      //   dataIndex: 'settleType',
      //   key: 'settleType',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方名称',
      //   dataIndex: 'sellerSettleBankCode',
      //   key: 'sellerSettleBankCode',
      //   width: 160,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方债券账号',
      //   dataIndex: 'sellerCustodianAccount',
      //   key: 'sellerCustodianAccount',
      //   width: 160,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '对手方资金账号',
      //   dataIndex: 'sellerAssetAccount',
      //   key: 'sellerAssetAccount',
      //   width: 160,
      //   ellipsis: true
      // },
      // {
      //   title: '创建人',
      //   dataIndex: 'createUserName',
      //   key: 'createUserName',
      //   width: 150,
      //   ellipsis: true
      // },
      // {
      //   title: '创建时间',
      //   dataIndex: 'createTime',
      //   key: 'createTime',
      //   width: 150,
      //   ellipsis: true
      // }
    ];

    const col = setColumns(columns);

    return (
      <div style={{ margin: '10px 0' }}>
        <ConfigableTable
          {...setTableInfo({
            columns: col,
            dataSource: this.state.dataSource,
            pagination: { hideOnSinglePage: true },
            rowKey: 'id'
          })}
          bordered={true}
          onRow={record => {
            return {
              onClick: event => {
                // this.changeAbout(event, record);
              }
            };
          }}
          scroll={{ x: 0 }}
          locale={{
            emptyText: <span></span>
          }}
          footer={
            !this.state.isShowData
              ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d')
              : null
          }
        />
      </div>
    );
  }
}
