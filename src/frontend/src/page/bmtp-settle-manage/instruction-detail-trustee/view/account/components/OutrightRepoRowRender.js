import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, setColumns, page, fontColor } from 'yss-biz';
class OutrightRepo extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpSearchQfList, row } = this.props;
    const me = this;
    asyncHttpSearchQfList({
      params: row,
      type: 'eroPageList',
      cb: data => {
        me.setState({
          dataSource: data.outrightExecutionReportDistRepPageInfo?.list || [],
          isShowData: data.isAllData
        });
      }
    });
  }

  render() {
    // const me = this;
    /***查询Input按钮 */
    const outrightRepoCol = [
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
      {
        title: '债券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 120,
        ellipsis: true
      },
      {
        title: '债券名称',
        dataIndex: 'bondName',
        key: 'bondName',
        width: 120,
        ellipsis: true
      },

      // {
      //   title: '业务品种',
      //   dataIndex: 'bizCategoryName',
      //   key: 'bizCategoryName',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '交易方向',
      //   dataIndex: 'tradeDirectionName',
      //   key: 'tradeDirectionName',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '复核状态',
      //   dataIndex: 'erpFirstSettleDate================',
      //   key: 'erpFirstSettleDate',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '清分状态',
      //   dataIndex: 'eroFirstSettleAmount---------------------------',
      //   key: 'eroFirstSettleAmount',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '数据来源',
      //   dataIndex: 'dataSourceName',
      //   key: 'dataSourceName',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '券面总额(万元)',
        dataIndex: 'totalFaceValue',
        key: 'totalFaceValue',
        width: 120,
        ellipsis: true,
        align: 'right'
      },

      // {
      //   title: '回购利率',
      //   dataIndex: 'erpSecondSettleMethod=====================',
      //   key: 'erpSecondSettleMethod',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '首次结算日',
      //   dataIndex: 'eroCollateralIndicator-----------------=============',
      //   key: 'eroCollateralIndicator',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '首次结算金额(元)',
        dataIndex: 'firstSettleAmount',
        key: 'firstSettleAmount',
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
      // {
      //   title: '回购期限',
      //   dataIndex: 'eroSecondDirtyPriceffffffRRRRRRRRRR',
      //   key: 'eroSecondDirtyPriceffffffRRRRRRRRRR',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      {
        title: '首次应计利息(元)',
        dataIndex: 'firstTotalAccruedInterest',
        key: 'firstTotalAccruedInterest',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '到期应计利息(元)',
        dataIndex: 'secondTotalAccruedInterest',
        key: 'secondTotalAccruedInterest',
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
      //   title: '首次全价',
      //   dataIndex: 'secondTotalAccruedInterestccccccccccccccc',
      //   key: 'secondTotalAccruedInterestccccccccccccccc',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '到期全价',
      //   dataIndex: 'eroSecondDirtyPricexxxxxxxxxxxxxxxxxxxxx',
      //   key: 'eroSecondDirtyPricexxxxxxxxxxxxxxxxxxxxx',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '首次收益率',
      //   dataIndex: 'eroSecondDirtyPriceaaaaaaaaaaaaaaaaaaa',
      //   key: 'eroSecondDirtyPriceaaaaaaaaaaaaaaaaaaa',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // },
      // {
      //   title: '到期收益率',
      //   dataIndex: 'eroSecondDirtyPrice44444444444444444444444',
      //   key: 'eroSecondDirtyPrice44444444444444444444444',
      //   width: 120,
      //   ellipsis: true,
      //   align: 'right'
      // }
    ];

    const col = setColumns(outrightRepoCol);

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
                const { asyncHttpSeachGetAboutdbxx, changeTableRow } = this.props;
                setTimeout(() => {
                  let params = {
                    distributionId: record.id,
                    ...page
                  };
                  changeTableRow({ type: 'mdRowed', value: record });
                  asyncHttpSeachGetAboutdbxx({ params });
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
      </div>
    );
  }
}

export default OutrightRepo;
