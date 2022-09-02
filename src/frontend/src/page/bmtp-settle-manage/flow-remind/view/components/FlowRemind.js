import React, { PureComponent } from 'react';
import { Modal as modal } from 'antd';
import {
  SearchForm,
  withRoleBotton,
  withRoleTableBotton,
  ConfigableTable,
  setTableInfo,
  setColumns,
  rowSelectionFunc,
  // filterNullElement,
  Modal
} from 'yss-biz';
import FlowRemindFormAdd from './FlowRemindFormAdd';

class BusinessFlow extends PureComponent {
  state = {
    ids: [],
    isOpenModal: {
      status: false,
      type: 'view'
    },
    rowData: {},
    flowConfigList: []
  };
  async componentDidMount() {
    this.query();
  }
  render() {
    const { changeElementQuery, dataList, queryElement, clearDataDetail } = this.props;
    const { isOpenModal } = this.state;
    // 搜索字段
    let SearchformItem = [
      // {
      //   name: 'code',
      //   label: '监控节点',
      //   type: 'TreeSelect',
      //   props: {
      //     placeholder: '请选择监控流程节点',
      //     allowClear: true,
      //     onChange(value) {
      //       changeElementQuery({
      //         sing: 'queryElement',
      //         value,
      //         type: 'code'
      //       });
      //     }
      //   }
      // },
      {
        name: 'triggerTime',
        label: '触发时点',
        type: 'Select',
        props: {
          placeholder: '请选择触发时点',
          allowClear: true,
          getDics: '1050008',
          onChange(value) {
            changeElementQuery({
              sing: 'queryElement',
              value,
              type: 'triggerTime'
            });
          }
        }
      },
      {
        name: 'name',
        label: '任务名称',
        type: 'Input',
        props: {
          placeholder: '请输入任务名称',
          allowClear: true,
          onChange(e) {
            changeElementQuery({
              sing: 'queryElement',
              value: e.target.value,
              type: 'name'
            });
          }
        }
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'Input',
        props: {
          placeholder: '请输入邮箱号码',
          allowClear: true,
          onChange(e) {
            changeElementQuery({
              sing: 'queryElement',
              value: e.target.value,
              type: 'email'
            });
          }
        }
      },
      {
        name: 'status',
        label: '启停状态',
        type: 'Select',
        props: {
          placeholder: '请选择状态',
          allowClear: true,
          getDics: '1000015',
          onChange(value) {
            changeElementQuery({
              sing: 'queryElement',
              value,
              type: 'status'
            });
          }
        }
      }
    ];

    // 功能操作按钮
    const buttonType = [
      {
        name: '新增',
        icon: '',
        func: this.addTask
      }
    ];
    // 表格按钮
    const tableButtonType = [
      {
        name: '查看',
        func: this.showDetail,
        noAuth: true
      },
      {
        name: '修改',
        func: this.editTask
      },
      {
        name: '删除',
        func: this.deleteTask
      }
    ];

    // 表格字段
    const columns = [
      {
        title: '序号',
        width: 80,
        fixed: 'left',
        render: (text, record, index) => {
          return ++index;
        }
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        ellipsis: true
      },
      {
        title: '任务编号',
        dataIndex: 'code',
        key: 'code',
        width: 200,
        ellipsis: true
      },
      {
        title: '接收邮件',
        dataIndex: 'email',
        key: 'email',
        width: 250,
        ellipsis: true
      },
      {
        title: '触发时间',
        dataIndex: 'triggerTime',
        key: 'triggerTime',
        width: 150,
        ellipsis: true
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        ellipsis: true,
        render: text => {
          return text === '1' ? '已启用' : '已停用';
        }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 200,
        ellipsis: true
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 100,
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        ellipsis: true
      },
      {
        title: '修改人',
        dataIndex: 'updateUserName',
        key: 'updateUserName',
        width: 100,
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
        title: '操作',
        key: 'option',
        width: 300,
        fixed: 'right',
        render: (text, record) => {
          return withRoleTableBotton(
            [
              ...tableButtonType,
              record.status == '1'
                ? {
                    name: '停用',
                    func: ({ e, row }) => {
                      this.switchStatus(row.id, false);
                    }
                  }
                : {
                    name: '启动',
                    func: ({ e, row }) => {
                      this.switchStatus(row.id, true);
                    }
                  }
            ],
            this.props.btnAuth
          )(record);
        }
      }
    ];

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);

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
      total: dataList.total,
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum
    };

    return (
      <>
        {/* 搜索框 */}
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

        {/* 头部操作按钮 */}
        <div>{withRoleBotton(buttonType, this.props.btnAuth)}</div>

        {/* 数据表格 */}
        {/* TODO  不用显示流程节点吗 */}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: dataList.list,
            rowSelection,
            rowKey: 'id',
            pagination,
            height: 600
          })}
        />
        <Modal
          title={
            '流程提醒任务 - ' +
            (isOpenModal.type == 'add' ? '新增' : isOpenModal.type == 'edit' ? '修改' : '查看')
          }
          visible={isOpenModal.status}
          width={1200}
          destroyOnClose={true}
          maskClosable={false}
          okText="保存"
          okButtonProps={{
            style: {
              display: isOpenModal.type == 'view' ? 'none' : 'inline-block'
            }
          }}
          onCancel={() => {
            this.setState({
              isOpenModal: {
                status: false,
                type: 'view'
              }
            });
            clearDataDetail();
          }}
        >
          <FlowRemindFormAdd
            isOpenModal={isOpenModal}
            rowData={this.state.rowData}
            closeModal={this.closeModal}
            {...this.props}
          />
        </Modal>
      </>
    );
  }

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryElement } = this.props;
    resetElement({ sing: 'queryElement', queryElement });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetTaskList, queryElement } = this.props;
    asyncHttpGetTaskList({ ...queryElement, reqPageNum: 1 });
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
    const { asyncHttpGetTaskList, changeElementQuery } = this.props;
    changeElementQuery({
      sing: 'queryElement',
      value: page.reqPageNum,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryElement',
      value: page.reqPageSize,
      type: 'reqPageSize'
    });
    asyncHttpGetTaskList({});
    this.toEmptySelect();
  };

  /** 查看任务详情 */
  showDetail = (e, row) => {
    this.setState({
      rowData: row,
      isOpenModal: {
        status: true,
        type: 'view'
      }
    });
  };

  /** 新增提醒任务 */
  addTask = () => {
    this.setState({
      isOpenModal: {
        status: true,
        type: 'add'
      }
    });
  };

  /** 修改提醒任务 */
  editTask = (e, row) => {
    this.setState({
      rowData: row,
      isOpenModal: {
        status: true,
        type: 'edit'
      }
    });
  };

  /** 切换任务停用和启用状态 */
  switchStatus = async (id, status) => {
    const { asyncHttpChangeTaskStatus } = this.props;
    await asyncHttpChangeTaskStatus({ id, status });
    this.query();
  };

  /** 删除单个提醒任务 */
  deleteTask = async (e, row) => {
    const { id } = row;
    const { asyncHttpDeleteTask } = this.props;
    modal.confirm({
      title: '确定删除?',
      onOk: async () => {
        await asyncHttpDeleteTask(id);
        this.query();
      }
    });
  };

  closeModal = () => {
    this.setState({
      rowData: {},
      isOpenModal: {
        status: false,
        type: 'view'
      }
    });
    this.query();
  };
}

export default BusinessFlow;
