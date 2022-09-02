import React, { PureComponent } from 'react';
import {
  setColumns,
  setTableInfo,
  ConfigableTable,
  rowSelectionFunc,
  withRoleBotton,
  exportFile,
  exportSelectFile,
  filterNullElement,
  functionRolue,
  SearchForm,
  selectPageRequest,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';
export default class TableForeBusiness extends PureComponent {
  tabColumns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '序号',
      width: 50
    },
    {
      key: 'productName',
      dataIndex: 'productName',
      ellipsis: true,
      title: '产品名称',
      width: 150
    },
    {
      key: 'firstSettleDate',
      dataIndex: 'firstSettleDate',
      ellipsis: true,
      title: '首期结算日期',
      width: 140
    },
    {
      key: 'firstInstructId',
      dataIndex: 'firstInstructId',
      ellipsis: true,
      title: '首期结算指令/合同编号',
      width: 200
    },
    {
      key: 'bondCode',
      dataIndex: 'bondCode',
      ellipsis: true,
      title: '证券代码',
      width: 120
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
      width: 120
    },
    {
      key: 'entrustSideName',
      dataIndex: 'entrustSideName',
      ellipsis: true,
      title: '交易方向',
      width: 150
    },
    {
      key: 'finishStatusName',
      dataIndex: 'finishStatusName',
      ellipsis: true,
      title: '完成情况',
      width: 120
    },
    {
      key: 'secondSettleDate',
      dataIndex: 'secondSettleDate',
      ellipsis: true,
      title: '到期结算日期',
      width: 140
    },
    {
      key: 'remainingMaturity',
      dataIndex: 'remainingMaturity',
      ellipsis: true,
      title: '剩余期限',
      width: 120
    },
    {
      key: 'counterBondAccount',
      dataIndex: 'counterBondAccount',
      ellipsis: true,
      title: '对手方债券账号',
      width: 150
    },
    {
      key: 'counterName',
      dataIndex: 'counterName',
      ellipsis: true,
      title: '对手方名称',
      width: 150
    },
    {
      key: 'publisherName',
      dataIndex: 'publisherName',
      ellipsis: true,
      title: '发行人',
      width: 120
    },
    {
      key: 'execCode',
      dataIndex: 'execCode',
      ellipsis: true,
      title: '成交编号',
      width: 200
    },
    {
      key: 'consignorName',
      dataIndex: 'consignorName',
      ellipsis: true,
      title: '管理人',
      width: 120
    },
    {
      key: 'ownBondAccount',
      dataIndex: 'ownBondAccount',
      ellipsis: true,
      title: '本方债券账号',
      width: 140
    },
    {
      key: 'ownBondAccountName',
      dataIndex: 'ownBondAccountName',
      ellipsis: true,
      title: '本方账户名称',
      width: 150
    },
    {
      key: 'settleInstitutionName',
      dataIndex: 'settleInstitutionName',
      ellipsis: true,
      title: '结算机构',
      width: 150
    }
  ];
  state = {
    visible: false,
    row: '',
    columns: setColumns(this.tabColumns),
    dataSource: [],
    queryType: 0,
    dateTypeTxt: '发生日期',
    dateTypeVal: 0,
    FieldList: []
  };

  handleQuery = async () => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    const obj = { reqPageNum: 1 };
    changeQueryElement({ type: 'queryDataForPledgeBond', value: obj });
    await asyncHttpGetList({ type: 'queryDataForPledgeBond' });
  };

  async componentDidMount() {
    const { asyncHttpEntrustSide, entrustSide } = this.props;
    if (entrustSide.length < 1) {
      await asyncHttpEntrustSide({});
    }
  }

  componentWillMount() {
    // this.handlePageList();
  }
  componentWillReceiveProps(newVal) {
    if (newVal.fileCount > 0) {
      this.toEmptySelect();
    }
  }
  render() {
    const {
      pledgeBondList,
      tableHight,
      queryDataForPledgeBond,
      toReasetSearch,
      changeQueryElement,
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
              type: 'queryDataForPledgeBond',
              value: { productId: value }
            });
          }
        }
      },
      {
        name: 'bizCategory',
        type: 'Select',
        label: '业务品种',
        labelSize: '6em',
        props: {
          placeholder: '请选择业务类别',
          // getDics: 1030127,
          // mode: 'multiple',
          onChange(value) {
            //1现券买卖 2质押式回购 3买断式回购 4质押式回购（到期） 5买断式回购（到期） //交易方向 1买入 2卖出 3正回购 4逆回购
            changeQueryElement({
              type: 'queryDataForPledgeBond',
              value: { bizCategory: value }
            });
            // let arr = [...entrustSide];
            // if (value == 2) {
            //   //质押式, 仅可选逆回购
            //   arr.map(item => {
            //     if (item.dicCode != '4') {
            //       item.disabled = true;
            //     } else {
            //       item.disabled = false;
            //     }
            //   });
            // } else if (value == 3) {
            //   //买断式 可选正回购，逆回购
            //   arr.map(item => {
            //     if (item.dicCode != '3' && item.dicCode != '4') {
            //       item.disabled = true;
            //     } else {
            //       item.disabled = false;
            //     }
            //   });
            // } else {
            //   arr.map(item => (item.disabled = false));
            // }
            // toChangeEntrustSideValue(arr);
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
        name: 'businessDate',
        label: '台账日期',
        type: 'RangePicker',
        itemSize: '250px',
        labelSize: '6em',
        props: {
          placeholder: '请选择台账日期',
          initialValue: [moment(), moment()],
          onChange(dates, dateString) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
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
              type: 'queryDataForPledgeBond',
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
              type: 'queryDataForPledgeBond',
              value: { execCode: e.target.value }
            });
          }
        }
      },
      {
        name: 'counterBondAccount',
        type: 'Input',
        label: '对手方名称',
        labelSize: '6em',
        props: {
          placeholder: '请输入对手方名称',
          allowClear: true
          // onChange(value) {
          //   changeQueryElement({
          //     type: 'queryDataForPledgeBond',
          //     value: { counterBondAccount: value }
          //   });
          // }
        }
        // options: counterNameList
      },
      {
        name: 'finishStatus',
        label: '完成状态',
        labelSize: '6em',
        type: 'Select',
        props: {
          getDics: 1030413,
          placeholder: '请选择完成状态',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
              value: { finishStatus: value }
            });
          }
        }
      },
      {
        name: 'publisher',
        label: '发行人',
        labelSize: '6em',
        type: 'Select',
        props: {
          placeholder: '请选择发行人',
          getDics: 1030023,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
              value: { publisher: value }
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
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
              value: { bondCode: value }
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
          placeholder: '请选择结算机构',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
              value: { settleInstitution: value }
            });
          }
        }
      },
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
              type: 'queryDataForPledgeBond',
              value: { entrustSide: value }
            });
          }
        }, //1买入2卖出3正回购4逆回购
        options: entrustSide
      },
      {
        name: 'dataType',
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
              type: 'queryDataForPledgeBond',
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
          onChange(e) {
            changeQueryElement({
              type: 'queryDataForPledgeBond',
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
      pageSize: queryDataForPledgeBond.reqPageSize,
      current: queryDataForPledgeBond.reqPageNum,
      total: pledgeBondList.total
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
              reqPageSize: queryDataForPledgeBond.reqPageSize,
              reqPageNum: queryDataForPledgeBond.reqPageNum
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
            dataSource: pledgeBondList.list,
            height: tableHight,
            onRow: record => ({
              onClick: () => {
                // setTrIds({ ids: record.id })
                // asyncSetAboutMessage({ type: 'about' })
                const { changeTableRow } = this.props;
                setTimeout(() => {
                  changeTableRow && changeTableRow({ type: 'pledgeBondRowd', value: record });
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
    await asyncHttpGetList({ type: 'queryDataForPledgeBond' });
    this.toEmptySelect();
  };
  handleRowSelect = row => {
    let ids = Array.isArray(row) ? row.map(item => item.id) : [row.id];
    const { setRowChecked, changeTableRow } = this.props;
    setRowChecked && setRowChecked({ ids });
    changeTableRow && changeTableRow({ type: 'pledgeBondRowd', value: row });
  };

  /*导出页面*/
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { queryDataForPledgeBond, pledgeBondList } = this.props;

    let url = '/bmtp-cash-manage/hold/pledgeBondAccount/export/condition';
    let query = queryDataForPledgeBond;
    let total;
    if (type) {
      total = pledgeBondList.total;
    }
    exportFile(
      url,
      filterNullElement({ ...query, includeFieldList: FieldList }),
      '对方债券台账',
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

    let url = '/bmtp-cash-manage/hold/pledgeBondAccount/export/selected';

    await exportSelectFile(url, { includeFieldList: FieldList, rows: selectRows }, '对方债券台账');
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
  //   let { history } = this.props
  //   const { pathname, state } = params
  //   history.push({ pathname, state })
  // }

  /***分页查询*/
  searchPage = pages => {
    const { changeQueryElement } = this.props;
    changeQueryElement && changeQueryElement({ type: 'queryDataForPledgeBond', value: pages });
    this.handlePageList();
  };
}
