// 回显窗口表格
import React, { Component } from 'react';
import { setTableInfo, ConfigableTable, setColumns } from 'yss-biz';

export default class FilePreviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqPageNum: 1,
      reqPageSize: 20
    };
  }
  componentDidMount() {
    const { bizCode, batchNo, asyncHttpGetPreviewList } = this.props;
    asyncHttpGetPreviewList({ bizCode, batchNo, reqPageNum: 1, reqPageSize: 20 });
  }
  render() {
    const { bizCode, previewList } = this.props;
    const {
      bondColumns,
      pledgeColumns,
      lendingColumns,
      outrightColumns,
      sellBackColumns,
      onlineColumns,
      offlineColumns,
      innerTradeColumns
    } = this.props;
    const columns = {
      BOND: bondColumns,
      PLEDGE: pledgeColumns,
      LENDING: lendingColumns,
      OUTRIGHT: outrightColumns,
      SELLBACK: sellBackColumns,
      ONLINE: onlineColumns,
      OFFLINE: offlineColumns,
      INNER: innerTradeColumns
    };
    const { reqPageNum, reqPageSize } = this.state;
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: total => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: reqPageSize,
      current: reqPageNum,
      total: previewList.total
      // hideOnSinglePage: true
    };
    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            columns: [...setColumns(columns[bizCode] || [])],
            dataSource: previewList.list,
            pagination: pagination
          })}
        />
      </>
    );
  }

  searchPage = async ({ reqPageNum, reqPageSize }) => {
    const { bizCode, batchNo, asyncHttpGetPreviewList } = this.props;
    this.setState({ reqPageNum, reqPageSize });
    await asyncHttpGetPreviewList({ bizCode, batchNo, reqPageNum, reqPageSize });
  };
}
