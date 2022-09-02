import React, { PureComponent } from 'react';
import { message } from 'antd';
import DetailedRowRender from './rowRender';
import {
  ConfigableTable,
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  selectRequest,
  selectPageRequest,
  // page,
  setColumns,
  // withRoleTableBotton,
  exportFile,
  exportSelectFile,
  cloumsFunc
} from 'yss-biz';
// const { mapOption } = SearchForm;
class Detailed extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };

  render() {
    const {
      retailList,
      retailCol,
      // productNameDownList,
      setQueryElement,
      queryElement,
      toResetSearch,
      counterpartyInfoList, //对手方
      // tableHight,
      asyncHttpCreateStandingBook
    } = this.props;
    /***查询Input按钮 */

    const columns = [
      ...setColumns(retailCol)
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 200,
      //   fixed: 'right',
      //   align: 'center',
      //   render: row => withRoleTableBotton(ButtonTableType)(row)
      // }
    ];
    let SearchformItem = [
      {
        name: 'managerCode',
        label: '管理人',
        type: 'Select',
        props: {
          placeholder: '请选择管理人',
          allowClear: true,
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          onChange: value => {
            setQueryElement({ managerCode: value });
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
      //     onChange: value => {
      //       let productId = value;
      //       setQueryElement({ productId: productId });
      //     }
      //   }
        // options: mapOption(productNameDownList, 'productName', 'productCode')
        // options: counterpartyInfoList
      // },
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
          onChange: value => {
            setQueryElement({ bondCode: value });
          }
        }
      },
      {
        name: 'counterName',
        label: '对手方',
        type: 'Select',
        props: {
          placeholder: '请输入对手方名称',
          onChange: value => {
            setQueryElement({ counterName: value });
          }
        },
        options: counterpartyInfoList
        // options: mapOption(counterpartyInfoList, '', '')
      },
      {
        name: 'tradeOrderId',
        label: '交易指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入交易指令编号',
          // allowClear: true
          onChange: e => {
            let newValue = e.target.value;
            setQueryElement({ tradeOrderId: newValue });
          }
        }
      },
      {
        name: 'systemContractStatus',
        label: '系统合同状态',
        type: 'Select',
        props: {
          placeholder: '请选择系统合同状态',
          getDics: 1030125,
          onChange: value => {
            setQueryElement({ systemContractStatus: value });
          }
        }
      }
      // {
      //   name: 'transferInstructStatus',
      //   label: '划款指令状态',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择划款指令状态',
      //     getDics: 1030402,
      //     // mode: "multiple",
      //     onChange(value) {
      //       setQueryElement({ transferInstructStatus: value });
      //     }
      //   }
      // }
      // {
      //   name: 'transferDate',
      //   label: '下达时间',
      //   type: 'RangePicker',
      //   itemSize: '300px',
      //   props: {
      //     placeholder: '请选择划款日期',
      //     allowClear: true,
      //     onChange(dates, dateString) {
      //       setQueryElement({
      //         beginTransmitDate: dateString[0],
      //         endTransmitDate: dateString[1]
      //       });
      //     }
      //   }
      // }
    ];

    /***按钮组***/

    // const ButtonTableType = [{
    //   name: '日间提款',
    //   icon: "account-book",
    //   roule: 'true',
    //   func: this.daytimeWithdrawals
    // }]

    const ButtonType = [
      {
        name: '生成台账',
        roule: 'true',
        // icon: 'transaction',
        func: () => {
          let data = this.state.ids;
          if (data.length < 1) {
            message.error('最少需要选择一条数据！');
          } else {
            let flag = data.find(item => item.systemContractStatus !== '4');
            if (flag) {
              message.error('只有系统合同状态为交割成功才可生成台账');
              this.toEmptySelect();
            } else {
              let params = data.map(item => ({
                bizCategory: '5',
                execCode: item.tradeOrderId
              }));
              asyncHttpCreateStandingBook(params);
              this.toEmptySelect();
            }
          }
        }
      },
      {
        name: '导出',
        roule: 'true',
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
      total: retailList.total,
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this, this.handleRowSelect);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleReset={() =>
            toResetSearch({
              reqPageSize: queryElement.reqPageSize,
              reqPageNum: queryElement.reqPageNum
            })
          }
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          // expandedRowRender={row => rowRender(this.props, row)}
          expandedRowRender={row => {
            return <DetailedRowRender {...this.props} row={row} />;
          }}
          {...setTableInfo({
            columns,
            bordered: true,
            dataSource: retailList.list,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            height: '450px',
            pagination,
            onRow: record => ({
              onClick: event => {
                setTimeout(() => {
                  this.changeAbout(event, record);
                }, 300);
              }
            })
          })}
        />
      </>
    );
  }

  componentDidMount() {}

  handleRowSelect = row => {
    // this.props.changeTableRow({ value: row })
  };

  /***点击修改关联*/
  changeAbout(event, item) {
    event.stopPropagation();
    const { changeTableRow } = this.props;
    changeTableRow && changeTableRow({ value: item });
    // asyncHttpGetAboutList && asyncHttpGetAboutList(item);
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList, queryElement } = this.props;
    asyncHttpGetList({ ...queryElement, reqPageNum: 1 }).then(() => {
      // asyncHttpGetAboutList();
    });
  };

  /**分页查询*/
  searchAccountByCondition = ({ ele, value }) => {
    const { asyncHttpGetList, setQueryElement } = this.props;
    setQueryElement({ [ele]: value });
    asyncHttpGetList({});
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 刷新
  // batch = () => {
  //   console.log(this.props);
  //   const { asyncHttpGetAboutList, rowed } = this.props;
  //   // let arr = Object.keys(rowed);
  //   if (rowed.length >= 1) {
  //     asyncHttpGetAboutList && asyncHttpGetAboutList(rowed);
  //     this.toEmptySelect();
  //   }
  // };

  /*导出当前页*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/distribution/offlineDistrInstruct/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '网下分销指令管理信息',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement, retailList } = this.props;
    exportFile(
      '/bmtp-settle-manage/distribution/offlineDistrInstruct/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '网下分销指令管理信息',
      true,
      retailList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/distribution/offlineDistrInstruct/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '网下分销指令管理信息'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
