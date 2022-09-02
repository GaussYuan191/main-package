// 指令管理
import React, { Component, Fragment } from 'react';
import { message, modal } from 'antd';
import instructionRowRender from './InstructionRowRender';
import InstructionModal from './InstructionModal';
import moment from 'moment';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  selectPageRequest,
  rowSelectionFunc,
  cloumsFunc,
  PageBody,
  ConfigableTable,
  // fontColor,
  Modal,
  exportFile,
  exportSelectFile,
  filterNullElement
} from 'yss-biz';
// const { mapOption } = SearchForm;
const { Container } = PageBody;
class Instruction extends Component {
  state = {
    isMaskShow: false,
    ids: [],
    expandTable: []
  };
  render() {
    const {
      instructionTable,
      isOpenFormModal,
      openFormModal,
      changeQueryElement,
      queryElement,
      toResetSearch,
      instructionData,
      currentTradeDate
    } = this.props;
    const { columns } = instructionTable;
    const col = [
      ...columns,
      {
        title: '生成时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160,
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160,
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '指令来源',
        dataIndex: 'orginName',
        key: 'orginName',
        ellipsis: true,
        width: 150
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '撤销人',
        dataIndex: 'revokeUserName',
        key: 'revokeUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '撤销时间',
        dataIndex: 'revokeTime',
        key: 'revokeTime',
        ellipsis: true,
        width: 150,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '附言',
        dataIndex: 'postscript',
        key: 'postscript',
        ellipsis: true,
        width: 200
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        ellipsis: true,
        width: 200
      }
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 160,
      //   fixed: 'right',
      //   align: 'center',
      //   render: item => withRoleTableBotton(ButtonTableType)(item)
      // }
    ];

    /***table按钮组***/
    // const ButtonTableType = [
    //   {
    //     name: fontColor('划款指令明细'),
    //     roule: true,
    //     icon: 'appstore',
    //     func: this.info
    //   }
    // ];

    /*设置查询*/
    let SearchformItem = [
      // {
      //   name: 'productCode',
      //   label: '产品名称',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择产品名称',
      //     allowClear: true,
      //     type: 'product',
      //     config: selectRequest,
      //     maxTagCount: 1,
      //     maxTagTextLength: 3,
      //     mode: 'multiple',
      //     onChange(value) {
      //       changeQueryElement({
      //         element: 'productCode',
      //         value: value.join(',')
      //       });
      //     }
      //   }
      // },
      {
        name: 'transferType',
        label: '指令类型',
        type: 'Select',
        props: {
          placeholder: '请选择划款指令类型',
          getDics: 1030421,
          onChange(value) {
            changeQueryElement({ element: 'transferType', value });
          }
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'execCode', value });
          }
        }
      },
      {
        name: 'transferDate',
        label: '划款日期',
        type: 'RangePicker',
        itemSize: '230px',
        props: {
          placeholder: '请选择划款日期',
          allowClear: true,
          initialValue: [moment(currentTradeDate) || null, moment(currentTradeDate) || null],
          onChange(dates, dateString) {
            changeQueryElement({
              element: 'transferStartDate',
              value: dateString[0]
            });
            changeQueryElement({
              element: 'transferEndDate',
              value: dateString[1]
            });
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
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          configDics: selectPageRequest,
          // mode: 'multiple',
          onChange(value) {
            changeQueryElement({
              element: 'managerCode',
              // value: value.join(',')
              value: value
            });
          }
        }
      },
      {
        name: 'instrId',
        label: '结算机构指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入结算机构指令编号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'instrId', value });
          }
        }
      },
      {
        name: 'tradeOrderNo',
        label: '交易指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入交易指令编号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'tradeOrderNo', value });
          }
        }
      },
      {
        name: 'transferInstructCode',
        label: '划款指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入划款指令编号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'transferInstructCode', value });
          }
        }
      },
      {
        name: 'transferState',
        label: '划款状态',
        type: 'Select',
        props: {
          placeholder: '请选择划款状态',
          getDics: 1030401,
          onChange(value) {
            changeQueryElement({ element: 'transferState', value });
          }
        }
      },
      {
        name: 'transferCommandState',
        label: '划款指令状态',
        type: 'Select',
        props: {
          placeholder: '请选择划款指令状态',
          getDics: 1030402,
          // mode: 'multiple',
          onChange(value) {
            changeQueryElement({
              element: 'transferCommandState',
              // value: value.join(',')
              value: value
            });
          }
        }
      },
      {
        name: 'batchNo',
        label: '批次号',
        type: 'Input',
        props: {
          placeholder: '请输入批次号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'batchNo', value });
          }
        }
      },
      {
        name: 'orgin',
        label: '指令来源',
        type: 'Select',
        props: {
          placeholder: '请选择指令来源',
          getDics: 1030404,
          onChange(value) {
            changeQueryElement({ element: 'orgin', value });
          }
        }
      },
      {
        name: 'chargeId',
        label: '费用编号',
        type: 'Input',
        props: {
          placeholder: '请输入费用编号',
          onChange({ target: { value } }) {
            changeQueryElement({ element: 'chargeId', value });
          }
        }
      }
    ];

    const ButtonType = [
      // {
      //   name: '刷新',
      //   roule: 'true',
      //   func: this.refsList
      // },
      {
        name: '重发指令',
        roule: 'true',
        func: this.reissued
      },
      {
        name: '撤销指令',
        roule: 'true',
        func: this.revoke
      },
      {
        name: '执行指令',
        roule: 'true',
        func: this.implement
      },
      {
        name: '查询指令',
        roule: 'true',
        noAuth: true,
        func: this.queryInstruct
      },
      {
        name: '导出',
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
        this.searchPage({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      total: instructionData.total || 0,
      current: queryElement.reqPageNum
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <Fragment>
        <section>
          <Container>
            <SearchForm
              labelSize="6em"
              lineOf={3}
              formItem={SearchformItem}
              refs={ref => (this.searchForm = ref)}
              handleSearch={value => {
                this.query();
              }}
              moreTypeModal
              handleReset={() => {
                toResetSearch({
                  reqPageSize: queryElement.reqPageSize,
                  transferStartDate: currentTradeDate || null,
                  transferEndDate: currentTradeDate || null
                });
              }}
              handleBeforeReset={() => true}
            />
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              expandedRowRender={row => instructionRowRender(this.props, row)}
              onRow={record => {
                return {
                  onClick: event => {
                    this.props.asyncHttpSeqNoAbout(record);
                  }
                };
              }}
              {...setTableInfo({
                rowKey: 'id',
                columns: setColumns(col),
                dataSource: instructionData.list || [],
                rowSelection,
                cloumsCode,
                pagination,
                height: this.props.tableHight
              })}
            />
          </Container>
          <Modal
            width={1000}
            title="划款明细"
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ status: false });
            }}
          >
            <InstructionModal {...this.props}></InstructionModal>
          </Modal>
        </section>
      </Fragment>
    );
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ element: 'reqPageNum', value: 1 });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ element: ele, value: value });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  /**执行指令 transferState*/
  implement = (e, row) => {
    if (!this.state.ids.length) {
      message.error('请选择需要的项目进行执行指令!');
      return;
    }
    const { asyncHttpImplementInstruct } = this.props;

    let arr = [],
      isOtherState = false;
    this.state.ids.map(item => {
      if (item.transferState == 1) {
        arr.push(item.id);
      } else {
        isOtherState = true;
      }
    });

    if (arr.length < 1) {
      message.error('请选择划款状态为待执行的数据!');
      return;
    }

    modal.confirm({
      title: isOtherState
        ? `选中的记录存在非待执行状态，是否将待执行状态的记录执行【执行指令】操作`
        : '是否将选中的记录执行【执行指令】操作',
      content: `划款指令编号:${this.formatIds(this.state.ids, 'transferInstructCode')}`,
      onOk: () => {
        asyncHttpImplementInstruct &&
          asyncHttpImplementInstruct({ ids: this.state.ids }).then(() => {
            this.toEmptySelect();
          });
      },
      onCancel: () => {}
    });
  };

  /**撤销指令 transferState*/
  revoke = (e, row) => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要的项目进行撤销指令!');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('请能选择单个项目进行撤销指令操作!');
      return;
    }

    let obj = this.state.ids[0];
    if (!(['1', '2'].includes(obj.transferState) && obj.transferCause == 20)) {
      message.error('请选择划款状态为待执行或执行中，且为内部转仓业务的项目!');
      return;
    }

    const { asyncHttpRevokeInstruct } = this.props;

    modal.confirm({
      title: '是否将选中的记录执行【撤销指令】操作',
      content: `划款指令编号:${this.formatIds(this.state.ids, 'transferInstructCode')}`,
      onOk: () => {
        asyncHttpRevokeInstruct &&
          asyncHttpRevokeInstruct({ id: this.state.ids[0].id }).then(() => {
            this.toEmptySelect();
          });
      },
      onCancel: () => {}
    });
  };

  /***重发指令 */
  reissued = (e, row) => {
    // 1030401	划款状态
    // 1	待执行
    // 2	执行中
    // 3	执行成功
    // 4	发送清算系统失败
    // 5	清算系统校验失败
    // 6	清算系统执行失败
    // 7	清算系统执行失败(余额不足)
    // 8	清算系统执行成功
    // 9	执行失败

    if (this.state.ids.length < 1) {
      message.error('请选择需要的项目进行重发指令!');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('请选择单个项目进行重发指令操作!');
      return;
    }

    let obj = this.state.ids[0];
    if (!(obj.transferState == 4 || obj.transferState == 5 || obj.transferState == 6)) {
      message.error(
        '请选择【发送清算系统失败】或【清算系统校验失败】或【清算系统执行失败】的项目!'
      );
      return;
    }

    const { asyncHttpReissuedInstruct } = this.props;

    modal.confirm({
      title: '是否将选中的记录执行【重发指令】操作',
      content: `划款指令编号:${this.formatIds(this.state.ids, 'transferInstructCode')}`,
      onOk: () => {
        asyncHttpReissuedInstruct &&
          asyncHttpReissuedInstruct({ id: this.state.ids[0].id }).then(() => {
            this.toEmptySelect();
          });
      },
      onCancel: () => {}
    });
  };

  /***刷新指令 */
  refsList = (e, row) => {
    const { asyncHttpGetList } = this.props;
    asyncHttpGetList({});
    this.toEmptySelect();
  };
  /***刷新指格式ids 只获取指 */
  formatIds = (arr, type) => {
    return arr.map(item => item[type]).join('，');
  };
  /***查询指令,后端调查询接口,更新清算系统划款指令 */
  queryInstruct = async () => {
    const { ids } = this.state;
    const { asyncHttpQueryInstruct } = this.props;
    if (ids.length < 1) {
      message.error('请选择需要的项目进行查询更新!');
      return;
    } else if (ids.some(item => item.transferState != '2')) {
      message.error('请选择划款状态为执行中的数据');
      return;
    }
    let idList = ids.map(item => item.id);
    await asyncHttpQueryInstruct(idList);
    this.query();
  };
  /**查看指令详情*/
  info = (e, row) => {
    const { changTableRow, openFormModal } = this.props;
    changTableRow({ value: row });
    openFormModal({
      status: true
    });
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /**导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-cash-manage/transfer/transferCommand/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '划款指令',
      true
    );
  };

  /**导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-cash-manage/transfer/transferCommand/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '划款指令',
      false
    );
  };

  /**导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-cash-manage/transfer/transferCommand/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '划款指令'
    );
    this.toEmptySelect();
  };
}
export default Instruction;
