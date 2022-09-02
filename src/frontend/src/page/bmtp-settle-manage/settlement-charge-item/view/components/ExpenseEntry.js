import React, { PureComponent } from 'react';
import { message, modal } from 'antd';
import {
  ConfigableTable,
  SearchForm,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  exportFile,
  exportSelectFile,
  cloumsFunc
} from 'yss-biz';
import ExpenseEntryRelation from './ExpenseEntryRelation';
import ExpenseEntryMerge from './ExpenseEntryMerge';
// 费用条目页面主页面
class ExpenseEntry extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };
  render() {
    const {
      expenseEntryColumn,
      expenseEntryList,
      changeQueryElement,
      toResetSearch,
      isOpenFormModal,
      openFormModal
    } = this.props;

    /***查询表单项 */
    let SearchformItem = [
      {
        name: 'startTime',
        label: '发生日期',
        type: 'RangePicker',
        itemSize: '250px',
        labelSize: '6em',
        props: {
          placeholder: '请选择发生日期',
          allowClear: true,
          onChange(dates, dateString) {
            changeQueryElement({
              element: 'startBeginTime',
              value: dateString[0]
            });
            changeQueryElement({
              element: 'startEndTime',
              value: dateString[1]
            });
          }
        }
      },
      {
        name: 'expenseItem',
        label: '费用项目',
        type: 'Select',
        props: {
          placeholder: '请选择费用项目',
          getDics: 1030137,
          onChange(value) {
            changeQueryElement({ element: 'expenseItem', value });
          }
        }
      },
      {
        name: 'businessSerialNumber',
        label: '业务流水号',
        type: 'Input',
        labelSize: '70px',
        props: {
          placeholder: '请输入业务流水号',
          onChange(e) {
            let value = e.target.value;
            changeQueryElement({ element: 'businessSerialNumber', value });
          }
        }
      }
    ];
    /**表格信息*/
    const columns = [...setColumns(expenseEntryColumn)];
    /**按钮组*/
    const ButtonType = [
      {
        name: '关联',
        icon: 'edit',
        func: this.relation
      },
      {
        name: '账单合成',
        icon: 'edit',
        func: this.billMerge
      },
      {
        name: '删除',
        icon: 'delete',
        func: this.delList
      },
      {
        name: '审核',
        func: this.check
      },
      {
        name: '反审核',
        func: this.uncheck
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

    /**表格分页*/
    const pagination = {
      total: this.props.expenseEntryList.total,
      current: this.props.expenseEntryElement.reqPageNum,
      pageSize: this.props.expenseEntryElement.reqPageSize,
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

    /**点击索引获取行的ID*/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <SearchForm
          labelSize="4em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleReset={() => {
            toResetSearch({
              reqPageNum: this.props.expenseEntryElement.reqPageNum,
              reqPageSize: this.props.expenseEntryElement.reqPageSize
            });
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: expenseEntryList.list,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: 450
          })}
        />
        <Modal
          width={1200}
          key={isOpenFormModal.type}
          title={
            isOpenFormModal.type == 'relation'
              ? '费用条目关联'
              : isOpenFormModal.type == 'merge'
              ? '账单合成'
              : '修改'
          }
          destroyOnClose={true}
          visible={
            isOpenFormModal.status &&
            (isOpenFormModal.type == 'relation' ||
              isOpenFormModal.type == 'merge' ||
              isOpenFormModal.type == 'update')
          }
          onCancel={() => {
            openFormModal({ status: false });
          }}
          okText={isOpenFormModal.type == 'relation' ? '提交' : '确认'}
        >
          {isOpenFormModal.type == 'relation' ? (
            <ExpenseEntryRelation
              {...this.props}
              childrenList={this.state.ids}
              query={this.query}
            />
          ) : isOpenFormModal.type == 'merge' ? (
            <ExpenseEntryMerge {...this.props} query={this.query} />
          ) : null}
        </Modal>
      </>
    );
  }
  componentDidMount() {}

  /***模糊查询*/
  query = async () => {
    const { asyncHttpGetChargeItemPageList } = this.props;
    await asyncHttpGetChargeItemPageList();
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = async (page, pageSize) => {
    const { asyncHttpGetChargeItemPageList, changeQueryElement } = this.props;
    changeQueryElement({ element: 'reqPageNum', value: page });
    changeQueryElement({ element: 'reqPageSize', value: pageSize });
    await asyncHttpGetChargeItemPageList();
    this.toEmptySelect();
  };
  /**清空选项 */
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };
  /**关联 */
  relation = () => {
    const { openFormModal } = this.props;
    let data = this.state.ids;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].checkStatus != '1') {
          message.error('请选择审核的数据！');
          this.toEmptySelect();
          return;
        }
      }
      openFormModal({ status: true, type: 'relation' });
    } else {
      message.error('请选择数据！');
    }
  };
  /**账单合成 */
  billMerge = async () => {
    const { openFormModal, asyncHttpMergeList } = this.props;
    let data = this.state.ids;
    let params = [];
    if (data.length > 0) {
      // 按条目合成
      for (let i = 0; i < data.length; i++) {
        if (data[i].checkStatus == '1') {
          params.push(data[i].id);
        } else {
          message.error('请选择审核的数据！');
          this.toEmptySelect();
          return;
        }
      }
      await asyncHttpMergeList({ idList: params }).then(() => {
        this.query();
      });
    } else {
      // 时间合成
      openFormModal({ status: true, type: 'merge' });
    }
  };
  /**删除 */
  delList = () => {
    const { ids } = this.state;
    const { asyncHttpDelList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == 2) {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能删除');
          return;
        }
      }
      modal.confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDelList(arr);
          this.query();
        }
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**审核 */
  check = async () => {
    const { ids } = this.state;
    const { asyncHttpCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == '2') {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能审核');
          this.toEmptySelect();
          return;
        }
      }
      await asyncHttpCheckList(arr).then(() => {
        this.query();
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**反审核 */
  uncheck = async () => {
    const { ids } = this.state;
    const { asyncHttpUnCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == '1') {
          arr.push(n.id);
        } else {
          message.error('只有已审核的数据才能反审核');
          this.toEmptySelect();
          return;
        }
      }
      await asyncHttpUnCheckList(arr).then(() => {
        this.query();
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**删除 */
  del = async () => {
    const { ids } = this.state;
    const that = this;
    const { asyncHttpDelList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == 2) {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能删除');
          this.toEmptySelect();
          return;
        }
      }
      modal.confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDelList(arr).then(() => {
            that.query();
          });
        }
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { expenseEntryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeitem/export/condition',
      filterNullElement({ ...expenseEntryElement, includeFieldList: FieldList }),
      '费用条目',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { expenseEntryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeitem/export/condition',
      filterNullElement({ ...expenseEntryElement, includeFieldList: FieldList }),
      '费用条目',
      true,
      this.props.expenseEntryList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/charge/chargeitem/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '费用条目'
    );
    this.toEmptySelect();
  };
}

export default ExpenseEntry;
