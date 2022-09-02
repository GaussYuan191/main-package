// 全额指令明细
import React, { Component } from 'react';
import { setColumns, setTableInfo, ConfigableTable } from 'yss-biz';
export default class ContractMessage extends Component {
  render() {
    const { contractMessageTable } = this.props;

    /***表格分页***/
    const pagination = {
      // onChange: (page, pageSize) => {
      //   const { asyncHttpAboutJSzlInfo, rowed } = this.props;
      //   // this.searchAccountByCondition(page, pageSize);
      //   asyncHttpAboutJSzlInfo({
      //     params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
      //   });
      // },
      // onShowSizeChange: (current, size) => {
      //   const { asyncHttpAboutJSzlInfo, rowed } = this.props;
      //   // this.searchAccountByCondition(current, size);
      //   asyncHttpAboutJSzlInfo({
      //     params: { ...rowed, reqPageNum: current, reqPageSize: size }
      //   });
      // },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    const tableColumns = setColumns(contractMessageTable.columns);

    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        {...setTableInfo({
          columns: tableColumns,
          dataSource: contractMessageTable.dataSource,
          pagination,
          height: 260
        })}
      />
    );
  }
}
