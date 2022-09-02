import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, setColumns, page, fontColor } from 'yss-biz';
class BondLendingRowRender extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { asyncHttpSearchQfList, row } = this.props;
    const me = this;
    asyncHttpSearchQfList({
      params: row,
      type: 'executionReportLending',
      cb: data => {
        me.setState({
          dataSource: data.lendingExecutionReportDistRepPageInfo?.list || [],
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
        title: '券面总额合计(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '借贷费用(元)',
        dataIndex: 'lendingRate',
        key: 'lendingRate',
        width: 120,
        ellipsis: true,
        align: 'right'
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
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

export default BondLendingRowRender;
