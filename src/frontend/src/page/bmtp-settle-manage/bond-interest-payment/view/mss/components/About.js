import React, { PureComponent } from 'react';
import { message } from 'antd';
import {
  ConfigableTable,
  // SearchForm,
  Modal,
  filterNullElement,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  exportFile,
  exportSelectFile,
  // fontColor,
  computedTotalRow,
  cloumsFunc,
  fontColor
} from 'yss-biz';
// import AboutInfoFormRule from './AboutInfoFormRule';
import ReadjustingFormRule from './ReadjustingFormRule';
// const { mapOption } = SearchForm;
class Settlement extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    FieldList: []
  };
  render() {
    const {
      aboutColumn,
      aboutList,
      isOpenFormModal,
      openFormModal,
      isAffirmSplit
      // queryAboutElement
    } = this.props;

    /**表格信息**/
    const columns = setColumns(aboutColumn);

    const totalRow = {
      id: String(Math.random()),
      serialNumber: '合计',
      proCarryBal: computedTotalRow(aboutList.list, 'proCarryBal'), //计算总和
      realInterVal: computedTotalRow(aboutList.list, 'realInterVal'), //计算总和
      realCaptialVal: computedTotalRow(aboutList.list, 'realCaptialVal'), //计算总和
      realCapinterTotal: computedTotalRow(aboutList.list, 'realCapinterTotal'), //计算总和
      tempInterVal: computedTotalRow(aboutList.list, 'tempInterVal'), //计算总和
      tempCaptialVal: computedTotalRow(aboutList.list, 'tempCaptialVal'), //计算总和
      tempCapinterTotal: computedTotalRow(aboutList.list, 'tempCapinterTotal'), //计算总和
      meltInBondInterest: computedTotalRow(aboutList.list, 'meltInBondInterest'), //计算总和
      fee: computedTotalRow(aboutList.list, 'fee') //计算总和
    };

    /***按钮组** */
    const ButtonType = [
      {
        name: '手工调整',
        roule: true,
        disabled: isAffirmSplit,
        func: this.manualAdjustment
      },
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportCurrentPage(true);
            }
          },
          // {
          //   name: '导出当前页',
          //   func: () => {
          //     this.exportCurrentPage(false);
          //   }
          // },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }
      // {
      //   name: '打印',
      //   roule: true,
      //   func: () => {}
      // }
    ];

    /***表格按钮组** */
    // const ButtonTableType = [
    //   {
    //     name: fontColor('产品费用详情', '#409EFF'),
    //     roule: true,
    //     func: this.seeInfoItem
    //   }
    // ];

    /***表格分页***/
    const pagination = {
      // onChange: (page, pageSize) => {
      //   this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      // },
      // onShowSizeChange: (current, size) => {
      //   this.searchPage({ reqPageNum: current, reqPageSize: size });
      // },
      // showTotal: (total, range) => {
      //   return <span>{`共${total}条`}</span>;
      // },
      // total: aboutList.total,
      // pageSize: queryAboutElement.reqPageSize,
      // hideOnSinglePage: true
    };

    let dataSource = [];
    if (aboutList.list.length > 0) {
      dataSource = [...aboutList.list, totalRow];
    }

    /***点击索引获取行的ID** */
    let rowSelection = {
      ...rowSelectionFunc.call(this, this.filterTotalRow),
      onSelectAll: this.switchTotalSelect
    };
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <div style={{ marginTop: '8px' }}></div>
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: dataSource,
            rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: 250
          })}
          bordered={true}
          // footer={
          //   aboutList.isAllData
          //     ? null
          //     : () => fontColor('包含未授权产品数据，请检查权限！', '#f5222d')
          // }
        />
        <Modal
          width={1400}
          title="手工调整拆分结果"
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'read'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <ReadjustingFormRule
            {...this.props}
            readjustingList={aboutList.list}
          ></ReadjustingFormRule>
        </Modal>
      </>
    );
  }
  componentDidMount() {}

  /***修改 */
  seeInfoItem = (e, item) => {
    const { openFormModal, changeTableRow } = this.props;
    changeTableRow({ value: item });
    openFormModal({
      type: 'update',
      status: true,
      sign: 'info'
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /**修复全选按钮的取消全选功能 */
  switchTotalSelect = (selected, selectedRows, changeRows) => {
    // 原理: 由于合计行随机id, 第二次触发全选, 变更行仅为合计行
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

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetAboutList, changeQueryAboutElement, selectRow } = this.props;
    changeQueryAboutElement(page);
    asyncHttpGetAboutList(selectRow);
    this.toEmptySelect();
  };

  /**手工调整*/
  manualAdjustment = async () => {
    const { openFormModal, aboutList } = this.props;

    if (aboutList.list.length < 1) {
      message.error('目前没有可调整的数据');
      return;
    }

    // await asyncHttpAjustList({});

    openFormModal({
      type: 'update',
      status: true,
      sign: 'read'
    });
  };

  /*导出当前*/
  exportCurrentPage = status => {
    const { FieldList } = this.state;
    const { queryAboutElement, aboutList } = this.props;
    let total;
    if (status) {
      total = aboutList.total;
    }
    exportFile(
      '/bmtp-settle-manage/payment/bondPaymentDetail/export/condition',
      filterNullElement({ ...queryAboutElement, includeFieldList: FieldList }),
      '债券付息兑付明细',
      status,
      total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    if (!ids.length) {
      message.error('请选择需要导出的项目');
      return;
    }
    const idList = ids.map(item => item.id);
    exportSelectFile(
      '/bmtp-settle-manage/payment/bondPaymentDetail/export/selected',
      { includeFieldList: FieldList, ids: idList },
      '债券付息兑付明细',
      true
    );
    this.toEmptySelect();
  };
}

export default Settlement;
