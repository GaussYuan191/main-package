import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setRowColor,
  ConfigableTable,
  setTableInfo,
  rowSelectionFunc,
  setColumns,
  exportFile,
  exportSelectFile,
  page,
  selectPageRequest,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import CollateralisedRepoRowRender from './CollateralisedRepoRowRender';
import querySellteInfo from './QuerySellteInfo';
import CollateralisedRepoFormSplit from './CollateralisedRepoFormSplit';
import QueryTransactionData from './QueryTransactionData';

const { mapOption } = SearchForm;
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
      collateralisedRepoList,
      collateralisedRepoCol,
      changeElementQuery,
      queryCollateralisedRepoElement,
      // collateralisedRepoNumberList,
      // tableHight,
      asyncHttpSearchOrder
    } = this.props;
    /***查询Input按钮 */
    const me = this;
    const columns = setColumns(collateralisedRepoCol);
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '成交编号',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择成交编号',
          configDics: selectPageRequest,
          type: 'executionReportPledge',
          dropdownWidth: 300,
          onChange(value) {
            changeElementQuery({
              value,
              sing: 'queryCollateralisedRepoElement',
              type: 'execCode'
            });
          }
        },
        // options: mapOption(collateralisedRepoNumberList, 'execCode', 'execCode')
      },
      {
        name: 'tradingDirection',
        label: '交易方向',
        type: 'Select',
        allowClear: true,
        props: {
          placeholder: '请选择交易方向',
          // getDics: 1030151,
          onChange(value) {
            changeElementQuery({
              sing: 'queryCollateralisedRepoElement',
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
        name: 'settleDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryCollateralisedRepoElement',
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

    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    /***表格分页***/
    const pagination = {
      total: collateralisedRepoList.total,
      pageSize: queryCollateralisedRepoElement.reqPageSize,
      current: queryCollateralisedRepoElement.reqPageNum,
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
          value={queryCollateralisedRepoElement.clearingStatus}
          style={{ float: 'right' }}
        >
          <Radio value={1}>待清分指令</Radio>
          <Radio value={3}>所有指令</Radio>
        </Radio.Group> */}
        <ConfigableTable
          expandedRowRender={row => {
            let arr = this.state.expandedRowKeys;
            return arr.includes(row.id) ? (
              <CollateralisedRepoRowRender {...this.props} row={row} />
            ) : null;
          }}
          expandedRowKeys={[...this.state.expandedRowKeys]}
          onExpandedRowsChange={expandedRows => {
            this.setState({ expandedRowKeys: expandedRows });
          }}
          {...setTableInfo({
            columns,
            dataSource: collateralisedRepoList.list,
            pagination: pagination,
            rowKey: 'id',
            cloumsCode,
            bordered: true,
            rowSelection,
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
          <CollateralisedRepoFormSplit
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

  //重置
  handleReset = () => {
    const { resetElement, queryCollateralisedRepoElement } = this.props;
    const query = {
      reqPageNum: queryCollateralisedRepoElement.reqPageNum,
      reqPageSize: queryCollateralisedRepoElement.reqPageSize
    };
    resetElement({ type: 'queryCollateralisedRepoElement', query });
  };

  toGetSettleInfo = value => {
    let { sellteInfo } = this.state;
    this.setState({
      sellteInfo: { ...sellteInfo, ...value }
    });
  };

  /***点击更改关联*/
  changeRelation(event, item) {
    const { asyncHttpSearchZYAbout, changeTableRow } = this.props;
    changeTableRow({ type: 'zyRowed', value: item });
    asyncHttpSearchZYAbout({ type: 'parent', params: { code: item.execCode } });
  }

  /***模糊查询*/
  query = cur => {
    //cur，当传参为true时，展示当前页，否则跳到第一页
    const {
      asyncHttpSearchAccountByCondition,
      queryCollateralisedRepoElement,
      // asyncHttpSearchGetQueryCondition
    } = this.props;
    let newQueryCapitalElement = {
      ...queryCollateralisedRepoElement,
      reqPageNum: 1,
      clearingStatus: queryCollateralisedRepoElement.clearingStatus == 1 ? 1 : ''
    };
    if (cur) {
      newQueryCapitalElement.reqPageNum = queryCollateralisedRepoElement.reqPageNum;
    }
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
    // //查询时，更新下拉选择框里的数据
    // asyncHttpSearchGetQueryCondition({ type: 'executionReportPledge' });
    this.toEmptySelect();
    this.setState({ expandedRowKeys: [] }); //清空表格额外展开行
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      queryCollateralisedRepoElement,
      changeElementQuery
    } = this.props;
    changeElementQuery({
      sing: 'queryCollateralisedRepoElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryCollateralisedRepoElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryCollateralisedRepoElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      clearingStatus: queryCollateralisedRepoElement.clearingStatus == 1 ? 1 : ''
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
    this.toEmptySelect();
  };

  onRadioChange = e => {
    const { changeClearingStatus, asyncHttpSearchAccountByCondition } = this.props;
    changeClearingStatus({
      value: e.target.value,
      sing: 'queryCollateralisedRepoElement'
    });
    let newQueryCapitalElement = {
      clearingStatus: e.target.value == 1 ? 1 : '',
      ...page
    };
    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'executionReportPledge'
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*刷新*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'executionReportPledge'
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryCollateralisedRepoElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/condition',
      filterNullElement({ ...queryCollateralisedRepoElement, includeFieldList: FieldList }),
      '清分明细(质押式回购)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryCollateralisedRepoElement, collateralisedRepoList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/condition',
      filterNullElement({ ...queryCollateralisedRepoElement, includeFieldList: FieldList }),
      '清分明细(质押式回购)',
      true,
      collateralisedRepoList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/executionReportPledge/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '清分明细(质押式回购)'
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
      await asyncHttpCheckList({ ids: arr, type: 'erpPageList' });
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
      await asyncHttpUnCheckList({ ids: arr, type: 'erpPageList' });
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
