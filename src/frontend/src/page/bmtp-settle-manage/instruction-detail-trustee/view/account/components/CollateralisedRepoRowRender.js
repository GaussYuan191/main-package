import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, setColumns, page, fontColor } from 'yss-biz';
class CollateralisedRepo extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpSearchQfList, row } = this.props;
    const me = this;
    asyncHttpSearchQfList({
      params: row,
      type: 'erpPageList',
      cb: data => {
        me.setState({
          dataSource: data.pledgeExecutionReportDistRepPageInfo?.list || [],
          isShowData: data.isAllData
        });
      }
    });
  }

  render() {
    // const me = this;
    /***查询Input按钮 */
    const col = [
      {
        title: '序号',
        dataIndex: 'serialNumber'
      },
      {
        title: '成交日期',
        dataIndex: 'execDate',
        key: 'execDate',
        width: 120,
        ellipsis: true
      },

      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200,
        ellipsis: true
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 120,
        ellipsis: true
      },
      {
        title: '管理人名称',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 120,
        ellipsis: true
      },
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
      //   title: '复核状态',
      //   dataIndex: 'tradeDirectionName================================================',
      //   key: 'tradeDirectionName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '清分状态',
      //   dataIndex: 'clearingStatusName========================',
      //   key: 'clearingStatusName',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '数据来源',
      //   dataIndex: 'dataSourceName',
      //   key: 'dataSourceName',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '券面总额合计',
      //   dataIndex: 'faceValue',
      //   key: 'faceValue',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '交易品种',
      //   dataIndex: 'eroTradingProduct========================================',
      //   key: 'eroTradingProduct',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '首次结算日',
      //   dataIndex: 'eroFirstSettleDate=============================',
      //   key: 'eroFirstSettleDate',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '到期结算日',
      //   dataIndex: 'eroSecondSettleDate=======================',
      //   key: 'eroSecondSettleDate',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '首次结算方式',
      //   dataIndex: 'eroFirstSettleMethod================',
      //   key: 'eroFirstSettleMethod',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '应计利息总额',
      //   dataIndex: 'erbTotalAccruedInterest=====================',
      //   key: 'erbTotalAccruedInterest',
      //   width: 120,
      //   ellipsis: true
      // },
      // {
      //   title: '实际占款天数',
      //   dataIndex: 'eroOccupancyDays=============',
      //   key: 'eroOccupancyDays',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },

      // {
      //   title: '到期结算方式',
      //   dataIndex: 'eroSecondSettleMethod=================',
      //   key: 'eroSecondSettleMethod',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '清算方式',
      //   dataIndex: 'erpClearingMethod==============',
      //   key: 'erpClearingMethod',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '首期结算金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '到期结算金额(元)',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 120,
        ellipsis: true,
        align: 'right'
      }
      // {
      //   title: '交易金额',
      //   dataIndex: 'tradeAmount======================',
      //   key: 'tradeAmount',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '回购期限',
      //   dataIndex: 'erpRepoTerm====--------=============',
      //   key: 'erpRepoTerm',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '成交时间',
      //   dataIndex: 'execTime',
      //   key: 'execTime',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // }
    ];

    const columns = setColumns(col);

    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            columns: columns,
            dataSource: this.state.dataSource,
            pagination: { hideOnSinglePage: true },
            rowKey: 'id'
          })}
          bordered={true}
          onRow={record => {
            return {
              onClick: event => {
                const { asyncHttpSearchZYAbout, changeTableRow } = this.props;
                setTimeout(() => {
                  let params = {
                    distributionId: record.id,
                    ...page
                  };
                  changeTableRow({ type: 'zyRowed', value: record });
                  asyncHttpSearchZYAbout({ type: 'child', params });
                }, 300);
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
      </>
    );
  }
}

export default CollateralisedRepo;
