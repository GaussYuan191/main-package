// 中债登指令管理
import React, { Component, Fragment } from 'react';
import { modal, message } from 'antd';
// import InstructionRowRender from './InstructionRowRender';
import BatchFailModal from './BatchFailModal';
import InfoFormRule from './InfoFormRuleZJD';
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
    currentTradeDate: '',
    filterPrevDate: '',
    filterNextDate: '',
    selltefailList: [],
    FieldList: []
  };

  async componentDidMount() {
    const { asyncHttpGetPendingConfirmInstruction, asyncHttpCurrentTradingDay } = this.props;
    await asyncHttpCurrentTradingDay({
      cb: date => {
        this.setState({
          currentTradeDate: date || ''
        });
      }
    });
    await asyncHttpGetPendingConfirmInstruction({});
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
    this.props.asyncHttpGetPendingConfirmInstruction();
    this.toEmptySelect();
  }

  /***分页查询*/
  searchPage = pages => {
    const { setPageQueryParam } = this.props;
    setPageQueryParam && setPageQueryParam(pages);
    this.props.asyncHttpGetPendingConfirmInstruction();
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
      setInstructionQueryForm,
      pageReqParm
    } = this.props;

    const { columns, data } = instructionTable;

    const me = this;

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'consignorName',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          type: 'consignor',
          onChange(value) {
            setInstructionQueryForm({ consignorCode: value });
          }
        }
      },
      {
        name: 'instructionId',
        label: '结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入指令编号',
          onChange(e) {
            setInstructionQueryForm({ instructionId: e.target.value });
          }
        }
      },
      {
        name: 'systemInstructionStatus',
        label: '指令状态',
        type: 'Select',
        props: {
          placeholder: '请选择指令状态',
          initialValue: this.state.defInstructionStatus,
          getDics: 1030110,
          onChange(value) {
            setInstructionQueryForm({ systemInstructionStatus: value });
          }
        }
      },

      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号'
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
          placeholder: '请选择本方状态'
          // getDics: 1030132
        },
        options: [
          {
            label: '待确认',
            value: 'IC02'
          },
          {
            label: '已确认',
            value: 'IC01'
          }
        ]
      },

      {
        name: 'counterPartyStatus',
        label: '对手方状态',
        type: 'Select',
        props: {
          // getDics: 1030135,
          placeholder: '请选择对手方状态'
        },
        options: [
          {
            label: '待确认',
            value: 'IC02'
          },
          {
            label: '已确认',
            value: 'IC01'
          }
        ]
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
          initialValue: [
            moment(this.state.currentTradeDate) || '',
            moment(this.state.currentTradeDate) || ''
          ],
          onCalendarChange(value) {
            if (value.length == 1) {
              me.setState({
                filterPrevDate: value[0].format('YYYY-MM-DD'),
                filterNextDate: value[0].format('YYYY-MM-DD')
              });
            }
          }
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
          let arr = ['1', '3', '10', '6', '13', '14'];
          if (data.length > 0) {
            let flag = false;
            for (let n of data) {
              if (arr.indexOf(n.systemInstructionStatus) == -1) {
                message.error(
                  '指令状态为待确认、确认失败、报送失败、风控检查不通过、‘报送失败,回退成功’、‘报送失败,回退失败’的数据才能结算确认'
                );
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
      // {
      //   name: '拒绝',
      //   roule: false,
      //   func: this.refuse,
      //   icon: 'close-circle'
      // },
      {
        name: '手工匹配',
        roule: 'true',
        icon: 'highlight',
        func: () => {
          this.props.asyncHttpGetMatchInstruction().then(() => {
            this.toEmptySelect();
          });
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
            rowSelection: rowSelectionFunc.call(this, (id, row) => this.handleRowSelect(id, row)),
            pagination: pagination
            // expandIcon: props => {
            //   if (props.expanded) {
            //     return <Icon type="folder-open" onClick={e => props.onExpand(props.record, e)} />;
            //   } else {
            //     return <Icon type="folder" onClick={e => props.onExpand(props.record, e)} />;
            //   }
            // }
          })}
        />

        <Modal
          width={1200}
          key={isOpenFormModal.type}
          title={isOpenFormModal.type == 'affirm' ? '批量结算确认' : '批量确认失败'}
          destroyOnClose={true}
          visible={
            isOpenFormModal.status &&
            (isOpenFormModal.type == 'affirm' || isOpenFormModal.type == 'fail')
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
          ) : null}
          {/* <BatchFailModal /> */}
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
      // modal.error({
      //   title: '匹配失败',
      //   content: '未结算确认匹配成功！',
      //   onOk: () => {
      //     openFormModal({ status: true, type: 'fail' });
      //   },
      //   okText: '查看原因'
      // });
      confirm({
        title: '结算确认失败 ',
        content: '未结算确认匹配成功！',
        okText: '查看原因',
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
      '/bmtp-clearingorg-manage/dim/settle/instructManage/exportConfirmInstruction/condition',
      filterNullElement({
        ...instructionQueryForm,
        includeFieldList: this.dealPathField(FieldList)
      }),
      '结算指令',
      type,
      instructionTable.dataTotal,
      '/bmtp-clearingorg-manage/dim/settle/instructManage/export/getExportInfoByExecuteID'
    );
  };

  // 导出当前页
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { instructionQueryForm, pageReqParm } = this.props;
    exportFile(
      '/bmtp-clearingorg-manage/dim/settle/instructManage/exportConfirmInstruction/condition',
      filterNullElement({
        ...instructionQueryForm,
        ...pageReqParm,
        includeFieldList: this.dealPathField(FieldList)
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
      '/bmtp-clearingorg-manage/dim/settle/instructManage/exportConfirmInstruction/selected',
      { includeFieldList: this.dealPathField(FieldList), selectList: params },
      '结算指令',
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
}
const InstructionJZD = connect(
  SettlementModel,
  state => {
    let statejs = state.toJS();
    return { ...statejs };
  },
  mutations => {
    return { ...mutations };
  }
)(Instruction);
export default InstructionJZD;
