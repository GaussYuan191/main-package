// 债券明细
import React, { Component } from 'react';
import { setColumns, ConfigableTable, withRoleTableBotton } from 'yss-biz';
// import ExecuteDetail from './ExecuteDetailModal';

export default class BondSubsidiaryC extends Component {
  render() {
    const { aboutTable, activeC, changeDetailModal } = this.props;

    /***table按钮组***/
    const ButtonTableType = [
      {
        name: '执行详情',
        roule: true,
        icon: 'diff',
        func: (evt, row) => {
          changeDetailModal(true);
        }
      }
    ];

    const col = [
      ...setColumns(aboutTable.col),
      {
        title: '操作',
        key: 'operation',
        width: 80,
        fixed: 'right',
        align: 'center',
        render: item => withRoleTableBotton(ButtonTableType)(item)
      }
    ];

    return (
      <div style={{ margin: '4px 8px' }}>
        <ConfigableTable
          dataSource={aboutTable[`list${activeC}`]}
          columns={col}
          pagination={{ hideOnSinglePage: true }}
        />
      </div>
    );
  }
}
