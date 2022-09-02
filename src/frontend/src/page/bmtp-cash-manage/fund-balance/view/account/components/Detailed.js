import React, { PureComponent } from 'react';
import { message } from 'antd';
import {
  ConfigableTable,
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  selectPageRequest,
  page,
  setColumns,
  withRoleTableBotton,
  functionRolue,
  exportFile,
  exportSelectFile,
  Modal,
  modalInfo,
  cloumsFunc
} from 'yss-biz';
import DaytimeModal from './DaytimeModal.js';
import MoneyBackModal from './MoneyBackModal';
class Detailed extends PureComponent {
  state = {
    ids: [],
    FieldList: [],
    rowed: {} // 单行数据, 日间提款使用
  };

  async componentDidMount() {}

  // 发送数据
  sendData = () => {
    const { asyncHttpAxiosSend } = this.props;
    const { ids } = this.state;
    if (ids && ids.length > 0) {
      let params = ids.map(item => {
        let obj = {};
        obj.productId = item.productId;
        obj.accountType = Number(item.accountType);
        return obj;
      });
      asyncHttpAxiosSend(params).then(() => {
        this.toEmptySelect();
      });
    } else {
      message.error('请选择需要发送的数据');
      return;
    }
  };

  render() {
    const {
      businessList,
      businessCol,
      setQueryElement,
      queryElement,
      toResetSearch,
      isOpenFormModal
      // currentTradeDate,
    } = this.props;
    /***查询Input按钮 */

    const columns = [
      ...setColumns(businessCol),
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: row => withRoleTableBotton(ButtonTableType, this.props.btnAuth)(row)
      }
    ];

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
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          onChange: value => {
            setQueryElement({ consignorCode: value });
          }
        }
      },
      {
        name: 'productId',
        label: '产品名称',
        type: 'Select',
        props: {
          placeholder: '请选择产品名称',
          allowClear: true,
          type: 'product',
          configDics: selectPageRequest,
          dropdownWidth: 300,
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          onChange: value => {
            setQueryElement({ productId: value });
          }
        }
      },
      {
        name: 'assetAccountSn',
        label: '资金账户',
        type: 'Select',
        props: {
          placeholder: '请选择资金账户',
          type: 'capitalAccount',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          allowClear: true,
          // mode: 'multiple',
          // maxTagCount: 1,
          // maxTagTextLength: 3,
          onChange: value => {
            setQueryElement({ assetAccountSn: value });
          }
        }
      }
      // {
      //   name: 'date',
      //   label: '日期',
      //   type: 'DatePicker',
      //   props: {
      //     initialValue: currentTradeDate ? moment(currentTradeDate) : null,
      //     disabled: true,
      //     placeholder: '交易类型',
      //     allowClear: true
      //   }
      // }
    ];

    /***按钮组***/

    const ButtonTableType = [
      {
        name: '日间提款',
        icon: 'account-book',
        roule: 'true',
        // noAuth:true,
        func: this.daytimeWithdrawals
      }
    ];

    const ButtonType = [
      {
        name: '推送',
        roule: true,
        func: this.sendData
      },
      {
        name: '批量回款',
        roule: 'true',
        icon: 'transaction',
        func: this.batch
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

    /***表格分页***/
    const pagination = {
      total: businessList.total,
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      onChange: (page, pageSize) => {
        this.searchAccountByCondition(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition(current, size);
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
          labelSize="6em"
          lineOf={3}
          moreTypeModal
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          handleBeforeReset={() => true}
          handleReset={() => {
            toResetSearch({
              reqPageSize: queryElement.reqPageSize,
              reqPageNum: queryElement.reqPageNum
            });
          }}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            bordered: true,
            dataSource: businessList,
            rowSelection,
            cloumsCode,
            rowKey: 'id',
            height: this.props.tableHight,
            pagination,
            onRow: record => ({
              onClick: event => {
                setTimeout(() => {
                  this.props.saveRowProduct(record);
                  this.changeAbout(event, record);
                }, 300);
              }
            })
          })}
        />

        <>
          <MoneyBackModal {...this.props} toEmptyRow={this.toEmptySelect}></MoneyBackModal>
        </>

        <Modal
          {...modalInfo}
          width="1160px"
          title="日间提款设置"
          visible={isOpenFormModal.sign === 'daytime'}
          onCancel={() => {
            this.closeDayTimeModal();
          }}
        >
          <DaytimeModal
            {...this.props}
            closeDayTimeModal={this.closeDayTimeModal}
            rowed={this.state.rowed}
          ></DaytimeModal>
        </Modal>
      </>
    );
  }

  /***点击修改关联*/
  changeAbout(event, item) {
    event.stopPropagation();
    if (!item.assetAccountSn) {
      return;
    }
    const { asyncHttpSearchAboutBalanceList } = this.props;
    asyncHttpSearchAboutBalanceList({
      ...page,
      assetAccountSn: item.assetAccountSn
    });
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpAssetAccountBalanceList, queryElement, setQueryElement } = this.props;
    setQueryElement({ reqPageNum: 1 });
    const queryParams = Object.assign(queryElement, { reqPageNum: 1 });
    asyncHttpAssetAccountBalanceList({ params: filterNullElement(queryParams) });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchAccountByCondition = (page, pageSize) => {
    const { asyncHttpAssetAccountBalanceList, queryElement, setQueryElement } = this.props;
    setQueryElement({ reqPageNum: page });
    setQueryElement({ reqPageSize: pageSize });
    let params = {
      ...queryElement,
      reqPageNum: page,
      reqPageSize: pageSize
    };
    asyncHttpAssetAccountBalanceList({ params: filterNullElement(params) });
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*日间提款*/
  daytimeWithdrawals = (e, row) => {
    e.stopPropagation();
    this.setState({ rowed: row });
    this.props.openFormModal({
      sign: 'daytime'
    });
  };

  /**关闭日间提款对对话框 */
  closeDayTimeModal = needQuery => {
    this.props.openFormModal({
      sign: ''
    });
    this.setState({ rowed: {} });
    needQuery && this.query();
  };

  /**批量回款 */
  batch = () => {
    const { openFormModal, setTableDatas } = this.props;
    let ids = this.state.ids;
    if (!ids.length) {
      message.error('请勾选进行批量回款设置');
      return;
    }
    setTableDatas(ids);
    openFormModal({
      sign: 'batch'
    });
  };

  //修改导出传给后端的字段
  uptadeDataIndex = data => {
    return data.map(item => {
      if (item === 'assetAccountSn') {
        item = 'assetAccount';
      }
      return item;
    });
  };

  /*导出当前*/
  exportCurrent = () => {
    const { FieldList } = this.state;
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-cash-manage/account/assetAccountBalance/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: this.uptadeDataIndex(FieldList) }),
      '产品账户余额',
      false
    );
  };

  /*导出全部*/
  exportAll = () => {
    const { FieldList } = this.state;
    const { queryElement, businessList } = this.props;
    exportFile(
      '/bmtp-cash-manage/account/assetAccountBalance/export/condition',
      filterNullElement({ ...queryElement, includeFieldList: this.uptadeDataIndex(FieldList) }),
      '产品账户余额',
      true,
      businessList.total
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    exportSelectFile(
      '/bmtp-cash-manage/account/assetAccountBalance/export/selected',
      { includeFieldList: this.uptadeDataIndex(FieldList), rows: ids },
      '产品账户余额'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
