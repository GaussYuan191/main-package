// 合同管理
import React, { Component, Fragment } from 'react';
import CntractRowRender from './ContractRowRender';
import {
  withRoleBotton,
  setColumns,
  setTableInfo,
  SearchForm,
  ConfigableTable,
  selectRequest,
  selectPageRequest,
  rowSelectionFunc,
  PageBody,
  exportFile,
  exportSelectFile,
  filterNullElement,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import { message } from 'antd';
import moment from 'moment';
import ContractFormAdd from './ContractFormAdd';
import UpdateStatusForm from './UpdateStatusForm';
const { Container } = PageBody;
class Contract extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    updateStatus: false,
    FieldList: []
  };

  //生成台账
  sendData = () => {
    const { asyncHttpAxiosSend, selectRows, setRowChecked } = this.props;
    if (selectRows && selectRows.length) {
      //只过滤出交割成功的才可以生成台账
      const data = selectRows.filter(item => {
        if (item.systemContractStatus === '7') {
          return item;
        }
      });
      let params;
      if (data && data.length) {
        if (data.some(item => item.bizCategory === '1')) {
          // 现券买卖业务类型不能生成台账
          message.error('现券买卖业务不能生成台账数据，请重新选择');
          return;
        }
        params = data.map(item => {
          let obj = {};
          //网上分销只传合同编号
          if (item.bizCategory === '4') {
            obj.bizCategory = item.bizCategory;
            obj.execCode = item.settlementOrderCode;
            return obj;
          } else {
            obj.bizCategory = item.bizCategory;
            obj.execCode = item.srcTradeId;
            return obj;
          }
        });
      } else {
        //说明只选择聊交割失败的数据，提示信息
        message.error('请选择系统交割状态为交割成功的数据生成台账');
        return;
      }
      asyncHttpAxiosSend(params).then(() => {
        setRowChecked([]);
        this.toEmptySelect();
      });
    } else {
      message.error('请选择一条记录');
    }
  };

  render() {
    const {
      contractTable,
      toResetSearch,
      contractQueryForm,
      asyncHttpManualDelivery,
      // changeQueryElement,
      active,
      toInitTab,
      businessTypes,
      currentTradeDate
    } = this.props;

    const { columns, data, total } = contractTable;

    const me = this;

    const col = setColumns(columns);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'settlementOrderCode',
        label: '结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入结算指令编号',
          allowClear: true
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
        name: 'settlementDate',
        label: '结算日期',
        type: 'RangePicker',
        itemSize: '250px',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true,
          initialValue: currentTradeDate
            ? [moment(currentTradeDate), moment(currentTradeDate)]
            : '',
          onCalendarChange(value) {
            if (value.length == 1) {
              me.setState({
                filterPrevDate: value[0].format('YYYY-MM-DD'),
                filterNextDate: value[0].format('YYYY-MM-DD')
              });
            }
          }
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
          placeholder: '请输入交易方向',
          getDics: 1030124,
          allowClear: true
        }
      },
      {
        name: 'consignorCode',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          type: 'consignor',
          configDics: selectPageRequest
        }
      },
      {
        name: 'grossOrderStatus',
        label: '全额结算指令状态',
        type: 'Select',
        props: {
          placeholder: '请选择全额结算指令状态',
          getDics: 1030311,
          allowClear: true
        }
      },
      {
        name: 'systemContractStatus',
        label: '系统交割状态',
        type: 'Select',
        props: {
          placeholder: '请选择系统交割状态',
          getDics: 1030109,
          allowClear: true
        }
      }
      // {
      //   name: 'settlementDate',
      //   label: '结算日期',
      //   type: 'RangePicker',
      //   props: {
      //     placeholder: '请选择结算日期',
      //     allowClear: true
      //   }
      // }
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
        name: '全额结算指令状态录入',
        roule: true,
        func: () => {
          this.setState({ updateStatus: true });
        }
      },
      {
        name: '查询全额结算指令',
        roule: true,
        func: () => {
          this.props.openQueryInstructionModal();
        }
      },
      {
        name: '回退',
        roule: true,
        func: () => {
          let data = this.state.ids;
          let arr = [];
          if (data.length > 0) {
            data.forEach(n => {
              if (n.systemContractStatus == 17) {
                let param = {
                  srcTradeId: n.srcTradeId,
                  systemContractStatus: n.systemContractStatus,
                  tradeId: n.tradeId,
                  fullOrderType: n.fullOrderType,
                  settlementOrderCode: n.settlementOrderCode
                };
                arr.push(param);
              }
            });
            if (arr.length == data.length) {
              this.props.asyncHttpFallBackFullInstruct(arr).then(() => this.toEmptySelect());
            } else {
              message.error('系统交割状态为 “合同失败、回退失败”  才能回退');
              return;
            }
          } else {
            message.error('未选中数据源');
          }
        }
      },
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
            if (item.systemContractStatus == 0) {
              arr.push(item);
            }
          });

          if (arr.length > 0) {
            const params = {
              id: arr[0].id,
              settlementOrderCode: arr[0].settlementOrderCode,
              fullOrderType: arr[0].fullOrderType
            };
            asyncHttpManualDelivery(params).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('请选择系统交割状态为交割失败的数据');
            return;
          }
        }
      },
      // {
      //   name: '新增全额结算指令',
      //   roule: true,
      //   func: () => {
      //     this.setState({ visible: true });
      //   }
      // },
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
      total: total,
      pageSize: contractQueryForm.reqPageSize,
      current: contractQueryForm.reqPageNum,
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
    let rowSelection = rowSelectionFunc.call(this, this.handleRowSelect);

    return (
      <Fragment>
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
                const { contractQueryForm } = this.props;
                toResetSearch({
                  type: 'contractQueryForm',
                  queryElement: {
                    reqPageSize: contractQueryForm.reqPageSize,
                    reqPageNum: contractQueryForm.reqPageNum
                  }
                });
              }}
            />
          </div>

          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
            expandedRowRender={row => {
              return <CntractRowRender {...this.props} row={row} />;
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
              rowSelection: rowSelection,
              pagination,
              height: this.props.tableHight
            })}
          />
          {this.state.visible ? (
            <ContractFormAdd {...this.props} {...this.state} close={this.close} />
          ) : null}
          {this.state.updateStatus ? (
            <UpdateStatusForm {...this.props} {...this.state} close={this.close} type="contract" />
          ) : null}
        </Container>
      </Fragment>
    );
  }
  /**查询* */
  query = value => {
    const { asyncHttpSqDebtList, changeQueryElement } = this.props;
    // 查询条件格式化
    let params = {
      ...value,
      settlementDate_begin:
        value.settlementDate && value.settlementDate.length > 0
          ? value.settlementDate[0].format('YYYY-MM-DD')
          : '',
      settlementDate_end:
        value.settlementDate && value.settlementDate.length > 0
          ? value.settlementDate[1].format('YYYY-MM-DD')
          : '',
      // createTime_begin:
      //   value.createTime && value.createTime.length > 0
      //     ? value.createTime[0].format('YYYY-MM-DD')
      //     : '',
      // createTime_end:
      //   value.createTime && value.createTime.length > 0
      //     ? value.createTime[1].format('YYYY-MM-DD')
      //     : ''
      reqPageNum: 1
    };
    delete params.settlementDate;
    // delete params.createTime;

    changeQueryElement({ type: 'fullInstruction', value: params });

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

  handleRowSelect = row => {
    let rows = Array.isArray(row) ? row.map(item => item) : [row];
    const rowsArr = this.unique(rows, 'id');
    this.props.setRowChecked(rowsArr);
  };

  /**
   * @description 去除数组中的重复对象或元素
   * @param {Array} array
   */
  unique = (array, dataIndex) => {
    var tempArr = [];
    for (var i = 0; i < array.length; i++) {
      if (i == 0) tempArr.push(array[i]);
      let b = false;
      if (tempArr.length > 0 && i > 0) {
        for (var j = 0; j < tempArr.length; j++) {
          if (tempArr[j][dataIndex] == array[i][dataIndex]) {
            b = true;
            //break;
          }
        }
        if (!b) {
          tempArr.push(array[i]);
        }
      }
    }
    return tempArr;
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
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
      active
    } = this.props;
    /**分页查询*/

    changTableRow({ value: row });
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
      7: asyncHttpAboutBZfo //质押券信息
    };
    action[active]({ params });
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
      '/bmtp-clearingorg-manage/shclearing/fullInstruction/export/condition',
      filterNullElement({ ...contractQueryForm, includeFieldList: FieldList }),
      '全额结算指令管理',
      type,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-clearingorg-manage/shclearing/fullInstruction/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '全额结算指令管理'
    );
    this.toEmptySelect();
  };

  // 关闭弹窗
  close = () => {
    this.setState({ visible: false, updateStatus: false });
  };
}
export default Contract;
