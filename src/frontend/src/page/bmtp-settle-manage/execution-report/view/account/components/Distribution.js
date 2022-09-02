import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  // selectRequest,
  selectPageRequest,
  setColumns,
  ConfigableTable,
  functionRolue,
  page,
  exportFile,
  exportSelectFile,
  cloumsFunc
} from 'yss-biz';
// import DistributionRowRender from './DistributionRowRender';
import DistributionFormAdd from './DistributionFormAdd';
const { confirm } = Modal;
class Detailed extends PureComponent {
  state = {
    ids: [],
    visibleFormAdd: false,
    openModalType: 'add',
    FieldList: []
  };
  render() {
    const {
      dealInstructionsList,
      dealInstructionsCol,
      changeElementQuery,
      queryDistributionElement,
    } = this.props;
    /***查询Input按钮 */
    const columns = setColumns(dealInstructionsCol);
    let SearchformItem = [
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'distributTradeInstr',
          placeholder: '请选择交易指令编号',
          dropdownWidth: 300,
          // type: 'product',
          // config: selectRequest,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryDistributionElement',
              value,
              type: 'tradeInstrId'
            });
          }
        },
      },
      // {
      //   name: 'execCode',
      //   label: '成交编号',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入成交编号',
      //     // type: 'product',
      //     // config: selectRequest,
      //     allowClear: true,
      //     onChange(value) {
      //       changeElementQuery({
      //         sing: 'queryDistributionElement',
      //         value: value.target.value,
      //         type: 'execCode'
      //       });
      //     }
      //   }
      // },
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          placeholder: '请选择业务品种',
          // getDics: 1030127,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryDistributionElement',
              value,
              type: 'bizCategory'
            });
          }
        },
        options: [
          {
            label: '网上分销',
            value: '4'
          },
          {
            label: '网下分销',
            value: '5'
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
              sing: 'queryDistributionElement',
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

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: dealInstructionsList.total,
      pageSize: queryDistributionElement.reqPageSize,
      current: queryDistributionElement.reqPageNum
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

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
          <section className="marginAuto">
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              // expandedRowRender={row => DistributionRowRender(this.props, row)}
              {...setTableInfo({
                columns,
                dataSource: dealInstructionsList.list,
                rowSelection,
                pagination,
                rowKey: 'id',
                cloumsCode,
                height: '500',
                bordered: true,
                onRow: record => {
                  return {
                    onClick: event => {
                      // this.changInfo(event, record);
                    }
                  };
                }
              })}
            />
          </section>
          {/* 新增 */}
          {this.state.visibleFormAdd ? (
            <DistributionFormAdd
              {...this.props}
              {...this.state}
              closeFormAdd={this.closeFormAdd}
              query={this.query}
            />
          ) : null}
        </Row>
      </>
    );
  }

  /***模糊查询*/
  query = async () => {
    const {
      asyncHttpSearchAccountByCondition,
      queryDistributionElement,
    } = this.props;
    let newQueryCapitalElement = {
      ...queryDistributionElement,
      reqPageNum: 1,
      clearingStatus: queryDistributionElement.clearingStatus == 1 ? 1 : ''
    };
    await asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'onlineExecutReport'
    });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      changeElementQuery,
      queryDistributionElement
    } = this.props;
    changeElementQuery({
      sing: 'queryDistributionElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryDistributionElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryDistributionElement,
      clearingStatus: queryDistributionElement.clearingStatus == 1 ? 1 : '',
      reqPageNum: page,
      reqPageSize: pageSize
    };

    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'onlineExecutReport'
    });
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryDistributionElement } = this.props;
    const query = {
      reqPageNum: queryDistributionElement.reqPageNum,
      reqPageSize: queryDistributionElement.reqPageSize
    };
    resetElement({ type: 'queryDistributionElement', query });
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'onlineExecutReport'
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryDistributionElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/condition',
      filterNullElement({
        ...queryDistributionElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(分销)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryDistributionElement, dealInstructionsList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/condition',
      filterNullElement({
        ...queryDistributionElement,
        includeFieldList: this.updateDataIndex(FieldList)
      }),
      '成交查询(分销)',
      true,
      dealInstructionsList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/selected',
      { includeFieldList: this.updateDataIndex(FieldList), rows: ids },
      '成交查询(分销)'
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    // let index = FieldList.indexOf('clearingStatusName');
    // FieldList[index] = 'clearingStatus';
    return FieldList;
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
        if (n.clearingStatus == '2' && n.checkStatus != '1') {
          arr.push(n.id);
        } else {
          message.error('只有已清分且未审核的数据才能审核');
          return;
        }
      }
      await asyncHttpCheckList({ ids: arr, type: 'FX' });
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
      await asyncHttpUnCheckList({ ids: arr, type: 'FX' });
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
        if (n.checkStatus == 2 && n.dataSource == 1) {
          arr.push(n.id);
        } else {
          message.error('只有未审核且数据来源为手工导入的数据才能删除');
          return;
        }
      }
      confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDel({ ids: arr, type: 'FX' });
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

export default Detailed;
