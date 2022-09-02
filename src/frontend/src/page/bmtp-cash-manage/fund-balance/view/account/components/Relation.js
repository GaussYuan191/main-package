import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  ConfigableTable,
  SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  page,
  setColumns,
  // withRoleTableBotton,
  exportSelectFile,
  exportFile,
  commonInfoVo,
  cloumsFunc
} from 'yss-biz';
import moment from 'moment';
const { mapOption } = SearchForm;
class Detailed extends PureComponent {
  state = {
    ids: [],
    FieldList: []
  };
  /***分页查询*/
  searchPage = pages => {
    const { selectPro } = this.props;
    const { setPageQueryParam } = this.props;
    setPageQueryParam && setPageQueryParam(pages);
    this.props.asyncHttpSearchAboutBalanceList({
      ...pages,
      assetAccountSn: selectPro.assetAccountSn
    });
  };
  render() {
    const { relationList, relationCol, pageReqParm } = this.props;
    /***查询Input按钮 */

    const columns = [
      ...setColumns(relationCol),
      {
        title: '交易日期',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
        width: 160,
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD') : '';
        }
      },
      // {
      //   title: '时间',
      //   dataIndex: 'tradeTime',
      //   key: 'tradeTime1',
      //   width: 200,
      //   ellipsis: true,
      //   render: value => {
      //     return value ? moment(value).format('hh:mm:ss') : '';
      //   }
      // },
      {
        title: '交易类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        width: 180,
        ellipsis: true
      },
      {
        title: '借贷方向',
        dataIndex: 'borrowingSideName',
        key: 'borrowingSideName',
        width: 120,
        ellipsis: true
      },
      {
        title: '发生金额(元)',
        dataIndex: 'actualTradeAmount',
        key: 'actualTradeAmount',
        width: 200,
        ellipsis: true
      },
      {
        title: '发生科目',
        dataIndex: 'itemName',
        key: 'itemName',
        width: 180,
        ellipsis: true
      },
      {
        title: '可用余额(元)',
        dataIndex: 'usableAmount',
        key: 'usableAmount',
        width: 200,
        ellipsis: true
      },
      {
        title: '锁定余额(元)',
        dataIndex: 'lockedAmount',
        key: 'lockedAmount',
        width: 200,
        ellipsis: true
      },
      {
        title: '划款指令编号',
        dataIndex: 'transferInstructCode',
        key: 'transferInstructCode',
        width: 200,
        ellipsis: true
      },
      {
        title: '证券代码',
        dataIndex: 'securityCode',
        key: 'securityCode',
        width: 200,
        ellipsis: true
      },
      {
        title: '证券名称',
        dataIndex: 'securityName',
        key: 'securityName',
        width: 120,
        ellipsis: true
      },
      {
        title: '划款指令状态',
        dataIndex: 'transferStatusName',
        key: 'transferStatusName',
        width: 120,
        ellipsis: true
      },
      {
        title: '成交编号',
        dataIndex: 'exceCode',
        key: 'exceCode',
        width: 200,
        ellipsis: true
      },
      {
        title: '结算指令/合同编号',
        dataIndex: 'instructId',
        key: 'instructId',
        width: 200,
        ellipsis: true
      },
      {
        title: '流水号',
        dataIndex: 'recordCode',
        key: 'recordCode',
        width: 200,
        ellipsis: true
      },
      // {
      //   title: '审核状态',
      //   dataIndex: 'checkStatus',
      //   key: 'checkStatus',
      //   width: 120,
      //   ellipsis: true
      // },
      {
        title: '资金账号',
        dataIndex: 'assetAccount',
        key: 'assetAccount',
        width: 200,
        ellipsis: true
      },
      {
        title: '账户名称',
        dataIndex: 'assetAccountName',
        key: 'assetAccountName',
        width: 200,
        ellipsis: true
      },
      {
        title: '账户类型',
        dataIndex: 'accountTypeName',
        key: 'accountTypeName',
        width: 200,
        ellipsis: true
      },
      {
        title: '结算机构',
        dataIndex: 'settleInstitutionName',
        key: 'settleInstitutionName',
        width: 150,
        ellipsis: true
      },
      {
        title: '数据来源',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 120,
        ellipsis: true
      },
      ...commonInfoVo
    ];

    /***按钮组***/

    const ButtonType = [
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: this.exportCurrentPage
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
      total: relationList.dataTotal
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);
    let cloumsCode = cloumsFunc.call(this, 'FieldList');
    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <Row>{withRoleBotton(ButtonType, this.props.btnAuth)}</Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: relationList.data,
              cloumsCode,
              rowSelection,
              rowKey: 'id',
              height: 200,
              pagination: pagination
            })}
            bordered={true}
            onRow={record => {
              return {
                onDoubleClick: event => {
                  // this.viewBelieve(event, record);
                }
              };
            }}
          />
        </Row>
      </>
    );
  }

  /**分页查询*/
  // searchAccountByCondition = (page, pageSize) => {
  //   const {
  //     asyncHttpSearchAccountByCondition,
  //     changeReqPageNum,
  //     queryCashSaleElement
  //   } = this.props;
  //   changeReqPageNum({ value: page, sing: 'executionReportBond' });
  //   let newQueryCapitalElement = {
  //     ...queryCashSaleElement,
  //     clearingStatus: queryCashSaleElement.clearingStatus == 1 ? 1 : ''
  //   };

  //   asyncHttpSearchAccountByCondition({
  //     params: filterNullElement(newQueryCapitalElement),
  //     type: 'executionReportBond'
  //   });
  //   this.toEmptySelect();
  // };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  exportCurrentPage = () => {
    const { FieldList } = this.state;
    const { selectPro } = this.props;
    let index = FieldList.indexOf('checkStatusName');
    let index2 = FieldList.indexOf('accountTypeName');
    FieldList[index] = 'checkStatus';
    FieldList[index2] = 'assetAccountType';
    let params = {
      assetAccountSn: selectPro && selectPro.assetAccountSn,
      ...page,
      includeFieldList: FieldList
    };
    exportFile(
      '/bmtp-cash-manage/account/assetAccountBalance/export/assetRecord',
      params,
      '交易明细',
      false
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { FieldList, ids } = this.state;
    let index = FieldList.indexOf('checkStatusName');
    let index2 = FieldList.indexOf('accountTypeName');
    FieldList[index] = 'checkStatus';
    FieldList[index2] = 'assetAccountType';
    exportSelectFile(
      '/bmtp-cash-manage/account/assetAccountRecord/export/selected',
      { includeFieldList: FieldList, rows: ids },
      '交易明细'
    );
    this.toEmptySelect();
  };
}

export default Detailed;
