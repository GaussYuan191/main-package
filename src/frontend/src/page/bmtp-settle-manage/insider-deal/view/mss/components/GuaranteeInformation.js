// 担保信息
import React, { Component } from 'react';
import { ConfigableTable, setColumns } from 'yss-biz';
class GuaranteeInformation extends Component {
  render() {
    const { dbTable } = this.props;
    let col = setColumns(dbTable.columns);
    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        columns={col}
        dataSource={dbTable.list}
        scroll={{ x: 1500 }}
      />
    );
  }
}
export default GuaranteeInformation;
