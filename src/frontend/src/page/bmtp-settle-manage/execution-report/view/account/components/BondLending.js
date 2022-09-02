import React, { PureComponent } from 'react';
import { Row, message } from 'antd';
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
  // selectRequest,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';

import { page } from 'yss-biz/utils/util/constant';
const { mapOption } = SearchForm;
class CashSale extends PureComponent {
  state = {
    ids: [],
    relatedSubjectCodes: [],
    FieldList: []
  };

  render() {
    const {
      bondLendingList,
      bondLendingCol,
      bondLendingNumberList,
      // changeTransactionNumberList,
      changeElementQuery,
      // eroPledgeRefList,
      // eroPledgeRefCol,
      queryBondLendingElement,
      // tableHight,
      bondNameListLending
    } = this.props;
    /***查询Input按钮 */
    const columns = [...setColumns(bondLendingCol)];
    // const columns = [...bondLendingCol];
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'executionReportLending',
          placeholder: '请选择成交编号',
          dropdownWidth: 300,
          allowClear: true,
          onChange(e) {
            // const x = e.target.value;
            changeElementQuery({
              value: e,
              sing: 'queryBondLendingElement',
              type: 'execCode'
            });
          }
        }
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
          dropdownWidth: 300,
          type: 'bond',
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondLendingElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListLending //注释原因：债券信息暂时只从持仓表查询，此处是查询的业务表的数据并过滤了重复的债券信息
      },
      {
        name: 'execDate',
        label: '成交日期',
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
      // {
      //   name: '刷新',
      //   icon: 'stepForwardFilled',
      //   roule: true,
      //   func: this.refresh
      // },
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
        <ConfigableTable
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
      </>
    );
  }
  componentDidMount() {}

  //重置
  handleReset = () => {
    const { resetElement, queryBondLendingElement } = this.props;
    const query = {
      reqPageNum: queryBondLendingElement.reqPageNum,
      reqPageSize: queryBondLendingElement.reqPageSize
    };
    resetElement({ type: 'queryBondLendingElement', query });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpsearchEroPledgeRef } = this.props;
    asyncHttpsearchEroPledgeRef({ code: item.execCode });
  }

  /***模糊查询*/
  query = () => {
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
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportLending'
    });
    this.toEmptySelect();
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
    }).then(() => {
      this.toEmptySelect();
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
      '成交查询(债券借贷)',
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
      '成交查询(债券借贷)',
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
      '成交查询(债券借贷)'
    );
    this.toEmptySelect();
  };

  // updateDataIndex = FieldList => {
  //   let index = FieldList.indexOf('clearingStatusName');
  //   FieldList[index] = 'clearingStatus';
  //   return FieldList;
  // };
}

export default CashSale;
