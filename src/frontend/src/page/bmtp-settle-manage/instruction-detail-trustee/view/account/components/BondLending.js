import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  setRowColor,
  SearchForm,
  withRoleBotton,
  ConfigableTable,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  // TransfromDown,
  selectRequest,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import BondLendingRowRender from './BondLendingRowRender';
import querySellteInfo from './QuerySellteInfo';
import BondLendingFormSplit from './BondLendingFormSplit';
import QueryTransactionData from './QueryTransactionData';

import { page } from 'yss-biz/utils/util/constant';
const { mapOption } = SearchForm;
// const { TabPane } = Tabs;
class BondLending extends PureComponent {
  state = {
    ids: [],
    relatedSubjectCodes: [],
    sellteInfo: {},
    visible: false,
    visibleFormSplit: false,
    visibleQueryData: false,
    expandedRowKeys: [],
    FieldList: []
  };

  render() {
    const {
      bondLendingList,
      bondLendingCol,
      bondLendingNumberList,
      // changeTransactionNumberList,
      changeElementQuery,
      // guaranteeList,
      // guaranteeCol,
      queryBondLendingElement,
      // tableHight,
      // bondNameListCashSele,
      asyncHttpSearchOrder,
      bondNameListLending
    } = this.props;
    /***查询Input按钮 */
    const me = this;
    const columns = setColumns(bondLendingCol);

    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        props: {
          placeholder: '请选择成交编号',
          allowClear: true,
          configDics: selectPageRequest,
          type: 'executionReportLending',
          dropdownWidth: 300,
          onChange(e) {
            // const x = e.target.value;
            changeElementQuery({
              value: e,
              sing: 'queryBondLendingElement',
              type: 'execCode'
            });
          }
        },
        // options: mapOption(bondLendingNumberList, 'execCode', 'execCode')
      },
      {
        name: 'tradingDirection',
        label: '交易方向',
        type: 'Select',
        props: {
          placeholder: '请选择交易方向',
          // getDics: 1030124,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondLendingElement',
              value,
              type: 'tradeDirection'
            });
          }
        },
        options: [
          {
            label: '融入',
            value: '5'
          },
          {
            label: '融出',
            value: '6'
          }
        ]
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择资债券名称',
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondLendingElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListLending //bondNameList
      },
      {
        name: 'settleDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondLendingElement',
              value: value ? value.format('YYYY-MM-DD') : '',
              type: 'execDate'
            });
          }
        }
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '拆分',
        roule: true,
        func: this.openFormSlpit
      },
      {
        name: '审核',
        roule: true,
        func: this.check
      },
      {
        name: '反审核',
        roule: true,
        func: this.uncheck
      },
      {
        name: '查询交易数据',
        roule: true,
        func: this.openQueryData
      },
      {
        name: '查询结算信息',
        roule: true,
        func: () => {
          me.setState({
            visible: true
          });
        }
      },
      {
        name: '导出',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: this.exportAll
          },
          {
            name: '导出当前页',
            func: this.exportCurrent
          },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }
    ];

    /***表格分页***/
    const pagination = {
      total: bondLendingList.total,
      pageSize: queryBondLendingElement.reqPageSize,
      current: queryBondLendingElement.reqPageNum,
      onChange: (page, pageSize) => {
        this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <Row style={{ marginTop: '8px', position: 'relative', left: '-23px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleBeforeReset={() => true}
            handleReset={this.handleReset}
          />
        </Row>
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        {/* <Radio.Group
          onChange={this.onRadioChange}
          value={queryBondLendingElement.clearingStatus}
          style={{ float: 'right' }}
        >
          <Radio value={1}>待清分指令</Radio>
          <Radio value={3}>所有指令</Radio>
        </Radio.Group> */}
        <ConfigableTable
          expandedRowRender={row => {
            let arr = this.state.expandedRowKeys;
            return arr.includes(row.id) ? <BondLendingRowRender {...this.props} row={row} /> : null;
          }}
          expandedRowKeys={[...this.state.expandedRowKeys]}
          onExpandedRowsChange={expandedRows => {
            this.setState({ expandedRowKeys: expandedRows });
          }}
          {...setTableInfo({
            columns,
            dataSource: bondLendingList.list,
            rowSelection,
            pagination,
            rowKey: 'id',
            cloumsCode,
            bordered: true,
            height: this.props.tableHight + '',
            onRow: record => ({
              style: {
                ...setRowColor(() => {
                  switch (record.clearingStatusName) {
                    case '未清分':
                      return 'error';
                    // case '':
                    //   return 'warning';
                    // case '':
                    //   return 'success';
                    default:
                      return 'info';
                  }
                })
              },
              onClick: event => {
                setTimeout(() => {
                  this.changeRelation(event, record);
                }, 300);
              }
            })
          })}
        />

        <Modal
          title="查询结算指令信息"
          visible={this.state.visible}
          destroyOnClose={true}
          onOk={() => {
            if (this.state.sellteInfo.execCode && this.state.sellteInfo.instituion) {
              asyncHttpSearchOrder(this.state.sellteInfo).then(() => {
                this.setState({
                  sellteInfo: {},
                  visible: false
                });
              });
            } else {
              message.error('源成交编号和结算机构不能为空');
            }
          }}
          onCancel={() => {
            this.setState({
              sellteInfo: {},
              visible: false
            });
          }}
        >
          {querySellteInfo(this.toGetSettleInfo)}
        </Modal>

        {/* 拆分 */}
        {this.state.visibleFormSplit ? (
          <BondLendingFormSplit
            {...this.props}
            {...this.state}
            closeFormSlpit={this.closeFormSlpit}
            query={this.query}
          />
        ) : null}

        {/* 查询交易信息 */}
        {this.state.visibleQueryData ? (
          <QueryTransactionData
            {...this.props}
            {...this.state}
            closeQueryData={this.closeQueryData}
          />
        ) : null}
      </>
    );
  }
  componentDidMount() { }

  //重置
  handleReset = () => {
    const { resetElement, queryBondLendingElement } = this.props;
    const query = {
      reqPageNum: queryBondLendingElement.reqPageNum,
      reqPageSize: queryBondLendingElement.reqPageSize
    };
    resetElement({ type: 'queryBondLendingElement', query });
  };

  toGetSettleInfo = value => {
    let { sellteInfo } = this.state;
    this.setState({
      sellteInfo: { ...sellteInfo, ...value }
    });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpsearchEroPledgeRef, changeTableRow } = this.props;
    changeTableRow({ type: 'mdRowed', value: item });
    asyncHttpsearchEroPledgeRef({ type: 'parent', params: { code: item.execCode } });
  }

  /***模糊查询*/
  query = cur => {
    //cur，当传参为true时，展示当前页，否则跳到第一页
    const {
      asyncHttpSearchAccountByCondition,
      queryBondLendingElement,
      // asyncHttpSearchGetQueryCondition
    } = this.props;
    let newQueryCapitalElement = {
      ...queryBondLendingElement,
      reqPageNum: 1,
      clearingStatus: queryBondLendingElement.clearingStatus == 1 ? 1 : ''
    };
    if (cur) {
      newQueryCapitalElement.reqPageNum = queryBondLendingElement.reqPageNum;
    }
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportLending'
    });
    // //查询时，更新下拉选择框里的数据
    // asyncHttpSearchGetQueryCondition({ type: 'executionReportLending' });
    this.toEmptySelect();
    this.setState({ expandedRowKeys: [] }); //清空表格额外展开行
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      queryBondLendingElement,
      changeElementQuery
    } = this.props;
    changeElementQuery({
      sing: 'queryBondLendingElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryBondLendingElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryBondLendingElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      clearingStatus: queryBondLendingElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportLending'
    });
    this.toEmptySelect();
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryBondLendingElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportLending'
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'executionReportLending'
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryBondLendingElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportLending/export/condition',
      filterNullElement({
        ...queryBondLendingElement,
        includeFieldList: FieldList
      }),
      '清分明细(债券借贷)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryBondLendingElement, bondLendingList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportLending/export/condition',
      filterNullElement({
        ...queryBondLendingElement,
        includeFieldList: FieldList
      }),
      '清分明细(债券借贷)',
      true,
      bondLendingList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportLending/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '清分明细(债券借贷)'
    );
    this.toEmptySelect();
  };

  // updateDataIndex = FieldList => {
  //   let index = FieldList.indexOf('clearingStatusName');
  //   FieldList[index] = 'clearingStatus';
  //   return FieldList;
  // };

  //弹出拆分界面
  openFormSlpit = () => {
    let { ids } = this.state;
    if (ids.length == 1) {
      if (ids[0].dataSource == 2 && ids[0].checkStatus == 2) {
        this.setState({ visibleFormSplit: true });
      } else {
        message.error('只有未审核,且数据来源是交易系统的数据才能拆分');
        return;
      }
    } else {
      message.error('必须且只能选择一条数据');
    }
  };

  // 关闭拆分界面
  closeFormSlpit = () => {
    this.setState({ visibleFormSplit: false });
  };

  // 审核
  check = async () => {
    const { ids } = this.state;
    const { asyncHttpCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.clearingStatus == '2' && n.checkStatus != '1') {
          arr.push(n.id);
        } else {
          message.error('只有已清分且未审核的数据才能审核');
          return;
        }
      }
      await asyncHttpCheckList({ ids: arr, type: 'executionReportLending' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  // 反审核
  uncheck = async () => {
    const { ids } = this.state;
    const { asyncHttpUnCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus != '2') {
          arr.push(n.id);
        } else {
          message.error('只有已审核的数据才能反审核');
          return;
        }
      }
      await asyncHttpUnCheckList({ ids: arr, type: 'executionReportLending' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };

  //弹出查询交易信息界面
  openQueryData = () => {
    this.setState({ visibleQueryData: true });
  };

  // 关闭查询交易信息界面
  closeQueryData = () => {
    this.setState({ visibleQueryData: false });
  };
}

export default BondLending;
