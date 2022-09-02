import React, { PureComponent } from 'react';
import {
  Modal,
  ConfigableTable,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  withRoleTableBotton,
  SearchForm,
  exportFile,
  exportSelectFile
} from 'yss-biz';
import TransactionFormRule from './TransactionFormRule.js';
const { mapOption } = SearchForm;
class Transaction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMoreShow: false,
      ids: [],
      relatedSubjectCodes: []
    };
  }
  render() {
    const {
      transactionColumns,
      transactionList,
      transactionAccountList,
      isOpenFormModal,
      openFormModal,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      asyncHttpUpdateStatus,
      treeList,
      changeQueryElement
    } = this.props;
    let that = this;
    let SearchformItem = [
      {
        name: 'productName',
        label: '账户主体层级',
        type: 'TreeSelect',
        props: {
          placeholder: '请输入账户主体层级',
          treeData: treeList,
          multiple: true,
          onChange(value) {
            that.setState({
              relatedSubjectCodes: value
            });
          }
        }
      },
      {
        name: 'BondAccont',
        label: '交易账户',
        type: 'Select',
        props: {
          placeholder: '请选择交易账户',
          onChange(value) {
            changeQueryElement({
              type: 'queryTransactionElement',
              element: 'tradeAccountSn',
              value
            });
          }
        },
        options: mapOption(transactionAccountList, 'tradeAccountName', 'tradeAccountSn')
      },
      {
        name: 'bondStatus',
        label: '交易账户状态',
        type: 'Select',
        props: {
          placeholder: '请选择交易账户状态',
          getDics: 1030001,
          onChange(value) {
            changeQueryElement({
              type: 'queryTransactionElement',
              element: 'accountStatus',
              value
            });
          }
        }
      },
      {
        name: 'checkStatus',
        label: '审核状态',
        type: 'Select',
        props: {
          placeholder: '请选择审核状态',
          getDics: 1030002,
          onChange(value) {
            changeQueryElement({ type: 'queryTransactionElement', element: 'checkStatus', value });
          }
        }
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '新增',
        roule: true,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'transaction' });
        }
      },
      {
        name: '审核',
        roule: true,
        func: () => {
          asyncHttpBatchexamine({ type: 'bondAccount', params: this.state.ids });
        }
      },
      {
        name: '反审核',
        roule: true,
        func: () => {
          asyncHttpUncheckAccount({ type: 'bondAccount', params: this.state.ids });
        }
      },
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: this.exportAll
          },
          {
            name: '导出当前页'
          },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }
    ];

    const ButtonTableType = [
      {
        name: '修改',
        roule: true,
        func: this.updateTransactionItem
      },
      {
        name: '启动',
        roule: true,
        type: 'tradeAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '停用',
        roule: true,
        type: 'tradeAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '删除',
        roule: true,
        func: this.deleteTransactionItem
      },
      {
        name: '注销',
        roule: true,
        type: 'tradeAccount',
        func: asyncHttpUpdateStatus
      }
    ];
    const columns = [
      ...setColumns(transactionColumns),
      {
        title: '操作',
        key: 'operation',
        width: 300,
        fixed: 'right',
        align: 'center',
        render: row => withRoleTableBotton(ButtonTableType)(row)
      }
    ];

    /***表格分页***/

    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <>
        <SearchForm
          labelSize="8em"
          lineOf={3}
          moreTypeModal
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType)}
        <ConfigableTable
          {...setTableInfo({ columns, dataSource: transactionList, rowSelection })}
          onRow={record => {
            return {
              // onDoubleClick: event => { this.viewBelieve(event, record) }
            };
          }}
          rowKey={'id'}
          pagination={pagination}
        />
        {isOpenFormModal.sign === 'transaction' ? (
          <Modal
            width={1100}
            title={
              isOpenFormModal.type === 'update'
                ? '修改交易账户'
                : isOpenFormModal.type === 'delete'
                ? '删除交易账户'
                : '增加交易账户'
            }
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ type: 'add', status: false });
            }}
          >
            <TransactionFormRule {...this.props}></TransactionFormRule>
          </Modal>
        ) : (
          ''
        )}
      </>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetTradeRefBatch, treeItemed } = this.props;
    await asyncHttpGetTradeRefBatch({ codes: [treeItemed.code] });
  }

  /***更新*/
  updateTransactionItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ type: 'transactioned', value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'transaction'
    });
  };

  deleteTransactionItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ type: 'transactioned', value: item });
    openFormModal({
      type: 'delete',
      status: true,
      sign: 'transaction'
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpAccountlList, queryTransactionElement, treeItemed } = this.props;
    let newQueryTransactionElement = {
      ...queryTransactionElement,
      relatedSubjectCodes: [treeItemed.code, ...this.state.relatedSubjectCodes]
    };
    asyncHttpAccountlList({
      params: filterNullElement(newQueryTransactionElement),
      type: 'tradeAccount'
    });
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize, changeQueryElement) => {
    const { asyncHttpAccountlList, queryTransactionElement, treeItemed } = this.props;
    changeQueryElement({ type: 'queryTransactionElement', element: 'reqPageSize', value: page });
    let newQueryBandElement = {
      ...queryTransactionElement,
      relatedSubjectCodes: [treeItemed.code, ...this.state.relatedSubjectCodes]
    };
    asyncHttpAccountlList({
      params: newQueryBandElement,
      type: 'tradeAccount',
      list: 'transactionList'
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { queryTransactionElement } = this.props;
    exportFile(
      '/bmtp-product-manage/account/export/exportTradeByCondition',
      filterNullElement(queryTransactionElement),
      '交易账户',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { queryTransactionElement } = this.props;
    exportFile(
      '/bmtp-product-manage/account/export/exportTradeByCondition',
      filterNullElement(queryTransactionElement),
      '交易账户',
      true
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    exportSelectFile(
      '/bmtp-product-manage/account/export/exportTradeSelected',
      this.state.ids,
      '交易账户'
    );
  };
}

export default Transaction;
