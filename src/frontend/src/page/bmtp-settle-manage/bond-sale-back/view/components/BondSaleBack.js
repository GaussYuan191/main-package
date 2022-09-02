import React, { PureComponent } from 'react';
import { message } from 'antd';
import {
  SearchForm,
  functionRolue,
  withRoleBotton,
  ConfigableTable,
  setTableInfo,
  setColumns,
  rowSelectionFunc,
  filterNullElement,
  exportFile,
  exportSelectFile,
  selectPageRequest,
  cloumsFunc
} from 'yss-biz';
import BondSaleBackRowRender from './BondSaleBackRowRender';

class BondSaleBack extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };
  render() {
    const {
      changeElementQuery,
      bondSaleBackColum,
      bondSaleBackList,
      queryBondSaleBackElement
      // InstrIdListBondSaleBack,
      // bondNameListBondSaleBack
    } = this.props;

    // 搜索字段
    let SearchformItem = [
      {
        name: 'consignorCode',
        label: '管理人',
        type: 'Select',
        props: {
          placeholder: '请选择管理人',
          allowClear: true,
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          onChange(e) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: e,
              type: 'consignorCode'
            });
          }
        }
      },
      // {
      //   name: 'productId',
      //   label: '产品',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择产品',
      //     allowClear: true,
      //     type: 'product',
      //     configDics: selectPageRequest,
      //     dropdownWidth: 300,
      //     onChange(value) {
      //       changeElementQuery({
      //         sing: 'queryBondSaleBackElement',
      //         value,
      //         type: 'productId'
      //       });
      //     }
      //   }
      // },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Select',
        props: {
          placeholder: '请选择交易指令编号',
          allowClear: true,
          type: 'sellbackTradeInstr',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(e) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: e,
              type: 'tradeInstrId'
            });
          }
        }
        // options: InstrIdListBondSaleBack
      },
      {
        name: 'bondCode',
        label: '债券名称',
        type: 'Select',
        props: {
          placeholder: '请选择债券名称',
          allowClear: true,
          type: 'bond',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          onChange(e) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: e,
              type: 'bondCode'
            });
          }
        }
        // options: bondNameListBondSaleBack
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'RangePicker',
        itemSize: '300px',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true,
          onChange(date, dateString) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: dateString[0],
              type: 'startSettleDate'
            });
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: dateString[1],
              type: 'endSettleDate'
            });
          }
        }
      }
    ];

    // 表格头操作按钮
    const ButtonType = [
      // {
      //   name: '刷新',
      //   icon: 'stepForwardFilled',
      //   roule: true,
      //   func: this.refresh
      // },
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

    // 表格字段
    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 80,
        render: (text, record, index) => ++index
      },
      // {
      //   title: '产品名称',
      //   dataIndex: 'productName',
      //   key: 'productName',
      //   width: 150,
      //   ellipsis: true,
      //   render: (text, record, index) => {
      //     if (record.productList && record.productList.length === 1) {
      //       return record.productList[0].productName || null;
      //     } else {
      //       return null;
      //     }
      //   }
      // },
      ...setColumns(bondSaleBackColum),
      {
        title: '结算机构',
        dataIndex: 'settInstitution',
        key: 'settInstitution',
        width: 150,
        render: (text, record, index) => {
          if (text) {
            for (let n of this.props.settInstitution) {
              if (n.dicCode == text) {
                return n.dicExplain;
              }
            }
          } else {
            return text;
          }
        }
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 150
      },
      {
        title: '结算方式',
        dataIndex: 'settleTypeName',
        key: 'settleTypeName',
        width: 150,
        render: (text, record, index) => {
          if (text == '0') {
            return 'DVP券款对付';
          } else {
            return text;
          }
        }
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 150
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        ellipsis: true
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 150,
        ellipsis: true
      },
      {
        title: '系统合同状态',
        dataIndex: 'systemContructStatus',
        key: 'systemContructStatus',
        width: 150,
        render: row => '成功'
      },
      {
        title: '备注',
        dataIndex: 'systemHandleStatus',
        key: 'systemHandleStatus',
        width: 150,
        render: (text, record, index) => {
          if (text) {
            for (let n of this.props.systemHandleStatus) {
              if (n.dicCode == text) {
                return n.dicExplain;
              }
            }
          } else {
            return '';
          }
        }
      }
    ];

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: bondSaleBackList.total,
      pageSize: queryBondSaleBackElement.reqPageSize,
      current: queryBondSaleBackElement.reqPageNum
    };

    return (
      <>
        {/* 搜索框 */}
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm2 = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={this.handleReset}
        />

        {/* 头部操作按钮 */}
        <div>{withRoleBotton(ButtonType, this.props.btnAuth)}</div>

        {/* 数据表格 */}
        <ConfigableTable
          expandedRowRender={row => {
            return <BondSaleBackRowRender {...this.props} row={row} />;
          }}
          {...setTableInfo({
            columns,
            dataSource: bondSaleBackList.list,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination,
            height: 450
          })}
        />
      </>
    );
  }

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryBondSaleBackElement } = this.props;
    const query = {
      reqPageSize: queryBondSaleBackElement.reqPageSize,
      reqPageNum: queryBondSaleBackElement.reqPageNum
    };
    resetElement({ sing: 'queryBondSaleBackElement', query });
  };

  /***模糊查询*/
  query = async () => {
    const {
      asyncHttpGetList,
      queryBondSaleBackElement
      // asyncGetBondInfoGroupByReport,
      // asyncGetTradeInstrIdGroupByReport
    } = this.props;
    // console.log(this.props);
    await asyncHttpGetList({ ...queryBondSaleBackElement, reqPageNum: 1 });
    // await asyncGetBondInfoGroupByReport();
    // await asyncGetTradeInstrIdGroupByReport();
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetList, changeElementQuery } = this.props;
    changeElementQuery({
      sing: 'queryBondSaleBackElement',
      value: page.reqPageNum,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryBondSaleBackElement',
      value: page.reqPageSize,
      type: 'reqPageSize'
    });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryBondSaleBackElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/sellback/sellback/export/condition',
      {
        ...filterNullElement({
          ...queryBondSaleBackElement,
          includeFieldList: this.updateDataIndex(FieldList)
        }),
        isProductLevel: true
      },
      '债券回售',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { bondSaleBackList, queryBondSaleBackElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/sellback/sellback/export/condition',
      {
        ...filterNullElement({
          ...queryBondSaleBackElement,
          includeFieldList: this.updateDataIndex(FieldList)
        }),
        isProductLevel: true
      },
      '债券回售',
      true,
      bondSaleBackList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    if (!ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    let idList = [];
    ids.forEach(element => {
      idList.push(element.id);
    });
    exportSelectFile(
      '/bmtp-settle-manage/sellback/sellback/export/selected',
      {
        includeFieldList: this.updateDataIndex(FieldList),
        selectList: idList,
        isProductLevel: true
      },
      '债券回售',
      true
    );
    this.toEmptySelect();
  };

  updateDataIndex = FieldList => {
    let index = FieldList.indexOf('bizCategoryName');
    let index1 = FieldList.indexOf('settleTypeName');
    FieldList[index] = 'bizCategory';
    FieldList[index1] = 'settleType';
    return FieldList;
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpGetList, queryBondSaleBackElement } = this.props;
    asyncHttpGetList(queryBondSaleBackElement);
    this.toEmptySelect();
    message.success('刷新成功');
  };
}

export default BondSaleBack;
