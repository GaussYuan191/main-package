import React, { PureComponent } from 'react';
import { Row, Modal, message, modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  setColumns,
  withRoleTableBotton,
  // selectRequest,
  selectPageRequest,
  ConfigableTable,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';
import { sortFunction } from 'yss-biz/utils/util/tools';

class Detailed extends PureComponent {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    ids: [],
    FieldList: []
  };

  render() {
    const { endOpen } = this.state;
    const {
      capitalDetailList,
      capitalDetailCol,
      changeQueryElement,
      openFormModal,
      asyncHttpCheckBatch,
      asyncHttpUnCheckBatch,
      queryElement,
      toResetSearch
    } = this.props;
    /***查询Input按钮 */
    let columns = [
      ...setColumns([
        ...capitalDetailCol,
        {
          title: '交易日期',
          dataIndex: 'tradeTime',
          key: 'tradeTime',
          width: 120,
          ellipsis: true,
          render: value => {
            return value ? moment(value).format('YYYY-MM-DD') : '';
          }
        },
        // {
        //   title: '时间',
        //   dataIndex: 'createTime',
        //   key: 'tradeTime1',
        //   width: 120,
        //   ellipsis: true,
        //   render: value => {
        //     return value ? moment(value).format('HH:mm:ss') : '';
        //   }
        // },
        {
          title: '交易类别',
          dataIndex: 'tradeTypeName',
          key: 'tradeTypeName',
          width: 120,
          ellipsis: true
        },
        {
          title: '借贷方向',
          dataIndex: 'borrowingSideName',
          key: 'borrowingSideName',
          width: 120,
          ellipsis: true
        },
        {
          title: '发生科目',
          dataIndex: 'itemName',
          key: 'itemName',
          width: 120,
          ellipsis: true
        },
        {
          title: '发生金额(元)',
          dataIndex: 'actualTradeAmount',
          key: 'actualTradeAmount',
          width: 120,
          ellipsis: true
        },
        {
          title: '发生前可用余额(元)',
          dataIndex: 'preUsableAmount',
          key: 'preUsableAmount',
          width: 160,
          ellipsis: true
        },
        {
          title: '发生后可用余额(元)',
          dataIndex: 'usableAmount',
          key: 'usableAmount',
          width: 160,
          ellipsis: true
        },
        {
          title: '发生前锁定余额(元)',
          dataIndex: 'preLockedAmount',
          key: 'preLockedAmount',
          width: 160,
          ellipsis: true
        },
        {
          title: '发生后锁定余额(元)',
          dataIndex: 'lockedAmount',
          key: 'lockedAmount',
          width: 160,
          ellipsis: true
        },
        {
          title: '发生前总余额(元)',
          dataIndex: 'preTotalAmount',
          key: 'preTotalAmount',
          width: 160,
          ellipsis: true
        },
        {
          title: '发生后总余额(元)',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          width: 160,
          ellipsis: true
        },
        // {
        //   title: '可用余额(元)',
        //   dataIndex: 'usableAmount',
        //   key: 'usableAmount',
        //   width: 120,
        //   ellipsis: true,
        //   align: 'right'
        // },
        // {
        //   title: '锁定余额(元)',
        //   dataIndex: 'lockedAmount',
        //   key: 'lockedAmount',
        //   width: 120,
        //   ellipsis: true,
        //   align: 'right'
        // },
        {
          title: '划款指令编号',
          dataIndex: 'transferInstructCode',
          key: 'transferInstructCode',
          width: 200,
          ellipsis: true,
          align: 'right'
        },
        // {
        //   title: '指令编号',
        //   dataIndex: 'instructId',
        //   key: 'instructId',
        //   width: 200,
        //   ellipsis: true,
        //   align: 'right'
        // },
        {
          title: '交易指令编号',
          dataIndex: 'tradeInstrId',
          key: 'tradeInstrId',
          width: 200,
          ellipsis: true,
          align: 'right'
        },
        // {
        //   title: '证券代码',
        //   dataIndex: 'securityCode',
        //   key: 'securityCode',
        //   width: 120,
        //   ellipsis: true,
        //   align: 'right'
        // },
        // {
        //   title: '证券名称',
        //   dataIndex: 'securityName',
        //   key: 'securityName',
        //   width: 120,
        //   ellipsis: true,
        //   align: 'right'
        // },
        {
          title: '成交编号',
          dataIndex: 'exceCode',
          key: 'exceCode',
          width: 200,
          ellipsis: true,
          align: 'right'
        },
        // {
        //   title: '结算指令编号',
        //   dataIndex: 'instructId',
        //   key: 'instructId',
        //   width: 200,
        //   ellipsis: true
        // },
        {
          title: '流水号',
          dataIndex: 'recordCode',
          key: 'recordCode',
          width: 200,
          ellipsis: true
        },
        {
          title: '审核状态',
          dataIndex: 'checkStatusName',
          key: 'checkStatusName',
          width: 120,
          ellipsis: true
        },
        {
          title: '资金账号',
          dataIndex: 'assetAccount',
          key: 'assetAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '账户名称',
          dataIndex: 'assetAccountName',
          key: 'assetAccountName',
          width: 260,
          ellipsis: true
        },
        {
          title: '账户类型',
          dataIndex: 'accountTypeName',
          key: 'accountTypeName',
          width: 200,
          ellipsis: true
        },
        {
          title: '结算机构',
          dataIndex: 'settleInstitutionName',
          key: 'settleInstitutionName',
          width: 120,
          ellipsis: true
        },
        {
          title: '数据来源',
          dataIndex: 'dataSourceName',
          key: 'dataSourceName',
          width: 120,
          ellipsis: true
        },
        {
          title: '创建人',
          dataIndex: 'createUserName',
          key: 'createUserName',
          width: 120,
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 200,
          ellipsis: true
        },
        {
          title: '修改人',
          dataIndex: 'updateUserName',
          key: 'updateUserName',
          width: 120,
          ellipsis: true
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          width: 200,
          ellipsis: true
        },
        {
          title: '审核人',
          dataIndex: 'checkUserName',
          key: 'checkUserName',
          width: 120,
          ellipsis: true
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime',
          width: 200,
          ellipsis: true
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 200,
          ellipsis: true
        }
      ]),
      {
        title: '操作',
        key: 'operation',
        width: 300,
        fixed: 'right',
        align: 'center',
        render: row => {
          const { tradeType, checkStatus } = row;
          const canShowtradeType = ['0', '1', '2', '3'].includes(tradeType);
          return withRoleTableBotton(
            [
              ...(() =>
                checkStatus != '1'
                  ? [
                    {
                      name: '修改',
                      roule: 'true',
                      func: this.update
                    }
                  ]
                  : [])(),
              ...ButtonTableType,
              ...(() =>
                canShowtradeType
                  ? [
                    {
                      name: '划款状态',
                      icon: 'account-book',
                      roule: 'true',
                      func: this.seeStatus
                    }
                  ]
                  : [])()
            ],
            this.props.btnAuth
          )(row);
        }
      }
    ];

    /***按钮组***/
    const ButtonTableType = [
      // {
      //   name: '修改',
      //   roule: 'true',
      //   func: this.update
      // },
      {
        name: '删除',
        roule: 'true',
        func: this.deleteRow
      }
    ];

    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '管理人',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择管理人',
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          onChange(value) {
            changeQueryElement({ value, type: 'consignorCode' });
          }
        }
      },
      {
        name: 'productName',
        label: '产品名称',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择产品名称',
          type: 'product',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(value) {
            changeQueryElement({ value, type: 'productId' });
          }
        }
      },
      {
        name: 'Subject',
        label: '科目',
        labelSize: '6em',
        type: 'Select',
        props: {
          placeholder: '请选择科目',
          getDics: 1030405,
          onChange(value) {
            changeQueryElement({ value, type: 'item' });
          }
        }
      },
      {
        name: 'lendingDirection',
        label: '借贷方向',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择借贷方向',
          getDics: 1030407,
          onChange(value) {
            changeQueryElement({ value, type: 'borrowingSide' });
          }
        }
      },
      {
        name: 'transactionType',
        label: '交易类型',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '交易类型',
          getDics: 1030408,
          onChange(value) {
            changeQueryElement({ value, type: 'tradeType' });
          }
        }
      },
      {
        name: 'checkStatus',
        label: '审核状态',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择审核状态',
          getDics: 1030002,
          onChange(value) {
            changeQueryElement({ value, type: 'checkStatus' });
          }
        }
      },

      {
        name: 'clearingHouse',
        label: '结算机构',
        labelSize: '6em',
        type: 'Select',
        props: {
          getDics: 1030404,
          placeholder: '请选择结算机构',
          onChange(value) {
            changeQueryElement({ value, type: 'settleInstitution' });
          }
        }
      },

      {
        name: 'serialNums',
        label: '流水号',
        labelSize: '6em',
        type: 'Input',
        props: {
          placeholder: '请输入流水号',
          onChange(e) {
            changeQueryElement({ value: e.target.value, type: 'recordCode' });
          }
        }
      },
      {
        name: 'dataSources',
        label: '数据来源',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择数据来源',
          getDics: 1030403,
          allowClear: true,
          onChange(value) {
            changeQueryElement({ value, type: 'dataSource' });
          }
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请输入成交编号',
          onChange(e) {
            const value = e.target.value || '';
            changeQueryElement({ value, type: 'execCode' });
          }
        }
      },
      // {
      //   name: 'instructId',
      //   label: '指令编号',
      //   type: 'Input',
      //   labelSize: '6em',
      //   props: {
      //     placeholder: '请输入指令编号',
      //     onChange(e) {
      //       const value = e.target.value || '';
      //       changeQueryElement({ value, type: 'instructId' });
      //     }
      //   }
      // },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请输入交易指令编号',
          onChange(e) {
            const value = e.target.value || '';
            changeQueryElement({ value, type: 'tradeInstrId' });
          }
        }
      },
      {
        name: 'timeStart',
        label: '交易开始时间',
        type: 'DatePicker',
        labelSize: '6em',
        props: {
          placeholder: '交易开始时间',
          allowClear: true,
          disabledDate: this.disabledStartDate,
          onChange: this.onStartChange,
          onOpenChange: this.handleStartOpenChange
        }
      },
      {
        name: 'timeEnd',
        label: '交易结束时间',
        type: 'DatePicker',
        labelSize: '6em',
        props: {
          placeholder: '交易结束时间',
          allowClear: true,
          disabledDate: this.disabledEndDate,
          open: endOpen,
          onChange: this.onEndChange,
          onOpenChange: this.handleEndOpenChange
        }
      }
      // {
      //   name: 'serialNo',
      //   label: '结算指令编号',
      //   type: 'Input',
      //   labelSize: '6em',
      //   props: {
      //     placeholder: '请输入结算指令/合同编号',
      //     allowClear: true,
      //     onChange(e) {
      //       changeQueryElement({ value: e.target.value, type: 'instructId' });
      //     }
      //   }
      // }
    ];

    /***按钮组** */
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true });
        }
      },
      // {
      //   name: '审核',
      //   roule: functionRolue.CHECK,
      //   func: () => {
      //     asyncHttpCheckBatch({ params: this.state.ids }).then(() => {
      //       this.toEmptySelect();
      //     });
      //   }
      // },
      {
        name: '审核',
        roule: functionRolue.CHECK,
        func: () => {
          if (this.state.ids.length < 1) {
            message.error('请选择需要审核的数据');
            return;
          }
          const me = this;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有未审核的数据才可以审核
          this.state.ids.map(item => {
            if (item.checkStatus == '2') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpCheckBatch(data).then(() => {
                me.toEmptySelect();
              });
            } else {
              modal.confirm({
                title: '是否审核数据',
                content: `选取数据中存在 ${othData.length} 条已审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpCheckBatch(data).then(() => {
                    me.toEmptySelect();
                  });
                }
              });
            }
          } else {
            message.error('只有未审核的数据才可以审核');
          }
        }
      },
      {
        name: '反审核',
        roule: functionRolue.UNCHECK,
        func: () => {
          asyncHttpUnCheckBatch({ params: this.state.ids }).then(() => {
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
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      total: capitalDetailList.total
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <SearchForm
            labelSize="4em"
            lineOf={3}
            moreTypeModal
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            handleBeforeReset={() => true}
            handleReset={() => {
              toResetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum
              });
            }}
          />
          <section className="marginAuto">
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              {...setTableInfo({
                columns,
                dataSource: capitalDetailList.list,
                rowSelection,
                cloumsCode,
                pagination,
                height: 450,
                rowKey: 'id'
              })}
              bordered={true}
            // onRow={record => {
            //   return {
            //     onDoubleClick: event => {
            //       this.viewBelieve(event, record);
            //     }
            //   };
            // }}
            />
          </section>
        </Row>
      </>
    );
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onHandlsChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    const { changeQueryElement } = this.props;
    this.onHandlsChange('startValue', value);
    changeQueryElement({
      value: value ? value.format('YYYY-MM-DD') : null,
      type: 'tradeBeginTime'
    });
  };

  onEndChange = value => {
    const { changeQueryElement } = this.props;
    this.onHandlsChange('endValue', value);
    changeQueryElement({ value: value ? value.format('YYYY-MM-DD') : null, type: 'tradeEndTime' });
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  /***更新*/
  update = (e, row) => {
    e.stopPropagation();
    const { changeTableRow, openFormModal, asyncHttpGetAccountBalance } = this.props;
    // dataSource 时，为”0“时为系统
    const canUpdate = row.dataSource !== '0';
    if (canUpdate) {
      changeTableRow({ value: row });
      openFormModal({
        type: 'update',
        status: true
      });
      // asyncHttpGetAccountBalance({ params: row });
    } else {
      message.warning(`当前数据的数据来源为系统，无法进行编辑！`);
    }
  };

  /***删除一项*/
  deleteRow = (e, row) => {
    e.stopPropagation();
    const { asyncHttpDeleteRow } = this.props;
    // dataSource 时，为”0“时为系统
    const canUpdate = row.dataSource !== '0';
    if (canUpdate) {
      Modal.confirm({
        title: '是否删除？',
        // content: `资金明细${row.consignorName}`,
        onOk: () => {
          asyncHttpDeleteRow({ params: row });
        }
      });
    } else {
      message.warning(`当前数据的数据来源为系统，无法被删除！`);
    }
  };

  /***展示划款状态*/
  seeStatus = async (e, row) => {
    e.stopPropagation();
    // 交易类型（数据字典 0-资金汇入，1-资金汇入（正回购到期），2-日间提款，3-日终汇款，4-现券买入，5-现券卖出，6-质押式正回购首期，】
    // 7-买断式正回购首期，8-质押式正回购到期，9-买断式正回购到期，10-质押式逆回购首期，11-买断式逆回购首期，12-质押式逆回购到期，
    // 13-买断式逆回购到期 14 网上分销买入 21银行间网下分销认购）

    const { tradeType } = row;
    const canShowtradeType = ['0', '1', '2', '3'].includes(tradeType);
    if (canShowtradeType) {
      const { changeTableRow, openFormModal, asyncHttpSearchDetail } = this.props;
      await asyncHttpSearchDetail(row.transferInstructCode);
      changeTableRow({ value: { ...this.props.modalVal, ...row } }); //组合展示划款状态内容
      openFormModal({
        type: 'see',
        status: true
      });
    } else {
      message.warning(`交易类型为:"${row['tradeTypeName']}"的数据，无法展示划款状态`);
    }
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetMoneyList, changeQueryElement } = this.props;
    changeQueryElement({ type: 'reqPageNum', value: 1 });
    asyncHttpGetMoneyList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = ({ ele, value }) => {
    const { asyncHttpGetMoneyList, changeQueryElement } = this.props;
    changeQueryElement({ type: ele, value: value });
    asyncHttpGetMoneyList({});
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrentPage = status => {
    const { FieldList } = this.state;
    const { queryElement, capitalDetailList } = this.props;
    let index = FieldList.indexOf('checkStatusName');
    let index2 = FieldList.indexOf('accountTypeName');
    FieldList[index] = 'checkStatus';
    FieldList[index2] = 'assetAccountType';
    let total;
    if (status) {
      total = capitalDetailList.total;
    }
    exportFile(
      '/bmtp-cash-manage/account/assetAccountRecord/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '交易明细',
      status,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    let index = FieldList.indexOf('checkStatusName');
    let index2 = FieldList.indexOf('accountTypeName');
    FieldList[index] = 'checkStatus';
    FieldList[index2] = 'assetAccountType';
    exportSelectFile(
      '/bmtp-cash-manage/account/assetAccountRecord/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '交易明细'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
