import React, { PureComponent } from 'react';
import {
  SearchForm,
  ConfigableTable,
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
  NormalForm,
  cloumsFunc
} from 'yss-biz';
import { message, Modal as AntModal } from 'antd';
import CapitalFormRule from './CapitalFormRule';

class Capital extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    visible: false,
    FieldList: []
  };

  render() {
    const {
      capitalColumns,
      capitalList,
      // capitalAccountList,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      asyncHttpUpdateStatus,
      isOpenFormModal,
      openFormModal,
      // treeList,
      changeQueryElement,
      queryCapitalElement
    } = this.props;
    const { visible } = this.state;
    let that = this;
    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'type',
        label: '账户类型',
        type: 'Select',
        props: {
          placeholder: '请选择账户类型',
          getDics: 1030003,
          onChange(value) {
            changeQueryElement({ type: 'queryCapitalElement', element: 'accountType', value });
          }
        }
      },
      {
        name: 'bondStatus',
        label: '资金账号状态',
        type: 'Select',
        props: {
          placeholder: '请选择资金账号状态',
          getDics: 1030001,
          onChange(value) {
            changeQueryElement({ type: 'queryCapitalElement', element: 'accountStatus', value });
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
            changeQueryElement({ type: 'queryCapitalElement', element: 'checkStatus', value });
          }
        }
      }
    ];

    const formItems = [
      {
        name: 'productCodeList',
        label: `产品代码`,
        type: 'Input',
        props: {
          placeholder: '以逗号","分隔查询多个',
          disabled: false
        },
        rules: [
          {
            required: true,
            message: '产品代码不能为空'
          }
        ]
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'capital' });
        }
      },
      {
        name: '审核',
        roule: functionRolue.CHECK,
        func: () => {
          asyncHttpBatchexamine({
            type: 'assetAccount',
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
            type: 'assetAccount',
            params: this.state.ids,
            callback: this.toEmptySelect
          }).then(() => {
            // this.toEmptySelect();
          });
        }
      },
      {
        name: '同步估值系统产品数据',
        roule: functionRolue.UNCHECK,
        func: () => {
          this.setState({ visible: true });
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

    /***表格行按钮组***/
    const ButtonTableType = [
      {
        name: '启动',
        roule: true,
        type: 'assetAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '停用',
        roule: true,
        type: 'assetAccount',
        func: asyncHttpUpdateStatus
      },
      {
        name: '删除',
        roule: true,
        func: this.deleteCapitalItem
      },
      {
        name: '注销',
        roule: true,
        status: '2',
        type: 'assetAccount',
        func: asyncHttpUpdateStatus
      }
    ];

    const formatColumns = setColumns(capitalColumns);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    const columns = [
      ...formatColumns,
      {
        title: '操作',
        key: 'operation',
        width: 290,
        fixed: 'right',
        align: 'center',
        render: row => {
          return row.checkStatus == '1'
            ? withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row)
            : withRoleTableBotton(
                [
                  {
                    name: '修改',
                    roule: true,
                    func: this.updateCapitalItem
                  },
                  ...ButtonTableType
                ],
                this.props.btnAuth
              )(row);
        }
      }
    ];

    /***表格分页***/
    const pagination = {
      total: capitalList.total,
      pageSize: queryCapitalElement.reqPageSize,
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
          handleSearch={value => {
            this.query();
          }}
          handleReset={this.handleReset}
          handleBeforeReset={() => true}
        />

        {withRoleBotton(ButtonType, this.props.btnAuth)}

        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: capitalList,
            rowSelection,
            cloumsCode,
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

        {isOpenFormModal.sign === 'capital' ? (
          <Modal
            width={1100}
            title={
              isOpenFormModal.type === 'update'
                ? '修改资金账户'
                : isOpenFormModal.type === 'delete'
                ? '删除资金账户'
                : isOpenFormModal.type == 'add'
                ? '增加资金账户'
                : '查看'
            }
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ type: 'add', status: false, sign: '' });
            }}
          >
            <CapitalFormRule {...this.props}></CapitalFormRule>
          </Modal>
        ) : (
          ''
        )}

        <AntModal
          visible={visible}
          width={650}
          title="同步估值系统产品数据"
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onOk={this.handleSubmit}
          destroyOnClose={true}
          zIndex={100}
        >
          <NormalForm
            refs={ref => (this.createBondAccount = ref)}
            labelSize="8em"
            lineOf={1}
            formItem={formItems}
          />
        </AntModal>
      </>
    );
  }

  updateCapitalItem = (e, item) => {
    e.stopPropagation();
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ type: 'capitaled', value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'capital'
    });
  };
  deleteCapitalItem = (e, item) => {
    e.stopPropagation();
    const { changeTableRow, openFormModal } = this.props;
    changeTableRow({ type: 'capitaled', value: item });
    openFormModal({
      type: 'delete',
      status: true,
      sign: 'capital'
    });
  };

  /***双击查看详情*/
  // viewBelieve (event, item) {
  //   const { changeTableRow, openFormModal } = this.props;
  //   changeTableRow({ type: 'capitaled', value: item });
  //   openFormModal({
  //     type: 'see',
  //     status: true,
  //     sign: 'capital'
  //   });
  // }

  /***模糊查询*/
  query = () => {
    const { asyncHttpAccountlList, queryCapitalElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryCapitalElement', element: 'reqPageNum', value: 1 });
    let newQueryCapitalElement = {
      ...queryCapitalElement,
      reqPageNum: 1
    };

    asyncHttpAccountlList({
      params: filterNullElement(newQueryCapitalElement),
      type: 'assetAccount'
    });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncHttpAccountlList, queryCapitalElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryCapitalElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryCapitalElement', element: 'reqPageSize', value: pageSize });
    let newQueryCapitalElement = {
      ...queryCapitalElement,
      reqPageNum: page,
      reqPageSize: pageSize
    };
    asyncHttpAccountlList({
      params: filterNullElement(newQueryCapitalElement),
      type: 'assetAccount'
    });
    this.toEmptySelect();
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement } = this.props;
    resetElement('queryCapitalElement');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryCapitalElement, treeItemed } = this.props;
    if (!treeItemed.floor) {
      message.warn('请先选择产品信息');
      return;
    }
    const params = {
      ...queryCapitalElement,
      relatedSubjectIdList: treeItemed.floor >= 3 ? (treeItemed.key ? [treeItemed.key] : []) : '',
      relatedSubjectCodes: treeItemed.code ? [treeItemed.code] : [],
      includeFieldList: FieldList
    };

    exportFile(
      '/bmtp-product-manage/account/export/exportAssetByCondition',
      filterNullElement(params),
      '资金账户',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryCapitalElement, treeItemed, capitalList } = this.props;
    let params = {
      relatedSubjectIdList: treeItemed.floor >= 3 ? (treeItemed.key ? [treeItemed.key] : []) : '',
      relatedSubjectCodes: treeItemed.code ? [treeItemed.code] : [],
      ...queryCapitalElement,
      includeFieldList: FieldList
    };
    exportFile(
      '/bmtp-product-manage/account/export/exportAssetByCondition',
      filterNullElement(params),
      '资金账户',
      true,
      capitalList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-product-manage/account/export/exportAssetSelected',
      { includeFieldList: FieldList, rows: ids },
      '资金账户'
    );
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 同步估值系统产品数据--提交
  handleSubmit = e => {
    e.preventDefault();
    const { asyncHttpRequestProductInfoByACS } = this.props;
    let form = this.createBondAccount.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let arr = values.productCodeList.split(',');
      asyncHttpRequestProductInfoByACS(arr).then(res => {
        this.setState({ visible: false });
      });
    });
  };
}

export default Capital;
