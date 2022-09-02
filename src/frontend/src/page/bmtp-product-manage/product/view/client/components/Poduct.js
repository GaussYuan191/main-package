import React, { PureComponent } from 'react';
import {
  SearchForm,
  withRoleBotton,
  withRoleTableBotton,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  selectRequest,
  selectPageRequest,
  ConfigableTable,
  exportFile,
  exportSelectFile,
  page,
  cloumsFunc
} from 'yss-biz';
import PoductFormRule from './PoductFormRule';
class ProductManagement extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      poductList,
      tableListColumn,
      isOpenFormModal,
      openFormModal,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      asyncHttpUpdateEnableStatus,
      changeQueryElement,
      queryProductElement,
      tableHight = 450
    } = this.props;
    const columns = [
      ...setColumns(tableListColumn),
      {
        title: '产品启用状态',
        dataIndex: 'productEnableStatusName',
        width: 150
        // render: row => {
        //   // productEnableStatus	string 产品启停状态（2：停用，1：启用，3：注销）
        //   // 颜色使用：未审核 红色  注销灰色  停用黄色
        //   let displayValue = '';
        //   let targetColor = '#B5D8FF';
        //   switch (row) {
        //     case '1':
        //       displayValue = '启用';
        //       targetColor = '#67C23A';
        //       break;
        //     case '2':
        //       displayValue = '停用';
        //       targetColor = '#E6A23C';
        //       break;
        //     case '3':
        //       displayValue = '注销';
        //       targetColor = '#7a8395';
        //       break;
        //     default:
        //       displayValue = '';
        //   }
        //   return (
        //     <span
        //       style={{
        //         color: targetColor
        //       }}
        //     >
        //       {displayValue}
        //     </span>
        //   );
        // }
      },
      // {
      //   title: '产品状态',
      //   key: 'productStatus',
      //   width: 250,
      //   dataIndex: 'productStatus',
      //   width: 150,
      //   align: 'center',
      //   render: row => (
      //     <span
      //       style={{
      //         color:
      //           row == '1' ? '#67C23A' : row == '2' ? '#409EFF' : row == '3' ? '#E6A23C' : '#F56C6C'
      //       }}
      //     >
      //       {row == '1' ? '存续期' : row == '2' ? '已到期' : row == '3' ? '已清算' : '已关账'}
      //     </span>
      //   )
      // },
      {
        title: '操作',
        key: 'operation',
        width: 290,
        fixed: 'right',
        align: 'center',
        render: row =>
          row.checkStatus == '1'
            ? withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row)
            : withRoleTableBotton(
                [
                  {
                    name: '修改',
                    // roule: functionRolue.UPDATE,
                    func: this.updateItem
                  },
                  ...ButtonTableType
                ],
                this.props.btnAuth
              )(row)
      }
    ];

    /***表格按钮组 */
    const ButtonTableType = [
      {
        name: '删除',
        // roule: functionRolue.DELETE,
        func: this.deleteItem
      },
      {
        name: '启动',
        // roule: true,//自行添加
        func: asyncHttpUpdateEnableStatus
      },
      {
        name: '停用',
        // roule: true,//自行添加
        func: asyncHttpUpdateEnableStatus
      },
      {
        name: '注销',
        // roule: true,//自行添加
        func: asyncHttpUpdateEnableStatus
      }
    ];

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'productName',
        label: '所属产品',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'product',
          dropdownWidth: 300,
          placeholder: '请选择所属产品',
          onChange(value, option) {
            changeQueryElement({ type: 'queryProductElement', element: 'productId', value });
          }
        }
      },
      {
        name: 'productEnableStatus',
        label: '产品状态',
        type: 'Select',
        props: {
          placeholder: '请选择产品状态',
          getDics: 1030021,
          onChange(value) {
            changeQueryElement({ type: 'queryProductElement', element: 'productStatus', value });
          }
        }
      },
      {
        name: 'refTrusteeName',
        label: '所属管理人',
        type: 'Select',
        props: {
          placeholder: '请选择所属管理人',
          configDics: selectPageRequest,
          type: 'consignor',
          dropdownWidth: 250,
          onChange(value) {
            changeQueryElement({ type: 'queryProductElement', element: 'refManagerCode', value });
          }
        }
      }
    ];

    /***按钮组 */
    const ButtonType = [
      {
        name: '新增',
        // roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'poduct' });
        }
      },
      {
        name: '审核',
        // roule: functionRolue.CHECK,
        func: () => {
          asyncHttpBatchexamine({ params: this.state.ids, callback: this.toEmptySelect }).then(
            () => {
              // this.toEmptySelect();
            }
          );
        }
      },
      {
        name: '反审核',
        // roule: functionRolue.UNCHECK,
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
        // roule: functionRolue.EXPORT,
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
      total: poductList.total,
      pageSize: queryProductElement.reqPageSize,
      current: queryProductElement.reqPageNum,
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
        <div style={{ marginTop: '10px' }}></div>
        <SearchForm
          labelSize="5em"
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
            dataSource: poductList,
            cloumsCode,
            rowSelection,
            pagination: pagination,
            height: tableHight,
            tableHeader: 'doubleHeader'
          })}
          onRow={record => {
            return {
              onClick: event => {
                setTimeout(() => {
                  this.changeRelation(record);
                }, 300);
              }
            };
          }}
        />
        <Modal
          width={1000}
          title={
            isOpenFormModal.type === 'update'
              ? '修改产品'
              : isOpenFormModal.type === 'delete'
              ? '删除产品'
              : '新增产品'
          }
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'poduct'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <PoductFormRule {...this.props}></PoductFormRule>
        </Modal>
      </>
    );
  }

  async componentDidMount() {
    // const { asyncHttpGetProductList } = this.props;
    // asyncHttpGetProductList({});
  }

  updateItem = (e, item) => {
    e.stopPropagation();
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'poduct'
    });
  };

  deleteItem = (e, item) => {
    e.stopPropagation();
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'delete',
      status: true,
      sign: 'poduct'
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncQueryMoust, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryProductElement', element: 'reqPageNum', value: 1 });
    asyncQueryMoust({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncQueryMoust, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryProductElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryProductElement', element: 'reqPageSize', value: pageSize });
    asyncQueryMoust();
    this.toEmptySelect();
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryProductElement } = this.props;
    resetElement({
      reqPageSize: queryProductElement.reqPageSize,
      reqPageNum: queryProductElement.reqPageNum
    });
  };

  changeRelation(row) {
    const {
      activePan,
      changeProductInfo,
      asyncHttpGetSubjectList,
      asyncHttpGetAccount,
      asyncHttpGetDocumentList
    } = this.props;
    changeProductInfo({
      value: {
        productId: row.id,
        productCode: [row.productCode],
        ...row
      }
    });
    if (activePan == '1') {
      //获取关联账户
      asyncHttpGetAccount({ productCode: row.productCode , productId: row.id});
    } else if (activePan == '2') {
      //获取关联主体
      let params = {
        ...page,
        productId: row.id
      };
      asyncHttpGetSubjectList({ params });
    } else {
      //获取关联文档
      let params = {
        ...page,
        subjectId: row.id,
        subjectType: 1,
        type: 8
      };
      asyncHttpGetDocumentList({ params });
    }
  }

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryProductElement } = this.props;
    console.log('到处全部的接口', queryProductElement);
    exportFile(
      '/bmtp-product-manage/product/export/exportProductByCondition',
      filterNullElement({ ...queryProductElement, includeFieldList: FieldList }),
      '产品',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryProductElement, poductList } = this.props;
    exportFile(
      '/bmtp-product-manage/product/export/exportProductByCondition',
      filterNullElement({ ...queryProductElement, includeFieldList: FieldList }),
      '产品',
      true,
      poductList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-product-manage/product/export/exportProductSelected',
      { includeFieldList: FieldList, rows: ids },
      '产品'
    );
    this.toEmptySelect();
  };
}

export default ProductManagement;
