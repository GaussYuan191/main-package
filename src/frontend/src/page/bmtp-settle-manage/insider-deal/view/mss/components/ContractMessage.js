// 合同
import React, { Component } from 'react';
import { setColumns, ConfigableTable } from 'yss-biz';
export default class ContractMessage extends Component {
  render() {
    const { contractMessageTable } = this.props;

    const tableColumns = setColumns(contractMessageTable.columns);

    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        dataSource={contractMessageTable.dataSource}
        columns={tableColumns}
        scroll={{ x: 1500 }}
      />
    );
  }
}
