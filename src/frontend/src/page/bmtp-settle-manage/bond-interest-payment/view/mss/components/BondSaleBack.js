import React, { PureComponent } from 'react';
import { message, modal } from 'antd';
import {
  SearchForm,
  functionRolue,
  withRoleBotton,
  ConfigableTable,
  setTableInfo,
  setColumns,
  withRoleTableBotton,
  rowSelectionFunc,
  Modal
} from 'yss-biz';
import BondSaleBackFormRule from './BondSaleBackFormRule';

const { mapOption } = SearchForm;
class BondSaleBack extends PureComponent {
  state = {
    ids: []
  };
  render() {
    const {
      changeElementQuery,
      openBondFormModal,
      bondSaleBackColum,
      bondSaleBackList,
      queryBondSaleBackElement,
      isBondOpenFormModal
    } = this.props;

    // 搜索字段
    let SearchformItem = [
      {
        name: 'transactionNumber',
        label: '管理人层级',
        type: 'Select',
        props: {
          placeholder: '请选择管理人层级',
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value,
              type: 'transactionNumber'
            });
          }
        },
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' }
        ]
      },
      {
        name: 'tradingDirection',
        label: '产品名称',
        type: 'Select',
        props: {
          placeholder: '请选择产品名称',
          allowClear: true,
          onChange(value) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value,
              type: 'tradingDirection'
            });
          }
        },
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' }
        ]
      },
      {
        name: 'bondCode',
        label: '证券代码',
        type: 'Input',
        props: {
          placeholder: '请输入证券代码',
          allowClear: true,
          onChange(e) {
            const x = e.target.value;
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: x,
              type: 'bondCode'
            });
          }
        }
      },
      {
        name: 'execDate',
        label: '付息兑付日期',
        type: 'RangePicker',
        itemSize: '300px',
        props: {
          placeholder: '请选择付息兑付日期',
          allowClear: true,
          onChange(date, dateString) {
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: dateString[0],
              type: 'startDate'
            });
            changeElementQuery({
              sing: 'queryBondSaleBackElement',
              value: dateString[1],
              type: 'endDate'
            });
          }
        }
      }
    ];

    const me = this;

    // 表格头操作按钮
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openBondFormModal({ type: 'add', status: true, sign: 'bd' });
        }
      },
      {
        name: '审核',
        roue: true,
        func: () => {
          if (this.state.ids.length < 1) {
            message.error('请选择需要审核的数据');
            return;
          }
          const { asyncHttpToCheckData } = this.props;
          const me = this;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有未审核的数据才可以审核
          this.state.ids.map(item => {
            if (item.checkStatus == '2') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToCheckData(data).then(() => {
                me.toEmptySelect();
              });
            } else {
              modal.confirm({
                title: '是否审核数据',
                content: `选取数据中存在 ${othData.length} 条已审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToCheckData(data).then(() => {
                    me.toEmptySelect();
                  });
                }
              });
            }
          } else {
            message.error('只有未审核的数据才可以审核');
          }
        }
      },
      {
        name: '反审核',
        roue: true,
        func: () => {
          if (this.state.ids.length < 1) {
            message.error('请选择需要反审核的数据');
            return;
          }
          const { asyncHttpToUnCheckData } = this.props;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有已审核的数据才可以审核
          this.state.ids.map(item => {
            if (item.checkStatus == '1') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToUnCheckData(data).then(() => {
                this.toEmptySelect();
              });
            } else {
              modal.confirm({
                title: '是否反审核数据',
                content: `选取数据中存在 ${othData.length} 条未审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToUnCheckData(data).then(() => {
                    me.toEmptySelect();
                  });
                }
              });
            }
          } else {
            message.error('只有已审核的数据才可以反审核');
          }
        }
      }
    ];

    // 表格字段
    const columns = [
      ...setColumns(bondSaleBackColum),
      {
        title: '操作',
        key: 'operation',
        width: 150,
        fixed: 'right',
        align: 'center',
        render: row => {
          return withRoleTableBotton([
            {
              name: '修改',
              icon: '',
              roule: true,
              func: this.updateClientItem
            }
          ])(row);
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
        <div>{withRoleBotton(ButtonType)}</div>

        {/* 数据表格 */}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: bondSaleBackList.list,
            rowSelection,
            rowKey: 'id',
            pagination: pagination,
            height: '450px'
          })}
        />

        {/* 弹出框 */}
        <Modal
          width={1200}
          title={
            isBondOpenFormModal.type === 'update'
              ? '修改债券回售数据'
              : isBondOpenFormModal.type === 'add'
              ? '新增债券回售数据'
              : '删除付息兑付数据'
          }
          visible={isBondOpenFormModal.status && isBondOpenFormModal.sign == 'bd'}
          onCancel={() => {
            openBondFormModal({ type: 'add', status: false });
          }}
        >
          <BondSaleBackFormRule {...this.props}></BondSaleBackFormRule>
        </Modal>
      </>
    );
  }

  /*重置搜索**/
  handleReset = () => {
    const { resetElement } = this.props;
    resetElement('queryBondSaleBackElement');
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetBondList, queryBondSaleBackElement } = this.props;
    asyncHttpGetBondList(queryBondSaleBackElement);
    // console.log(this.props);
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /***修改 */
  updateClientItem = (e, item) => {
    // console.log(item);
    const { openBondFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openBondFormModal({
      type: 'update',
      status: true,
      sign: 'bd'
    });
  };

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetBondList, changeElementQuery } = this.props;
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
    asyncHttpGetBondList({});
    this.toEmptySelect();
  };
}

export default BondSaleBack;
