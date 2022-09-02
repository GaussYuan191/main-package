// 债券明细
import React, { Component } from 'react';
import { setColumns, ConfigableTable, withRoleTableBotton, Modal, setTableInfo } from 'yss-biz';
import LogDetail from './logDetai';
export default class BondSubsidiary extends Component {
  state = {
    isVisible: false
  };
  render() {
    const { aboutTable, active, asyncHttpDayilyFirstLogDetail, queryAboutElement } = this.props;
    /***table按钮组***/
    const ButtonTableType = [
      {
        name: '执行详情',
        funcType: true,
        icon: 'diff',
        noAuth: true,
        func: async (e, row) => {
          this.setState({
            isVisible: true
          });
          await asyncHttpDayilyFirstLogDetail(row);
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
        render: item => withRoleTableBotton(ButtonTableType, this.props.btnAuth)(item)
      }
    ];

    let type;
    switch (active) {
      case 'activeA':
        type = '1';
        break;
      case 'activeB':
        type = '2';
        break;
      case 'activeC':
        type = '3';
        break;
      case 'activeD':
        type = '4';
        break;
      default:
        type = '';
    }

    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryAboutElement.reqPageSize,
      total: aboutTable[`total${type}`]
    };

    return (
      <div style={{ margin: '4px 8px' }}>
        <ConfigableTable
          {...setTableInfo({
            dataSource: aboutTable[`list${type}`],
            pagination: pagination,
            columns: col,
            height: 240,
            rowKey: 'id'
          })}
        />

        <Modal
          visible={this.state.isVisible}
          width={1100}
          title="执行详情"
          destroyOnClose={true}
          onCancel={() => {
            this.setState({
              isVisible: false
            });
          }}
          onOk={() => {
            this.setState({
              isVisible: false
            });
          }}
        >
          <LogDetail {...this.props}></LogDetail>
        </Modal>
      </div>
    );
  }

  searchAccountByCondition = ({ ele, value }) => {
    const { changeQueryElement, asyncHttpDailyFirstLogList } = this.props;
    changeQueryElement({ type: 'queryAboutElement', value: { [ele]: value } });
    asyncHttpDailyFirstLogList({});
  };
}
