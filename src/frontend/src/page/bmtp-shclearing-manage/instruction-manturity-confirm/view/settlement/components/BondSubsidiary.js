// 债券明细
import React, { Component } from 'react';
import { setColumns, ConfigableTable, setTableInfo } from 'yss-biz';
export default class BondSubsidiary extends Component {
  render() {
    const pagination = {
      // onChange: (page, pageSize) => {
      //   const { asyncHttpAboutZJInfo, rowed } = this.props;
      //   // this.searchAccountByCondition(page, pageSize);
      //   asyncHttpAboutZJInfo({
      //     params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
      //   });
      // },
      // onShowSizeChange: (current, size) => {
      //   const { asyncHttpAboutZJInfo, rowed } = this.props;
      //   // this.searchAccountByCondition(current, size);
      //   asyncHttpAboutZJInfo({
      //     params: { ...rowed, reqPageNum: current, reqPageSize: size }
      //   });
      // },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    const { zjTable, rowed } = this.props;
    const col = setColumns(zjTable.col);
    // 债券借贷下, 债券明细接口第1条为债券明细, 2-n条为质押券信息
    const dataSource =
      rowed.bizCategory == '8' ? (zjTable.list[0] && [zjTable.list[0]]) || [] : zjTable.list;
    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        {...setTableInfo({
          columns: col,
          dataSource,
          rowKey: 'productCode',
          pagination,
          height: 240
        })}
      />
    );
  }
}
