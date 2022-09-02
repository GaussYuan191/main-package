import React, { PureComponent } from 'react';
import {
  withRoleBotton,
  SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable,
  // filterNullElement,
  // withRoleTableBotton,
  setColumns,
  selectPageRequest
} from 'yss-biz';
import { message, Modal } from 'antd';
import ModalForm from './detialModal';

const { confirm } = Modal;
// const { Option } = Select;

class CacheContent extends PureComponent {
  state = {
    ids: [],
    visible: false,
    rowed: {},
    modalType: ''
  };
  render() {
    const { changeElementQuery, toResetSearch, queryElement, dataList } = this.props;

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
          onChange(value) {
            changeElementQuery({
              type: 'managerCode',
              value: value,
              sing: 'queryElement'
            });
          }
        }
      },
      {
        name: 'checkStatus',
        label: '审核状态',
        type: 'Select',
        props: {
          placeholder: '请选择审核状态',
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              type: 'checkStatus',
              value: value,
              sing: 'queryElement'
            });
          }
        },
        options: [
          { label: '已审核', value: 1 },
          { label: '未审核', value: 2 }
        ]
      },
      {
        name: 'remark',
        label: '描述',
        type: 'Input',
        props: {
          placeholder: '请输入描述',
          allowClear: true,
          onChange(e) {
            changeElementQuery({
              type: 'remark',
              value: e.target.value,
              sing: 'queryElement'
            });
          }
        }
      }
    ];

    const ButtonType = [
      {
        name: '新增',
        roule: 'true',
        func: () => {
          this.setState({ modalType: 'add', visible: true });
        }
      },
      {
        name: '修改',
        roule: 'true',
        func: () => {
          this.edit();
        }
      },
      {
        name: '删除',
        roule: 'true',
        func: () => {
          this.del();
        }
      },
      {
        name: '审核',
        roule: 'true',
        func: () => {
          this.check();
        }
      },
      {
        name: '反审核',
        roule: 'true',
        func: () => {
          this.uncheck();
        }
      },
      {
        name: '复制',
        roule: 'true',
        func: () => {
          this.copy();
        }
      }
    ];

    const columns = [
      {
        title: '序号',
        width: 70,
        dataIndex: 'index',
        render: (text, record, index) => {
          return ++index;
        }
      },
      {
        title: '管理人名称',
        width: 200,
        dataIndex: 'managerName',
        key: 'managerName',
        ellipsis: true
      },
      {
        title: '节点内容',
        width: 450,
        dataIndex: 'content',
        key: 'content',
        ellipsis: true
      },
      {
        title: '交互方式',
        width: 140,
        dataIndex: 'primaryNode',
        key: 'primaryNode',
        ellipsis: true
      },
      {
        title: '节点代码',
        width: 250,
        dataIndex: 'secondaryNode',
        key: 'secondaryNode',
        ellipsis: true
      },
      {
        title: '接口名称',
        width: 250,
        dataIndex: 'interfaceCodeName',
        key: 'interfaceCodeName',
        ellipsis: true
      },
      {
        title: '目标系统',
        width: 120,
        dataIndex: 'targetSystemName',
        key: 'targetSystemName',
        ellipsis: true
      },
      {
        title: '描述',
        width: 380,
        dataIndex: 'remark',
        key: 'remark',
        ellipsis: true
      },
      {
        title: '审核状态',
        width: 120,
        dataIndex: 'checkStatusName',
        key: 'checkStatusName',
        ellipsis: true
      },
      {
        title: '审核人',
        width: 140,
        dataIndex: 'checkUserName',
        key: 'checkUserName',
        ellipsis: true
      },
      {
        title: '审核时间',
        width: 200,
        dataIndex: 'checkTime',
        key: 'checkTime',
        ellipsis: true
      },
      {
        title: '创建人',
        width: 140,
        dataIndex: 'createUserName',
        key: 'createUserName',
        ellipsis: true
      },
      {
        title: '创建时间',
        width: 200,
        dataIndex: 'createTime',
        key: 'createTime',
        ellipsis: true
      },
      {
        title: '修改人',
        width: 140,
        dataIndex: 'updateUserName',
        key: 'updateUserName',
        ellipsis: true
      },
      {
        title: '修改时间',
        width: 200,
        dataIndex: 'updateTime',
        key: 'updateTime',
        ellipsis: true
      }
      // {
      //   title: '操作',
      //   width: 200,
      //   key: 'actions',
      //   ellipsis: true,
      //   align: 'center',
      //   render: (text, record, index) => {
      //     return (
      //       <>
      //         <Button size="small" type="link" icon="search" onClick={() => this.check(record)}>
      //           查看
      //         </Button>
      //         <Button size="small" type="link" icon="delete" onClick={() => this.del(record)}>
      //           删除
      //         </Button>
      //       </>
      //     );
      //   }
      // }
    ];

    // 表格分页
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      total: dataList.total,
      current: queryElement.reqPageNum
    };

    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <div style={{ margin: '8px' }}>
          <SearchForm
            labelSize="4em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleReset={toResetSearch}
            handleBeforeReset={() => true}
          />
          <div>{withRoleBotton(ButtonType, this.props.btnAuth)}</div>
          <ConfigableTable
            {...setTableInfo({
              columns: setColumns(columns),
              dataSource: dataList.list,
              rowSelection,
              pagination,
              rowKey: 'id',
              height: 450
            })}
          />

          {/* 查看详细 cancelModal使子组件能调用对应方法修改父组件的值*/}
          <ModalForm {...this.props} {...this.state} cancelModal={this.cancelModal}></ModalForm>
        </div>
      </>
    );
  }

  // 修改
  edit = () => {
    if (this.state.ids.length != 1) {
      message.error('必须且只能选择一条数据源');
    } else if (this.state.ids[0].checkStatus == '1') {
      message.error('已审核的数据不能修改');
    } else {
      this.setState({ modalType: 'edit', visible: true });
    }
  };

  // 复制
  copy = () => {
    if (this.state.ids.length != 1) {
      message.error('必须且只能选择一条数据源');
    } else {
      this.setState({ modalType: 'copy', visible: true });
    }
  };

  // 删除
  del = () => {
    if (this.state.ids.length != 1) {
      message.error('必须且只能选择一条数据源');
    } else if (this.state.ids[0].checkStatus == '1') {
      message.error('已审核的数据不能删除');
    } else {
      const { asyncHttpDel } = this.props;
      let id = this.state.ids[0].id;
      let _this = this;
      confirm({
        title: '是否确认删除?',
        onOk() {
          asyncHttpDel(id);
          _this.toEmptySelect();
        }
      });
    }
  };

  // 关闭弹出框
  cancelModal = () => {
    this.setState({
      visible: false
    });
  };

  // 查询
  query = () => {
    const { asyncHttpCachePage } = this.props;
    asyncHttpCachePage({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  // 分页
  searchAccountByCondition = pages => {
    const { changeElementQuery, asyncHttpCachePage } = this.props;
    changeElementQuery({
      type: pages.ele,
      value: pages.value,
      sing: 'queryElement'
    });
    asyncHttpCachePage({});
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 审核
  check = () => {
    if (this.state.ids.length == 0) {
      message.error('请选择需要审核的数据');
    } else if (this.state.ids[0].checkStatus == 1) {
      message.error('已审核的数据不需要再次审核');
    } else {
      const { asyncHttpCheck } = this.props;
      let arr = [];
      this.state.ids.map(item => {
        arr.push(item.id);
      });
      asyncHttpCheck(arr);
      this.toEmptySelect();
    }
  };

  // 反审核
  uncheck = () => {
    if (this.state.ids.length == 0) {
      message.error('请选择需要反审核的数据');
    } else if (this.state.ids[0].checkStatus == 2) {
      message.error('未审核的数据不能反审核');
    } else {
      const { asyncHttpUncheck } = this.props;
      let arr = [];
      this.state.ids.map(item => {
        arr.push(item.id);
      });
      asyncHttpUncheck(arr);
      this.toEmptySelect();
    }
  };
}

export default CacheContent;
