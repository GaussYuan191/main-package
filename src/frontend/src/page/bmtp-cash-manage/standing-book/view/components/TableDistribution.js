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
      key: 'settleDate',
      dataIndex: 'settleDate',
      title: '结算日期',
      ellipsis: true,
      width: 150
    },
    {
      key: 'instrId',
      dataIndex: 'instrId',
      title: '结算指令编号',
      ellipsis: true,
      width: 200
    },
    {
      key: 'contractId',
      dataIndex: 'contractId',
      title: '合同编号',
      ellipsis: true,
      width: 200
    },
    {
      key: 'tradingInstructionsNumber',
      dataIndex: 'tradingInstructionsNumber',
      ellipsis: true,
      title: '交易指令编号',
      width: 200
    },
    {
      key: 'bondCode',
      dataIndex: 'bondCode',
      title: '证券代码',
      ellipsis: true,
      width: 120
    },
    {
      key: 'bondName',
      dataIndex: 'bondName',
      title: '证券名称',
      ellipsis: true,
      width: 150
    },
    {
      key: 'bondAmount',
      dataIndex: 'bondAmount',
      title: '券面总额（万元）',
      ellipsis: true,
      width: 150
    },
    // {
    //   key: 'bussinessTypeName',
    //   dataIndex: 'bussinessTypeName',
    //   ellipsis: true,
    //   title: '业务品种',
    //   width: 120
    // },
    {
      key: 'entrustSideName',
      dataIndex: 'entrustSideName',
      ellipsis: true,
      title: '交易方向',
      width: 120
    },
    {
      key: 'bussinessTypeName',
      dataIndex: 'bussinessTypeName',
      ellipsis: true,
      title: '台账类型',
      width: 120
    },
    {
      key: 'completeStatusName',
      dataIndex: 'completeStatusName',
      ellipsis: true,
      title: '完成情况',
      width: 120
    },
    {
      key: 'listingStatusName',
      dataIndex: 'listingStatusName',
      ellipsis: true,
      title: '上市情况',
      width: 120
    },
    {
      key: 'counterAccountName',
      dataIndex: 'counterAccountName',
      ellipsis: true,
      title: '对手方名称',
      width: 150
    },
    {
      key: 'counterAccountCode',
      dataIndex: 'counterAccountCode',
      ellipsis: true,
      title: '对手方债券账号',
      width: 150
    },
    {
      key: 'ownAccountCode',
      dataIndex: 'ownAccountCode',
      ellipsis: true,
      title: '本方债券账号',
      width: 150
    },
    {
      key: 'ownAccountName',
      dataIndex: 'ownAccountName',
      ellipsis: true,
      title: '本方账户名称',
      width: 150
    },
    // {
    //   key: 'sssss',
    //   dataIndex: 'ssss',
    //   ellipsis: true,
    //   title: '结算方式',
    //   width: 150
    // },

    {
      key: 'clearingInstitutionName',
      dataIndex: 'clearingInstitutionName',
      ellipsis: true,
      title: '结算机构',
      width: 150
    }
  ];
  //  结算方式 没有
  state = {
    visible: false,
    row: '',
    columns: setColumns(this.tabColumns),
    dataSource: [],
    ids: [],
    queryType: 0,
    FieldList: []
  };

  handleQuery = async () => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    const obj = { reqPageNum: 1 };
    changeQueryElement({ type: 'queryDataForDistribution', value: obj });
    await asyncHttpGetList({ type: 'queryDataForDistribution', reqPageNum: 1 });
  };

  componentWillMount() {
    // this.handlePageList();
  }
  componentWillReceiveProps(newVal) {
    // if (newVal.fileCount > 0) {
    //   this.toEmptySelect();
    // }
  }

  // 发送数据
  // sendData = () => {
  //   const {
  //     tabType,
  //     businessRowd,
  //     pledgeBondRowd,
  //     distributionRowd,
  //     asyncHttpAxiosSend
  //   } = this.props;
  //   if (tabType == 1) {
  //     if (businessRowd.length > 0) {
  //       asyncHttpAxiosSend(businessRowd);
  //     } else {
  //       message.error('请选择需要发送的数据');
  //     }
  //   } else if (tabType == 2) {
  //     if (pledgeBondRowd.length > 0) {
  //       asyncHttpAxiosSend(pledgeBondRowd);
  //     } else {
  //       message.error('请选择需要发送的数据');
  //     }
  //   } else if (tabType == 3) {
  //     if (distributionRowd.length > 0) {
  //       asyncHttpAxiosSend(distributionRowd);
  //     } else {
  //       message.error('请选择需要发送的数据');
  //     }
  //   }
  // };

  render() {
    const {
      distributionList,
      tableHight,
      queryDataForDistribution,
      toReasetSearch,
      changeQueryElement
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
              type: 'queryDataForDistribution',
              value: { productIdList: value }
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
          placeholder: '请选择债券',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForDistribution',
              value: { bondCode: value }
            });
          }
        }
      },
      {
        name: 'settleDate',
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
              type: 'queryDataForDistribution',
              value: { startSettleDate: dateString[0], endSettleDate: dateString[1] }
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
              type: 'queryDataForDistribution',
              value: { consignorCodeList: value }
            });
          }
        }
      },
      {
        name: 'bussinessType',
        type: 'Select',
        label: '业务品种',
        labelSize: '6em',
        props: {
          placeholder: '请选择业务类别',
          // getDics: 1030127,
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          onChange(value) {
            changeQueryElement({
              type: 'queryDataForDistribution',
              value: { bussinessTypeList: value }
            });
          }
        },
        options: [
          {
            label: '网上分销',
            value: '4'
          },
          {
            label: '网下分销',
            value: '5'
          }
        ]
      },
      {
        name: 'completeStatus',
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
              type: 'queryDataForDistribution',
              value: { completeStatusList: value }
            });
          }
        }
      },
      {
        name: 'clearingInstitution',
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
              type: 'queryDataForDistribution',
              value: { clearingInstitutionList: value }
            });
          }
        }
      },
      {
        name: 'tradingInstructionsNumber',
        label: '交易指令编号',
        type: 'Input',
        labelSize: '6em',
        props: {
          getDics: 1030404,
          placeholder: '请输入交易指令编号',
          onChange(e) {
            changeQueryElement({
              type: 'queryDataForDistribution',
              value: { tradingInstructionsNumber: e.target.value }
            });
          }
        }
      }
    ];

    /***按钮组** */
    let ButtonType = [
      // {
      //   name: '发送',
      //   roule: true,
      //   func: this.sendData
      // },
      // {
      //   name: '转上市',
      //   roule: true,
      //   func: () => {
      //     const { asyncHttpTurnTheListed, row, setRow } = this.props;
      //     console.log('row', row);
      //     if (row && row.length < 1) {
      //       message.error('请选择需要转上市的数据');
      //       return;
      //     } else if (row && row.length > 1) {
      //       message.error('仅支持单条数据做转上市处理');
      //       return;
      //     }

      //     let data = row && row[0];
      //     if (data && data.listingStatus == 1) {
      //       asyncHttpTurnTheListed({ id: data.id }).then(() => {
      //         this.toEmptySelect();
      //         setRow && setRow([]);
      //       });
      //     } else {
      //       message.error('只有未上市的数据才可以转上市处理');
      //       return;
      //     }
      //   }
      // },
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
      pageSize: queryDataForDistribution.reqPageSize,
      current: queryDataForDistribution.reqPageNum,
      total: distributionList.total
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
            const { queryDataForDistribution } = this.props;
            toReasetSearch({
              reqPageSize: queryDataForDistribution.reqPageSize,
              reqPageNum: queryDataForDistribution.reqPageNum
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
            dataSource: distributionList.list,
            height: tableHight,
            onRow: record => ({
              onClick: () => {
                // setTrIds({ ids: record.id })
                // asyncSetAboutMessage({ type: 'about' })
                const { changeTableRow } = this.props;
                setTimeout(() => {
                  changeTableRow && changeTableRow({ type: 'distributionRowd', value: record });
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
    await asyncHttpGetList({ type: 'queryDataForDistribution' });
    this.toEmptySelect();
  };
  handleRowSelect = row => {
    let ids = Array.isArray(row) ? row.map(item => item.id) : [row.id];
    const { setRowChecked, changeTableRow, setRow } = this.props;
    setRowChecked && setRowChecked({ ids });
    setRow && setRow(row);
    changeTableRow && changeTableRow({ type: 'distributionRowd', value: row });
  };

  /*导出页面*/
  exportFilePage = type => {
    const { FieldList } = this.state;
    const { queryDataForDistribution, distributionList } = this.props;

    let url = '/bmtp-cash-manage/hold/distributionLedger/export/condition';
    let query = queryDataForDistribution;
    let total;
    if (type) {
      total = distributionList.total;
    }
    exportFile(
      url,
      filterNullElement({ ...query, includeFieldList: FieldList }),
      '分销台账查询',
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

    let url = '/bmtp-cash-manage/hold/distributionLedger/export/selected';

    await exportSelectFile(url, { includeFieldList: FieldList, rows: selectRows }, '分销台账查询');
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
    changeQueryElement && changeQueryElement({ type: 'queryDataForDistribution', value: pages });
    this.handlePageList();
  };
}
