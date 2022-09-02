import React, { PureComponent } from 'react';
import { Row, message } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  page,
  ConfigableTable,
  exportFile,
  exportSelectFile,
  setColumns,
  setRowColor,
  selectRequest,
  selectPageRequest,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
// import CashSaleRowRender from './CashSaleRowRender';

const { mapOption } = SearchForm;
class CashSale extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };

  render() {
    const {
      cashSaleList,
      cashSaleCol,
      changeElementQuery,
      queryCashSaleElement,
      bondNameListCashSele
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(cashSaleCol);
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'executionReportBond',
          dropdownWidth: 300,
          placeholder: '请选择成交编号',
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              value,
              sing: 'queryCashSaleElement',
              type: 'execCode'
            });
          }
        },
      },
      {
        name: 'tradingDirection',
        label: '交易方向',
        type: 'Select',
        props: {
          placeholder: '请选择交易方向',
          getDics: 1030122,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryCashSaleElement',
              value,
              type: 'tradeDirection'
            });
          }
        }
      },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择债券名称',
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              sing: 'queryCashSaleElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListCashSele
      },
      {
        name: 'execDate',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryCashSaleElement',
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
      //   // noAuth:true,
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
      total: cashSaleList.total,
      pageSize: queryCashSaleElement.reqPageSize,
      current: queryCashSaleElement.reqPageNum,
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    /***点击索引获取行的ID** */
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
        <section className="marginAuto">
          {withRoleBotton(ButtonType, this.props.btnAuth)}
          {/* <Radio.Group
            onChange={this.onRadioChange}
            value={queryCashSaleElement.clearingStatus}
            style={{ float: 'right' }}
          >
            <Radio value={1}>待清分指令</Radio>
            <Radio value={3}>所有指令</Radio>
          </Radio.Group> */}

          <ConfigableTable
            // expandedRowRender={row => CashSaleRowRender(this.props, row)}
            {...setTableInfo({
              columns,
              dataSource: cashSaleList.list,
              rowSelection,
              pagination: pagination,
              rowKey: 'id',
              cloumsCode,
              height: '500',
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
                }
              })
            })}
          />
        </section>
      </>
    );
  }

  /***模糊查询*/
  query = () => {
    const {
      asyncHttpSearchAccountByCondition,
      queryCashSaleElement,
    } = this.props;
    let newQueryCapitalElement = {
      ...queryCashSaleElement,
      reqPageNum: 1,
      clearingStatus: queryCashSaleElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportBond'
    });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      changeElementQuery,
      queryCashSaleElement
    } = this.props;
    changeElementQuery({
      sing: 'queryCashSaleElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryCashSaleElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryCashSaleElement,
      clearingStatus: queryCashSaleElement.clearingStatus == 1 ? 1 : '',
      reqPageNum: page,
      reqPageSize: pageSize
    };

    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportBond'
    });
    this.toEmptySelect();
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryCashSaleElement } = this.props;
    const query = {
      reqPageNum: queryCashSaleElement.reqPageNum,
      reqPageSize: queryCashSaleElement.reqPageSize
    };
    resetElement({ type: 'queryCashSaleElement', query });
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryCashSaleElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };

    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportBond'
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
      type: 'executionReportBond'
    }).then(() => {
      this.toEmptySelect();
    });
    message.success('刷新成功');
  };
  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryCashSaleElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportBond/export/condition',
      filterNullElement({ ...queryCashSaleElement, includeFieldList: this.updateDataIndex(FieldList) }),
      '成交查询(现劵买卖)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryCashSaleElement, cashSaleList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportBond/export/condition',
      filterNullElement({ ...queryCashSaleElement, includeFieldList: this.updateDataIndex(FieldList) }),
      '成交查询(现劵买卖)',
      true,
      cashSaleList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportBond/export/selected',
      { includeFieldList: this.updateDataIndex(FieldList), rows: ids },
      '成交查询(现劵买卖)'
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    // let index = FieldList.indexOf('clearingStatusName');
    // FieldList[index] = 'clearingStatus';
    return FieldList;
  };
}

export default CashSale;
