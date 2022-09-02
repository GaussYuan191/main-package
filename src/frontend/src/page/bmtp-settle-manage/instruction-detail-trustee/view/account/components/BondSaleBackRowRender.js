import React, { PureComponent } from 'react';
import { setTableInfo, ConfigableTable, fontColor } from 'yss-biz';
class BondSaleBackRowRender extends PureComponent {
  state = {
    dataSource: [],
    execDate: '',
    execCode: '',
    consignorName: '',
    isShowData: true // 判断是否有权限显示产品数据
  };
  componentDidMount() {
    const { row, asyncHttpSearchChildrenList, productList } = this.props;
    const me = this;
    // this.setState({ dataSource: row.productList });
    asyncHttpSearchChildrenList({
      id: row.id,
      cb: list => {
        (list.sellBackExecutionRptDistList || []).forEach(item => {
          let product = (productList || []).find(i => item.productCode === i.productCode);
          item.execCode = row.execCode;
          item.execDate = row.execDate;
          item.consignorName = row.consignorName;
          item.productName = product && product.productName;
        });
        me.setState({
          dataSource: list.sellBackExecutionRptDistList || [],
          isShowData: list.allData
        });
      }
    });
  }

  render() {
    const outrightRepoCol = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 120,
        render: (text, record, index) => ++index
      },
      {
        title: '成交日期',
        dataIndex: 'execDate',
        key: 'execDate',
        // width: 120,
        ellipsis: true
      },

      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        // width: 200,
        ellipsis: true
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        // width: 120,
        ellipsis: true
      },
      {
        title: '管理人名称',
        dataIndex: 'consignorName',
        key: 'consignorName',
        // width: 120,
        ellipsis: true
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        // width: 120,
        ellipsis: true
        // align: 'right'
      },
      {
        title: '交易金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        // width: 120,
        ellipsis: true
        // align: 'right'
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        // width: 120,
        ellipsis: true
        // align: 'right'
      },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        // width: 120,
        ellipsis: true
        // align: 'right'
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        key: 'settleFee',
        // width: 120,
        ellipsis: true
        // align: 'right'
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
