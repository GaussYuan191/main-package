import React, { PureComponent } from 'react';
import { message, Modal as antdModel, modal } from 'antd';
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
  // page,
  selectPageRequest,
  functionRolue,
  filterPageElement,
  cloumsFunc
} from 'yss-biz';
import SettlementFormRule from './SettlementFormRule';
// const { mapOption } = SearchForm;
class Settlement extends PureComponent {
  state = {
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
      asyncHttpChargeSplit,
      asyncHttpChargeSplitConfirm,
      asyncHttpChargeUnSplitConfirm,
      toResetSearch,
      asyncHttpNoticeTransfer,
      asyncHttpGetAccountCostDetail,
      tableHight,
      active,
      chargeItemList
    } = this.props;

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        props: {
          placeholder: '请选择结算机构',
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          getDics: 1030404,
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'settleInstitution', value: targetValue });
            changeQueryElement({ element: 'settleInstitution', value });
          }
        }
      },
      {
        name: 'settleStatus',
        label: '费用结算状态',
        type: 'Select',
        props: {
          placeholder: '请选择费用结算状态',
          // mode: 'multiple',
          getDics: 1030145,
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'settleStatus', value: targetValue });
            changeQueryElement({ element: 'settleStatus', value });
          }
        }
      },
      {
        name: 'id',
        label: '费用编号',
        type: 'Input',
        props: {
          placeholder: '请输入费用编号',
          onChange: e => {
            let value = e.target.value;
            changeQueryElement({ element: 'id', value });
          }
        }
      },
      {
        name: 'chargeType',
        label: '费用类型',
        type: 'Select',
        props: {
          placeholder: '请选择费用类型',
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          getDics: 1030137,
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'chargeType', value: targetValue });
            changeQueryElement({ element: 'chargeType', value });
          }
        }
      },
      {
        name: 'productCode',
        label: '所属产品',
        type: 'Select',
        props: {
          placeholder: '请选择所属产品',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          type: 'product',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          // mode: 'multiple',
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'productCode', value: targetValue });
            changeQueryElement({ element: 'productCode', value });
          }
        }
      },
      {
        name: 'expenseStartDate',
        label: '费用计提开始日',
        type: 'DatePicker',
        props: {
          placeholder: '费用计提开始日',
          onChange(value) {
            const targetValue = value ? value.format('YYYY-MM-DD') : '';
            changeQueryElement({ element: 'expenseStartDate', value: targetValue });
          }
        }
      },
      {
        name: 'expenseEndDate',
        label: '费用计提截止日',
        type: 'DatePicker',
        props: {
          placeholder: '费用计提截止日',
          onChange(value) {
            const targetValue = value ? value.format('YYYY-MM-DD') : '';
            changeQueryElement({ element: 'expenseEndDate', value: targetValue });
          }
        }
      },
      {
        name: 'chargeStartDate',
        label: '费用缴纳开始日',
        type: 'DatePicker',
        props: {
          placeholder: '费用缴纳开始日',
          onChange(value) {
            const targetValue = value ? value.format('YYYY-MM-DD') : '';
            changeQueryElement({ element: 'chargeStartDate', value: targetValue });
          }
        }
      },
      {
        name: 'chargeEndDate',
        label: '费用缴纳截止日',
        type: 'DatePicker',
        props: {
          placeholder: '费用缴纳截止日',
          onChange(value) {
            const targetValue = value ? value.format('YYYY-MM-DD') : '';
            changeQueryElement({ element: 'chargeEndDate', value: targetValue });
          }
        }
      }
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
                  roule: true,
                  func: this.updateClientItem
                },
                ...ButtonTableType
              ],
              this.props.btnAuth
            )(row);
          } else if (row.checkStatus == '1') {
            return null; //withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row);
          }
        }
      }
    ];

    /***表格按钮组** */
    const ButtonTableType = [
      {
        name: '删除',
        roule: true,
        func: this.deleteClientItem
      }
    ];

    /***按钮组** */
    const ButtonType = [
      {
        name: '新增费用',
        roule: true,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'fy' });
        }
      },
      {
        name: '取消关联合成',
        roule: true,
        func: async () => {
          const { ids } = this.state;
          let params = [];
          if (ids.length !== 0) {
            const { asyncHttpCancelMergeList } = this.props;
            for (let i = 0; i < ids.length; i++) {
              if (ids[i].checkStatus == '2') {
                params.push(ids[i].id);
              } else {
                message.error('未审核的数据才能取消合成！');
                this.toEmptySelect();
                return;
              }
            }
            await asyncHttpCancelMergeList(params).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('请选择数据！');
          }
        }
      },
      {
        name: '生成划款',
        roule: true,
        func: async () => {
          const { ids } = this.state;
          let params = [];
          if (ids.length !== 0) {
            const { asyncHttpCreateTransfer } = this.props;
            for (let i = 0; i < ids.length; i++) {
              if (ids[i].checkStatus == '1') {
                params.push(ids[i].id);
              } else {
                message.error('只有已审核的数据才能生成划款！');
                this.toEmptySelect();
                return;
              }
            }
            await asyncHttpCreateTransfer(params).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.error('请选择数据！');
          }
        }
      },
      {
        name: '费用拆分',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }
          if (ids.length > 1) {
            message.warning('费用结算无法一次处理多个，请只勾选一个要拆分的数据！');
            return;
          }
          const row = ids[0];
          const { id, settleStatus } = row;
          if (row.checkStatus == 2) {
            message.error('未审核的数据不能进行费用拆分');
            return;
          }
          //settleStatus	string  费用结算状态（1、未拆分 2、已拆分 3、已确认 4、已通知 5、已过期）
          const canSplite = settleStatus === '1' || settleStatus === '2';

          if (canSplite) {
            if (settleStatus === '2') {
              antdModel.confirm({
                content: '所选数据已拆分，继续将重新拆分，是否继续 ？',
                okText: '是',
                cancelText: '否',
                onOk: close => {
                  asyncHttpChargeSplit({ params: { id } }).then(() => {
                    this.toEmptySelect();
                  });
                  close();
                }
              });
            } else {
              asyncHttpChargeSplit({ params: { id } }).then(() => {
                this.toEmptySelect();
              });
            }
          } else {
            message.warning(
              '所选数据处于已确认或已通知或已过期状态，如要继续，请先调整数据状态为未拆分或已拆分！'
            );
          }
        }
      },
      {
        name: '拆分确认',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }
          if (ids.length > 1) {
            message.warning('拆分确认无法一次处理多个，请只勾选一个数据！');
            return;
          }

          const row = ids[0];
          const { id, settleStatus } = row;

          if (row.checkStatus == 2) {
            message.error('未审核的数据不能进行拆分确认');
            return;
          }

          const canSpliteVerify = settleStatus === '2';
          if (canSpliteVerify) {
            asyncHttpChargeSplitConfirm({ params: { id } }).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.warning(
              '只有已拆分的数据，才能进行拆分确认操作，请选择已拆分的数据进行拆分确认！'
            );
          }
        }
      },
      {
        name: '取消确认',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }
          if (ids.length > 1) {
            message.warning('取消确认无法一次处理多个，请只勾选一个数据！');
            return;
          }
          const row = ids[0];
          const { id, settleStatus } = row;

          if (row.checkStatus == 2) {
            message.error('未审核的数据不能进行取消确认');
            return;
          }

          const canCancelVerify = settleStatus === '3' || settleStatus === '4';
          if (canCancelVerify) {
            asyncHttpChargeUnSplitConfirm({ params: { id } }).then(() => {
              this.toEmptySelect();
            });
          } else {
            message.warning(
              '只有已确认 或 已通知的数据，才能进行取消确认操作，请选择正确的数据进行取消确认！'
            );
          }
        }
      },
      {
        name: '审核',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }

          const { asyncHttpToCheckData } = this.props;
          const me = this;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有未审核的数据才可以审核
          ids.map(item => {
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
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }

          const { asyncHttpToUnCheckData } = this.props;
          const me = this;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有已审核的数据才可以审核
          ids.map(item => {
            if (item.checkStatus == '1') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToUnCheckData(data).then(() => {
                me.toEmptySelect();
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
        name: '通知划款',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          if (!ids || ids.length === 0) {
            message.error('请选择数据！');
            return;
          }

          const row = ids[0];
          if (row.checkStatus == 2) {
            message.error('未审核的数据不能进行通知划款');
            return;
          }

          // 加入对功能的限制，只有settleStatus === '3' || settleStatus === '4';的状态，才可以触发该功能；
          const params = ids
            .map(row => {
              const { id, settleStatus } = row;
              const canNoticeTransfer = settleStatus === '3' || settleStatus === '4';
              if (canNoticeTransfer) {
                return row;
              } else {
                message.warning(
                  `信息id为${id}的行信息，未处于已确认 或 通知状态，无法触发划款通知的功能`
                );
              }
            })
            .filter(row => row !== undefined);

          asyncHttpNoticeTransfer({ params }).then(() => {
            this.toEmptySelect();
          });
        }
      },
      {
        name: '已出账单费用明细查询',
        roule: true,
        func: () => {
          const ids = this.state.ids;
          let flag = ids.find(
            item => item.checkStatus === '1' || Boolean(item.paymentNotice) === false
          );
          if (flag) {
            message.error('只能勾选有缴费通知编号且未审核的项');
            this.toEmptySelect();
          } else {
            let paymentNoticeList = ids.map(item => item.paymentNotice);
            asyncHttpGetAccountCostDetail(paymentNoticeList).then(() => {
              this.toEmptySelect();
            });
          }
        }
      },
      // {
      //   name: '导入',
      //   roule: true,
      //   func: () => {
      //     // asyncHttpUncheckAccount({ params: this.state.ids });
      //   }
      // },
      {
        name: '导出',
        roule: functionRolue.EXPORT,
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
      // {
      //   name: '打印',
      //   disable: true,
      //   roule: functionRolue.PRINT,
      //   func: () => {
      //     // asyncHttpUncheckAccount({ params: this.state.ids });
      //   }
      // }
    ];

    /***表格分页***/
    const pagination = {
      total: this.props.settlementTotal,
      current: this.props.queryElement.reqPageNum,
      pageSize: this.props.queryElement.reqPageSize,
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
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
          handleReset={() => {
            toResetSearch({
              reqPageNum: this.props.queryElement.reqPageNum,
              reqPageSize: this.props.queryElement.reqPageSize
            });
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: settlementList,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: tableHight,
            onRow: record => ({
              onClick: event => {
                setTimeout(() => {
                  if (active === '1') {
                    this.setAboutDetail(event, record);
                  }
                  if (active === '2') {
                    this.changeAbout(event, record);
                  }
                }, 300);
              }
            })
          })}
        />
        <Modal
          width={1400}
          title={
            isOpenFormModal.type === 'update'
              ? '修改结算费用'
              : isOpenFormModal.type === 'delete'
              ? '删除结算费用'
              : '新增结算费用'
          }
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'fy'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <SettlementFormRule {...this.props}></SettlementFormRule>
        </Modal>
      </>
    );
  }
  componentDidMount() {
    // const { asyncHttpGetList } = this.props;
    // asyncHttpGetList({});
    this.toInitTab('1');
  }

  /* 初始化tab */
  toInitTab = initTab => {
    const { changeTab } = this.props;
    changeTab({ value: initTab });
  };

  /**点击指令切换切换关联 */
  changeAbout = (e, row) => {
    const { asyncHttpgetChargeItemPageList, changeTableRow } = this.props;
    changeTableRow({ value: row });
    let params = {
      parentId: row.id
    };
    asyncHttpgetChargeItemPageList(params);
  };

  // 获取关联信息区域的表格信息，并更新其对应的state
  setAboutDetail = async (event, record) => {
    const { saveParentId, saveParentSettleStatus } = this.props;
    //settleStatus	string  费用结算状态（1、未拆分 2、已拆分 3、已确认 4、已通知 5、已过期）
    const isSplited = record.settleStatus !== '1';
    if (isSplited) {
      const { asyncHttpGetChargeProductDetail, asyncHttpGetChargeTotal } = this.props;
      const id = record.id;
      saveParentId(id);
      saveParentSettleStatus(record.settleStatus);
      await asyncHttpGetChargeProductDetail({ params: { id } });
      await asyncHttpGetChargeTotal(id);
    } else {
      message.warn(`结算状态为未拆分的数据，无法获取相关的详细信息`);
      const { cleanAboutList } = this.props;
      // 当选择 未拆分的数据时，清除B区的显示数据，并清除之前暂存的父级相关的参数信息；
      cleanAboutList();
      saveParentId('');
      saveParentSettleStatus('');
    }
  };

  /***修改 */
  updateClientItem = (e, item) => {
    //settleStatus	string  费用结算状态（1、未拆分 2、已拆分 3、已确认 4、已通知 5、已过期）’
    try {
      e.stopPropagation();
    } catch (error) {
      console.error(error, 'e不存在，导致阻止冒泡失败');
    }
    const canUpdate = item.settleStatus === '1' || item.settleStatus === '2';
    if (canUpdate) {
      const { openFormModal, changeTableRow } = this.props;
      changeTableRow({ value: item });
      openFormModal({
        type: 'update',
        status: true,
        sign: 'fy'
      });
    } else {
      message.warning('处于已确认或已通知或已过期状态的数据，不能被编辑修改！请注意！');
    }
  };

  /***删除 */
  deleteClientItem = (e, item) => {
    try {
      e.stopPropagation();
    } catch (error) {
      console.error(error, 'e不存在，导致阻止冒泡失败');
    }
    //settleStatus	string  费用结算状态（1、未拆分 2、已拆分 3、已确认 4、已通知 5、已过期）
    const canDelete = item.settleStatus === '1' || item.settleStatus === '2';
    if (canDelete) {
      const { openFormModal, changeTableRow } = this.props;
      changeTableRow({ value: item });
      openFormModal({
        type: 'delete',
        status: true,
        sign: 'fy'
      });
    } else {
      message.warning('处于已确认或已通知或已过期状态的数据，不能被删除！请注意！');
    }
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList } = this.props;
    asyncHttpGetList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryElement', element: 'reqPageSize', value: pageSize });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/charge/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '费用结算费用',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/charge/export/condition',
      filterPageElement({ ...queryElement, includeFieldList: FieldList }),
      '费用结算费用',
      true,
      this.props.settlementTotal
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/charge/charge/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '费用结算费用'
    );
    this.toEmptySelect();
  };
}

export default Settlement;
