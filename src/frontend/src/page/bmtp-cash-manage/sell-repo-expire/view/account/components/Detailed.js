import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  selectPageRequest,
  setColumns,
  ConfigableTable,
  functionRolue,
  exportFile,
  exportSelectFile,
  page,
  cloumsFunc
} from 'yss-biz';
import RowRender from './RowRender';

class Detailed extends PureComponent {
  state = {
    ids: [],
    pageSize: page.reqPageSize,
    FieldList: [],
    expandedRowKeys: [] // 记录展开的行
  };

  render() {
    const {
      businessList,
      businessCol,
      changeQueryElementNumberList,
      toReasetSearch,
      tableHight,
      queryElement
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(businessCol);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '管理人',
        type: 'Select',
        props: {
          placeholder: '请选择管理人',
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          allowClear: true,
          onChange(value) {
            changeQueryElementNumberList({ type: 'consignorCode', value: value });
          }
        }
      },
      // {
      //   name: 'productName',
      //   label: '产品名称',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择产品名称',
      //     type: 'product',
      //     configDics: selectPageRequest,
      //     dropdownWidth: 300,
      //     allowClear: true,
      //     onChange(value, option) {
      //       changeQueryElementNumberList({ type: 'productId', value });
      //     }
      //   }
      // },
      {
        name: 'Subject',
        label: '结算机构',
        type: 'Select',
        props: {
          placeholder: '请选择结算机构',
          getDics: 1030404,
          allowClear: true,
          onChange(value) {
            changeQueryElementNumberList({
              type: 'settleInstitution',
              value: value
            });
          }
        }
      },
      {
        name: 'srcTradeId',
        label: '源成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入源成交编号',
          onChange(e) {
            changeQueryElementNumberList({ type: 'execCode', value: e.target.value });
          }
        }
      },
      {
        name: 'lendingDirection',
        label: '全额结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入全额结算指令编号',
          onChange(e) {
            changeQueryElementNumberList({ type: 'secondInstructId', value: e.target.value });
          }
        }
      },
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          onChange(e) {
            changeQueryElementNumberList({ type: 'firstInstructId', value: e.target.value });
          }
        }
      },
      {
        name: 'transactionType',
        label: '查询日期',
        type: 'RangePicker',
        itemSize: '250px',
        props: {
          placeholder: '请选择日期',
          onChange(value, dateString) {
            changeQueryElementNumberList({
              type: 'secondSettleDate_begin',
              value: dateString ? dateString[0] : ''
            });
            changeQueryElementNumberList({
              type: 'secondSettleDate_end',
              value: dateString ? dateString[1] : ''
            });
          }
        }
      }
    ];

    /***按钮组***/

    const ButtonType = [
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
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      total: businessList.total
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            moreTypeModal
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            handleBeforeReset={() => true}
            handleReset={() => {
              toReasetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum
              });
            }}
          />
          <section className="marginAuto">
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              expandedRowRender={row => {
                return this.state.expandedRowKeys.includes(row.id) ? (
                  <RowRender {...this.props} row={row} />
                ) : null;
              }}
              expandedRowKeys={this.state.expandedRowKeys}
              onExpandedRowsChange={expandedRowKeys => {
                this.setState({ expandedRowKeys: expandedRowKeys });
              }}
              rowKey="id"
              {...setTableInfo({
                columns,
                dataSource: businessList.list,
                rowSelection,
                cloumsCode,
                pagination,
                height: tableHight + 20
              })}
              bordered={true}
              onRow={record => {
                return {
                  onClick: event => {
                    setTimeout(() => {
                      this.changInfo(event, record);
                    }, 300);
                  }
                };
              }}
            />
          </section>
        </Row>
      </>
    );
  }

  /***点击切换详情*/
  changInfo(event, item) {
    const { asyncHttpGetInfo, changTableRow } = this.props;
    changTableRow({ value: item });
    asyncHttpGetInfo(item);
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetAtureBusinessList, changeQueryElementNumberList } = this.props;
    changeQueryElementNumberList({ type: 'reqPageNum', value: 1 });
    asyncHttpGetAtureBusinessList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = ({ ele, value }) => {
    const { asyncHttpGetAtureBusinessList, changeQueryElementNumberList } = this.props;
    changeQueryElementNumberList({ type: ele, value: value });
    asyncHttpGetAtureBusinessList({});
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-cash-manage/hold/cashRepoEndBusiness/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '正回购到期业务',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement, businessList } = this.props;
    exportFile(
      '/bmtp-cash-manage/hold/cashRepoEndBusiness/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '正回购到期业务',
      true,
      businessList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-cash-manage/hold/cashRepoEndBusiness/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '正回购到期业务'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
