// 合同信息
import React, { Component } from 'react';
import { setColumns, ConfigableTable, setTableInfo } from 'yss-biz';
export default class ContractMessage extends Component {
  render() {
    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        const { asyncHttpSearcAboutContractList, rowed } = this.props;
        // this.searchAccountByCondition(page, pageSize);
        asyncHttpSearcAboutContractList({
          params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
        });
      },
      onShowSizeChange: (current, size) => {
        const { asyncHttpSearcAboutContractList, rowed } = this.props;
        // this.searchAccountByCondition(current, size);
        asyncHttpSearcAboutContractList({
          params: { ...rowed, reqPageNum: current, reqPageSize: size }
        });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    const { dataSource, columns } = this.props.contractMessageTable;
    const tableColumns = setColumns(columns);
    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        {...setTableInfo({
          columns: tableColumns,
          dataSource: dataSource,
          pagination,
          height: 260
        })}
      />
    );
  }
}
