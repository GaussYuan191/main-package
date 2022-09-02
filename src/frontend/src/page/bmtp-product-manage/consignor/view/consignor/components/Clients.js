import React, { PureComponent } from 'react';
import {
  ConfigableTable,
  SearchForm,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  selectPageRequest,
  rowSelectionFunc,
  withRoleBotton,
  withRoleTableBotton,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import { page } from 'yss-biz/utils/util/constant';
import CapitalFormRule from './ClientFormRule';
const { mapOption, mapOptionWithNameCode } = SearchForm;
class Clients extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      consignorColumn,
      consignorList,
      consignorDownList,
      isOpenFormModal,
      openFormModal,
      changeQueryElement,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      resetJiGou,
      queryConsignorElement,
    } = this.props;

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'publisherName',
        label: '管理人',
        type: 'Input',
        props: {
          placeholder: '请输入管理人',
          // configDics: selectPageRequest,
          // type: 'consignor',
          // dropdownWidth: 250,
          onChange(e) {
            console.log(e.target.value)
            let value=e.target.value
            changeQueryElement({ type: 'queryConsignorElement', element: 'code', value });
          }
        }
        // options: mapOptionWithNameCode(consignorDownList, 'fullNameCn', 'code')
      },
      {
        name: 'checkStatus',
        label: '审核状态',
        type: 'Select',
        props: {
          placeholder: '请选择审核状态',
          getDics: 1030002,
          onChange(value) {
            changeQueryElement({ type: 'queryConsignorElement', element: 'checkStatus', value });
          }
        }
      }
    ];
    /**表格信息**/
    const columns = [
      ...setColumns(consignorColumn),
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: row => {
          if (row.checkStatus == '1') {
            return withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row);
          } else if (row.checkStatus == '2') {
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
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true });
        }
      },
      {
        name: '审核',
        roule: functionRolue.CHECK,
        func: () => {
          asyncHttpBatchexamine({
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
          asyncHttpUncheckAccount({ params: this.state.ids, callback: this.toEmptySelect }).then(
            () => {
              // this.toEmptySelect();
            }
          );
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

    /***表格分页***/
    const pagination = {
      total: consignorList.total,
      pageSize: queryConsignorElement.reqPageSize,
      current: queryConsignorElement.reqPageNum,
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
          labelSize="4em"
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
            dataSource: consignorList,
            cloumsCode,
            rowSelection,
            rowKey: 'id',
            pagination: pagination,
            height: 450,
            tableHeader: 'double'
          })}
          // onRow={record => {
          //   return {
          //     onClick: event => {
          //       this.changeDocument(record);
          //     }
          //   };
          // }}
        />
        <Modal
          width={1400}
          title={
            isOpenFormModal.type === 'update'
              ? '修改管理人'
              : isOpenFormModal.type === 'delete'
              ? '删除管理人'
              : '新增管理人'
          }
          visible={isOpenFormModal.status}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
            resetJiGou();
          }}
        >
          <CapitalFormRule {...this.props}></CapitalFormRule>
        </Modal>
      </>
    );
  }
  componentDidMount() {}
  updateClientItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'update',
      status: true
    });
  };

  deleteClientItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'delete',
      status: true
    });
  };
  /***模糊查询*/
  query = () => {
    const { asyncQueryClinetMount, queryConsignorElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryConsignorElement', element: 'reqPageNum', value: 1 });
    const queryParams = Object.assign(queryConsignorElement, { reqPageNum: 1 });
    asyncQueryClinetMount({ params: filterNullElement(queryParams) });
    this.toEmptySelect();
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryConsignorElement } = this.props;
    resetElement({
      reqPageSize: queryConsignorElement.reqPageSize,
      reqPageNum: queryConsignorElement.reqPageNum
    });
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncQueryClinetMount, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryConsignorElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryConsignorElement', element: 'reqPageSize', value: pageSize });
    asyncQueryClinetMount({
      params: filterNullElement({ reqPageNum: page, reqPageSize: pageSize })
    });
    this.toEmptySelect();
  };

  /**双击切换关联文档*/
  changeDocument(row) {
    const {
      asyncHttpDocument,
      asyncHttpGetContract,
      changeSubjectId,
      activePan,
      changeTableRow
    } = this.props;
    let params = {
      ...page,
      subjectId: row.id
    };
    changeSubjectId({ value: row.id });
    changeTableRow({ value: row });
    if (activePan == 'enclosure') {
      asyncHttpDocument({ params });
    } else {
      asyncHttpGetContract({ params });
    }
  }

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryConsignorElement } = this.props;
    exportFile(
      '/bmtp-product-manage/consignor/export/condition',
      filterNullElement({...queryConsignorElement, includeFieldList: FieldList}),
      '管理人',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryConsignorElement, consignorList } = this.props;
    exportFile(
      '/bmtp-product-manage/consignor/export/condition',
      filterNullElement({...queryConsignorElement,includeFieldList: FieldList}),
      '管理人',
      true,
      consignorList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-product-manage/consignor/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '管理人'
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

export default Clients;
