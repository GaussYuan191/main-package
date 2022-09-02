import React, { PureComponent } from 'react';
import {
  setTableInfo,
  ConfigableTable,
  selectPageRequest,
  rowSelectionFunc,
  SearchForm,
  formatDate,
  setColumns,
  cloumsFunc,
  withRoleBotton,
  hanbleConfirm,
  exportFile,
  exportSelectFile,
  functionRolue
} from 'yss-biz';
import moment from 'moment';
import { message } from 'antd';
export default class TableForeBusiness extends PureComponent {
  tabColumns = setColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50
    },
    {
      key: 'tradeDate',
      dataIndex: 'tradeDate',
      title: '日期',
      width: 150
    },
    {
      key: 'tradeTypeName',
      dataIndex: 'tradeTypeName',
      title: '交易类型',
      width: 150
    },
    {
      key: 'contractId',
      dataIndex: 'contractId',
      title: '合同编号',
      width: 200
    },
    {
      key: 'instructId',
      dataIndex: 'instructId',
      title: '指令编号',
      width: 200
    },
    {
      key: 'tradeInstructId',
      dataIndex: 'tradeInstructId',
      title: '交易指令编号',
      width: 200
    },
    {
      key: 'productName',
      dataIndex: 'productName',
      title: '产品名称',
      width: 200
    },
    {
      key: 'consignorName',
      dataIndex: 'consignorName',
      title: '管理人',
      width: 200
    },
    {
      key: 'bondCode',
      dataIndex: 'bondCode',
      title: '证券代码',
      width: 150
    },
    {
      key: 'bondName',
      dataIndex: 'bondName',
      title: '证券名称',
      width: 150,
      render: text => {
        return text?.split('-')[1];
      }
    },
    {
      key: 'changeSubjectName',
      dataIndex: 'changeSubjectName',
      title: '变动科目',
      width: 150
    },
    {
      key: 'borrowingSideName',
      dataIndex: 'borrowingSideName',
      title: '借贷方向',
      width: 150
    },
    {
      key: 'periodTotal',
      dataIndex: 'periodTotal',
      title: '发生额(万元)',
      width: 150
    },
    // {
    //   key: 'usableSubject',
    //   dataIndex: 'usableSubject',
    //   title: '可用科目(万元)',
    //   width: 150
    // },
    // {
    //   key: 'accruedSubject',
    //   dataIndex: 'accruedSubject',
    //   title: '待付科目(万元)',
    //   width: 150
    // },
    // {
    //   key: 'totalBuyBackSubject',
    //   dataIndex: 'totalBuyBackSubject',
    //   title: '全额待购回科目(万元)',
    //   width: 200
    // },
    // {
    //   key: 'freezeSubject',
    //   dataIndex: 'freezeSubject',
    //   title: '冻结科目(万元)',
    //   width: 150
    // },
    // {
    //   key: 'pledgeSubject',
    //   dataIndex: 'pledgeSubject',
    //   title: '质押科目(万元)',
    //   width: 150
    // },
    // {
    //   key: 'underwritingSubject',
    //   dataIndex: 'underwritingSubject',
    //   title: '承销额度(万元)',
    //   width: 150
    // },
    // {
    //   key: 'underwritingAccruedSubject',
    //   dataIndex: 'underwritingAccruedSubject',
    //   title: '承销额度待付(万元)',
    //   width: 150
    // },
    {
      key: 'recordCode',
      dataIndex: 'recordCode',
      title: '流水号',
      width: 200
    },
    {
      key: 'execCode',
      dataIndex: 'execCode',
      title: '成交编号',
      width: 200
    },
    {
      key: 'settleInstitutionName',
      dataIndex: 'settleInstitutionName',
      title: '结算机构',
      width: 150
    },
    {
      key: 'dataSourceName',
      dataIndex: 'dataSourceName',
      title: '数据来源',
      width: 150
    },
    {
      title: '审核状态',
      width: 150,
      dataIndex: 'checkStatusName'
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150
    },

    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },

    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 150
    }
  ]);
  state = {
    visible: false,
    row: '',
    columns: this.tabColumns,
    ids: [],
    FieldList: []
  };

  async componentWillMount() {
    const { balanceRow, changeQueryDatas } = this.props;
    !!balanceRow &&
      changeQueryDatas({
        bondCode: balanceRow.bondCode
        // productId: balanceRow.productId
        // tradeDate: balanceRow.tradeDate
      });
  }

  componentDidMount() {
    const { asyncHttpGetCurTradeDate, asyncHandelQueryDetailList } = this.props;
    asyncHttpGetCurTradeDate({}).then(() => {
      asyncHandelQueryDetailList();
    });
  }

  updateDataIndex = FieldList => {
    let index = FieldList.indexOf('tradeTypeName');
    let index2 = FieldList.indexOf('changeSubjectName');
    let index3 = FieldList.indexOf('settleInstitutionName');
    let index4 = FieldList.indexOf('dataSourceName');
    let index5 = FieldList.indexOf('borrowingSideName');
    FieldList[index] = 'tradeType';
    FieldList[index2] = 'changeSubject';
    FieldList[index3] = 'settleInstitution';
    FieldList[index4] = 'dataSource';
    FieldList[index5] = 'borrowingSide';
    return FieldList;
  };

  render() {
    const {
      asyncSetAboutMessage,
      setTrDatas,
      tableHight,
      listTotal,
      queryDatas,
      changeQueryDatas,
      currentTradeDate,
      toResetSearch,
      openFormModal,
      selectRows,
      page,
      asyncDeleteBatch,
      asyncCheckBatch
    } = this.props;

    const formItem = [
      {
        name: 'consignorCode',
        type: 'Select',
        label: '管理人',
        labelSize: '6em',
        props: {
          placeholder: '请选择管理人',
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryDatas({ consignorCode: value });
          }
        }
      },
      {
        name: 'productId',
        type: 'Select',
        label: '产品名称',
        labelSize: '6em',
        props: {
          placeholder: '请选择产品',
          type: 'product',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          //initialValue: (balanceRow && balanceRow.productId) || '',
          onChange(value) {
            changeQueryDatas({ productId: value });
          }
        }
      },
      {
        name: 'tradeDate',
        label: '交易日期',
        type: 'RangePicker',
        itemSize: '250px',
        labelSize: '6em',
        props: {
          allowClear: false,
          placeholder: ['开始日期', '结束日期'],
          initialValue: [
            currentTradeDate ? moment(currentTradeDate) : '',
            currentTradeDate ? moment(currentTradeDate) : ''
          ],
          onChange(values) {
            changeQueryDatas({
              tradeDate_begin: formatDate((values || [])[0], 'date'),
              tradeDate_end: formatDate((values || [])[1], 'date')
            });
          }
        }
      },
      {
        name: 'bondCode',
        type: 'Select',
        label: '债券名称',
        labelSize: '6em',
        props: {
          placeholder: '请选择债券名称',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 290,
          initialValue: this.props.balanceRow && this.props.balanceRow.bondCode,
          onChange(value) {
            changeQueryDatas({ bondCode: value });
          }
        }
      },
      {
        name: 'changeSubject',
        label: '科目',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择科目',
          getDics: 1030410,
          onChange(value) {
            changeQueryDatas({ changeSubject: value });
          }
        }
      },
      {
        name: 'borrowingSide',
        label: '借贷方向',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择借贷方向',
          getDics: 1030407,
          onChange(value) {
            changeQueryDatas({ borrowingSide: value });
          }
        }
      },
      {
        name: 'tradeType',
        label: '交易类别',
        type: 'Select',
        labelSize: '6em',
        props: {
          placeholder: '请选择交易类型',
          getDics: 1030409,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryDatas({ tradeTypeList: value });
          }
        }
      },
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        labelSize: '6em',
        props: {
          getDics: 1030404,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          placeholder: '请选择结算机构',
          onChange(value) {
            changeQueryDatas({ settleInstitution: value });
          }
        }
      },
      {
        name: 'recordCode',
        label: '流水号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请填写流水号',
          onChange(e) {
            changeQueryDatas({ recordCode: e.target.value });
          }
        }
      },
      {
        name: 'dataSource',
        label: '数据来源',
        type: 'Select',
        labelSize: '6em',
        props: {
          getDics: 1030403,
          placeholder: '请选择数据来源',
          onChange(value) {
            changeQueryDatas({ dataSource: value });
          }
        }
      },
      {
        name: 'checkStatus',
        label: '审核状态',
        type: 'Select',
        labelSize: '6em',
        props: {
          getDics: 1030002,
          placeholder: '请选择审核状态',
          onChange(value) {
            changeQueryDatas({ checkStatus: value });
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
            changeQueryDatas({ execCode: value });
          }
        }
      },
      {
        name: 'contractId',
        label: '合同编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请填写合同编号',
          onChange(e) {
            changeQueryDatas({ contractId: e.target.value });
          }
        }
      },
      {
        name: 'instructId',
        label: '指令编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请填写指令编号',
          onChange(e) {
            changeQueryDatas({ instructId: e.target.value });
          }
        }
      },
      {
        name: 'tradeInstructId',
        label: '交易指令编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请填写交易指令编号',
          onChange(e) {
            changeQueryDatas({ tradeInstructId: e.target.value });
          }
        }
      }
    ];

    /***按钮组** */
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({
            sign: 'add',
            title: '新增'
          });
        }
      },
      {
        name: '修改',
        roule: functionRolue.UPDATE,
        func: () => {
          if (selectRows.length === 1) {
            // 	string  数据来源（0-系统，1-手工）
            const { dataSource, dataSourceName, checkStatus } = selectRows[0];

            if (checkStatus === '1') {
              message.error('只有未审核的数据才能修改');
              return;
            }

            this.props.setModalDetail(selectRows[0]);

            if (dataSource === '0') {
              message.warning(`操作数据的数据来源为${dataSourceName || '系统'}，无法修改！`);
              return;
            }
            openFormModal({
              sign: 'edit',
              title: '修改'
            });
          } else {
            message.error('必须且只能选择一条数据源');
          }
        }
      },
      {
        name: '删除',
        roule: functionRolue.DELETE,
        func: () =>
          hanbleConfirm({
            rowChecked: selectRows,
            done: asyncDeleteBatch,
            then: () =>
              this.props.asyncHandelQueryDetailList().then(() => {
                this.toEmptySelect();
              })
          })
      },
      {
        name: '审核',
        func: () => {
          if (selectRows.length < 1) {
            message.error('请选择需要审核的数据');
            return;
          }
          const ids =
            selectRows && selectRows.map(item => (item ? item.id : '')).filter(item => item);
          asyncCheckBatch(ids).then(() => {
            this.toEmptySelect();
          });
        }
      },
      {
        name: '导出',
        icon: functionRolue.EXPORT,
        roule: true,
        children: [
          {
            name: '导出全部',
            func: () => {
              const { FieldList } = this.state;
              let params = {
                ...page,
                ...queryDatas,
                includeFieldList: this.updateDataIndex(FieldList)
              };
              exportFile(
                '/bmtp-cash-manage/hold/prodCarrChangeDetail/export/condition',
                params,
                '产品持仓变动明细',
                true,
                this.props.listTotal
              );
            }
          },
          {
            name: '导出当前页',
            func: () => {
              const { FieldList } = this.state;
              let params = {
                ...page,
                ...queryDatas,
                includeFieldList: this.updateDataIndex(FieldList)
              };
              exportFile(
                '/bmtp-cash-manage/hold/prodCarrChangeDetail/export/condition',
                params,
                '产品持仓变动明细'
              );
            }
          },
          {
            name: '导出选择项',
            func: () => {
              const { FieldList } = this.state;
              exportSelectFile(
                '/bmtp-cash-manage/hold/prodCarrChangeDetail/export/selected',
                { includeFieldList: this.updateDataIndex(FieldList), rows: selectRows },
                '产品持仓变动明细'
              );
              this.toEmptySelect();
            }
          }
        ]
      }
    ];

    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: total => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryDatas.reqPageSize,
      total: listTotal || 0,
      current: queryDatas.reqPageNum
    };
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <SearchForm
          lineOf={3}
          moreTypeModal
          formItem={formItem}
          handleSearch={this.handleQuery}
          handleReset={() => {
            const { queryDatas } = this.props;
            toResetSearch({
              pageSize: queryDatas.pageSize,
              // productId: (balanceRow && balanceRow.productId) || '',
              tradeDate_begin: currentTradeDate,
              tradeDate_end: currentTradeDate,
              bondCode: this.props.balanceRow && this.props.balanceRow.bondCode
            });
          }}
        />

        {!this.props.noBtns && withRoleBotton(ButtonType, this.props.btnAuth)}

        <ConfigableTable
          {...setTableInfo.call(this, {
            rowKey: 'id',
            //拖拽相关
            colDraggable: true,
            // rowDraggable: true,
            //复选和分页
            rowSelection: rowSelectionFunc.call(this, this.handleRowSelect),
            pagination: pagination,
            // 表格数据
            columns: this.state.columns,
            cloumsCode,
            dataSource: this.props.dataSource,
            height: tableHight,
            onRow: record => ({
              onClick: () => {
                setTimeout(() => {
                  setTrDatas({ row: record });
                  asyncSetAboutMessage({ type: 'about' });
                }, 300);
              }
            })
          })}
        />
      </>
    );
  }

  handleRowSelect = row => {
    !Array.isArray(row) && (row = [row]);
    this.props.setTrDatas({ row, type: 'select' });
  };

  /**点击查询 */
  handleQuery = () => {
    const { asyncHandelQueryDetailList, changeQueryDatas } = this.props;
    changeQueryDatas({ reqPageNum: 1 });
    asyncHandelQueryDetailList();
    this.toEmptySelect();
  };

  /***分页查询*/
  searchPage = pages => {
    const { asyncHandelQueryDetailList, changeQueryDatas, setPages } = this.props;
    setPages(pages);
    changeQueryDatas(pages);
    asyncHandelQueryDetailList();
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
    this.props.setTrDatas({ row: [], type: 'select' });
  };
}
