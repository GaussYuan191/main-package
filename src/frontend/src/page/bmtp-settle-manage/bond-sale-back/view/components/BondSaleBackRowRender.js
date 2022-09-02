import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, fontColor } from 'yss-biz';
class BondSaleBackRowRender extends PureComponent {
  state = {
    dataSource: [],
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { row, asyncHttpSearchChildrenList } = this.props;
    this.setState({ dataSource: row.productList });
    const me = this;
    asyncHttpSearchChildrenList({
      id: row.id,
      cb: data => {
        me.setState({
          dataSource: data.sellBackExecutionRptDistList || [],
          isShowData: data.allData
        });
      }
    });
  }

  render() {
    const outrightRepoCol = [
      // {
      //   title: '序号',
      //   dataIndex: 'serialNumber',
      //   render: (text, record, index) => ++index
      // },
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        // width: 120,
        ellipsis: true
      },

      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        // width: 200,
        ellipsis: true
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        // width: 120,
        ellipsis: true
      },
      {
        title: '交易金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        // width: 120,
        ellipsis: true
      }
    ];

    // const col = setColumns(outrightRepoCol);

    return (
      <div style={{ margin: '10px 0' }}>
        <ConfigableTable
          {...setTableInfo({
            columns: outrightRepoCol,
            dataSource: this.state.dataSource,
            pagination: { hideOnSinglePage: true },
            rowKey: 'id'
          })}
          bordered={true}
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

export default BondSaleBackRowRender;
