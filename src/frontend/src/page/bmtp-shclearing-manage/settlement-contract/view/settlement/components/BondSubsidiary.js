// 债券明细
import React, { PureComponent } from 'react';
import { setColumns, ConfigableTable, setTableInfo } from 'yss-biz';

export default class BondSubsidiary extends PureComponent {
  render() {
    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        //
        const { asyncHttpSearchAboutZJList, rowed } = this.props;
        // this.searchAccountByCondition(page, pageSize);
        asyncHttpSearchAboutZJList({
          params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
        });
      },
      onShowSizeChange: (current, size) => {
        const { asyncHttpSearchAboutZJList, rowed } = this.props;
        // this.searchAccountByCondition(current, size);
        asyncHttpSearchAboutZJList({
          params: { ...rowed, reqPageNum: current, reqPageSize: size }
        });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    const { zjTable } = this.props;
    return (
      <ConfigableTable
        style={{ marginTop: '10px' }}
        {...setTableInfo({
          columns: setColumns(zjTable.col),
          dataSource: zjTable.list,
          height: 260,
          pagination
        })}
      />
    );
  }
}
