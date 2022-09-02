// 债券明细
import React, { Component } from 'react';
import { setColumns, ConfigableTable, setTableInfo } from 'yss-biz';
export default class BondSubsidiary extends Component {
  render() {
    const { zjTable, rowed } = this.props;
    const col = setColumns(zjTable.col);
    let len = Object.keys(rowed).length;
    let dataList = [];
    if (len > 0) dataList = [rowed];
    return (
      // <ConfigableTable
      //   style={{ marginTop: '10px' }}
      //   dataSource={dataList}
      //   columns={col}
      //   scroll={{ x: 1500 }}
      //   pagination={{ hideOnSinglePage: true }}
      // />
      <ConfigableTable
        style={{ marginTop: '10px' }}
        {...setTableInfo({
          dataSource: dataList,
          columns: col,
          scroll: { x: 1500 },
          pagination: { hideOnSinglePage: true }
        })}
      />
    );
  }
  componentDidMount() {}
}
