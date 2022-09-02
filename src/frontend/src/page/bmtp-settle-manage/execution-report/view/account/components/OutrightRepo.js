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
  selectRequest,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
// import OutrightRepoRowRender from './OutrightRepoRowRender';

import { page } from 'yss-biz/utils/util/constant';
const { mapOption } = SearchForm;
// const { TabPane } = Tabs;
class CashSale extends PureComponent {
  state = {
    ids: [],
    relatedSubjectCodes: [],
    FieldList: []
  };

  render() {
    const {
      outrightRepoList,
      outrightRepoCol,
      outrightRepoNumberList,
      // changeTransactionNumberList,
      changeElementQuery,
      // guaranteeList,
      // guaranteeCol,
      queryOutrightRepoElement,
      // tableHight,
      bondNameList
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(outrightRepoCol);

    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'executionReportOutright',
          dropdownWidth: 300,
          placeholder: '请选择成交编号',
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              value,
              sing: 'queryOutrightRepoElement',
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
          // getDics: 1030151,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryOutrightRepoElement',
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
        name: 'bondName',
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
              sing: 'queryOutrightRepoElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameList
      },
      {
        name: 'execDate',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryOutrightRepoElement',
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
      total: outrightRepoList.total,
      pageSize: queryOutrightRepoElement.reqPageSize,
      current: queryOutrightRepoElement.reqPageNum,
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
          value={queryOutrightRepoElement.clearingStatus}
          style={{ float: 'right' }}
        >
          <Radio value={1}>待清分指令</Radio>
          <Radio value={3}>所有指令</Radio>
        </Radio.Group> */}
        <ConfigableTable
          // expandedRowRender={row => OutrightRepoRowRender(this.props, row)}
          {...setTableInfo({
            columns,
            dataSource: outrightRepoList.list,
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
    const { resetElement, queryOutrightRepoElement } = this.props;
    const query = {
      reqPageNum: queryOutrightRepoElement.reqPageNum,
      reqPageSize: queryOutrightRepoElement.reqPageSize
    };
    resetElement({ type: 'queryOutrightRepoElement', query });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpsearchEroCollateralReff } = this.props;
    asyncHttpsearchEroCollateralReff({ code: item.execCode });
  }

  /***模糊查询*/
  query = () => {
    const {
      asyncHttpSearchAccountByCondition,
      queryOutrightRepoElement
    } = this.props;
    let newQueryCapitalElement = {
      ...queryOutrightRepoElement,
      reqPageNum: 1,
      clearingStatus: queryOutrightRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
    });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      queryOutrightRepoElement,
      changeElementQuery
    } = this.props;
    changeElementQuery({
      sing: 'queryOutrightRepoElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryOutrightRepoElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryOutrightRepoElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      clearingStatus: queryOutrightRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
    });
    this.toEmptySelect();
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryOutrightRepoElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
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
    const { queryOutrightRepoElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/condition',
      filterNullElement({
        ...queryOutrightRepoElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(买断式)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryOutrightRepoElement, outrightRepoList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/condition',
      filterNullElement({
        ...queryOutrightRepoElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(买断式)',
      true,
      outrightRepoList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/selected',
      { includeFieldList: this.updateDataIndex(FieldList), rows: ids },
      '成交查询(买断式)'
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
