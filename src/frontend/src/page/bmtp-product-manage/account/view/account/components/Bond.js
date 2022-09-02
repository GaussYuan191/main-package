import React, { PureComponent } from 'react';
import {
  ConfigableTable,
  SearchForm,
  withRoleBotton,
  withRoleTableBotton,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import { message } from 'antd';
import BondFormRule from './BondFormRule';
class Bond extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      bondColumns,
      bondList,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      asyncHttpUpdateStatus,
      // bondAccountList,
      isOpenFormModal,
      openFormModal,
      // treeList,
      queryBandElement,
      changeQueryElement
      // asyncHttpGetBondRefBatch,
    } = this.props;

    /***表格参数***/
    const columns = [
      ...setColumns(bondColumns),
      {
        title: '操作',
        key: 'operation',
        width: 290,
        fixed: 'right',
        align: 'center',
        render: item => {
          // if (item.accountType != '4' && item.accountType != '3') {
          //   return item.checkStatus == '1'
          //     ? withRoleTableBotton(ButtonTableType)(item)
          //     : withRoleTableBotton([
          //         {
          //           name: '修改',
          //           roule: true,
          //           func: this.updateBondItem
          //         },
          //         ...ButtonTableType
          //       ])(item);
          // } else {
          //   return null;
          // }
          return item.checkStatus == '1'
            ? withRoleTableBotton(ButtonTableType, this.props.btnAuth)(item)
            : withRoleTableBotton(
                [
                  {
                    name: '修改',
                    roule: true,
                    func: this.updateBondItem
                  },
                  ...ButtonTableType
                ],
                this.props.btnAuth
              )(item);
        }
      }
    ];

    /***table按钮组***/
    const ButtonTableType = [
      {
        name: '启动',
        roule: true,
        type: 'bondAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '停用',
        roule: true,
        type: 'bondAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '删除',
        roule: true,
        func: this.deleteBondItem
      },
      {
        name: '注销',
        roule: true,
        type: 'bondAccount',
        func: asyncHttpUpdateStatus
      }
    ];

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'bondStatus',
        label: '债券托管账户状态',
        type: 'Select',
        labelSize: '8em',
        props: {
          placeholder: '请选择债券托管账户状态',
          getDics: 1030001,
          onChange(value) {
            changeQueryElement({ type: 'queryBandElement', element: 'accountStatus', value });
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
            changeQueryElement({ type: 'queryBandElement', element: 'checkStatus', value });
          }
        }
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'bond' });
        }
      },
      {
        name: '审核',
        roule: functionRolue.CHECK,
        func: () => {
          asyncHttpBatchexamine({
            type: 'bondAccount',
            params: this.state.ids,
            callback: this.toEmptySelect
          }).then(() => {
            // this.toEmptySelect();
          });
        }
      },
      {
        name: '反审核',
        roule: functionRolue.UNCHECK,
        func: () => {
          asyncHttpUncheckAccount({
            type: 'bondAccount',
            params: this.state.ids,
            callback: this.toEmptySelect
          }).then(() => {
            // this.toEmptySelect();
          });
        }
      },
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
    ];

    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    /***表格分页***/
    const pagination = {
      total: bondList.total,
      pageSize: queryBandElement.reqPageSize,
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

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          moreTypeModal
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleReset={this.handleReset}
          handleSearch={value => {
            this.query();
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: bondList,
            cloumsCode,
            rowSelection,
            pagination,
            rowKey: 'id',
            height: 450
          })}
          onRow={record => {
            return {
              // onDoubleClick: event => {
              //   this.viewBelieve(event, record);
              // }
            };
          }}
        />
        {isOpenFormModal.sign === 'bond' ? (
          <Modal
            width={1100}
            title={
              isOpenFormModal.type === 'update'
                ? '修改债券托管账户'
                : isOpenFormModal.type === 'delete'
                ? '删除债券托管账户'
                : '新增债券托管账户'
            }
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ type: 'add', status: false, sign: '' });
            }}
          >
            <BondFormRule {...this.props}></BondFormRule>
          </Modal>
        ) : (
          ''
        )}
      </>
    );
  }
  async componentDidMount() {
    // const { asyncHttpBondAccountType } = this.props;
    // await asyncHttpGetBondRefBatch({ codes: [treeItemed.code] });
    // await asyncHttpBondAccountType({});
  }

  updateBondItem = (e, item) => {
    e.stopPropagation();
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ type: 'bonded', value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'bond'
    });
  };

  deleteBondItem = (e, item) => {
    e.stopPropagation();
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ type: 'bonded', value: item });
    openFormModal({
      type: 'delete',
      status: true,
      sign: 'bond'
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpAccountlList, queryBandElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryBandElement', element: 'reqPageNum', value: 1 });
    let newQueryBandElement = {
      ...queryBandElement,
      reqPageNum: 1
    };
    asyncHttpAccountlList({ params: filterNullElement(newQueryBandElement), type: 'bondAccount' });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncHttpAccountlList, queryBandElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryBandElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryBandElement', element: 'reqPageSize', value: pageSize });
    let newQueryBandElement = {
      ...queryBandElement,
      reqPageNum: page,
      reqPageSize: pageSize
    };
    asyncHttpAccountlList({
      params: filterNullElement(newQueryBandElement),
      type: 'bondAccount',
      list: 'bondList'
    });
    this.toEmptySelect();
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement } = this.props;
    resetElement('queryBandElement');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryBandElement, treeItemed } = this.props;
    if (!treeItemed.floor) {
      message.warn('请先选择产品信息');
      return;
    }
    const params = {
      ...queryBandElement,
      relatedSubjectIdList: treeItemed.floor >= 3 ? (treeItemed.key ? [treeItemed.key] : []) : '',
      relatedSubjectCodes: treeItemed.code ? [treeItemed.code] : [],
      includeFieldList: FieldList
    };
    exportFile(
      '/bmtp-product-manage/account/export/exportBondByCondition',
      filterNullElement(params),
      '债券账户',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryBandElement, treeItemed, bondList } = this.props;
    let params = {
      relatedSubjectIdList: treeItemed.floor >= 3 ? (treeItemed.key ? [treeItemed.key] : []) : '',
      relatedSubjectCodes: treeItemed.code ? [treeItemed.code] : [],
      ...queryBandElement,
      includeFieldList: FieldList
    };
    exportFile(
      '/bmtp-product-manage/account/export/exportBondByCondition',
      filterNullElement(params),
      '债券账户',
      true,
      bondList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-product-manage/account/export/exportBondSelected',
      { includeFieldList: FieldList, rows: ids },
      '债券账户'
    );
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };
}

export default Bond;
