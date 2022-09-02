import React, { PureComponent, Fragment } from 'react';
import { modal, message } from 'antd';
import ForexSettingAdd from './ForexSettingAdd';
import {
  withRoleBotton,
  SearchForm,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  selectPageRequest,
  ConfigableTable,
  functionRolue,
  exportFile,
  exportSelectFile,
  filterNullElement,
  cloumsFunc,
  withRoleTableBotton
} from 'yss-biz';
const { confirm } = modal;

class ForexSystemSetting extends PureComponent {
  state = {
    ids: [],
    FieldList: [],
    visibleFormAdd: false,
    openModalType: 'add',
    dataList: [],
    productId: 0
  };
  /***分页查询*/
  searchPage = pages => {
    const { setPageQueryParam } = this.props;
    setPageQueryParam && setPageQueryParam(pages);
    this.props.asyncHttpGetFunNameToProductPageList();
  };
  /***选择一行*/
  handleRowSelect = row => {
    this.props.setSelectRow([]);
    row = Array.isArray(row) ? row : [row];
    this.props.setSelectRow(row);
  };
  render() {
    const { forexSettingTable, pageReqParm, toResetSearch, setForexSettingQueryForm } = this.props;
    const { columns, data } = forexSettingTable;
    let me = this;
    /*设置查询*/
    let SearchformItem = [
      {
        name: 'productId',
        label: '产品名称',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'product',
          dropdownWidth: 300,
          placeholder: '请选择所属产品名称',
          onChange(value, option) {
            let productId = option?.props?.origindata?.id;
            me.setState({ productId });
          }
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: '请输入成交编号',
          allowClear: true,
          onChange(e) {
            let value = e.target.value;
            setForexSettingQueryForm({ execCode: value });
          }
        }
      }
    ];
    /**设置功能按钮 */
    const ButtonType = [
      {
        name: '新增',
        roule: true,
        func: this.openFormAdd
      },
      {
        name: '修改',
        roule: true,
        func: this.edit
      },
      {
        name: '删除',
        roule: true,
        func: this.del
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
        name: '一键清分',
        roule: true,
        func: this.toLiquidate
      },
      {
        name: '导出',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: this.exportFileAll
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
    /**设置操作按钮 */
    let operationColums = {
      title: '操作',
      key: 'operation',
      width: 150,
      align: 'center',
      render: row => {
        return withRoleTableBotton(
          [
            {
              name: '关联产品',
              icon: 'edit',
              roule: true,
              func: this.relationProduct(row)
            }
          ],
          this.props.btnAuth
        )(row);
      }
    };
    /**设置分页 */
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
      pageSize: pageReqParm.reqPageSize,
      current: pageReqParm.reqPageNum,
      total: forexSettingTable.dataTotal
    };

    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <Fragment>
        <div style={{ marginTop: '10px' }}></div>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={values => {
            this.query(values);
          }}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={toResetSearch}
        />
        <div className="marBotton">{withRoleBotton(ButtonType, this.props.btnAuth)}</div>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            cloumsCode,
            className: 'yss-configable-table stripe-table',
            columns: [...setColumns(columns), operationColums],
            dataSource: data,
            height: 500,
            rowSelection: rowSelectionFunc.call(this, (id, row) => this.handleRowSelect(id, row)),
            pagination: pagination
          })}
        />
        {/* 新增页面 */}
        {this.state.visibleFormAdd ? (
          <ForexSettingAdd
            {...this.props}
            {...this.state}
            closeFormAdd={this.closeFormAdd}
            query={this.query}
          />
        ) : null}
      </Fragment>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetFunNameToProductPageList } = this.props;
    await asyncHttpGetFunNameToProductPageList({});
  }
  /**表格查询 */
  query = values => {
    this.props.setForexSettingQueryForm({ ...values, productId: this.state.productId });
    this.props.setPageQueryParam({ reqPageNum: 1 });
    this.props.asyncHttpGetFunNameToProductPageList();
    this.toEmptySelect();
  };
  /**清空row */
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: [],
      dataList: []
    });
    this.props.setSelectRow([]);
  };
  /**弹出新增界面 */
  openFormAdd = () => {
    this.setState({ visibleFormAdd: true, openModalType: 'add' });
  };
  /**关闭新增界面 */
  closeFormAdd = () => {
    this.setState({ visibleFormAdd: false });
  };
  /**批量审核 */
  check = async () => {
    const { ids } = this.state;
    const { asyncHttpCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus != '1') {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能审核');
          return;
        }
      }
      await asyncHttpCheckList(arr);
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**批量反审核 */
  uncheck = async () => {
    const { ids } = this.state;
    const { asyncHttpUnCheckList } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == 1) {
          arr.push(n.id);
        } else {
          message.error('只有审核的数据才能反审核');
          return;
        }
      }
      await asyncHttpUnCheckList(arr);
      this.query();
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**修改 */
  edit = () => {
    const { ids } = this.state;
    if (ids.length == 1) {
      if (ids[0].checkStatus == 2) {
        this.setState({ visibleFormAdd: true, openModalType: 'edit' });
      } else {
        message.error('只有未审核的数据才能修改');
        return;
      }
    } else {
      message.error('必须且只能选择一条数据');
      return;
    }
  };
  /**删除 */
  del = () => {
    const { ids } = this.state;
    const that = this;
    const { asyncHttpDel } = this.props;
    if (ids.length > 0) {
      let arr = [];
      for (let n of ids) {
        if (n.checkStatus == 2) {
          arr.push(n.id);
        } else {
          message.error('只有未审核的数据才能删除');
          return;
        }
      }
      confirm({
        title: '是否确认删除?',
        onOk: async () => {
          await asyncHttpDel(arr);
          that.query();
        }
      });
    } else {
      message.error('请选择数据');
      return;
    }
  };
  /**关联产品 */
  relationProduct = row => {
    return () => {
      if (row.checkStatus == 2) {
        this.setState({ visibleFormAdd: true, openModalType: 'relation', dataList: [row] });
      } else {
        message.error('只有未审核的数据才能关联产品');
        return;
      }
    };
  };
  /**一键清分 */
  toLiquidate = async () => {
    const { ids } = this.state;
    const { asyncHttpDistributionByHand } = this.props;
    if (ids.length == 1) {
      if (ids[0].checkStatus == 1) {
        await asyncHttpDistributionByHand({
          productId: ids[0].productId,
          fundShortName: ids[0].fundShortName
        });
      } else {
        message.error('只有已审核的数据才能一键清分');
        return;
      }
    } else {
      message.error('必须且只能选择一条数据');
      return;
    }
  };
  /**导出全部 */
  exportFileAll = () => {
    const { FieldList } = this.state;
    const { forexSettingQueryForm, forexSettingTable } = this.props;
    exportFile(
      '/bmtp-common-basicparameter/biz/fundNameToProduct/export/condition',
      filterNullElement({
        ...forexSettingQueryForm,
        fullOrderType: 1,
        includeFieldList: this.dealPathField(FieldList)
      }),
      '外汇系统基金设置',
      true,
      forexSettingTable.dataTotal,
      '/bmtp-common-basicparameter/securityBond/export/getExportInfoByExecuteID'
    );
  };
  /**导出当前页 */
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { forexSettingQueryForm, pageReqParm } = this.props;
    exportFile(
      '/bmtp-common-basicparameter/biz/fundNameToProduct/export/condition',
      filterNullElement({
        ...forexSettingQueryForm,
        ...pageReqParm,
        includeFieldList: this.dealPathField(FieldList)
      }),
      '外汇系统基金设置',
      false
    );
  };
  /*导出选择项*/
  exportSelected = () => {
    const { FieldList } = this.state;
    let params = [];
    if (!this.state.ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    this.state.ids.map(item => {
      params.push(item.id);
    });
    exportSelectFile(
      '/bmtp-common-basicparameter/biz/fundNameToProduct/export/selected',
      { includeFieldList: this.dealPathField(FieldList), selectList: params },
      '外汇系统基金设置',
      true
    );
    this.toEmptySelect();
  };
  /**处理导出文件参数, 将字段路径格式的最终字段提取出来 */
  dealPathField = FieldList => {
    return FieldList.map(item => {
      if (Array.isArray(item)) {
        return item[item.length - 1];
      }
      return item;
    });
  };
}

export default ForexSystemSetting;
