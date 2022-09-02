import React, { PureComponent } from 'react';
import { Row, message } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setRowColor,
  ConfigableTable,
  setTableInfo,
  rowSelectionFunc,
  setColumns,
  exportFile,
  exportSelectFile,
  page,
  selectPageRequest,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
// import CollateralisedRepoRowRender from './CollateralisedRepoRowRender';

const { mapOption } = SearchForm;
class CashSale extends PureComponent {
  state = {
    ids: [],
    relatedSubjectCodes: [],
    FieldList: []
  };

  render() {
    const {
      collateralisedRepoList,
      collateralisedRepoCol,
      changeElementQuery,
      queryCollateralisedRepoElement,
      // tableHight
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(collateralisedRepoCol);
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        allowClear: true,
        props: {
          configDics: selectPageRequest,
          type: 'executionReportPledge',
          placeholder: '请选择成交编号',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              value,
              sing: 'queryCollateralisedRepoElement',
              type: 'execCode'
            });
          }
        }
      },
      {
        name: 'tradingDirection',
        label: '交易方向',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择交易方向',
          // getDics: 1030151,
          onChange(value) {
            changeElementQuery({
              sing: 'queryCollateralisedRepoElement',
              value,
              type: 'tradeDirection'
            });
          }
        },
        options: [
          {
            label: '正回购',
            value: '3'
          },
          {
            label: '逆回购',
            value: '4'
          }
        ]
      },
      {
        name: 'execDate',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryCollateralisedRepoElement',
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

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    /***表格分页***/
    const pagination = {
      total: collateralisedRepoList.total,
      pageSize: queryCollateralisedRepoElement.reqPageSize,
      current: queryCollateralisedRepoElement.reqPageNum,
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
          value={queryCollateralisedRepoElement.clearingStatus}
          style={{ float: 'right' }}
        >
          <Radio value={1}>待清分指令</Radio>
          <Radio value={3}>所有指令</Radio>
        </Radio.Group> */}
        <ConfigableTable
          // expandedRowRender={row => CollateralisedRepoRowRender(this.props, row)}
          {...setTableInfo({
            columns,
            dataSource: collateralisedRepoList.list,
            pagination: pagination,
            rowKey: 'id',
            cloumsCode,
            bordered: true,
            rowSelection,
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

  //重置
  handleReset = () => {
    const { resetElement, queryCollateralisedRepoElement } = this.props;
    const query = {
      reqPageNum: queryCollateralisedRepoElement.reqPageNum,
      reqPageSize: queryCollateralisedRepoElement.reqPageSize
    };
    resetElement({ type: 'queryCollateralisedRepoElement', query });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpSearchErpBondRef } = this.props;
    asyncHttpSearchErpBondRef({ code: item.execCode });
  }

  /***模糊查询*/
  query = () => {
    const {
      asyncHttpSearchAccountByCondition,
      queryCollateralisedRepoElement,
    } = this.props;
    let newQueryCapitalElement = {
      ...queryCollateralisedRepoElement,
      reqPageNum: 1,
      clearingStatus: queryCollateralisedRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      queryCollateralisedRepoElement,
      changeElementQuery
    } = this.props;
    changeElementQuery({
      sing: 'queryCollateralisedRepoElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryCollateralisedRepoElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryCollateralisedRepoElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      clearingStatus: queryCollateralisedRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
    this.toEmptySelect();
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryCollateralisedRepoElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*刷新*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'executionReportPledge'
    }).then(() => {
      this.toEmptySelect();
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryCollateralisedRepoElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/condition',
      filterNullElement({
        ...queryCollateralisedRepoElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(质押式回购)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryCollateralisedRepoElement, collateralisedRepoList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/condition',
      filterNullElement({
        ...queryCollateralisedRepoElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(质押式回购)',
      true,
      collateralisedRepoList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/selected',
      { includeFieldList: this.updateDataIndex(FieldList), rows: ids },
      '成交查询(质押式回购)'
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    // let index = FieldList.indexOf('clearingStatusName');
    // let index2 = FieldList.indexOf('dataSourceName');
    // FieldList[index] = 'clearingStatus';
    // FieldList[index2] = 'dataSource';
    return FieldList;
  };
}

export default CashSale;
