import React, { PureComponent } from 'react';
import {
  setTableInfo,
  // setColumns,
  ConfigableTable,
  rowSelectionFunc,
  cloumsFunc,
  SearchForm,
  withRoleBotton,
  // hanbleConfirm,
  functionRolue,
  // selectRequest,
  exportFile,
  // exportSelectFile,
  filterNullElement,
  exportSelectFileOpening
} from 'yss-biz';
import { message } from 'antd';
import ModalMessage from './ModalMessage';

export default class Bond extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.chanUpdate = true;
    this.updateIndex = 0;
    this.state = {
      visible: false,
      FieldList: []
    };
  }
  async componentWillMount() {
    // await this.props.asyncGetBondTableDatas({ ...this.props.paging });
    // await this.props.asyncGetCodeMenu({ securityTypes: ['ZQ'] });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: nextProps.bondTable.dataSource });
  }

  handleSearch = () => {
    const { bondQueryValues, asyncGetBondTableDatas, paging } = this.props;
    asyncGetBondTableDatas(
      filterNullElement({ ...bondQueryValues, ...paging, reqPageNum: 1 })
    ).then(() => {});
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    const { setRowChecked } = this.props;
    this.setState({
      ids: [],
      keys: []
    });
    setRowChecked && setRowChecked([]);
  };

  render() {
    const {
      paramChange,
      toResetSearch,
      bondTable,
      rowChecked,
      asyncCheck,
      asyncUncheck,
      asyncDelete,
      paging,
      bondQueryValues,
      openFormModal,
      isOpenFormModal,
      ZQlist
    } = this.props;
    const { columns, dataSource, total } = bondTable;

    const formItem = [
      {
        name: 'bondCode',
        type: 'Input',
        label: '债券代码',
        props: {
          placeholder: '请输入债券代码',
          onChange: e => {
            let values = e.target.value;
            paramChange({
              stateNames: ['bondQueryValues', 'bondCode'],
              value: values
            });
          }
        }
      },
      {
        name: 'securitySubtype',
        type: 'Select',
        label: '债券类型',
        props: {
          placeholder: '请选择债券类型',
          // getDics: 1030315,
          onChange: value => {
            paramChange({ stateNames: ['bondQueryValues', 'securitySubtype'], value });
          }
        },
        options: ZQlist
      },
      {
        name: 'marketCode',
        type: 'Select',
        label: '交易市场',
        props: {
          placeholder: '请选择交易市场',
          getDics: 1030008,
          onChange: value => {
            paramChange({ stateNames: ['bondQueryValues', 'marketCode'], value });
          }
        }
      }
    ];

    const buttons = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ sign: 'add', title: '新增债券信息' });
        }
      },
      {
        name: '修改',
        roule: functionRolue.EDIT,
        func: () => {
          if (rowChecked && rowChecked.length === 1) {
            if (rowChecked[0].auditStatus == 2) {
              message.error('已审核的数据不能修改!');
              return;
            }
            openFormModal({ sign: 'edit', title: '编辑债券信息' });
          } else {
            message.error('必须且只能选择一条数据源');
          }
        }
      },
      {
        name: '审核',
        icon: 'solution',
        roule: functionRolue.CHECK,
        func: () => {
          // hanbleConfirm({
          //   rowChecked,
          //   done: asyncCheck,
          //   then: () => {
          //     //this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging });
          //   }
          // });
          if (rowChecked && rowChecked.length > 0) {
            let arr = rowChecked.map(item => item.id);
            asyncCheck(arr).then(() => {
              this.toEmptySelect();
              this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging });
            });
          } else {
            message.error('请选择数据源');
          }
        }
      },
      {
        name: '反审核',
        icon: 'file-sync',
        roule: functionRolue.UNCHECK,
        func: () => {
          // hanbleConfirm({
          //   rowChecked,
          //   done: asyncUncheck,
          //   then: () => {
          //     //this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging });
          //   }
          // });
          if (rowChecked && rowChecked.length > 0) {
            let arr = rowChecked.map(item => item.id);
            asyncUncheck(arr).then(() => {
              this.toEmptySelect();
              this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging });
            });
          } else {
            message.error('请选择数据源');
          }
        }
      },
      {
        name: '删除',
        roule: functionRolue.DELETE,
        func: () => {
          // hanbleConfirm({
          //   rowChecked,
          //   done: asyncDelete,
          //   then: () => this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging })
          // });
          if (rowChecked && rowChecked.length > 0) {
            let arr = [];
            for (let n of rowChecked) {
              if (n.auditStatus == 2) {
                message.error('已审批的数据无法删除!');
                return;
              } else {
                arr.push(n.id);
              }
            }
            asyncDelete(arr).then(() => {
              this.toEmptySelect();
              this.props.asyncGetBondTableDatas({ ...bondQueryValues, ...paging });
            });
          } else {
            message.error('请选择数据源');
          }
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

    const col = [
      ...columns
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 80,
      //   fixed: 'right',
      //   align: 'center',
      //   render: item => withRoleTableBotton(ButtonTableType)(item)
      // }
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
      pageSize: paging.reqPageSize,
      current: paging.reqPageNum,
      total: total
    };
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <div>
        <SearchForm
          lineOf={3}
          moreTypeModal
          formItem={formItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={() => {
            this.handleSearch();
          }}
          handleReset={toResetSearch}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(buttons, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            //复选和分页
            rowSelection: rowSelectionFunc.call(this, this.handleRowSelect),
            cloumsCode,
            pagination,
            rowKey: 'id',
            // 表格数据
            columns: col,
            dataSource,
            height: 450
          })}
        />

        {!!isOpenFormModal.sign && (
          <ModalMessage {...this.props} toEmptySelect={this.toEmptySelect} />
        )}
      </div>
    );
  }

  handleRowSelect = row => {
    let ids = Array.isArray(row) ? row.map(item => item) : [row];
    this.props.setRowChecked(ids);
  };

  routerPush = params => {
    let { history } = this.props;
    const { pathname, state } = params;
    history.push({ pathname, state });
  };

  /***分页查询*/
  searchPage = pages => {
    const queryValues = this.props.systemParamQueryValues;
    this.props.asyncGetBondTableDatas({ ...queryValues, ...pages });
    this.toEmptySelect();
  };

  /*导出当前*/
  exportCurrent = () => {
    const { bondQueryValues, paging } = this.props;
    exportFile(
      '/bmtp-common-basicparameter/securityBond/export/condition',
      filterNullElement({ ...bondQueryValues, ...paging, includeFieldList: this.state.FieldList }),
      '证券基本资料',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { bondQueryValues, bondTable } = this.props;
    exportFile(
      '/bmtp-common-basicparameter/securityBond/export/condition',
      filterNullElement({ ...bondQueryValues, includeFieldList: this.state.FieldList }),
      '证券基本资料',
      true,
      bondTable.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { rowChecked } = this.props;
    let arr = [];
    rowChecked.map(item => arr.push(item.securityCode));
    exportSelectFileOpening(
      '/bmtp-common-basicparameter/securityBond/export/selected',
      arr,
      '证券基本资料',
      true
    );
    this.toEmptySelect();
  };
}
