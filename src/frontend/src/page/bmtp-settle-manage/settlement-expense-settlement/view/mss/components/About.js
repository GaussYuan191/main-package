import React, { PureComponent } from 'react';
import { message } from 'antd';
import { Tabs } from 'antd';
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
  fontColor,
  computedTotalRow,
  keepNDecimals,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';
import AboutInfoFormRule from './AboutInfoFormRule';
import ReadjustingFormRule from './ReadjustingFormRule';
const { mapOption } = SearchForm;
const { TabPane } = Tabs;
class About extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      aboutColumn,
      aboutList,
      chargeItemList,
      expenseEntryColumn,
      isOpenFormModal,
      openFormModal,
      aboutTotal,
      queryPage,
      splitChargeAmount,
      adjustChargeAmount,
      active
    } = this.props;
    /**表格信息**/
    const columns = [
      ...setColumns(aboutColumn),
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        width: 200,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
        }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        render: value => {
          let targetValue = value || '';
          if (value === 'null' || value === 'undefined') {
            targetValue = '';
          }
          return targetValue;
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: row => {
          return row.serialNumber != '合计'
            ? withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row)
            : '';
        }
      }
    ];

    const totalRow = {
      id: String(Math.random()),
      serialNumber: '合计',
      splitChargeAmount: keepNDecimals(splitChargeAmount, 2),
      adjustChargeAmount: keepNDecimals(adjustChargeAmount, 2)
    };

    /***按钮组** */
    const ButtonType = [
      {
        name: '手工调整',
        roule: true,
        func: this.manualAdjustment
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

    /***表格按钮组** */
    const ButtonTableType = [
      {
        name: fontColor('产品费用详情', '#409EFF'),
        roule: true,
        noAuth: true,
        func: this.seeInfoItem
      }
    ];

    /***表格分页***/
    const pagination = {
      total: active === '1' ? aboutTotal : chargeItemList.total,
      pageSize: queryPage.reqPageSize,
      current: queryPage.reqPageNum,
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
    let rowSelection = {
      ...rowSelectionFunc.call(this, this.filterTotalRow),
      onSelectAll: this.switchTotalSelect
    };

    // 最后一页显示合计行
    // bug: 表格dataSource数据量大于分页尺寸时, 触发antd表格本地分页
    // 因此不能直接将合计行插到每次的aboutList后
    let dataSource = [];
    if (queryPage.reqPageNum === Math.ceil(aboutTotal / queryPage.reqPageSize)) {
      if (aboutList.length >= queryPage.reqPageSize) {
        aboutList[aboutList.length - 1].children = [totalRow]; // 以子表方式插到最后一行进行显示
        dataSource = aboutList;
      } else {
        dataSource = aboutList.concat(totalRow);
      }
    } else {
      dataSource = aboutList;
    }

    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <Tabs
          defaultActiveKey="1"
          onChange={active => {
            this.changeAboutActive(active);
          }}
        >
          <TabPane tab="产品费用拆分明细" key="1">
            <div style={{ marginTop: '8px' }}></div>
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            <ConfigableTable
              {...setTableInfo({
                columns,
                dataSource,
                rowSelection,
                rowKey: 'id',
                cloumsCode,
                pagination: pagination,
                height: 220
              })}
              // 合计行极端情况展开
              expandedRowKeys={[(dataSource[dataSource.length - 1] || {}).id]}
              expandIcon={() => <span />}
              expandIconColumnIndex={-1}
            />
            <Modal
              width={isOpenFormModal.sign == 'info' ? 1400 : 1200}
              title="产品结算费用详情"
              visible={isOpenFormModal.status}
              style={{ top: 200 }}
              onCancel={() => {
                openFormModal({ type: 'add', status: false });
              }}
            >
              {isOpenFormModal.sign == 'info' ? (
                <AboutInfoFormRule {...this.props}></AboutInfoFormRule>
              ) : isOpenFormModal.sign == 'read' ? (
                <ReadjustingFormRule {...this.props}></ReadjustingFormRule>
              ) : null}
            </Modal>
          </TabPane>

          <TabPane tab="费用条目明细详情" key="2">
            <div style={{ marginTop: '8px' }}></div>
            <ConfigableTable
              {...setTableInfo({
                columns: setColumns(expenseEntryColumn),
                dataSource: chargeItemList.list,
                rowSelection,
                rowKey: 'id',
                cloumsCode,
                pagination: pagination,
                height: 220
              })}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
  componentDidMount() {}

  /***切换关联 */
  changeAboutActive = active => {
    const { changeTab } = this.props;
    changeTab({ value: active });
  };

  /**修复全选按钮的取消全选功能 */
  switchTotalSelect = (selected, selectedRows, changeRows) => {
    if (changeRows?.length === 1 && changeRows[0].serialNumber === '合计') {
      this.setState({ ids: [], keys: [] });
    }
  };
  /**勾选时过滤合计行(state.keys仍包含合计行的随机id) */
  filterTotalRow = ids => {
    let lastRow = ids.length ? ids[ids.length - 1] : {};
    if (lastRow.serialNumber === '合计') {
      ids.pop();
    }
    this.setState(() => ids);
  };

  /***显示 产品费用想详情*/
  seeInfoItem = async (e, item) => {
    const { openFormModal, saveRefProductCode, changeTableRow, asyncHttpGetChargeDetail } =
      this.props;
    changeTableRow({ value: item });
    saveRefProductCode(item.refProductCode);
    openFormModal({
      type: 'update',
      status: true,
      sign: 'info'
    });
    await asyncHttpGetChargeDetail({ params: { row: item } });
  };

  /**分页查询*/
  searchPage = async (page, pageSize) => {
    const { asyncHttpGetChargeProductDetail, changeQueryBPage, parentId } = this.props;
    changeQueryBPage({ type: 'queryPage', element: 'reqPageNum', value: page });
    changeQueryBPage({ type: 'queryPage', element: 'reqPageSize', value: pageSize });
    await asyncHttpGetChargeProductDetail({
      params: {
        id: parentId
      }
    });
  };

  /**批量手工调整*/
  manualAdjustment = () => {
    const { openFormModal, parentSettleStatus } = this.props;
    //settleStatus	string  费用结算状态（1、未拆分 2、已拆分 3、已确认 4、已通知 5、已过期）
    if (parentSettleStatus !== '2') {
      message.warn(`只有处于已拆分状态的数据，才可以进行手工调整的功能，请检查选择数据所处的状态`);
      return;
    }

    openFormModal({
      type: 'update',
      status: true,
      sign: 'read'
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { parentId, queryPage } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeProduct/export/condition',
      filterNullElement({ ...queryPage, parentId, includeFieldList: FieldList }),
      '产品结算费用信息',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { parentId } = this.props;
    exportFile(
      '/bmtp-settle-manage/charge/chargeProduct/export/condition',
      filterNullElement({ parentId, includeFieldList: FieldList }),
      '产品结算费用信息',
      true
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-settle-manage/charge/chargeProduct/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '产品结算费用信息'
    );
  };
}

export default About;
