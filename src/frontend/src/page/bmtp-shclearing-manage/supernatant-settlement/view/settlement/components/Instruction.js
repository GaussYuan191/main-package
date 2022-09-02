// 指令管理
import React, { Component, Fragment } from 'react';
import InstructionRowRender from './InstructionRowRender';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  selectPageRequest,
  ConfigableTable,
  PageBody,
  exportFile,
  exportSelectFile,
  filterNullElement,
  rowSelectionFunc,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import { message } from 'antd';
import InstructionSettlementStatus from './InstructionSettlementStatus';
import CashSaleFormSplit from './CashSaleForm';

const { mapOption } = SearchForm;
const { Container } = PageBody;
class Instruction extends Component {
  state = {
    ids: [],
    expandTable: [],
    visible: false,
    addVisible: false,
    FieldList: []
  };

  render() {
    const {
      instructionTable,
      instructionQueryForm,
      // counterAccountInfo,
      // changeQueryElement,
      active,
      toInitTab,
      businessTypes
    } = this.props;
    const { columns, data } = instructionTable;

    const col = setColumns(columns);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'consignorCode',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          allowClear: true,
          type: 'consignor',
          configDics: selectPageRequest
        }
      },
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true
        }
      },
      {
        name: 'srcTradeId',
        label: '源成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入源成交编号',
          allowClear: true
        }
      },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        props: {
          placeholder: '请选择债券名称',
          allowClear: true,
          type: 'bond',
          configDics: selectPageRequest
        }
      },
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          placeholder: '请选择业务品种',
          // getDics: 1030308,
          allowClear: true
        },
        options: businessTypes
      },
      {
        name: 'entrustSide',
        label: '交易方向',
        type: 'Select',
        props: {
          placeholder: '请选择交易方向',
          getDics: 1030124,
          allowClear: true
        }
      },
      // {
      //   name: 'settlementType',
      //   label: '结算方式/首期结算方式',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择结算方式/首期结算方式',
      //     getDics: 1030310,
      //     allowClear: true
      //   }
      // },
      // {
      //   name: 'offsetAccount',
      //   label: '对手方账号',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入对手方账号',
      //     allowClear: true
      //   },
      //   options: mapOption(counterAccountInfo, 'counterAccountName', 'counterAccountCode')
      // },
      {
        name: 'tradeStatus',
        label: '交易状态',
        type: 'Select',
        props: {
          placeholder: '请选择交易状态',
          getDics: 1030302,
          allowClear: true
        }
      },
      {
        name: 'dealMatchingStatus',
        label: '成交匹配状态',
        type: 'Select',
        props: {
          placeholder: '请选择成交匹配状态',
          getDics: 1030111,
          allowClear: true
        }
      },

      {
        name: 'tradeDate',
        label: '交易日期',
        type: 'RangePicker',
        props: {
          placeholder: '请选择交易日期',
          allowClear: true
        }
      },

      {
        name: 'settlementDate',
        label: '结算日期',
        type: 'RangePicker',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true
        }
      }
      // {
      //   name: 'createTime',
      //   label: '确认时间',
      //   type: 'RangePicker',
      //   props: {
      //     placeholder: '请选择确认时间',
      //     allowClear: true
      //   }
      // }
    ];

    const ButtonType = [
      {
        name: '新增',
        roule: true,
        func: () => {
          this.setState({ addVisible: true });
        }
      },
      {
        name: '交易指令状态录入',
        roule: true,
        func: this.pushSettlementStatus
      },
      {
        name: '导出',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportFilePage(true);
            }
          },
          {
            name: '导出当前页',
            func: () => {
              this.exportFilePage(false);
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
      total: instructionTable.total,
      pageSize: instructionQueryForm.reqPageSize,
      current: instructionQueryForm.reqPageNum,
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <Fragment>
        <section>
          <Container>
            <div style={{ position: 'relative' }}>
              <SearchForm
                labelSize="6em"
                lineOf={3}
                formItem={SearchformItem}
                refs={ref => (this.searchForm = ref)}
                handleSearch={value => {
                  this.query(value);
                }}
                moreTypeModal
                moreFullSearch={true}
                handleBeforeReset={() => true}
                handleReset={() => {
                  const { instructionQueryForm } = this.props;
                  this.props.toResetSearch({
                    type: 'settleInstructManage',
                    queryElement: {
                      reqPageSize: instructionQueryForm.reqPageSize,
                      reqPageNum: instructionQueryForm.reqPageNum
                    }
                  });
                }}
              />
            </div>
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              // expandedRowRender={row => instructionRowRender(this.props, row)}
              expandedRowRender={row => {
                return <InstructionRowRender {...this.props} row={row} />;
              }}
              onRow={record => {
                return {
                  onClick: event => {
                    setTimeout(() => {
                      toInitTab(active, record.bizCategory); //点击时初始化一下关联信息Tab
                      this.changeAbout(event, record);
                    }, 300);
                  }
                };
              }}
              {...setTableInfo({
                rowKey: 'id',
                columns: col,
                dataSource: data,
                cloumsCode,
                rowSelection,
                pagination,
                height: this.props.tableHight
              })}
            />
            {this.state.visible ? (
              <InstructionSettlementStatus
                {...this.props}
                {...this.state}
                close={this.close}
                toEmptySelect={this.toEmptySelect}
              />
            ) : null}
            {this.state.addVisible ? (
              <CashSaleFormSplit {...this.props} {...this.state} close={this.close} />
            ) : null}
          </Container>
        </section>
      </Fragment>
    );
  }

  /**查询* */
  query = value => {
    const { asyncHttpSqDebtList, changeQueryElement } = this.props;
    // 查询条件格式化
    let params = {
      ...value,
      tradeDateBegin:
        value.tradeDate && value.tradeDate.length > 0
          ? value.tradeDate[0].format('YYYY-MM-DD')
          : '',
      tradeDateEnd:
        value.tradeDate && value.tradeDate.length > 0
          ? value.tradeDate[1].format('YYYY-MM-DD')
          : '',
      settlementDateBegin:
        value.settlementDate && value.settlementDate.length > 0
          ? value.settlementDate[0].format('YYYY-MM-DD')
          : '',
      settlementDateEnd:
        value.settlementDate && value.settlementDate.length > 0
          ? value.settlementDate[1].format('YYYY-MM-DD')
          : '',
      createTimeBegin:
        value.createTime && value.createTime.length > 0
          ? value.createTime[0].format('YYYY-MM-DD')
          : '',
      createTimeEnd:
        value.createTime && value.createTime.length > 0
          ? value.createTime[0].format('YYYY-MM-DD')
          : '',
      reqPageNum: 1
    };
    delete params.tradeDate;
    delete params.settlementDate;
    delete params.createTime;
    changeQueryElement({ value: params });
    asyncHttpSqDebtList({});
    this.toEmptySelect();
  };
  // 分页查询
  searchPage = page => {
    const { changeQueryElement, asyncHttpSqDebtList } = this.props;
    changeQueryElement({ value: page });
    asyncHttpSqDebtList({});
    this.toEmptySelect();
  };

  /**点击指令切换切换关联 */
  changeAbout = (e, row) => {
    const {
      asyncHttpAboutZJInfo,
      asyncHttpAboutBZfo,
      asyncHttpAboutzlInfo,
      asyncHttpAboutAccont,
      asyncHttpAboutJSzlInfo,
      asyncHttpAboutLSInfo,
      changTableRow,
      active,
      clearAboutData
    } = this.props;
    changTableRow({ value: row });
    clearAboutData();
    let params = {
      ...row
    };
    const action = {
      1: asyncHttpAboutzlInfo, //结算指令详情
      2: asyncHttpAboutZJInfo, //债券明细
      3: asyncHttpAboutAccont, //资金明细
      4: asyncHttpAboutBZfo, //担保信息
      5: asyncHttpAboutLSInfo, //成交流水明细
      6: asyncHttpAboutJSzlInfo, //结算指令信息
      7: asyncHttpAboutZJInfo //质押券信息
    };
    action[active]({ params });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 导出
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { instructionQueryForm, instructionTable } = this.props;
    let total;
    if (type) {
      total = instructionTable.total;
    }
    exportFile(
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/export/condition',
      filterNullElement({ ...instructionQueryForm, includeFieldList: FieldList }),
      '上清所交易指令管理',
      type,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '上清所交易指令管理'
    );
    this.toEmptySelect();
  };

  //推送结算状态--展开弹窗
  pushSettlementStatus = () => {
    const { ids } = this.state;
    if (ids.length == 1) {
      this.setState({ visible: true });
    } else {
      message.error('请选择一条数据!');
    }
  };

  // 关闭弹窗
  close = () => {
    this.setState({ visible: false, addVisible: false });
  };
}
export default Instruction;
