import React, { PureComponent } from 'react';
import { Row, message } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  ConfigableTable,
  filterNullElement,
  setColumns,
  setTableInfo,
  // selectRequest,
  selectPageRequest,
  rowSelectionFunc,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import BondSaleBackRowRender from './BondSaleBackRowRender';

class BondResale extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };

  render() {
    const {
      bondSaleBackColum,
      bondSaleBackList,
      queryBondSaleBackElement,
      // InstrIdListBondSaleBack,
      // bondNameListBondSaleBack
      changeElementQuery
    } = this.props;

    // 搜索字段
    const SearchformItem = [
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Select',
        props: {
          placeholder: '请输入交易指令编号',
          allowClear: true,
          configDics: selectPageRequest,
          type: 'sellbackTradeInstr',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value,
              type: 'tradeInstrId'
            });
          }
        }
        // options: InstrIdListBondSaleBack
      },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        props: {
          placeholder: '请输入债券名称',
          allowClear: true,
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListBondSaleBack
      },
      {
        name: 'settleDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: value ? value.format('YYYY-MM-DD') : '',
              type: 'execDate'
            });
          }
        }
      }
    ];

    // 表格头操作按钮
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

    // 表格字段
    const columns = [
      ...setColumns(bondSaleBackColum),
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 180,
        ellipsis: true
        // render: text => '理财子公司'
      }
    ];

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: bondSaleBackList.total,
      pageSize: queryBondSaleBackElement.reqPageSize,
      current: queryBondSaleBackElement.reqPageNum
    };

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query(value);
            }}
            moreTypeModal
            handleBeforeReset={() => true}
            handleReset={this.handleReset}
          />
        </Row>
        <section className="marginAuto">
          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
            expandedRowRender={row => {
              return <BondSaleBackRowRender {...this.props} row={row} />;
            }}
            {...setTableInfo({
              columns,
              dataSource: bondSaleBackList.list,
              rowSelection,
              pagination,
              rowKey: 'id',
              cloumsCode,
              height: '500'
            })}
          />
        </section>
      </>
    );
  }

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryBondSaleBackElement } = this.props;
    const query = {
      reqPageNum: queryBondSaleBackElement.reqPageNum,
      reqPageSize: queryBondSaleBackElement.reqPageSize
    };
    resetElement({ type: 'queryBondSaleBackElement', query });
  };

  /***模糊查询*/
  query = async value => {
    const {
      asyncHttpGetBondList,
      changeElementQuery
      // asyncGetBondInfoGroupByReport,
      // asyncGetTradeInstrIdGroupByReport
    } = this.props;
    // let queryElement = filterNullElement(value);
    // for (let n in value) {
    //   //设置搜索表单的值（异步）
    //   changeElementQuery({
    //     sing: 'queryBondSaleBackElement',
    //     value: value[n],
    //     type: n
    //   });
    // }
    await asyncHttpGetBondList({
      reqPageNum: 1
    });
    // await asyncGetBondInfoGroupByReport();
    // asyncGetTradeInstrIdGroupByReport();
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: []
    });
  };

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetBondList, changeElementQuery } = this.props;
    changeElementQuery({
      sing: 'queryBondSaleBackElement',
      value: page.reqPageNum,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryBondSaleBackElement',
      value: page.reqPageSize,
      type: 'reqPageSize'
    });
    asyncHttpGetBondList({});
    this.toEmptySelect();
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryBondSaleBackElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/sellback/sellback/export/condition',
      {
        ...filterNullElement({
          ...queryBondSaleBackElement,
          includeFieldList: this.updateDataIndex(FieldList)
        }),
        isProductLevel: false
      },
      '清分明细(债券回售)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { bondSaleBackList, queryBondSaleBackElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/sellback/sellback/export/condition',
      {
        ...filterNullElement({
          ...queryBondSaleBackElement,
          includeFieldList: this.updateDataIndex(FieldList)
        }),
        isProductLevel: false
      },
      '清分明细(债券回售)',
      true,
      bondSaleBackList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    if (!ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    let idList = [];
    ids.forEach(element => {
      idList.push(element.id);
    });
    exportSelectFile(
      '/bmtp-settle-manage/sellback/sellback/export/selected',
      {
        includeFieldList: this.updateDataIndex(FieldList),
        selectList: idList,
        isProductLevel: false
      },
      '清分明细(债券回售)',
      true
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    let index = FieldList.indexOf('bizCategoryName');
    FieldList[index] = 'bizCategory';
    return FieldList;
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpGetBondList, queryBondSaleBackElement } = this.props;
    asyncHttpGetBondList(queryBondSaleBackElement);
    message.success('刷新成功');
  };
}

export default BondResale;
