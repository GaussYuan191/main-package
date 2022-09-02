import React, { PureComponent } from 'react';
import { Row, message } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  selectPageRequest,
  setTableInfo,
  rowSelectionFunc,
  ConfigableTable,
  setColumns,
  // page,
  exportFile,
  exportSelectFile,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';

class HoldPositions extends PureComponent {
  state = {
    ids: [],
    tableHeight: 450,
    relatedSubjectCodes: [],
    FieldList: []
  };

  render() {
    const {
      tableCol,
      tableList,
      changeQueryElement,
      accountType,
      queryElement,
      toResetSearch,
      asyncHttpToImportOpt,
      currentTradeDate
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(tableCol);
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '账户类型',
        type: 'Select',
        props: {
          placeholder: '请选择账户类型',
          // getDics: '1030022',
          onChange(value) {
            changeQueryElement({ value, type: 'assetAccountType' });
          }
        },
        options: accountType
      },
      {
        name: 'tradingDirection',
        label: '债券代码',
        type: 'Select',
        props: {
          placeholder: '请选择债券代码',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(value) {
            changeQueryElement({ value, type: 'bondCode' });
          }
        }
      },
      {
        name: 'checkDate',
        label: '核对日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择核对日期',
          allowClear: false,
          initialValue: currentTradeDate ? moment(currentTradeDate) : moment(),
          onChange: value => {
            changeQueryElement({
              value: value
                ? value.format('YYYY-MM-DD')
                : moment(currentTradeDate).format('YYYY-MM-DD'),
              type: 'checkDate'
            });
          },
          onOpenChange: status => {
            if (!status && !this.searchForm.props.form.getFieldValue('checkDate')) {
              this.searchForm.props.form.resetFields(['checkDate']);
            }
          }
        }
      },
      {
        name: 'adjustStatus',
        label: '请选择状态',
        type: 'Select',
        props: {
          placeholder: '状态',
          getDics: '1030422',
          onChange(value) {
            changeQueryElement({ value, type: 'adjustStatus' });
          }
        }
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '读取',
        roule: 'true',
        func: asyncHttpToImportOpt
      },
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: this.exportCurrentPage
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
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      current: queryElement.reqPageNum,
      pageSize: queryElement.reqPageSize,
      total: tableList.total
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <div>
          <Row style={{ marginTop: '8px' }}>
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
              handleReset={() =>
                toResetSearch({
                  checkDate: currentTradeDate,
                  reqPageNum: queryElement.reqPageNum,
                  reqPageSize: queryElement.reqPageSize
                })
              }
            />
            <section className="marginAuto">
              {withRoleBotton(ButtonType, this.props.btnAuth)}
              <ConfigableTable
                {...setTableInfo({
                  columns,
                  dataSource: tableList.list,
                  rowSelection,
                  pagination: pagination,
                  rowKey: 'id',
                  cloumsCode,
                  bordered: true,
                  height: this.state.tableHeight,
                  tableHeader: 'double'
                })}
              />
            </section>
          </Row>
        </div>
      </>
    );
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpSearchCheckList } = this.props;
    asyncHttpSearchCheckList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = async ({ ele, value }) => {
    const { asyncHttpSearchCheckList, changeQueryElement } = this.props;
    changeQueryElement({ value: value, type: ele });
    await asyncHttpSearchCheckList({});
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  updateDataIndex = FieldList => {
    // let index = FieldList.indexOf('adjustStatusName');
    // FieldList[index] = 'adjustStatus';
    return FieldList;
  };

  /*导出当前或全部*/
  exportCurrentPage = status => {
    const { queryElement, tableList } = this.props;

    exportFile(
      '/bmtp-settle-manage/hold/cashCarryCheck/export/condition',
      filterNullElement({
        ...queryElement,
        exportAll: true,
        includeFieldList: this.updateDataIndex(this.state.FieldList)
      }),
      '持仓核对',
      true,
      tableList.total
    );
  };

  /*导出当前页*/
  exportCurrent = () => {
    const { queryElement, tableList } = this.props;
    const { checkDate } = queryElement;
    let ids = [];
    tableList.list.map(item => {
      ids.push(item.id);
    });
    exportFile(
      '/bmtp-settle-manage/hold/cashCarryCheck/export/condition',
      {
        checkDate,
        ids,
        exportAll: false,
        includeFieldList: this.updateDataIndex(this.state.FieldList)
      },
      '持仓核对',
      false
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { queryElement } = this.props;
    const { checkDate } = queryElement;
    let ids = [];
    if (!this.state.ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    this.state.ids.map(item => {
      ids.push(item.id);
    });

    exportSelectFile(
      '/bmtp-settle-manage/hold/cashCarryCheck/export/condition',
      {
        checkDate,
        ids,
        exportAll: false,
        includeFieldList: this.updateDataIndex(this.state.FieldList)
      },
      '持仓核对',
      true
    );
    this.toEmptySelect();
  };
}

export default HoldPositions;
