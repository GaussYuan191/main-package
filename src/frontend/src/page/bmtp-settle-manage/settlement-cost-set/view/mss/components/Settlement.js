import React, { PureComponent } from 'react';
import { Button, message } from 'antd';
import {
  ConfigableTable,
  SearchForm,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  withRoleTableBotton,
  exportFile,
  exportSelectFile,
  selectPageRequest,
  functionRolue,
  cloumsFunc
} from 'yss-biz';
import SettlementFormRule from './SettlementFormRule';
const { mapOption } = SearchForm;
class Settlement extends PureComponent {
  state = {
    tableHeight: 450,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      settlementColumn,
      settlementList,
      isOpenFormModal,
      openFormModal,
      changeQueryElement,
      asyncHttpBatchexamine,
      asyncHttpUncheckAccount,
      toResetSearch
    } = this.props;

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'settleInstitution',
        label: '结算机构',
        type: 'Select',
        props: {
          placeholder: '请选择结算机构',
          getDics: 1030404,
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          // mode: 'multiple',
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'settleInstitution', value: targetValue });
            changeQueryElement({ element: 'settleInstitution', value });
          }
        }
      },
      {
        name: 'chargeType',
        label: '费用类型',
        type: 'Select',
        props: {
          placeholder: '请选择费用类型',
          getDics: 1030137,
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          // mode: 'multiple',
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'chargeType', value: targetValue });
            changeQueryElement({ element: 'chargeType', value });
          }
        }
      },
      {
        name: 'enableState',
        label: '启用状态',
        type: 'Select',
        props: {
          placeholder: '请选择启用状态',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          // mode: 'multiple',
          onChange(value) {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'enableState', value: targetValue });
            changeQueryElement({ element: 'enableState', value });
          }
        },
        options: mapOption(
          [
            { label: '启用', value: '1' },
            { label: '停用', value: '2' }
          ],
          'label',
          'value'
        )
      },
      {
        name: 'productId',
        label: '所属产品',
        type: 'Select',
        props: {
          placeholder: '请选择所属产品',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          type: 'product',
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          onChange: value => {
            // const targetValue = value ? value.join(',') : '';
            // changeQueryElement({ element: 'productCode', value: targetValue });
            changeQueryElement({ element: 'productId', value });
          }
        }
      }
    ];
    /**表格信息**/
    const columns = [
      ...setColumns(settlementColumn),
      {
        title: '启用状态',
        dataIndex: 'enableStateName',
        width: 150
        // render: value => {
        //   return value === '1' ? '启用' : '停用';
        // }
      },
      {
        title: '创建者',
        dataIndex: 'createUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        ellipsis: true,
        width: 250
      },
      {
        title: '修改人',
        dataIndex: 'updateUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        ellipsis: true,
        width: 150
      },
      {
        title: '审核人',
        dataIndex: 'checkUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '审核时间',
        dataIndex: 'checkTime',
        ellipsis: true,
        width: 160
      },
      {
        title: '操作',
        key: 'operation',
        width: 280,
        fixed: 'right',
        align: 'center',
        render: row => [
          row.checkStatus == '1'
            ? null //withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row)
            : withRoleTableBotton(
                [
                  {
                    name: '修改',
                    roule: true,
                    func: this.updateItem
                  },
                  ...ButtonTableType
                ],
                this.props.btnAuth
              )(row),
          roleTableButton(tableOperationType)(row)
        ]
      }
    ];

    /***表格按钮组** */
    const ButtonTableType = [
      {
        name: '删除',
        roule: true,
        func: this.deleteItem
      }
    ];

    /***按钮组** */
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true });
        }
      },
      {
        name: '审核',
        roule: functionRolue.CHECK,
        func: () => {
          asyncHttpBatchexamine({ params: this.state.ids }).then(() => {
            this.toEmptySelect();
          });
        }
      },
      {
        name: '反审核',
        roule: functionRolue.UNCHECK,
        func: () => {
          asyncHttpUncheckAccount({ params: this.state.ids }).then(() => {
            this.toEmptySelect();
          });
        }
      },
      {
        name: '导出',

        roule: functionRolue.UNCHECK,
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

    // 启用与停用操作列按钮配置
    const tableOperationType = [
      {
        key: 'start',
        func: this.statusChangeForStart
      }
    ];
    /***
     * 实现操作列按钮显示的控制逻辑，和权限不相关
     * buttonType 是{key(按钮唯一标识),func（按钮绑定的点击处理操作调用，其入参分别为(
     *  e 点击事件对象
     *  row，行对象
     *  status, 当前行的启用状态（1:启用，2：停用）
     * )）}
     **/
    const roleTableButton = ButtonTableType => {
      return row => {
        return (
          ButtonTableType &&
          ButtonTableType.map(buttonType => {
            // 	后端字段约定 string  启用状态（1:启用，2：停用）
            const rowState = row.enableState;
            let buttonText;
            switch (rowState) {
              case '1':
                buttonText = '停用';
                break;
              case '2':
                buttonText = '启用';
                break;
              default:
                buttonText = '';
            }
            return (
              <Button
                size="small"
                type="link"
                icon={rowState === 1 ? 'stop' : 'play-circle'}
                onClick={e => {
                  buttonType.func({
                    e,
                    row,
                    status: rowState
                  });
                }}
                key={buttonType.key}
              >
                {<span>{buttonText}</span>}
              </Button>
            );
          })
        );
      };
    };

    /***表格分页***/
    const pagination = {
      total: this.props.total,
      current: this.props.queryElement.reqPageNum,
      pageSize: this.props.queryElement.reqPageSize,
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

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <SearchForm
          labelSize="4em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleReset={() => {
            toResetSearch({
              reqPageNum: this.props.queryElement.reqPageNum,
              reqPageSize: this.props.queryElement.reqPageSize
            });
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: settlementList,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: this.state.tableHeight
          })}
        />
        <Modal
          width={1400}
          title={
            isOpenFormModal.type === 'update'
              ? '修改结算费用设置'
              : isOpenFormModal.type === 'delete'
              ? '删除结算费用设置'
              : '新增结算费用设置'
          }
          visible={isOpenFormModal.status}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <SettlementFormRule {...this.props}></SettlementFormRule>
        </Modal>
      </>
    );
  }
  componentDidMount() {
    // const { asyncHttpGetList } = this.props;
    // asyncHttpGetList({ params: {} });
  }

  /***修改 */
  updateItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'update',
      status: true
    });
  };

  /***删除 */
  deleteItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'delete',
      status: true
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList, queryElement } = this.props;
    asyncHttpGetList({ params: { ...queryElement, reqPageNum: 1 } });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ element: 'reqPageNum', value: page });
    changeQueryElement({ element: 'reqPageSize', value: pageSize });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeSetting/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '结算费用',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeSetting/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: FieldList }),
      '结算费用',
      true,
      this.props.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/charge/chargeSetting/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '结算费用'
    );
    this.toEmptySelect();
  };

  statusChangeForStart = ({ e, row, status }) => {
    if (!row) {
      const msg = `要${status == '1' ? '停用' : '启用'}的数据不存在，请检查！`;
      message.warning(msg);
    }
    const id = row.id;
    const { asyncHttpStart, asyncHttpStop } = this.props;
    switch (status) {
      case '1':
        asyncHttpStop({ params: id });
        break;
      case '2':
        asyncHttpStart({ params: id });
        break;
      default:
        return;
    }
  };
}

export default Settlement;
