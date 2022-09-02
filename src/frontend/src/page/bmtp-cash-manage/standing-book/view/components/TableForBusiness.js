import React, { PureComponent } from 'react';
import {
  setColumns,
  setTableInfo,
  ConfigableTable,
  rowSelectionFunc,
  SearchForm,
  selectPageRequest,
  withRoleBotton,
  exportFile,
  exportSelectFile,
  filterNullElement,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';
export default class TableForeBusiness extends PureComponent {
  tabColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50
    },
    {
      key: 'productName',
      dataIndex: 'productName',
      title: '产品名称',
      ellipsis: true,
      width: 150
    },
    {
      key: 'consignorName',
      dataIndex: 'consignorName',
      title: '管理人',
      ellipsis: true,
      width: 150
    },
    {
      key: 'firstSettleDate',
      dataIndex: 'firstSettleDate',
      title: '首期结算日期',
      ellipsis: true,
      width: 150
    },
    {
      key: 'firstInstructId',
      dataIndex: 'firstInstructId',
      title: '首期结算指令/合同编号',
      ellipsis: true,
      width: 200
    },
    {
      key: 'execCode',
      dataIndex: 'execCode',
      title: '成交编号',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondCode',
      dataIndex: 'bondCode',
      ellipsis: true,
      title: '证券代码',
      width: 150
    },
    {
      key: 'bondName',
      dataIndex: 'bondName',
      ellipsis: true,
      title: '证券名称',
      width: 150
    },
    {
      key: 'faceValue',
      dataIndex: 'faceValue',
      ellipsis: true,
      title: '券面总额（万元）',
      width: 150
    },
    {
      key: 'bizCategoryName',
      dataIndex: 'bizCategoryName',
      ellipsis: true,
      title: '业务品种',
      width: 150
    },
    {
      key: 'entrustSideName',
      dataIndex: 'entrustSideName',
      ellipsis: true,
      title: '交易方向',
      width: 150
    },
    {
      key: 'accountTypeName',
      dataIndex: 'accountTypeName',
      ellipsis: true,
      title: '台账类型',
      width: 150
    },
    {
      key: 'finishStatusName',
      dataIndex: 'finishStatusName',
      ellipsis: true,
      title: '完成情况',
      width: 150
    },
    {
      key: 'secondSettleDate',
      dataIndex: 'secondSettleDate',
      ellipsis: true,
      title: '到期结算日期',
      width: 120
    },
    {
      key: 'remainingMaturity',
      dataIndex: 'remainingMaturity',
      ellipsis: true,
      title: '剩余期限',
      width: 150
    },
    {
      key: 'counterBondAccount',
      dataIndex: 'counterBondAccount',
      ellipsis: true,
      title: '对手方债券账号',
      width: 120
    },
    {
      key: 'counterName',
      dataIndex: 'counterName',
      ellipsis: true,
      title: '对手方名称',
      width: 150
    },
    {
      key: 'ownBondAccount',
      dataIndex: 'ownBondAccount',
      ellipsis: true,
      title: '本方债券账号',
      width: 120
    },
    {
      key: 'ownBondAccountName',
      dataIndex: 'ownBondAccountName',
      ellipsis: true,
      title: '本方账户名称',
      width: 120
    },
    {
      key: 'settleInstitutionName',
      dataIndex: 'settleInstitutionName',
      ellipsis: true,
      title: '结算机构',
      width: 150
    },
    {
      key: 'subjectCodeName',
      dataIndex: 'subjectCodeName',
      ellipsis: true,
      title: '台账科目',
      width: 150
    }
  ];
  state = {
    ids: [],
    visible: false,
    row: '',
    columns: setColumns(this.tabColumns),
    dataSource: [],
    FieldList: [],
    dateTypeTxt: '发生日期',
    dateTypeVal: 0
  };

  handleQuery = async () => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    const obj = { reqPageNum: 1 };
    changeQueryElement({ type: 'queryDataForBusiness', value: obj });
    await asyncHttpGetList({ type: 'queryDataForBusiness' });
  };

  componentWillMount() {
    // this.handlePageList();
  }
  componentWillReceiveProps(newVal, oldVal) {
    // if (newVal.fileCount > 0) {
    //   this.toEmptySelect();
    // }
    // let newDataSource = JSON.stringify(nexProps.dataSource)
    // let oldDataSource = JSON.stringify(this.props.dataSource)
    // newDataSource !== oldDataSource && this.handlePageList()
  }

  render() {
    const {
      businessList,
      tableHight,
      queryDataForBusiness,
      changeQueryElement,
      toReasetSearch,
      entrustSide
    } = this.props;

    const formItem = [
      {
        name: 'productCode',
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
          onChange(value, option) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { productId: value }
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
          dropdownWidth: 300,
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { bondCode: value }
            });
          }
        }
      },
      {
        name: 'businessDate',
        label: '台账日期',
        type: 'RangePicker',
        itemSize: '250px',
        labelSize: '6em',
        props: {
          placeholder: '请选择日期',
          initialValue: [moment(), moment()],
          allowClear: true,
          onChange(dates, dateString) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { startDate: dateString[0], endDate: dateString[1] }
            });
          }
        }
      },
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
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { consignorCode: value }
            });
          }
        }
      },
      {
        name: 'execCode',
        type: 'Input',
        label: '成交编号',
        labelSize: '6em',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { execCode: e.target.value }
            });
          }
        }
      },
      // {
      //   name: 'counterBondAccount',
      //   type: 'Select',
      //   label: '对手方名称',
      //   labelSize: '6em',
      //   props: {
      //     placeholder: '请选择对手方名称',
      //     allowClear: true,
      //     onChange(value) {
      //       changeQueryElement({
      //         type: 'queryDataForBusiness',
      //         value: { counterBondAccount: value }
      //       });
      //     }
      //   },
      //   options: this.props.counterNameList
      // },
      {
        name: 'entrustSide',
        label: '交易方向',
        labelSize: '6em',
        type: 'Select',
        props: {
          // getDics: 1030124,
          placeholder: '请选择交易方向',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { entrustSide: value }
            });
          }
        }, //1买入2卖出3正回购4逆回购
        options: entrustSide
      },
      {
        name: 'queryType',
        type: 'Select',
        label: '查询方式',
        labelSize: '6em',
        props: {
          placeholder: '请选择查询方式',
          getDics: 1030411,
          initialValue: '0',
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { queryType: value }
            });
          }
        }
      },
      {
        name: 'bizCategory',
        label: '业务品种',
        labelSize: '6em',
        type: 'Select',
        props: {
          disabled: queryDataForBusiness && queryDataForBusiness.queryType == 0 ? true : false,
          placeholder: '请选择业务类别',
          // getDics: 1030127,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { bizCategory: value }
            });
          }
        },
        options: [
          {
            label: '质押式回购',
            value: '2'
          },
          {
            label: '买断式回购',
            value: '3'
          },
          {
            label: '债券借贷',
            value: '8'
          }
        ]
      },
      {
        name: 'subjectCode',
        label: '科目',
        labelSize: '6em',
        type: 'Select',
        props: {
          disabled: queryDataForBusiness && queryDataForBusiness.queryType == 1 ? true : false,
          placeholder: '请选择科目',
          getDics: 1030412,
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { subjectCode: value }
            });
          }
        }
      },

      {
        name: 'finishStatus',
        label: '完成状态',
        type: 'Select',
        labelSize: '6em',
        props: {
          getDics: 1030413,
          placeholder: '请选择完成状态',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { finishStatus: value }
            });
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
          allowClear: true,
          placeholder: '请选择结算机构',
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { settleInstitution: value }
            });
          }
        }
      },
      // {
      //   name: 'participationRole',
      //   label: '参与角色',
      //   type: 'Select',
      //   labelSize: '6em',
      //   props: {
      //     getDics: 1030414,
      //     placeholder: '请选择参与角色',
      //     onChange(value) {
      //       changeQueryElement({
      //         type: 'queryDataForBusiness',
      //         value: { participationRole: value }
      //       });
      //     }
      //   }
      // },
      {
        name: 'dateType',
        label: '台账日期类型',
        labelSize: '6em',
        type: 'Select',
        props: {
          getDics: 1030415,
          placeholder: '请选择台账日期类型',
          initialValue: this.state.dateTypeTxt,
          allowClear: true,
          onChange: value => {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { dateType: value }
            });
            this.setState({
              dateTypeVal: value
            });
          }
        }
      },
      {
        name: 'firstInstructId',
        label: '合同编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          placeholder: '请输入合同编号',
          allowClear: true,
          onChange(e) {
            changeQueryElement({
              type: 'queryDataForBusiness',
              value: { firstInstructId: e.target.value }
            });
          }
        }
      }
    ];

    /***按钮组** */
    let ButtonType = [
      {
        name: '导出',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportFilePage(true);
            }
          },
          {
            name: '导出当前页',
            func: () => {
              this.exportFilePage(false);
            }
          },
          {
            name: '导出选择项',
            func: this.exportSelected
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
      pageSize: queryDataForBusiness.reqPageSize,
      current: queryDataForBusiness.reqPageNum,
      total: businessList.total
    };
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    return (
      <>
        <SearchForm
          lineOf={3}
          moreTypeModal
          formItem={formItem}
          handleSearch={() => {
            this.handleQuery();
          }}
          handleReset={() => {
            this.setState({
              dateTypeTxt: '发生日期',
              dateTypeVal: 0
            });
            toReasetSearch({
              reqPageSize: queryDataForBusiness.reqPageSize,
              reqPageNum: queryDataForBusiness.reqPageNum
            });
          }}
        />

        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo.call(this, {
            rowKey: 'id',
            //拖拽相关
            // colDraggable: true,
            // rowDraggable: true,
            //复选和分页
            rowSelection: rowSelectionFunc.call(this, this.handleRowSelect),
            pagination: pagination,
            cloumsCode,
            // 表格数据
            columns: this.state.columns,
            dataSource: businessList && businessList.list,
            height: tableHight,
            onRow: record => ({
              onClick: () => {
                const { changeTableRow } = this.props;
                // setTrIds({ ids: record.id })
                // asyncSetAboutMessage({ type: 'about' })
                setTimeout(() => {
                  changeTableRow && changeTableRow({ type: 'businessRowd', value: record });
                }, 300);
              }
            })
          })}
        />
      </>
    );
  }
  handlePageList = async () => {
    const { asyncHttpGetList } = this.props;
    await asyncHttpGetList({ type: 'queryDataForBusiness' });
    this.toEmptySelect();
  };
  handleRowSelect = row => {
    let ids = Array.isArray(row) ? row.map(item => item.id) : [row.id];
    const { setRowChecked, changeTableRow } = this.props;
    setRowChecked && setRowChecked({ ids });
    changeTableRow && changeTableRow({ type: 'businessRowd', value: row });
  };

  /*导出页面*/
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { queryDataForBusiness, businessList } = this.props;
    let url = '/bmtp-cash-manage/hold/businessAccount/export/condition';
    let query = queryDataForBusiness;
    let total;
    if (type) {
      total = businessList.total;
    }
    exportFile(
      url,
      filterNullElement({ ...query, includeFieldList: FieldList }),
      '本方债券台账',
      type,
      total
    );
  };

  /*导出选择项*/
  exportSelected = async () => {
    const { FieldList } = this.state;
    const { clickIds } = this.props;
    let selectRows = [];
    clickIds.forEach(item => {
      selectRows.push({ id: item });
    });
    let url = '/bmtp-cash-manage/hold/businessAccount/export/selected';
    await exportSelectFile(url, { includeFieldList: FieldList, rows: selectRows }, '本方债券台账');
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
    this.props.setRowChecked && this.props.setRowChecked({ ids: [] });
  };
  // routerPush = (params) => {
  //     let { history } = this.props
  //     const { pathname, state } = params
  //     history.push({ pathname, state })
  // }

  /***分页查询*/
  searchPage = pages => {
    const { changeQueryElement } = this.props;
    changeQueryElement && changeQueryElement({ type: 'queryDataForBusiness', value: pages });
    this.handlePageList();
  };
}
