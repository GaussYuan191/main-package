import React, { PureComponent } from 'react';
import {
  ConfigableTable,
  SearchForm,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  withRoleTableBotton,
  exportFile,
  exportSelectFile,
  UploadModal,
  selectPageRequest,
  // page,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import SettlementFormRule from './SettlementFormRule';
// import ButtonGroup from './ButtonGroup';
import moment from 'moment';
import { message, modal } from 'antd';
const { confirm } = modal;
const { mapOption } = SearchForm;
const UpLoadFile = UploadModal;
class Settlement extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      settlementColumn,
      settlementList,
      isOpenFormModal,
      openFormModal,
      changeQueryElement,
      toResetSearch,
      queryElement,
      tableHight,
      asyncHttpDataSplit,
      asyncHttpSplitAffirm,
      // asyncHttpCacelAffirm,
      asyncHttpSendBill,
      toChangeAffirmSplitStatus,
      isAffirmSplit,
      asyncHttpGetAboutList
      // toEmptyIds,
      // ids
    } = this.props;
    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'bondAccount',
        label: '债券名称',
        type: 'Select',
        props: {
          placeholder: '请输入债券名称',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(value, options) {
            changeQueryElement({ bondCode: value });
          }
        }
      },
      {
        name: 'bondPaymentCategory',
        label: '兑付类别',
        type: 'Select',
        props: {
          placeholder: '请选择兑付类别',
          getDics: 1030146,
          onChange(value) {
            changeQueryElement({ bondPaymentCategory: value });
          }
        }
      },
      {
        name: 'tradeDate',
        label: '付息兑付日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择付息兑付日期',
          initialValue: moment(this.props.currentTradeDate) || '',
          onChange(dates, dateString) {
            changeQueryElement({
              tradeStartDate: dateString,
              tradeEndDate: dateString
            });
          }
        }
      },
      {
        name: 'intreReachStatus',
        label: '利息到账状态',
        type: 'Select',
        labelSize: '7em',
        props: {
          placeholder: '请选择利息到账状态',
          getDics: 1030147,
          onChange(value) {
            changeQueryElement({ intreReachStatus: value });
          }
        }
      },
      // {
      //   name: 'transComStatus',
      //   label: '划款指令状态',
      //   type: 'Select',
      //   labelSize: '7em',
      //   props: {
      //     placeholder: '请选择划款指令状态',
      //     getDics: 1030402,
      //     onChange(value) {
      //       changeQueryElement({ transComStatus: value });
      //     }
      //   }
      // },

      {
        name: 'curinterStaDate',
        label: '本期计息起息日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择本期计息起息日',
          onChange(date, dateString) {
            changeQueryElement({
              curinterStaDate: dateString
            });
          }
        }
      },
      {
        name: 'curinterEndDate',
        label: '本期计息结息日',
        type: 'DatePicker',
        props: {
          placeholder: '本期计息结息日',
          onChange(date, dateString) {
            changeQueryElement({
              curinterEndDate: dateString
            });
          }
        }
      }
    ];
    // 按钮组
    const me = this;
    const rowed = this.state.ids[0];
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'bd' });
        }
      },
      {
        name: '审核',
        roue: true,
        func: () => {
          if (this.state.ids.length < 1) {
            message.error('请选择需要审核的数据');
            return;
          }
          const { asyncHttpToCheckData } = this.props;
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
              asyncHttpToCheckData(data).then(() => {
                me.toEmptySelect();
              });
            } else {
              modal.confirm({
                title: '是否审核数据',
                content: `选取数据中存在 ${othData.length} 条已审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToCheckData(data).then(() => {
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
        roue: true,
        func: () => {
          if (this.state.ids.length < 1) {
            message.error('请选择需要反审核的数据');
            return;
          }
          const { asyncHttpToUnCheckData } = this.props;

          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有已审核的数据才可以审核
          this.state.ids.map(item => {
            if (item.checkStatus == '1') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToUnCheckData(data).then(() => {
                this.toEmptySelect();
              });
            } else {
              modal.confirm({
                title: '是否反审核数据',
                content: `选取数据中存在 ${othData.length} 条未审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToUnCheckData(data).then(() => {
                    me.toEmptySelect();
                  });
                }
              });
            }
          } else {
            message.error('只有已审核的数据才可以反审核');
          }
        }
      },
      {
        name: '拆分',
        roule: true,
        disabled: isAffirmSplit,
        func: async () => {
          if (this.state.ids.length == 0) {
            message.error('请选择需要拆分的数据');
            return;
          } else if (this.state.ids.length > 1) {
            message.error('不支持多数据拆分');
            return;
          }

          if (!(rowed.intreReachStatus == 1 || rowed.intreReachStatus == 2)) {
            message.error('请选择未拆分或者已拆分的数据！');
            return;
          }

          if (rowed.checkStatus == 2) {
            message.error('未审核的数据不能进行拆分');
            return;
          }
          if (rowed.bondPaymentCategory == 6) {
            message.error('回售数据通过交易数据处理，无需拆分');
            return;
          }
          if (rowed.bondPaymentCategory == 7) {
            confirm({
              title: '是否进行拆分？',
              content:
                '该数据可能因全量回售产生，请人工确认该数据确为赎回数据，并继续拆分。注：回售数据无需拆分',
              onOk() {
                asyncHttpDataSplit(rowed).then(() => {
                  me.toEmptySelect();
                });
              }
            });
            return;
          }
          await asyncHttpDataSplit(rowed).then(() => {
            me.toEmptySelect();
          });
        }
      },
      {
        name: '拆分确认',
        roule: true,
        func: async () => {
          if (this.state.ids.length == 0) {
            message.error('请选择需要拆分确认的数据');
            return;
          } else if (this.state.ids.length > 1) {
            message.error('不支持多数据拆分确认');
            return;
          }

          if (rowed.checkStatus == 2) {
            message.error('未审核的数据不能进行拆分确认');
            return;
          }

          if (rowed.intreReachStatus != 2) {
            message.error('只有已拆分的的数据才可以拆分确认！');
            return;
          }
          toChangeAffirmSplitStatus(true);
          await asyncHttpSplitAffirm(rowed).then(() => {
            toChangeAffirmSplitStatus(false);
            me.toEmptySelect();
          });
        }
      },

      // {
      //   name: '取消确认',
      //   roule: true,
      //   func: () => {
      //     if (ids.length == 0) {
      //       message.error('请选择需要取消拆分的数据');
      //       return;
      //     } else if (ids.length > 1) {
      //       message.error('不支持多数据取消拆分');
      //       return;
      //     }
      //     if (ids[0].intreReachStatus != 3) {
      //       message.error('只有确认的的数据才可以取消确认！');
      //       return;
      //     }
      //     asyncHttpCacelAffirm(rowed).then(() => {
      //       toEmptyIds();
      //     });
      //   }
      // },
      {
        name: '发送账单',
        roule: true,
        func: () => {
          if (this.state.ids.length == 0) {
            message.error('请选择需要发送账单的数据');
            return;
          } else if (this.state.ids.length > 1) {
            message.error('不支持多数据发送账单');
            return;
          }
          if (rowed.checkStatus == 2) {
            message.error('未审核的数据不能发送账单');
            return;
          }
          if (rowed.intreReachStatus != 3) {
            //只有“利息兑付状态”是“已确认”且“划款指令状态”为“执行成功”
            message.error(
              `只有利息兑付状态是'已确认'且划款指令状态为'执行成功'的数据才能够发送账单`
            );
            return;
          }
          asyncHttpGetAboutList(rowed).then(() => {
            let arr = this.props.aboutList.list;
            if (arr.length == 0) {
              message.error('关联信息中没有数据，不能发送账单');
              return;
            }
            let flag = false;
            for (let n of arr) {
              if (n.transComStatus == 2) {
                flag = true;
              }
            }
            if (!(rowed.intreReachStatus == 3 && flag)) {
              //只有“利息兑付状态”是“已确认”且“划款指令状态”为“执行成功”
              message.error(
                `只有利息兑付状态是'已确认'且划款指令状态为'执行成功'的数据才能够发送账单`
              );
              return;
            }
            asyncHttpSendBill(rowed).then(() => {
              me.toEmptySelect();
            });
          });
        }
      },
      // {
      //   name: '导入',
      //   roule: true,
      //   func: () => {
      //     UpLoadFile.show();
      //   }
      // },
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

      // {
      //   name: '打印',
      //   roule: true,
      //   func: () => {
      //     asyncHttpBatchexamine({ params: this.state.ids });
      //   }
      // }
    ];

    /**表格信息**/
    const columns = [
      ...setColumns(settlementColumn),
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: row => {
          if (row.checkStatus == '2') {
            return withRoleTableBotton(
              [
                {
                  name: '修改',
                  icon: '',
                  roule: true,
                  func: this.updateClientItem
                },
                ...ButtonTableType
              ],
              this.props.btnAuth
            )(row);
          } else if (row.checkStatus == '1') {
            return null; //withRoleTableBotton(ButtonTableType,this.props.btnAuth)(row);
          }
        }
      }
    ];

    const ButtonTableType = [
      {
        name: '删除',
        roule: true,
        func: this.deleteClientItem
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
      total: settlementList.total,
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum
    };
    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <SearchForm
          labelSize="7em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleReset={() =>
            toResetSearch({
              reqPageSize: queryElement.reqPageSize,
              reqPageNum: queryElement.reqPageNum
            })
          }
          handleBeforeReset={() => true}
        />
        {/* <ButtonGroup {...this.props} ids={this.state.ids} toEmptyIds={this.toEmptyIds} /> */}

        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: settlementList.list,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: tableHight
          })}
          onRow={record => {
            return {
              onClick: event => {
                this.changeRelation(record);
              }
            };
          }}
        />
        <Modal
          width={1200}
          title={
            isOpenFormModal.type === 'update'
              ? '修改付息兑付数据'
              : isOpenFormModal.type === 'add'
              ? '新增付息兑付数据'
              : '删除付息兑付数据'
          }
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'bd'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <SettlementFormRule {...this.props}></SettlementFormRule>
        </Modal>

        {/* 上传 */}
        <UpLoadFile
          uploadList={this.addUploadFiles}
          action="/dfas-common-file/files/uploadBatchFile"
        />
      </>
    );
  }

  componentDidMount() {}

  // 清空ids
  toEmptyIds = () => {
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList } = this.props;
    asyncHttpGetList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement(page);
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  /**关联查询*/
  changeRelation(row) {
    const { setRowInfo, asyncHttpGetAboutList, toResetAbout, changeQueryAboutElement } = this.props;
    toResetAbout();
    setRowInfo({
      value: row
    });
    changeQueryAboutElement({ parentid: row.id });
    asyncHttpGetAboutList(row);
  }

  /**上传弹窗关闭的回调*/
  addUploadFiles = data => {
    //判断是否上传成功

    // const {} = this.props;
    if (!data[0].id) {
      message.error('上传失败!');
      return;
    }
    // console.log(data);
    // message.success('上传成功!');
    // let fjList = this.state.enclosureList; //保存页面展示的数据
    // let files = this.state.files; //
    // //保存上传的文件
    // files.push({
    //   id: (data.length && data[0].id[0]) || '',
    //   name: (data.length && data[0].fileName) || ''
    // });
    // fjList.push({
    //   name: data[0].fileName,
    //   sourceName: '上传',
    //   createUserId: consignored.fullNameCn,
    //   id: data[0].id[0]
    // });
    // this.setState({
    //   contractInfo: data,
    //   enclosureList: fjList,
    //   files: files
    // });
  };

  /***修改 */
  updateClientItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    if (item.intreReachStatus == 3) {
      message.error('已拆分确认，不能修改');
      return;
    }

    changeTableRow({ value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'bd'
    });
  };

  /***删除 */
  deleteClientItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;

    if (item.intreReachStatus == 3) {
      message.error('已拆分确认，不能删除');
      return;
    }

    changeTableRow({ value: item });
    openFormModal({
      type: 'delete',
      status: true,
      sign: 'bd'
    });
  };

  /*导出当前*/
  exportCurrentPage = status => {
    const { FieldList } = this.state;
    const { queryElement, settlementList } = this.props;
    let index = FieldList.indexOf('checkStatusName');
    FieldList[index] = 'checkStatus';
    let total;
    if (status) {
      total = settlementList.total;
    }
    exportFile(
      '/bmtp-settle-manage/payment/bondPayment/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '债券付息兑付',
      status,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    let index = FieldList.indexOf('checkStatusName');
    FieldList[index] = 'checkStatus';
    exportSelectFile(
      '/bmtp-settle-manage/payment/bondPayment/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '债券付息兑付'
    );
  };
}

export default Settlement;
