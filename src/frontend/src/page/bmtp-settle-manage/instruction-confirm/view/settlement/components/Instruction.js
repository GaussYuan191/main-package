// 上清所指令管理
import React, { Component, Fragment } from 'react';
import { modal, message } from 'antd';
import InstructionRowRender from './InstructionRowRender';
import BatchFailModal from './BatchFailModal';
import InfoFormRule from './InfoFormRule';
import HandleMatchModal from './HandleMatchModal';
import moment from 'moment';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  Modal,
  rowSelectionFunc,
  selectPageRequest,
  setRowColor,
  ConfigableTable,
  functionRolue,
  exportFile,
  exportSelectFile,
  filterNullElement,
  cloumsFunc
} from 'yss-biz';
const { confirm } = modal;

class Instruction extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    expandTable: [],
    filterPrevDate: '',
    filterNextDate: '',
    selltefailList: [],
    FieldList: []
  };

  async componentDidMount() {
    const { asyncHttpGetPendingConfirmInstruction, asyncHttpCurrentTradingDay, toResetSearch } =
      this.props;
    await asyncHttpCurrentTradingDay();
    toResetSearch();
    await asyncHttpGetPendingConfirmInstruction({ type: 'SQS' });
  }

  query(values) {
    let params = {
      ...values,
      settleBeginDate:
        values.settleDate && values.settleDate.length > 0
          ? values.settleDate[0].format('YYYY-MM-DD')
          : '',
      settleEndDate:
        values.settleDate && values.settleDate.length > 0
          ? values.settleDate[1].format('YYYY-MM-DD')
          : ''
    };
    delete params.settleDate;
    this.props.setInstructionQueryForm(params);
    this.props.setPageQueryParam({ reqPageNum: 1 });
    this.props.asyncHttpGetPendingConfirmInstruction({ type: 'SQS' });
    this.toEmptySelect();
  }

  /***分页查询*/
  searchPage = pages => {
    const { setPageQueryParam } = this.props;
    setPageQueryParam && setPageQueryParam(pages);
    this.props.asyncHttpGetPendingConfirmInstruction({ type: 'SQS' });
  };

  handleRowSelect = row => {
    this.props.setSelectRow([]);
    row = Array.isArray(row) ? row : [row];
    this.props.setSelectRow(row);
  };
  render() {
    const {
      instructionTable,
      isOpenFormModal,
      openFormModal,
      toResetSearch,
      // setInstructionQueryForm,
      pageReqParm,
      currentTradeDate
    } = this.props;

    const { columns, data } = instructionTable;

    const me = this;

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'instructionId',
        label: '结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入指令编号'
        }
      },
      {
        name: 'systemInstructionStatus',
        label: '系统指令状态',
        type: 'Select',
        props: {
          placeholder: '请选择指令状态',
          // initialValue: '3',
          getDics: 1030110
        }
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'RangePicker',
        itemSize: '250px',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true,
          disabledDate: current => {
            if (me.state.filterPrevDate) {
              return (
                current < moment(me.state.filterPrevDate).subtract(31, 'days').startOf('day') ||
                current > moment(me.state.filterNextDate).add(31, 'days').startOf('day')
              );
            } else {
              return false;
            }
          },
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
        name: 'consignorCode',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          type: 'consignor'
        }
      },
      {
        name: 'execCode',
        label: '源成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入源成交编号'
        }
      },

      {
        name: 'execMatchStatus',
        label: '成交匹配状态',
        type: 'Select',
        props: {
          placeholder: '请选择成交匹配状态',
          getDics: 1030111
        }
      },
      {
        name: 'ownStatus',
        label: '本方状态',
        type: 'Select',
        props: {
          placeholder: '请选择本方状态',
          getDics: 1030303
        }
      },

      {
        name: 'counterPartyStatus',
        label: '对手方状态',
        type: 'Select',
        props: {
          placeholder: '请选择对手方状态',
          getDics: 1030303
        }
      }
    ];

    const ButtonType = [
      {
        name: '结算确认',
        roule: 'true',
        icon: 'issues-close',
        func: () => {
          let data = this.props.instructionTable.modalData;
          let arr = ['1', '2', '3'];
          if (data.length > 0) {
            let flag = false;
            for (let n of data) {
              if (arr.indexOf(n.systemLocalcurrencyStatus) == -1) {
                message.error(
                  '系统指令状态为 “匹配成功”、“资金汇入中”、“待向上清所确认” 才能做结算确认'
                );
                this.toEmptySelect();
                flag = true;
                break;
              }
              //  else if (n.execMatchStatus == 1) {
              //   message.error('未匹配的数据不能结算确认');
              //   flag = true;
              //   break;
              // }
            }
            !flag && openFormModal({ status: true, type: 'affirm' });
          } else {
            message.error('未选中数据源');
          }
        }
      },
      {
        name: '重新报送',
        roule: true,
        func: () => {
          const data = this.state.ids;
          if (!data.length) {
            message.error('未选中数据源');
            return;
          }
          let params = [];
          const flag = data.every(item => {
            params.push({
              instructionId: item.tradeId,
              systemInstructionStatus: item.systemLocalcurrencyStatus
            });
            return item.systemLocalcurrencyStatus == '5';
          });
          if (flag) {
            this.props.asyncHttpBatchSendInstruction(params).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('系统指令状态为“已报”才可重新报送,请重新选择');
            this.toEmptySelect();
          }
        }
      },
      {
        name: '回退',
        roule: 'true',
        icon: 'rollback',
        func: () => {
          const data = this.state.ids;
          if (data.length > 0) {
            this.props
              .asyncHttpSetBatchFallBackInstruction({ type: 'SQS', params: data })
              .then(() => this.toEmptySelect());
          } else {
            message.error('未选中数据源');
          }
        }
      },
      // {
      //   name: '拒绝',
      //   roule: false,
      //   func: this.refuse,
      //   icon: 'close-circle'
      // },
      {
        name: '自动匹配',
        roule: 'true',
        icon: 'highlight',
        func: () => {
          const { ids } = this.state;
          let dataList = ids;
          let params = [];
          for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].dealMatchingStatus == 2) {
              break;
            }
            params.push(dataList[i].tradeId);
          }
          if (params.length !== dataList.length) {
            message.error('成交匹配状态为匹配失败或未匹配才能自动匹配');
            return;
          }
          this.props.asyncHttpGetMatchInstruction({ type: 'SQS', params: params }).then(() => {
            this.toEmptySelect();
          });
        }
      },
      {
        name: '手工匹配',
        roule: 'true',
        icon: 'highlight',
        func: () => {
          const { ids } = this.state;
          let dataList = ids;
          if (dataList.length > 1) {
            message.error('只能选择一条数据');
            this.toEmptySelect();
          } else if (dataList.length < 1) {
            message.error('请勾选一条数据');
          } else {
            let { bizCategory, dealMatchingStatus } = dataList[0];
            if (bizCategory == '4' && dealMatchingStatus !== '2') {
              let params = {
                bondCode: dataList[0].bondCode,
                settleType: dataList[0].settlementType,
                settleAmount: dataList[0].settlementValue,
                faceValue: dataList[0].faceValue,
                settleDate: dataList[0].settlementDate,
                reqPageNum: 1,
                reqPageSize: 20
              };
              let tradeId = dataList[0].tradeId;
              this.props.asyncHttpGetHandleMatchInstruction({ params, tradeId }).then(() => {
                openFormModal({ status: true, type: 'handleMatch' });
                this.toEmptySelect();
              });
            } else {
              message.error('只能选择成交匹配状态为未匹配成功的网上分销业务,请重新勾选');
              this.toEmptySelect();
            }
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
      pageSize: pageReqParm.reqPageSize,
      current: pageReqParm.reqPageNum,
      total: instructionTable.dataTotal
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
          moreFullSearch={true}
          handleBeforeReset={() => true}
          handleReset={toResetSearch}
        />
        <div className="marBotton">{withRoleBotton(ButtonType, this.props.btnAuth)}</div>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            cloumsCode,
            className: 'yss-configable-table stripe-table',
            columns: [...setColumns(columns)],
            dataSource: data,
            height: 450,
            // expandedRowRender: (record, index, indent, expanded) =>
            //   instructionRowRender(this.props, record, index, indent, expanded),
            // expandedRowRender: (record, index, indent, expanded) => {
            //   return (
            //     <InstructionRowRender
            //       {...this.props}
            //       index={index}
            //       indent={indent}
            //       expanded={expanded}
            //       row={record}
            //     />
            //   );
            // },
            onRow: record => ({
              style: {
                ...setRowColor(() => {
                  switch (record.systemInstructionStatusName) {
                    case '报送失败':
                    case '正报':
                    case '作废':
                    case '确认失败':
                      return 'error';
                    case '已报':
                      return 'warning';
                    case '已确认':
                      return 'success';
                    default:
                      return 'info';
                  }
                })
              }
            }),
            rowSelection: rowSelectionFunc.call(this, row => this.handleRowSelect(row)),
            pagination: pagination
            // expandIcon: props => {
            //   if (props.expanded) {
            //     return <Icon type="folder-open" onClick={e => props.onExpand(props.record, e)} />;
            //   } else {
            //     return <Icon type="folder" onClick={e => props.onExpand(props.record, e)} />;
            //   }
            // }
          })}
          expandedRowRender={row => {
            return <InstructionRowRender {...this.props} row={row} />;
          }}
        />

        <Modal
          width={1200}
          key={isOpenFormModal.type}
          title={
            isOpenFormModal.type == 'affirm'
              ? '批量结算确认'
              : isOpenFormModal.type == 'fail'
              ? '批量确认失败'
              : '手工匹配'
          }
          destroyOnClose={true}
          visible={
            isOpenFormModal.status &&
            (isOpenFormModal.type == 'affirm' ||
              isOpenFormModal.type == 'fail' ||
              isOpenFormModal.type == 'handleMatch')
          }
          // visible={true}
          onCancel={() => {
            openFormModal({ status: false });
          }}
        >
          {isOpenFormModal.type == 'affirm' ? (
            <InfoFormRule
              {...this.props}
              bactchInstructionFail={this.bactchInstructionFail}
            ></InfoFormRule>
          ) : isOpenFormModal.type == 'fail' ? (
            <BatchFailModal {...this.props} selltefailList={this.state.selltefailList} />
          ) : isOpenFormModal.type == 'handleMatch' ? (
            <HandleMatchModal {...this.props} />
          ) : null}
        </Modal>
      </Fragment>
    );
  }

  bactchInstructionFail = (status, data) => {
    const { openFormModal } = this.props;
    if (!status && data.length > 0) {
      this.setState({
        selltefailList: data
      });
      confirm({
        title: '批量结算确认未全部成功!',
        content: '点击 "查看详情" 查看具体结果',
        okText: '查看详情',
        onOk: () => {
          openFormModal({ status: true, type: 'fail' });
        },
        icon: 'close-circle'
      });
    }
    this.toEmptySelect();
    // const me = this;
    // modal.confirm({
    //   title: '确认失败',
    //   content: me.failNode(),
    //   onCancel: () => {
    //     this.props.openFormModal({ status: true, type: 'fail' });
    //   },
    //   onOk: () => {
    //     this.props.openFormModal({ status: true, type: 'fail' });
    //   }
    // });
  };

  // failNode = () => {
  //   // 持仓  指令券面 实际持仓
  //   return (
  //     <div>
  //       <div>
  //         资金可用组，指令<span style={{ color: 'red' }}>13323452364</span>确认失败！
  //       </div>
  //       <div>指令金额：100，000；</div>
  //       <div>实际资金可用：80，000；</div>
  //       <div>差值：120，000；</div>
  //     </div>
  //   );
  // };

  // /**点击指令切换切换关联 */
  // refuse = (e, row) => {
  //   modal.confirm({
  //     title: '撤销指令',
  //     content: '确认拒绝13423452364这条结算指令吗？'
  //   });
  // };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
    this.props.setSelectRow([]);
  };

  // 导出全部
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { instructionQueryForm, instructionTable } = this.props;
    exportFile(
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/exportConfirmInstruction/condition',
      filterNullElement({
        ...instructionQueryForm,
        includeFieldList: FieldList
      }),
      '结算指令',
      type,
      instructionTable.dataTotal,
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/export/getExportInfoByExecuteID'
    );
  };

  // 导出当前页
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { instructionQueryForm, pageReqParm } = this.props;
    exportFile(
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/exportConfirmInstruction/condition',
      filterNullElement({
        ...instructionQueryForm,
        ...pageReqParm,
        includeFieldList: FieldList
      }),
      '结算指令',
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
      '/bmtp-clearingorg-manage/shclearing/settleInstructManage/exportConfirmInstruction/selected',
      { includeFieldList: FieldList, selectList: params },
      '结算指令',
      true
    );
    this.toEmptySelect();
  };

  /**处理导出文件参数, 将字段路径格式的最终字段提取出来 */
  // dealPathField = FieldList => {
  //   return FieldList.map(item => {
  //     if (Array.isArray(item)) {
  //       return item[item.length - 1];
  //     }
  //     return item;
  //   });
  // };
}
export default Instruction;
