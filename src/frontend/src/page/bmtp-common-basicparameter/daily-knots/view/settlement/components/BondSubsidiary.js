// 债券明细
import React, { Component } from 'react';
import {
  setColumns,
  ConfigableTable,
  withRoleTableBotton,
  // changeDetailModal,
  Modal,
  setTableInfo
} from 'yss-biz';
import ExecuteDetail from './ExecuteDetailModal';
// import async from '../../../../daily-first/control/async';

export default class BondSubsidiary extends Component {
  state = {
    isVisible: false
  };
  render() {
    const {
      aboutTable,
      active,
      // isOpenDetailModal,
      // changeDetailModal,
      queryAboutElement,
      // changeQueryElement,
      asyncHttpDailyKnotsOptDetail
    } = this.props;
    /***table按钮组***/
    const ButtonTableType = [
      {
        name: '执行详情',
        roule: true,
        icon: 'diff',
        // noAuth: true,
        func: async (evt, row) => {
          // changeDetailModal(true);
          // changeQueryElement({
          //   type: 'queryDetailElement',
          //   value: { jobId: row.jobId, batchNo: row.batchNo }
          // });
          this.setState({
            isVisible: true
          });
          await asyncHttpDailyKnotsOptDetail(row);
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

    /***表格分页***/
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
      total: aboutTable[`total${type}`],
      current: queryAboutElement.reqPageNum
    };

    // console.log(aboutTable[`list${active}`])
    return (
      <div style={{ margin: '4px 8px' }}>
        <ConfigableTable
          {...setTableInfo({
            dataSource: aboutTable[`list${type}`],
            pagination: pagination,
            columns: col,
            height: 240
          })}
        />

        <Modal
          visible={this.state.isVisible}
          width={1100}
          destroyOnClose={true}
          title="执行详情"
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
          <ExecuteDetail {...this.props}></ExecuteDetail>
        </Modal>
      </div>
    );
  }

  // 分页
  searchAccountByCondition = ({ ele, value }) => {
    const { changeQueryElement, asyncHttpDailyKnotsLogList } = this.props;
    changeQueryElement({ type: 'queryAboutElement', value: { [ele]: value } });
    asyncHttpDailyKnotsLogList({});
  };
}
