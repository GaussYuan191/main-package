// 指令管理
import React, { Component, Fragment } from 'react';
import { message, Modal } from 'antd';
import { ConfigableTable } from 'yss-biz';
import moment from 'moment';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  // selectRequest,
  selectPageRequest,
  PageBody,
  rowSelectionFunc,
  exportFile,
  exportSelectFile,
  filterNullElement,
  cloumsFunc
} from 'yss-biz';
import InsideFormAdd from './InsideFormAdd';
const { Container } = PageBody;
const { confirm } = Modal;
class Instruction extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    expandTable: [],
    visibleFormAdd: false,
    openModalType: 'add',
    FieldList: []
  };

  async componentDidMount() {
    // const { asyncHttpCurrentTradingDay, toResetSearch } = this.props;
    // await asyncHttpCurrentTradingDay().then(() => {
    //   toResetSearch();
    // });
    // await asyncHttpGetList()
  }
  //发送
  settleConfire = () => {
    const { rowChecked, asyncHttpAxiosSend, setRowChecked } = this.props;
    if (rowChecked.length) {
      for (let n of rowChecked) {
        if (n.checkStatus == 2 || n.commandStatus != null) {
          message.error('只有已审核，且未生成划款指令的数据才能生成划款指令，请重新选择');
          return;
        }
      }
      asyncHttpAxiosSend(rowChecked).then(() => {
        setRowChecked([]);
        this.toEmptySelect();
      });
    } else {
      message.error('请选择需要发送的数据');
    }
  };

  render() {
    const {
      instructionTable,
      queryElement,
      changeQueryElement,
      toResetSearch,
      tableHight,
      buyerInfo,
      sellerInfo,
      bizCategoryType,
      currentTradeDate
    } = this.props;

    const { columns, dataList = [], total } = instructionTable;

    const col = [
      ...setColumns(columns),
      // {
      //   title: '指令来源',
      //   dataIndex: 'commandSource',
      //   width: 150,
      //   render: text => {
      //     return '交易系统';
      //   }
      // },
      // {
      //   title: '源成交编号',
      //   dataIndex: 'sourceTradeId',
      //   ellipsis: true,
      //   width: 200
      // },
      {
        title: '撤销人',
        dataIndex: 'rescindName',
        ellipsis: true,
        width: 120
      },
      {
        title: '撤销时间',
        dataIndex: 'rescindTime',
        ellipsis: true,
        width: 160
      },
      {
        title: '管理人名称',
        dataIndex: 'managerName',
        ellipsis: true,
        width: 150
      },
      {
        title: '买入方产品代码',
        dataIndex: 'buyerProductCode',
        ellipsis: true,
        width: 150
      },
      {
        title: '买入方产品名称',
        dataIndex: 'buyerProductName',
        ellipsis: true,
        width: 150
      },
      {
        title: '买入方托管账户户名',
        dataIndex: 'buyerCustodianName',
        ellipsis: true,
        width: 150
      },
      {
        title: '买入方托管账号',
        dataIndex: 'buyerCustodianAccount',
        ellipsis: true,
        width: 150
      },
      {
        title: '卖出方产品代码',
        dataIndex: 'sellerProductCode',
        ellipsis: true,
        width: 150
      },
      {
        title: '卖出方产品名称',
        dataIndex: 'sellerProductName',
        ellipsis: true,
        width: 150
      },
      {
        title: '卖出方托管账户户名',
        dataIndex: 'sellerCustodianName',
        ellipsis: true,
        width: 150
      },
      {
        title: '卖出方托管账户',
        dataIndex: 'sellerCustodianAccount',
        ellipsis: true,
        width: 150
      },
      {
        title: '数据来源',
        dataIndex: 'commandSourceName',
        ellipsis: true,
        width: 150
      }
    ];

    /*设置查询*/
    let formItem = [
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          placeholder: '请选择业务品种',
          // getDics: 1030308,
          allowClear: true,
          onChange(value) {
            changeQueryElement({ bizCategory: value });
          }
        },
        options: bizCategoryType
      },
      // {
      //   name: 'repurchaseDirection',
      //   label: '回购方向',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择回购方向',
      //     getDics: 1030130,
      //     allowClear: true,
      //     onChange(value) {
      //       changeQueryElement({ repurchaseDirection: value });
      //     }
      //   }
      // },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        props: {
          placeholder: '请选择债券名称',
          allowClear: true,
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange: value => {
            changeQueryElement({ bondCode: value });
          }
        }
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true,
          // initialValue: moment(new Date(), 'YYYY-MM-DD'),
          initialValue: moment(currentTradeDate, 'YYYY-MM-DD'),
          onChange(date, dateString) {
            changeQueryElement({ settleDate: dateString });
          }
        }
      },
      {
        name: 'managerCode',
        label: '管理人',
        type: 'Select',
        props: {
          placeholder: '请选择管理人',
          allowClear: true,
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          onChange(value) {
            changeQueryElement({ managerCode: value });
          }
        }
      },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Input',
        props: {
          getDics: 1030101,
          placeholder: '请输入交易指令编号',
          onChange: e => {
            const value = e.target.value;
            changeQueryElement({ tradeInstrId: value });
          }
        }
      },
      {
        name: 'innerContactId',
        label: '内部合同编号',
        type: 'Input',
        props: {
          placeholder: '请输入内部合同编号',
          allowClear: true,
          onChange(e) {
            const value = e.target.value;
            changeQueryElement({ innerContactId: value });
          }
        }
      },

      {
        name: 'buyerProductName',
        label: '买入方产品名称',
        type: 'Select',
        props: {
          placeholder: '请选择买入方产品名称',
          allowClear: true,
          onChange(value) {
            changeQueryElement({ buyerProductName: value });
          }
        },
        options: buyerInfo
      },
      {
        name: 'sellerProductName',
        label: '卖出方产品名称',
        type: 'Select',
        props: {
          placeholder: '请选择卖出方产品名称',
          allowClear: true,
          onChange(value) {
            changeQueryElement({ sellerProductName: value });
          }
        },
        options: sellerInfo
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true,
          onChange(e) {
            const value = e.target.value;
            changeQueryElement({ execCode: value });
          }
        }
      },
      {
        name: 'innerContactStatus',
        label: '内部合同状态',
        type: 'Select',
        props: {
          placeholder: '请选择内部合同状态',
          allowClear: true,
          getDics: 1030516,
          onChange(value) {
            changeQueryElement({ innerContactStatus: value });
          }
        }
      }
    ];

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
        name: '删除',
        roule: true,
        func: this.del
      },
      {
        name: '生成划款指令',
        roule: 'true',
        func: this.settleConfire
      },
      {
        name: '撤销',
        roule: 'true',
        func: this.toRevocation
      },
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportCurrentPage(true);
            }
          },
          {
            name: '导出当前页',
            func: () => {
              this.exportCurrentPage(false);
            }
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
        this.searchAccountByCondition({
          reqPageNum: page,
          reqPageSize: pageSize
        });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({
          reqPageNum: current,
          reqPageSize: size
        });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      total: total
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this, this.handleRowSelect);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    return (
      <Fragment>
        <section>
          <Container>
            <SearchForm
              labelSize="7em"
              lineOf={3}
              formItem={formItem}
              refs={ref => (this.searchForm = ref)}
              handleSearch={values => {
                this.query(values);
              }}
              moreTypeModal
              // showAll={true}
              handleReset={() =>
                toResetSearch({
                  reqPageSize: queryElement.reqPageSize,
                  reqPageNum: queryElement.reqPageNum,
                  settleDate: moment(currentTradeDate).format('YYYY-MM-DD') // 结算日期表单默认值
                })
              }
              handleBeforeReset={() => true}
            />
            {/* {withRoleBotton(ButtonType)} */}
            <div className="marBotton">{withRoleBotton(ButtonType, this.props.btnAuth)}</div>
            <ConfigableTable
              {...setTableInfo.call(this, {
                rowKey: 'id',
                cloumsCode,
                //拖拽相关
                // colDraggable: true,
                // rowDraggable: true,
                //复选和分页
                rowSelection,
                pagination,
                // 表格数据
                columns: col,
                dataSource: dataList,
                height: tableHight,
                onRow: record => ({
                  onClick: () => {
                    setTimeout(() => {
                      this.changeRelation(record);
                    }, 300);
                  }
                })
              })}
            />
          </Container>
          {/* 新增 */}
          {this.state.visibleFormAdd ? (
            <InsideFormAdd
              {...this.props}
              {...this.state}
              closeFormAdd={this.closeFormAdd}
              query={this.query}
              toEmptySelect={this.toEmptySelect}
            />
          ) : null}
        </section>
      </Fragment>
    );
  }

  changeRelation = row => {
    const { changeTableRow, active, asyncHttpAboutBondInnerInfo, asyncHttpAboutDrawMoney } =
      this.props;
    changeTableRow && changeTableRow({ value: row });
    const action = {
      2: asyncHttpAboutBondInnerInfo, //买卖房信息
      3: asyncHttpAboutDrawMoney //划款指令信息
    };

    typeof action[active] == 'function' && action[active](row);
  };

  // 模糊查询
  query = values => {
    const { asyncHttpGetList } = this.props;
    // changeTableRow && changeTableRow({ value: {} });
    // let settleDate;
    // if (!values.settleDate) {
    //   settleDate = moment().format('YYYY-MM-DD');
    // } else {
    //   settleDate = values.settleDate.format('YYYY-MM-DD');
    // }
    asyncHttpGetList && asyncHttpGetList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  handleRowSelect = row => {
    let rows = Array.isArray(row) ? row.map(item => item) : [row];
    this.props.setRowChecked(rows);
  };

  // 翻页查询
  searchAccountByCondition = pages => {
    const { changeQueryElement, asyncHttpGetList } = this.props;
    changeQueryElement && changeQueryElement(pages);
    asyncHttpGetList && asyncHttpGetList({});
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 撤销
  toRevocation = () => {
    const { asyncHttpRevocationInner } = this.props;
    if (this.state.ids.length < 1) {
      message.error('请选择需要撤销的数据！');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('仅针对单一数据撤回！');
      return;
    }
    asyncHttpRevocationInner(this.state.ids[0]).then(() => {
      this.toEmptySelect();
    });
  };

  /*导出当前或全部*/
  exportCurrentPage = status => {
    const { FieldList } = this.state;
    const { queryElement, instructionTable } = this.props;
    let total;
    if (status) {
      total = instructionTable.total;
    }
    exportFile(
      '/bmtp-settle-manage/innnertrade/bondInnerTrade/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '内转业务',
      status,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/innnertrade/bondInnerTrade/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '内转业务'
    );
    this.toEmptySelect();
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
      await asyncHttpCheckList(arr);
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
        arr.push(n.id);
        if (n.checkStatus == 1) {
          message.error('存在已审核的数据，不能删除');
          return;
        }
      }
      confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDel(arr);
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
      if (ids[0].checkStatus == 2 && ids[0].commandSource == 1) {
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
export default Instruction;
