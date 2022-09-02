import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  ConfigableTable,
  filterNullElement,
  setColumns,
  setTableInfo,
  selectRequest,
  selectPageRequest,
  rowSelectionFunc,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import BondSaleBackFormAdd from './BondSaleBackFormAdd';
const { confirm } = Modal;
class BondResale extends PureComponent {
  state = {
    ids: [],
    visibleFormAdd: false,
    openModalType: 'add',
    FieldList: []
  };

  render() {
    const {
      changeElementQuery,
      bondSaleBackColum,
      bondSaleBackList,
      queryBondSaleBackElement,
      // InstrIdListBondSaleBack,
      bondNameListBondSaleBack
    } = this.props;

    // 搜索字段
    const SearchformItem = [
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'sellbackTradeInstr',
          dropdownWidth: 250,
          placeholder: '请选择交易指令编号',
          allowClear: true,
          onChange(e) {
            changeElementQuery({
              value: e,
              sing: 'queryBondSaleBackElement',
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
          placeholder: '请选择债券名称',
          allowClear: true,
          configDics: selectPageRequest,
          type: 'bond',
          onChange(e) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: e,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListBondSaleBack
      },
      {
        name: 'execDate',
        label: '成交日期',
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
        name: '新增',
        roule: true,
        func: this.openFormAdd
      },
      {
        name: '修改',
        roule: true,
        func: this.edit
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
        name: '删除',
        roule: true,
        func: this.del
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

    // 表格字段
    const columns = [
      ...setColumns(bondSaleBackColum),
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 120,
        ellipsis: true
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
              this.query();
            }}
            moreTypeModal
            handleBeforeReset={() => true}
            handleReset={this.handleReset}
          />
        </Row>
        <section className="marginAuto">
          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
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
          {/* 新增 */}
          {this.state.visibleFormAdd ? (
            <BondSaleBackFormAdd
              {...this.props}
              {...this.state}
              closeFormAdd={this.closeFormAdd}
              query={this.query}
            />
          ) : null}
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
  query = async () => {
    const {
      asyncHttpGetBondList,
      queryBondSaleBackElement
      // asyncGetBondInfoGroupByReport,
      // asyncGetTradeInstrIdGroupByReport
    } = this.props;
    await asyncHttpGetBondList({ ...queryBondSaleBackElement, reqPageNum: 1 });
    // await asyncGetBondInfoGroupByReport();
    // asyncGetTradeInstrIdGroupByReport();
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
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
      '成交查询(债券回售)',
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
      '成交查询(债券回售)',
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
      '成交查询(债券回售)',
      true
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    let index = FieldList.indexOf('bizCategoryName');
    let index2 = FieldList.indexOf('clearingStatusName');
    FieldList[index] = 'bizCategory';
    FieldList[index2] = 'clearingStatus';
    return FieldList;
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpGetBondList, queryBondSaleBackElement } = this.props;
    asyncHttpGetBondList(queryBondSaleBackElement).then(() => {
      this.toEmptySelect();
    });
    message.success('刷新成功');
  };

  //弹出新增界面
  openFormAdd = () => {
    this.setState({ visibleFormAdd: true, openModalType: 'add' });
  };

  // 关闭新增界面
  closeFormAdd = () => {
    this.setState({ visibleFormAdd: false });
  };
  // 审核
  check = async () => {
    const { ids } = this.state;
    const { asyncHttpCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus != '1') {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能审核');
          return;
        }
      }
      await asyncHttpCheckList({ ids: arr, type: 'ZQHS' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  // 反审核：renmark==null 、14  数据来源为手工
  uncheck = async () => {
    const { ids } = this.state;
    const { asyncHttpUnCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (
          n.checkStatus == '1' &&
          (n.systemHandleStatus == null || n.systemHandleStatus == 14) &&
          n.dataSource == 1
        ) {
          arr.push(n.id);
        } else {
          message.error('只有已审核、系统处理状态为空或交割失败、数据来源为手工导入的数据才能审核');
          return;
        }
      }
      await asyncHttpUnCheckList({ ids: arr, type: 'ZQHS' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  // 删除
  del = async () => {
    const { ids } = this.state;
    const that = this;
    const { asyncHttpDel } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.dataSource == 1 && n.checkStatus == 2) {
          arr.push(n.id);
        } else {
          message.error('只有未审核且数据来源为手工导入的数据才能删除');
          return;
        }
      }
      confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDel({ ids: arr, type: 'ZQHS' });
          that.query();
        }
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  // 修改
  edit = () => {
    const { ids } = this.state;
    if (ids.length == 1) {
      if (ids[0].checkStatus == 2 && ids[0].dataSource == 1) {
        this.setState({ openModalType: 'edit', visibleFormAdd: true });
      } else {
        message.error('只有未审核且数据来源为手工导入的数据才能修改');
        return;
      }
    } else {
      message.error('必须且只能选择一条数据');
      return;
    }
  };
}

export default BondResale;
