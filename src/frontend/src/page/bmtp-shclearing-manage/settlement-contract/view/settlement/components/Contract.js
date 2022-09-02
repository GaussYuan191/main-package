// 合同管理
import React, { Component, Fragment } from 'react';
import ContractRowRender from './ContractRowRender';
import { Icon, message } from 'antd';
import {
  withRoleBotton,
  setColumns,
  setTableInfo,
  SearchForm,
  filterNullElement,
  ConfigableTable,
  rowSelectionFunc,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
const { mapOption } = SearchForm;

class Contract extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    FieldList: []
  };

  sendData = () => {
    const { asyncHttpAxiosSend } = this.props;
    const { ids } = this.state;
    if (ids && ids.length) {
      for (let n of ids) {
        if (n.sysStatus != 7) {
          message.error('只有系统合同状态为‘交割成功’的数据才能生成台账');
          return;
        }
      }
      let params = ids.map(item => {
        let obj = {};
        obj.bizCategory = item.bizCategory;
        obj.execCode = item.execCode;
        return obj;
      });
      asyncHttpAxiosSend(params).then(() => {
        this.toEmptySelect();
      });
    } else {
      message.error('请选择数据');
    }
  };

  render() {
    const {
      contractTable,
      asyncHttpManualDelivery,
      contractQueryForm,
      toResetSearch,
      // jshtCounterAccount,
      changeQueryElement,
      toInitTab,
      active
    } = this.props;

    const { columns, data, total } = contractTable;
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    // let col = setColumns(columns);
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
            changeQueryElement({ type: 'contractManage', value: { consignorCode: value } });
          }
        }
      },
      {
        name: 'contractId',
        label: '结算合同编号',
        type: 'Input',
        props: {
          placeholder: '请输入结算合同编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({ type: 'contractManage', value: { contractId: e.target.value } });
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
            changeQueryElement({ type: 'contractManage', value: { instrId: e.target.value } });
          }
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true
        }
      },
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
        name: 'sysStatus',
        label: '系统交割状态',
        type: 'Select',
        props: {
          placeholder: '请选择系统交割状态',
          getDics: 1030109,
          allowClear: true
        }
      },
      {
        name: 'contractStatus',
        label: '合同处理状态',
        type: 'Select',
        props: {
          placeholder: '请选择合同处理状态',
          getDics: 1030510,
          allowClear: true
        }
      },
      {
        name: 'bondStatus',
        label: '合同债券状态',
        type: 'Select',
        props: {
          placeholder: '请选择合同债券状态',
          getDics: 1030513,
          allowClear: true
        }
      },
      {
        name: 'amountStatus',
        label: '合同金额状态',
        type: 'Select',
        props: {
          placeholder: '请选择合同金额状态',
          getDics: 1030515,
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
        // options: mapOption(jshtCounterAccount, 'counterAccountName', 'counterAccountCode')
      },

      {
        name: 'settleType',
        label: '结算方式',
        type: 'Select',
        props: {
          placeholder: '结算方式',
          getDics: 1030512,
          allowClear: true
        }
      },

      // {
      //   name: 'instructDate',
      //   label: '确认时间',
      //   type: 'RangePicker',
      //   props: {
      //     placeholder: '请选择确认时间',
      //     allowClear: true
      //   }
      // },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'RangePicker',
        props: {
          placeholder: '请输入结算日期',
          allowClear: true
        }
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
      pageSize: contractQueryForm.reqPageSize,
      current: contractQueryForm.reqPageNum,
      total: total
    };

    const ButtonType = [
      {
        name: '生成台账',
        roule: 'true',
        func: this.sendData
      },
      {
        name: '手动交割',
        roule: 'true',
        func: () => {
          //sysStatus == 0
          let arr = [];
          // isOk = true;
          if (this.state.ids.length < 1) {
            message.error('请选择需要手动交割的数据');
            return;
          } else if (this.state.ids.length > 1) {
            message.error('仅支持单一数据手动交割');
            return;
          }

          this.state.ids.map(item => {
            if (item.sysStatus == 0) {
              arr.push(item);
            }
          });

          if (arr.length > 0) {
            asyncHttpManualDelivery(arr[0]).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('请选择系统合同状态为交割失败的数据');
            return;
          }
        }
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
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this, this.handleRowSelect);

    return (
      <Fragment>
        <div style={{ marginTop: '8px' }}></div>
        <section>
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
              const { contractQueryForm } = this.props;
              toResetSearch({
                type: 'contractManage',
                queryElement: {
                  reqPageSize: contractQueryForm.reqPageSize,
                  reqPageNum: contractQueryForm.reqPageNum
                }
              });
            }}
          />

          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
            {...setTableInfo({
              rowKey: 'id',
              className: 'yss-configable-table stripe-table',
              columns: [...setColumns(columns)],
              height: this.props.tableHight,
              dataSource: data,
              cloumsCode,
              expandedRowRender: row => {
                return <ContractRowRender {...this.props} row={row} />;
              },
              rowSelection: rowSelection,
              pagination: pagination,
              expandIcon: props => {
                if (props.expanded) {
                  return <Icon type="folder-open" onClick={e => props.onExpand(props.record, e)} />;
                } else {
                  return <Icon type="folder" onClick={e => props.onExpand(props.record, e)} />;
                }
              }
            })}
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
          />
        </section>
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
  /**查询* */
  query = value => {
    const { asyncHttpQueryZJDList, changeQueryElement } = this.props;
    // 查询条件格式化
    let params = {
      ...value,
      // instructStartDate:
      //   value.instructDate && value.instructDate.length > 0
      //     ? value.instructDate[0].format('YYYY-MM-DD')
      //     : '',
      // instructEndDate:
      //   value.instructDate && value.instructDate.length > 0
      //     ? value.instructDate[1].format('YYYY-MM-DD')
      //     : '',
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
    // delete params.instructDate;
    delete params.settleDate;
    changeQueryElement({ type: 'contractManage', value: params });

    asyncHttpQueryZJDList({ type: 'contractManage' });
    this.toEmptySelect();
  };
  // 分页查询
  searchPage = page => {
    const { changeQueryElement, asyncHttpQueryZJDList } = this.props;
    changeQueryElement({ type: 'contractManage', value: page });
    asyncHttpQueryZJDList({
      type: 'contractManage'
    });
    this.toEmptySelect();
  };

  handleRowSelect = row => {
    const { selectRows } = this.props;
    let rows = Array.isArray(row) ? row.map(item => item) : [row];
    this.props.setRowChecked([...selectRows, ...rows]);
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
    const { contractQueryForm, contractTable } = this.props;
    let total;
    if (type) {
      total = contractTable.total;
    }
    exportFile(
      '/bmtp-clearingorg-manage/dim/settle/contractManage/export/condition',
      filterNullElement({ ...contractQueryForm, includeFieldList: FieldList }),
      '中债登合同管理',
      type,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-clearingorg-manage/dim/settle/contractManage/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '中债登合同管理'
    );
    this.toEmptySelect();
  };
}
export default Contract;
