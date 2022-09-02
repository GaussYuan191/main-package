// 指令管理
import React, { Component, Fragment } from 'react';
import InstructionRowRender from './InstructionRowRender';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  ConfigableTable,
  filterNullElement,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  rowSelectionFunc,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import { message } from 'antd';
import InstructionSettlementStatus from './InstructionSettlementStatus';
const { mapOption } = SearchForm;

class Instruction extends Component {
  state = {
    ids: [],
    expandTable: [],
    visible: false,
    FieldList: []
  };

  render() {
    const {
      instructionTable,
      changeQueryElement,
      toResetSearch,
      instructionQueryForm,
      // jszlCounterAccount,
      toInitTab,
      active
    } = this.props;

    const { columns, data, total } = instructionTable;

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
          configDics: selectPageRequest,
          onChange(value) {
            changeQueryElement({ type: 'instructManage', value: { consignorCode: value } });
          }
        }
      },

      {
        name: 'instrId',
        label: '结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入结算指令编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({ type: 'instructManage', value: { instrId: e.target.value } });
          }
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({ type: 'instructManage', value: { execCode: e.target.value } });
          }
        }
      },

      // {
      //   name: 'bondCode',
      //   label: '证券代码',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择证券代码',
      //     allowClear: true,
      //     type: 'bond',
      //     config: selectRequest
      //   }
      // },

      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          placeholder: '请选择业务品种',
          getDics: 1030507,
          allowClear: true
        }
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
      {
        name: 'settleType',
        label: '结算方式/首期结算方式',
        type: 'Select',
        props: {
          placeholder: '请选择结算方式/首期结算方式',
          getDics: 1030512,
          allowClear: true
        }
      },
      {
        name: 'instructStatus',
        label: '指令状态',
        type: 'Select',
        props: {
          getDics: 1030508,
          placeholder: '请选择指令状态',
          allowClear: true
        }
      },

      {
        name: 'execMatchStatus',
        label: '成交匹配状态',
        type: 'Select',
        props: {
          placeholder: '请选择成交匹配状态',
          getDics: 1030111,
          allowClear: true
        }
      },
      {
        name: 'counterAccountCode',
        label: '对手方账户',
        type: 'Input',
        props: {
          placeholder: '请输入对手方账号',
          allowClear: true
        },
        // options: mapOption(jszlCounterAccount, 'counterAccountName', 'counterAccountCode')
      },
      {
        name: 'counterStatus',
        label: '对手方状态',
        type: 'Select',
        props: {
          placeholder: '请选择对手方状态',
          getDics: 1030505,
          allowClear: true
        }
      },
      {
        name: 'instrDate',
        label: '指令日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择指令日期',
          allowClear: true
        }
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'RangePicker',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true
        }
      }
    ];

    const ButtonType = [
      {
        name: '推送结算状态',
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
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: instructionQueryForm.reqPageSize,
      current: instructionQueryForm.reqPageNum,
      total: total
    };

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <Fragment>
        <div style={{ marginTop: '8px' }}></div>
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
          handleReset={() => {
            const { instructionQueryForm } = this.props;
            toResetSearch({
              type: 'instructManage',
              queryElement: {
                reqPageSize: instructionQueryForm.reqPageSize,
                reqPageNum: instructionQueryForm.reqPageNum
              }
            });
          }}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
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
          <InstructionSettlementStatus {...this.props} {...this.state} close={this.close} />
        ) : null}
      </Fragment>
    );
  }

  /**点击指令切换切换关联 */
  changeAbout = (e, row) => {
    const {
      asyncHttpSearcAboutInfo,
      asyncHttpSearchAboutZJList,
      asyncHttpSearcAboutAccont,
      asyncHttpSearcAboutDBList,
      asyncHttpSearcAboutContractList,
      asyncHttpSearcAboutDealDetailedList,
      active,
      changTableRow
    } = this.props;
    changTableRow({ value: row });
    let params = {
      ...row
    };
    const action = {
      1: asyncHttpSearcAboutInfo, //结算指令详情
      2: asyncHttpSearchAboutZJList, //债券明细
      3: asyncHttpSearcAboutAccont, //资金明细
      4: asyncHttpSearcAboutDBList, //担保信息
      5: asyncHttpSearcAboutDealDetailedList, //成交流水明细
      6: asyncHttpSearcAboutContractList, //合同信息
      7: asyncHttpSearcAboutDBList //质押券信息
    };
    action[active]({ params });
  };
  /**查询* */
  query = value => {
    const { asyncHttpQueryZJDList, changeQueryElement } = this.props;
    // 查询条件格式化
    let params = {
      ...value,
      instrDate: value.instrDate ? value.instrDate.format('YYYY-MM-DD') : '',
      settleStartDate:
        value.settleDate && value.settleDate.length > 0
          ? value.settleDate[0].format('YYYY-MM-DD')
          : '',
      settleEndDate:
        value.settleDate && value.settleDate.length > 0
          ? value.settleDate[1].format('YYYY-MM-DD')
          : '',
      reqPageNum: 1
    };
    delete params.settleDate;
    changeQueryElement({ type: 'instructManage', value: params });

    asyncHttpQueryZJDList({
      type: 'instructManage'
    });
    this.toEmptySelect();
  };
  // 分页查询
  searchPage = page => {
    const { changeQueryElement, asyncHttpQueryZJDList } = this.props;
    changeQueryElement({ type: 'instructManage', value: page });
    asyncHttpQueryZJDList({
      type: 'instructManage'
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

  // 导出
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { instructionQueryForm, instructionTable } = this.props;
    let total;
    if (type) {
      total = instructionTable.total;
    }
    exportFile(
      '/bmtp-clearingorg-manage/dim/settle/instructManage/export/condition',
      filterNullElement({ ...instructionQueryForm, includeFieldList: FieldList }),
      '中债登结算指令管理',
      type,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-clearingorg-manage/dim/settle/instructManage/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '中债登结算指令管理'
    );
    this.toEmptySelect();
  };

  //推送结算状态--展开弹窗
  pushSettlementStatus = () => {
    const { ids } = this.state;
    if (ids.length == 1) {
      this.setState({ visible: true });
    } else {
      message.error('请选择且只能选择一条数据!');
    }
  };

  // 关闭弹窗
  close = () => {
    this.setState({ visible: false });
  };
}
export default Instruction;
