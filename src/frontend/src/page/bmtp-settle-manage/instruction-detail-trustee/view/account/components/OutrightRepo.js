import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  setRowColor,
  SearchForm,
  withRoleBotton,
  ConfigableTable,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  // TransfromDown,
  // selectRequest,
  selectPageRequest,
  exportFile,
  exportSelectFile,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import OutrightRepoRowRender from './OutrightRepoRowRender';
import querySellteInfo from './QuerySellteInfo';
import OutrightRepoFormSplit from './OutrightRepoFormSplit';
import QueryTransactionData from './QueryTransactionData';

import { page } from 'yss-biz/utils/util/constant';
const { mapOption } = SearchForm;
// const { TabPane } = Tabs;
class CashSale extends PureComponent {
  state = {
    ids: [],
    relatedSubjectCodes: [],
    sellteInfo: {},
    visible: false,
    visibleFormSplit: false,
    visibleQueryData: false,
    expandedRowKeys: [],
    FieldList: []
  };

  render() {
    const {
      outrightRepoList,
      outrightRepoCol,
      outrightRepoNumberList,
      // changeTransactionNumberList,
      changeElementQuery,
      // guaranteeList,
      // guaranteeCol,
      queryOutrightRepoElement,
      // tableHight,
      bondNameList,
      asyncHttpSearchOrder
    } = this.props;
    /***查询Input按钮 */
    const me = this;
    const columns = setColumns(outrightRepoCol);

    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        props: {
          placeholder: '请选择成交编号',
          allowClear: true,
          configDics: selectPageRequest,
          type: 'executionReportOutright',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              value,
              sing: 'queryOutrightRepoElement',
              type: 'execCode'
            });
          }
        },
        // options: mapOption(outrightRepoNumberList, 'execCode', 'execCode')
      },
      {
        name: 'tradingDirection',
        label: '交易方向',
        type: 'Select',
        props: {
          placeholder: '请选择交易方向',
          // getDics: 1030151,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryOutrightRepoElement',
              value,
              type: 'tradeDirection'
            });
          }
        },
        options: [
          {
            label: '正回购',
            value: '3'
          },
          {
            label: '逆回购',
            value: '4'
          }
        ]
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择资债券名称',
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              sing: 'queryOutrightRepoElement',
              value,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameList
      },
      {
        name: 'settleDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryOutrightRepoElement',
              value: value ? value.format('YYYY-MM-DD') : '',
              type: 'execDate'
            });
          }
        }
      }
    ];

    /***按钮组***/
    const ButtonType = [
      {
        name: '拆分',
        roule: true,
        func: this.openFormSlpit
      },
      {
        name: '审核',
        roule: true,
        func: this.check
      },
      {
        name: '反审核',
        roule: true,
        func: this.uncheck
      },
      {
        name: '查询交易数据',
        roule: true,
        func: this.openQueryData
      },
      {
        name: '查询结算信息',
        roule: true,
        func: () => {
          me.setState({
            visible: true
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

    /***表格分页***/
    const pagination = {
      total: outrightRepoList.total,
      pageSize: queryOutrightRepoElement.reqPageSize,
      current: queryOutrightRepoElement.reqPageNum,
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
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <Row style={{ marginTop: '8px', position: 'relative', left: '-23px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleBeforeReset={() => true}
            handleReset={this.handleReset}
          />
        </Row>
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        {/* <Radio.Group
          onChange={this.onRadioChange}
          value={queryOutrightRepoElement.clearingStatus}
          style={{ float: 'right' }}
        >
          <Radio value={1}>待清分指令</Radio>
          <Radio value={3}>所有指令</Radio>
        </Radio.Group> */}
        <ConfigableTable
          expandedRowRender={row => {
            let arr = this.state.expandedRowKeys;
            return arr.includes(row.id) ? (
              <OutrightRepoRowRender {...this.props} row={row} />
            ) : null;
          }}
          expandedRowKeys={[...this.state.expandedRowKeys]}
          onExpandedRowsChange={expandedRows => {
            this.setState({ expandedRowKeys: expandedRows });
          }}
          {...setTableInfo({
            columns,
            dataSource: outrightRepoList.list,
            rowSelection,
            pagination,
            rowKey: 'id',
            cloumsCode,
            bordered: true,
            height: this.props.tableHight + '',
            onRow: record => ({
              style: {
                ...setRowColor(() => {
                  switch (record.clearingStatusName) {
                    case '未清分':
                      return 'error';
                    // case '':
                    //   return 'warning';
                    // case '':
                    //   return 'success';
                    default:
                      return 'info';
                  }
                })
              },
              onClick: event => {
                setTimeout(() => {
                  this.changeRelation(event, record);
                }, 300);
              }
            })
          })}
        />

        <Modal
          title="查询结算指令信息"
          visible={this.state.visible}
          destroyOnClose={true}
          onOk={() => {
            if (this.state.sellteInfo.execCode && this.state.sellteInfo.instituion) {
              asyncHttpSearchOrder(this.state.sellteInfo).then(() => {
                this.setState({
                  sellteInfo: {},
                  visible: false
                });
              });
            } else {
              message.error('源成交编号和结算机构不能为空');
            }
          }}
          onCancel={() => {
            this.setState({
              sellteInfo: {},
              visible: false
            });
          }}
        >
          {querySellteInfo(this.toGetSettleInfo)}
        </Modal>

        {/* 拆分 */}
        {this.state.visibleFormSplit ? (
          <OutrightRepoFormSplit
            {...this.props}
            {...this.state}
            closeFormSlpit={this.closeFormSlpit}
            query={this.query}
          />
        ) : null}

        {/* 查询交易信息 */}
        {this.state.visibleQueryData ? (
          <QueryTransactionData
            {...this.props}
            {...this.state}
            closeQueryData={this.closeQueryData}
          />
        ) : null}
      </>
    );
  }
  componentDidMount() { }

  //重置
  handleReset = () => {
    const { resetElement, queryOutrightRepoElement } = this.props;
    const query = {
      reqPageNum: queryOutrightRepoElement.reqPageNum,
      reqPageSize: queryOutrightRepoElement.reqPageSize
    };
    resetElement({ type: 'queryOutrightRepoElement', query });
  };

  toGetSettleInfo = value => {
    let { sellteInfo } = this.state;
    this.setState({
      sellteInfo: { ...sellteInfo, ...value }
    });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpSeachGetAboutdbxx, changeTableRow } = this.props;
    changeTableRow({ type: 'mdRowed', value: item });
    asyncHttpSeachGetAboutdbxx({ type: 'parent', params: { code: item.execCode } });
  }

  /***模糊查询*/
  query = cur => {
    //cur，当传参为true时，展示当前页，否则跳到第一页
    const {
      asyncHttpSearchAccountByCondition,
      queryOutrightRepoElement,
      // asyncHttpSearchGetQueryCondition
    } = this.props;
    let newQueryCapitalElement = {
      ...queryOutrightRepoElement,
      reqPageNum: 1,
      clearingStatus: queryOutrightRepoElement.clearingStatus == 1 ? 1 : ''
    };
    if (cur) {
      newQueryCapitalElement.reqPageNum = queryOutrightRepoElement.reqPageNum;
    }
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
    });
    // //查询时，更新下拉选择框里的数据
    // asyncHttpSearchGetQueryCondition({ type: 'executionReportOutright' });
    this.toEmptySelect();
    this.setState({ expandedRowKeys: [] }); //清空表格额外展开行
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const { asyncHttpSearchAccountByCondition, queryOutrightRepoElement, changeElementQuery } =
      this.props;
    changeElementQuery({
      sing: 'queryOutrightRepoElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryOutrightRepoElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryOutrightRepoElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      clearingStatus: queryOutrightRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
    });
    this.toEmptySelect();
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryOutrightRepoElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportOutright'
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'executionReportBond'
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryOutrightRepoElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/condition',
      filterNullElement({ ...queryOutrightRepoElement, includeFieldList: FieldList }),
      '清分明细(买断式回购)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryOutrightRepoElement, outrightRepoList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/condition',
      filterNullElement({ ...queryOutrightRepoElement, includeFieldList: FieldList }),
      '清分明细(买断式回购)',
      true,
      outrightRepoList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportOutright/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '清分明细(买断式回购)'
    );
    this.toEmptySelect();
  };

  //弹出拆分界面
  openFormSlpit = () => {
    let { ids } = this.state;
    if (ids.length == 1) {
      if (ids[0].dataSource == 2 && ids[0].checkStatus == 2) {
        this.setState({ visibleFormSplit: true });
      } else {
        message.error('只有未审核,且数据来源是交易系统的数据才能拆分');
        return;
      }
    } else {
      message.error('必须且只能选择一条数据');
    }
  };

  // 关闭拆分界面
  closeFormSlpit = () => {
    this.setState({ visibleFormSplit: false });
  };

  // 审核
  check = async () => {
    const { ids } = this.state;
    const { asyncHttpCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.clearingStatus == '2' && n.checkStatus != '1') {
          arr.push(n.id);
        } else {
          message.error('只有已清分且未审核的数据才能审核');
          return;
        }
      }
      await asyncHttpCheckList({ ids: arr, type: 'eroPageList' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  // 反审核
  uncheck = async () => {
    const { ids } = this.state;
    const { asyncHttpUnCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus != '2') {
          arr.push(n.id);
        } else {
          message.error('只有已审核的数据才能反审核');
          return;
        }
      }
      await asyncHttpUnCheckList({ ids: arr, type: 'eroPageList' });
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };

  //弹出查询交易信息界面
  openQueryData = () => {
    this.setState({ visibleQueryData: true });
  };

  // 关闭查询交易信息界面
  closeQueryData = () => {
    this.setState({ visibleQueryData: false });
  };
}

export default CashSale;
