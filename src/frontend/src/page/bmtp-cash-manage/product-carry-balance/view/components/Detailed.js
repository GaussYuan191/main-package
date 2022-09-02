import React, { PureComponent } from 'react';
import {
  setTableInfo,
  SearchForm,
  ConfigableTable,
  selectPageRequest,
  rowSelectionFunc,
  setColumns,
  cloumsFunc,
  withRoleBotton,
  exportFile,
  exportSelectFile,
  functionRolue,
  filterNullElement
} from 'yss-biz';
import moment from 'moment';
import { message, Button } from 'antd';

export default class TableForeBusiness extends PureComponent {
  tabColumns = [
    {
      key: 'productName',
      dataIndex: 'productName',
      title: '产品名称',
      ellipsis: true,
      width: 250
    },
    // {
    //   key: 'assetUnitName',
    //   dataIndex: 'assetUnitName',
    //   title: '资产单元',
    //   width: 200
    // },
    {
      key: 'consignorName',
      dataIndex: 'consignorName',
      title: '管理人',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondName',
      dataIndex: 'bondName',
      title: '证券名称',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondCode',
      dataIndex: 'bondCode',
      title: '证券代码',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondCurrencyName',
      dataIndex: 'bondCurrencyName',
      title: '债券币种',
      ellipsis: true,
      width: 200
    },
    {
      key: 'totalLeft',
      dataIndex: 'totalLeft',
      title: '债券余额(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'usableSubject',
      dataIndex: 'usableSubject',
      title: '可用科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'accruedSubject',
      dataIndex: 'accruedSubject',
      title: '待付科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'meltInSubject',
      dataIndex: 'meltInSubject',
      title: '融入科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'meltOutSubject',
      dataIndex: 'meltOutSubject',
      title: '融出科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'totalBuyBackSubject',
      dataIndex: 'totalBuyBackSubject',
      title: '全额待购回科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'freezeSubject',
      dataIndex: 'freezeSubject',
      title: '冻结科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'pledgeSubject',
      dataIndex: 'pledgeSubject',
      title: '质押科目(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'underWritingSubject',
      dataIndex: 'underWritingSubject',
      title: '承销额度(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'underWritingAccruedSubject',
      dataIndex: 'underWritingAccruedSubject',
      title: '承销额度待付(万元)',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondAccount',
      dataIndex: 'bondAccount',
      title: '债券账号',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondAccountName',
      dataIndex: 'bondAccountName',
      title: '账户名称',
      ellipsis: true,
      width: 200
    },
    {
      key: 'bondAccountTypeName',
      dataIndex: 'bondAccountTypeName',
      title: '账户类型',
      ellipsis: true,
      width: 200
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '日期',
      ellipsis: true,
      width: 200
    }
  ];
  // ButtonTableType = [
  //   {
  //     name: '查看',
  //     roule: true,
  //     noAuth: true,
  //     func: () => {
  //       this.props.setFormModal(true);
  //     }
  //   }
  // ];

  state = {
    visible: false,
    row: '',
    columns: [
      ...setColumns(this.tabColumns),
      {
        title: '变动明细',
        key: 'operation',
        width: 120,
        fixed: 'right',
        align: 'center',
        // render: row => {
        //   return !!row.id ? withRoleTableBotton(this.ButtonTableType, this.props.btnAuth)(row) : '';
        // }
        render: record => {
          return (
            <>
              {record && record.detailList && record.detailList.length ? (
                '——'
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    this.props.setFormModal(true);
                    this.props.setTrDatas({ row: record });
                  }}
                >
                  查看
                </Button>
              )}
            </>
          );
        }
      }
    ],
    dataSource: [],
    FieldList: [],
    bondAccountList: [],
    indeterminateSet: new Set(), // 父级节点半选状态id列表, 用于表格勾选展示
    selectedIdsSet: new Set() // 勾选节点id列表, 用于表格勾选展示
  };

  static getDerivedStateFromProps(nextProp, preState) {
    if (JSON.stringify(nextProp.tableDatas) !== JSON.stringify(preState.dataSource)) {
      return {
        dataSource: nextProp.tableDatas
      };
    }
    return null;
  }

  async componentDidMount() {
    const {
      asyncHttpGetCurTradeDate,
      toResetSearch,
      asyncHttpGetPageList,
      asyncHttpGetAboutMessage
    } = this.props;
    await asyncHttpGetCurTradeDate({}).then(() => {
      toResetSearch(); // 设置交易日
    });
    asyncHttpGetPageList({}).then(() => {
      asyncHttpGetAboutMessage();
    });
  }

  //查询
  handleQuery = async values => {
    const { setQueryDatas, asyncHttpGetPageList, asyncHttpGetAboutMessage, httpGetCurTradeDate } =
      this.props;
    const { consignorCode } = values;
    if (!values.tradeDate) {
      // 用户能用手工输入方式将交易日期删除, 此处添加防御
      if (!this.props.currentTradeDate) {
        await httpGetCurTradeDate();
      }
      values.tradeDate = this.props.currentTradeDate || moment().format('YYYY-MM-DD');
      this.searchForm.props.form.setFields({
        tradeDate: moment(values.tradeDate, 'YYYY-MM-DD')
      });
    } else {
      values.tradeDate = values.tradeDate.format('YYYY-MM-DD');
    }
    const targetValues = Object.assign({}, values, {
      consignorCode: (consignorCode && consignorCode.join(',')) || '',
      reqPageNum: 1
    });
    setQueryDatas(targetValues);
    this.clearSelect(); // 由于未知bug,清除需要放在查询之前执行
    await asyncHttpGetPageList({}).then(() => {
      asyncHttpGetAboutMessage();
    });
  };

  /***分页查询*/
  searchPage = pages => {
    const { setQueryDatas, asyncHttpGetPageList } = this.props;
    setQueryDatas(pages);
    this.clearSelect();
    asyncHttpGetPageList({});
  };

  // 发送数据
  sendData = () => {
    const { rows, asyncHttpAxiosSend } = this.props;
    let params = rows.map(item => {
      let obj = {};
      obj.bondAccount = item.bondAccount;
      obj.bondCode = item.bondCode;
      obj.productId = item.productId;
      return obj;
    });

    //未勾选数据
    if (rows.length < 1) {
      message.error('请选择需要发送的数据');
      return;
    }
    asyncHttpAxiosSend({
      params
    }).then(() => {
      this.clearSelect();
    });
  };

  render() {
    const {
      tableHight,
      listTotal,
      toResetSearch,
      currentTradeDate,
      query,
      relatedSubjectCodes,
      setRelatedSubjectCodes
    } = this.props;

    const formItem = [
      {
        name: 'tradeDate',
        label: '交易日期',
        type: 'DatePicker',
        props: {
          initialValue: currentTradeDate ? moment(currentTradeDate, 'YYYY-MM-DD') : moment(),
          placeholder: '请选择日期',
          allowClear: false
        }
      },
      {
        name: 'productId',
        type: 'Select',
        label: '产品名称',
        props: {
          placeholder: '请选择产品',
          type: 'product',
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange: (value, option) => {
            setRelatedSubjectCodes &&
              setRelatedSubjectCodes({ relatedSubjectCodes: value ? [value] : null });
          }
        }
      },
      {
        name: 'bondCode',
        type: 'Select',
        label: '债券名称',
        props: {
          placeholder: '请选择债券名称',
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 350
        }
        // options: this.props.bondNames
      },
      {
        name: 'bondAccount',
        label: '债券账户',
        type: 'Select',
        props: {
          type: 'bondAccount',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          extrParam: {
            relatedSubjectCodes: relatedSubjectCodes ? relatedSubjectCodes : []
          },
          refreshOnDropdown: true,
          placeholder: '请选择债券账户'
        }
        // options: this.state.bondAccountList
      },
      {
        name: 'consignorCode',
        type: 'Select',
        label: '管理人',
        props: {
          placeholder: '请选择管理人',
          type: 'consignor',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          configDics: selectPageRequest,
          dropdownWidth: 300
        }
      }
    ];

    /***按钮组** */
    const ButtonType = [
      {
        name: '推送',
        roule: true,
        func: this.sendData
      },
      {
        name: '导出',
        icon: 'export',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportByCondition(true);
            }
          },
          {
            name: '导出当前页',
            func: () => {
              this.exportByCondition();
            }
          },
          {
            name: '导出选择项',
            func: this.exportBySelected
          }
        ]
      }
    ];

    let cloumsCode = cloumsFunc.call(this, 'FieldList');

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
      pageSize: query.reqPageSize,
      total: listTotal || 0,
      current: query.reqPageNum
    };

    return (
      <>
        <SearchForm
          lineOf={3}
          moreTypeModal
          moreFullSearch={true}
          formItem={formItem}
          refs={ref => {
            this.searchForm = ref;
          }}
          handleSearch={this.handleQuery}
          handleReset={() => {
            setRelatedSubjectCodes && setRelatedSubjectCodes({ relatedSubjectCodes: [] });
            toResetSearch({
              reqPageSize: query.reqPageSize,
              reqPageNum: 1
            });
          }}
        />

        {withRoleBotton(ButtonType, this.props.btnAuth)}

        <ConfigableTable
          {...setTableInfo.call(this, {
            // rowKey: 'id' || 'index',
            //拖拽相关
            colDraggable: true,
            //复选和分页
            rowSelection: {
              getCheckboxProps: record => {
                return {
                  indeterminate: this.state.indeterminateSet.has(record.id)
                };
              },
              selectedRowKeys: Array.from(this.state.selectedIdsSet),
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                this.handleSelect(record, selected);
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                this.handleSelectAll(selected, selectedRows);
              }
            },
            onRow: record => ({
              onClick: async () => {
                setTimeout(() => {
                  if (!record.detailList) {
                    this.changeRelation(record);
                  }
                }, 300);
              }
            }),
            pagination: pagination,
            // 表格数据
            columns: this.state.columns,
            dataSource: this.state.dataSource,
            childrenColumnName: 'detailList',
            cloumsCode,
            height: tableHight,
            rowKey: 'id'
          })}
        />
      </>
    );
  }

  changeRelation = async row => {
    const { asyncHttpGetAboutMessage, setTrDatas } = this.props;
    setTrDatas({ row });
    await asyncHttpGetAboutMessage();
  };

  routerPush = params => {
    let { history } = this.props;
    const { pathname, state } = params;
    history.push({ pathname, state });
  };

  /**处理勾选项 */
  handleSelect = (record, selected) => {
    const { indeterminateSet, selectedIdsSet } = this.state;
    if (record.detailList) {
      if (selected) {
        // 父结点做选中
        selectedIdsSet.add(record.id);
        record.detailList.forEach(item => {
          selectedIdsSet.add(item.id);
        });
        indeterminateSet.delete(record.id);
      } else {
        // 父结点取消选中
        selectedIdsSet.delete(record.id);
        record.detailList.forEach(item => {
          selectedIdsSet.delete(item.id);
        });
        indeterminateSet.delete(record.id);
      }
    } else {
      if (selected) {
        // 叶子节点做选中
        selectedIdsSet.add(record.id);
        // 处理父级勾选状态
        const parentRow = this.state.dataSource.find(item => item.id === record.parentId);
        const isAll = parentRow?.detailList.every(item => selectedIdsSet.has(item.id));
        if (isAll) {
          selectedIdsSet.add(record.parentId);
          indeterminateSet.delete(record.parentId);
        } else {
          selectedIdsSet.delete(record.parentId);
          indeterminateSet.add(record.parentId);
        }
      } else {
        // 叶子节点取消选中
        selectedIdsSet.delete(record.id);
        // 处理父级勾选状态
        selectedIdsSet.delete(record.parentId);
        const parentRow = this.state.dataSource.find(item => item.id === record.parentId);
        const isEmpty = parentRow?.detailList.every(item => !selectedIdsSet.has(item.id));
        if (isEmpty) {
          indeterminateSet.delete(record.parentId);
        } else {
          indeterminateSet.add(record.parentId);
        }
      }
    }

    this.setState({ indeterminateSet, selectedIdsSet }, () => {
      this.updateSelectState();
    });
  };

  /**处理全选勾选 */
  handleSelectAll = (selected, selectedRows) => {
    if (!selected) {
      this.clearSelect();
    }
    this.setState(
      {
        indeterminateSet: new Set(),
        selectedIdsSet: new Set(selectedRows.map(item => item.id))
      },
      () => {
        this.updateSelectState();
      }
    );
  };

  /**根据勾选id(展示)更新状态管理器中的selectRowsIds和rows(过滤父节点) */
  updateSelectState = () => {
    const { setSelectRows, saveSelectRowsIds } = this.props;
    const { dataSource, selectedIdsSet } = this.state;
    const rows = dataSource.reduce((selectedList, item) => {
      item.detailList &&
        item.detailList.forEach(subItem => {
          if (selectedIdsSet.has(subItem.id)) {
            selectedList.push(subItem);
          }
        });
      return selectedList;
    }, []);
    setSelectRows(rows);
    saveSelectRowsIds(rows.map(item => item.id));
  };

  /**清空勾选 */
  clearSelect = () => {
    const { setSelectRows, saveSelectRowsIds } = this.props;
    setSelectRows([]);
    saveSelectRowsIds([]);
    this.setState({
      indeterminateSet: new Set([]),
      selectedIdsSet: new Set([])
    });
  };

  /**条件导出 */
  exportByCondition = isAll => {
    const { FieldList } = this.state;
    const { query } = this.props;
    let params = { ...query, includeFieldList: this.filterOperator(FieldList) };
    exportFile(
      '/bmtp-cash-manage/hold/productCarryBalance/export/custDetcondition',
      filterNullElement(params),
      '产品持仓余额',
      !!isAll,
      this.props.listTotal
    );
  };

  /**导出选择项 */
  exportBySelected = () => {
    const { FieldList } = this.state;
    const { selectRowsIds } = this.props;
    if (!selectRowsIds.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    console.log(selectRowsIds, 'selectRowsIds');
    exportSelectFile(
      '/bmtp-cash-manage/hold/productCarryBalance/export/selected',
      {
        selectList: selectRowsIds,
        includeFieldList: this.filterOperator(FieldList),
        isProductLevel: true
      },
      '产品持仓余额',
      true
    );
  };

  //过滤出操作列字段
  filterOperator = data => {
    return data.filter(item => item !== undefined);
  };
}
