import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  // selectRequest,
  selectPageRequest,
  setColumns,
  ConfigableTable,
  functionRolue,
  page,
  exportFile,
  exportSelectFile,
  cloumsFunc
} from 'yss-biz';
import DistributionRowRender from './DistributionRowRender';
import querySellteInfo4Distribution from './QuerySellteInfo4Distribution';

class Detailed extends PureComponent {
  state = {
    ids: [],
    sellteInfo: {},
    visible: false,
    FieldList: []
  };
  render() {
    const {
      dealInstructionsList,
      dealInstructionsCol,
      changeElementQuery,
      queryDistributionElement,
      asyncHttpSearchOrder4Distribution,
      // getInsterIds
    } = this.props;
    /***查询Input按钮 */
    const me = this;
    const columns = setColumns(dealInstructionsCol);
    let SearchformItem = [
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Select',
        props: {
          placeholder: '请选择交易指令编号',
          configDics: selectPageRequest,
          type: 'distributTradeInstr',
          dropdownWidth: 300,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryDistributionElement',
              value,
              type: 'tradeInstrId'
            });
          }
        }
        // options: getInsterIds
      },
      // {
      //   name: 'execCode',
      //   label: '成交编号',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入成交编号',
      //     // type: 'product',
      //     // config: selectRequest,
      //     allowClear: true,
      //     onChange(value) {
      //       changeElementQuery({
      //         sing: 'queryDistributionElement',
      //         value: value.target.value,
      //         type: 'execCode'
      //       });
      //     }
      //   }
      // },
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          placeholder: '请选择业务品种',
          //getDics: 1030127,
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryDistributionElement',
              value,
              type: 'bizCategory'
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
        name: 'settleDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期',
          onChange(value) {
            changeElementQuery({
              sing: 'queryDistributionElement',
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
      onChange: (page, pageSize) => {
        this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: dealInstructionsList.total,
      pageSize: queryDistributionElement.reqPageSize,
      current: queryDistributionElement.reqPageNum
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
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
          <section className="marginAuto">
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              expandedRowRender={row => {
                return <DistributionRowRender {...this.props} row={row} />;
              }}
              {...setTableInfo({
                columns,
                dataSource: dealInstructionsList.list,
                rowSelection,
                pagination,
                rowKey: 'id',
                cloumsCode,
                height: '500',
                bordered: true,
                onRow: record => {
                  return {
                    onClick: event => {
                      // this.changInfo(event, record);
                    }
                  };
                }
              })}
            />
          </section>
        </Row>

        <Modal
          title="查询结算指令信息"
          visible={this.state.visible}
          destroyOnClose={true}
          onOk={() => {
            const { tradeId, settleInstitution } = this.state.sellteInfo;
            if (tradeId && settleInstitution) {
              asyncHttpSearchOrder4Distribution({ tradeId, settleInstitution }).then(() => {
                this.setState({
                  sellteInfo: {},
                  visible: false
                });
              });
            } else {
              message.error('成交编号和结算机构不能为空');
            }
          }}
          onCancel={() => {
            this.setState({
              sellteInfo: {},
              visible: false
            });
          }}
        >
          {querySellteInfo4Distribution(this.toGetSettleInfo)}
        </Modal>
      </>
    );
  }

  toGetSettleInfo = value => {
    let { sellteInfo } = this.state;
    this.setState({
      sellteInfo: { ...sellteInfo, ...value }
    });
  };

  /***模糊查询*/
  query = async () => {
    const {
      asyncHttpSearchAccountByCondition,
      queryDistributionElement,
      // asyncHttpToGetInsterIds
    } = this.props;
    let newQueryCapitalElement = {
      ...queryDistributionElement,
      reqPageNum: 1,
      clearingStatus: queryDistributionElement.clearingStatus == 1 ? 1 : ''
    };
    await asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'onlineExecutReport'
    });
    // //查询时，更新下拉选择框里的数据
    // await asyncHttpToGetInsterIds({});
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const {
      asyncHttpSearchAccountByCondition,
      changeElementQuery,
      queryDistributionElement
    } = this.props;
    changeElementQuery({
      sing: 'queryDistributionElement',
      value: page,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryDistributionElement',
      value: pageSize,
      type: 'reqPageSize'
    });
    let newQueryCapitalElement = {
      ...queryDistributionElement,
      clearingStatus: queryDistributionElement.clearingStatus == 1 ? 1 : '',
      reqPageNum: page,
      reqPageSize: pageSize
    };

    asyncHttpSearchAccountByCondition({
      params: filterNullElement(newQueryCapitalElement),
      type: 'onlineExecutReport'
    });
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryDistributionElement } = this.props;
    const query = {
      reqPageNum: queryDistributionElement.reqPageNum,
      reqPageSize: queryDistributionElement.reqPageSize
    };
    resetElement({ type: 'queryDistributionElement', query });
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpSearchAccountByCondition } = this.props;
    asyncHttpSearchAccountByCondition({
      params: { ...page },
      type: 'onlineExecutReport'
    });
    message.success('刷新成功');
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryDistributionElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/condition',
      filterNullElement({ ...queryDistributionElement, includeFieldList: FieldList }),
      '清分明细(分销)',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryDistributionElement, dealInstructionsList } = this.props;
    exportFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/condition',
      filterNullElement({ ...queryDistributionElement, includeFieldList: FieldList }),
      '清分明细(分销)',
      true,
      dealInstructionsList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/execution/onlineExecutReport/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '清分明细(分销)'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
