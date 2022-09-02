// 指令管理
import React, { Component, Fragment } from 'react';
import { message, modal } from 'antd';
import moment from 'moment';
import UpdateStatusForm from './UpdateStatusForm'; //全额结算指令状态录入
import ManturityInstructionRender from './ManturityInstructionRender'; //数据子表
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  selectRequest,
  ConfigableTable,
  functionRolue,
  exportFile,
  exportSelectFile,
  filterNullElement,
  cloumsFunc
} from 'yss-biz';

class Instruction extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    expandTable: [],
    defInstructionStatus: '待确认',
    filterPrevDate: '',
    filterNextDate: '',
    selltefailList: [],
    FieldList: [],
    updateStatus: false
  };

  // async componentDidMount() {
  //   const {
  //     asyncHttpGetmaturityFullInstructionPageList,
  //     toResetSearch
  //   } = this.props;
  //   toResetSearch({
  //     type: 'manturityInstruction',
  //     queryElement: {}
  //   });
  //   await asyncHttpGetmaturityFullInstructionPageList({});
  // }

  query(values) {
    let params = {
      ...values,
      settlementDate_begin:
        values.settleDate && values.settleDate.length > 0
          ? values.settleDate[0].format('YYYY-MM-DD')
          : '',
      settlementDate_end:
        values.settleDate && values.settleDate.length > 0
          ? values.settleDate[1].format('YYYY-MM-DD')
          : ''
    };
    delete params.settleDate;
    this.props.changeQueryElement({
      value: { ...params, reqPageNum: 1 }
    });
    this.props.asyncHttpGetmaturityFullInstructionPageList();
    this.toEmptySelect();
  }

  /***分页查询*/
  searchPage = pages => {
    const { changeQueryElement } = this.props;
    changeQueryElement && changeQueryElement({ value: pages });
    this.props.asyncHttpGetmaturityFullInstructionPageList();
  };

  render() {
    const {
      manturitySettleTable,
      toResetSearch,
      changeQueryElement,
      expireSettleQueryForm,
      currentTradeDate,
      businessTypes,
      tradeDirection
    } = this.props;
    const { columns, data } = manturitySettleTable;

    const me = this;

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'settlementOrderCode',
        label: '结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入指令编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({
              value: { settlementOrderCode: e.target.value }
            });
          }
        }
      },
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          allowClear: true,
          placeholder: '请输入成交编号'
        }
      },
      {
        name: 'settleDate',
        label: '到期结算日期',
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
        name: 'consignorCode',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          configDics: selectRequest,
          dropdownWidth: 250,
          type: 'consignor',
          onChange(value) {
            changeQueryElement({ value: { consignorCode: value } });
          }
        }
      },
      {
        name: 'maturityConfirmStatus',
        label: '到期确认状态',
        type: 'Select',
        props: {
          placeholder: '请选择到期确认状态',
          // initialValue: '6',
          getDics: 1050009,
          onChange(value) {
            changeQueryElement({
              value: { maturityConfirmStatus: value }
            });
          }
        }
      },

      {
        name: 'ourTradeStatus',
        label: '本方状态',
        type: 'Select',
        props: {
          placeholder: '请选择本方状态',
          getDics: 1030303
        }
      },
      {
        name: 'offsetTradeStatus',
        label: '对手方状态',
        type: 'Select',
        props: {
          getDics: 1030303,
          placeholder: '请选择对手方状态'
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
          // getDics: 1030124,
          allowClear: true
        },
        options: tradeDirection
      },
      {
        name: 'systemContractStatus',
        label: '系统交割状态',
        type: 'Select',
        props: {
          getDics: 1030109,
          placeholder: '请选择系统交割状态'
        }
      }
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
        name: '结算确认',
        roule: 'true',
        icon: 'issues-close',
        func: () => {
          let data = this.state.ids;
          let arr = ['1', '2', '6'];
          let params = [];
          if (data.length > 0) {
            let flag = true;
            for (let n of data) {
              if (
                arr.includes(n.maturityConfirmStatus) ||
                (n.maturityConfirmStatus == '0' && n.systemContractStatus == '18') ||
                n.systemContractStatus == '20'
              ) {
                params.push(n.id);
              } else {
                flag = false;
                break;
              }
            }
            if (flag) {
              this.props
                .asyncHttpSetBatchConfirmFullInstruction(params)
                .then(() => this.toEmptySelect());
            } else {
              modal.info({
                title: '符合以下条件的数据才能做手工结算确认, 请重新选择',
                content: (
                  <div>
                    ● 到期确认指令状态为 “划款未成功”、“头寸锁定失败”、“待向上清所确认”
                    <br />
                    ● 到期确认状态为 “--” 且系统交割状态为 “到期头寸混用”
                    <br />
                    ● 系统交割状态为 “合同成功,到期结算确认失败”
                    <br />
                  </div>
                ),
                width: 600,
                onOk: () => {
                  this.toEmptySelect();
                }
              });
            }
          } else {
            message.error('未选中数据源');
          }
        }
      },
      {
        name: '重新报送',
        roule: 'true',
        icon: 'rollback',
        func: () => {
          let data = this.state.ids;
          let arr = [];
          if (data.length > 0) {
            data.forEach(n => {
              if (n.maturityConfirmStatus == 5) {
                arr.push(n.id);
              }
            });
            if (arr.length == data.length) {
              this.props
                .asyncHttpReSetBatchConfirmFullInstruction(arr)
                .then(() => this.toEmptySelect());
            } else {
              modal.info({
                title: '符合以下条件的数据才能做重新报送, 请重新选择',
                content: <div>● 到期确认指令状态为 “已报”</div>,
                width: 600,
                onOk: () => {
                  this.toEmptySelect();
                }
              });
            }
          } else {
            message.error('未选中数据源');
          }
        }
      },
      {
        name: '回退',
        roule: 'true',
        icon: 'rollback',
        func: () => {
          let data = this.state.ids;
          let arr = [];
          if (data.length > 0) {
            data.forEach(n => {
              if (n.maturityConfirmStatus == 7 || n.systemContractStatus == 17) {
                arr.push(n.id);
              }
            });
            if (arr.length == data.length) {
              this.props
                .asyncHttpSetBatchFallBackFullInstruction(arr)
                .then(() => this.toEmptySelect());
            } else {
              modal.info({
                title: '符合以下一个条件的数据才能做回退, 请重新选择',
                content: (
                  <div>
                    ● 到期确认指令状态为 “报送失败、回退失败”
                    <br />
                    ● 系统交割状态为 “合同失败,回退失败”
                    <br />
                  </div>
                ),
                width: 600,
                onOk: () => {
                  this.toEmptySelect();
                }
              });
            }
          } else {
            message.error('未选中数据源');
          }
        }
      },
      {
        name: '手动交割',
        roule: 'true',
        icon: 'audit',
        func: () => {
          let arr = [];
          let data = this.state.ids;
          if (this.state.ids.length < 1) {
            message.error('请选择需要手动交割的数据');
            return;
          }
          data.forEach(item => {
            if (item.systemContractStatus == 0) {
              arr.push(item.id);
            }
          });
          if (arr.length == data.length) {
            this.props.asyncHttpMaturityFullInstructionDelivery(arr).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('请选择系统交割状态为交割失败的数据');
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
            func: this.exportFileAll
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
    /**设置分页 */
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: total => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: expireSettleQueryForm.reqPageSize,
      current: expireSettleQueryForm.reqPageNum,
      total: manturitySettleTable.dataTotal
    };
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    /**表中表**/
    return (
      <Fragment>
        <div style={{ marginTop: '10px' }}></div>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={values => {
            this.query(values);
          }}
          moreTypeModal
          moreFullSearch
          handleBeforeReset={() => true}
          handleReset={() => {
            toResetSearch({
              queryElement: {}
            });
          }}
        />
        <div className="marBotton">{withRoleBotton(ButtonType, this.props.btnAuth)}</div>
        <ConfigableTable
          onRow={record => {
            return {
              onClick: event => {
                setTimeout(() => {
                  this.changeAbout(event, record);
                }, 300);
              }
            };
          }}
          {...setTableInfo({
            rowKey: 'id',
            cloumsCode,
            className: 'yss-configable-table stripe-table',
            columns: setColumns(columns),
            dataSource: data,
            height: this.props.tableHight,
            rowSelection: rowSelectionFunc.call(this),
            pagination: pagination
          })}
          expandedRowRender={row => {
            return <ManturityInstructionRender {...this.props} row={row} />;
          }}
        />
        {this.state.updateStatus ? (
          <UpdateStatusForm
            {...this.props}
            {...this.state}
            close={this.close}
            type="manturityInstruction"
          />
        ) : null}
      </Fragment>
    );
  }

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /**点击指令切换切换关联 */
  changeAbout = (e, row) => {
    const { changTableRow, asyncHttpAboutQuery, clearAboutData } = this.props;
    clearAboutData();
    changTableRow({ value: row });
    asyncHttpAboutQuery();
  };

  // 导出全部
  exportFileAll = () => {
    const { FieldList } = this.state;
    const { expireSettleQueryForm, manturitySettleTable } = this.props;
    exportFile(
      '/bmtp-clearingorg-manage/shclearing/fullInstruction/export/condition',
      filterNullElement({
        ...expireSettleQueryForm,
        fullOrderType: 1,
        includeFieldList: this.dealPathField(FieldList)
      }),
      '到期结算确认导出全部',
      true,
      manturitySettleTable.dataTotal,
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/export/getExportInfoByExecuteID'
    );
  };

  // 导出当前页
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { expireSettleQueryForm } = this.props;
    exportFile(
      '/bmtp-clearingorg-manage/shclearing/fullInstruction/export/condition',
      filterNullElement({
        ...expireSettleQueryForm,
        fullOrderType: 1,
        includeFieldList: this.dealPathField(FieldList)
      }),
      '到期结算确认导出当前项',
      false
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList } = this.state;
    let params = [];
    if (!this.state.ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    this.state.ids.map(item => {
      params.push(item.id);
    });

    exportSelectFile(
      '/bmtp-clearingorg-manage/shclearing/fullInstruction/export/selected',
      { includeFieldList: this.dealPathField(FieldList), selectList: params },
      '到期结算确认导出选择项',
      true
    );
    this.toEmptySelect();
  };

  /**处理导出文件参数, 将字段路径格式的最终字段提取出来 */
  dealPathField = FieldList => {
    return FieldList.map(item => {
      if (Array.isArray(item)) {
        return item[item.length - 1];
      }
      return item;
    });
  };

  // 关闭弹窗
  close = () => {
    this.setState({ visible: false, updateStatus: false });
  };
}
export default Instruction;
