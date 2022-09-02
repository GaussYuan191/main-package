/** 托管明细数据 **/
import React, { PureComponent } from 'react';
import { ConfigableTable, setColumns, setTableInfo, cloumsFunc } from 'yss-biz';

export default class Trusteeship extends PureComponent {
  state = {
    FieldList1: []
  };
  render() {
    const { truteeshipList, trusteeshipColumn, tsv_queryElement, trusteeshipRowSet } = this.props;

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: tsv_queryElement.reqPageSize,
      current: tsv_queryElement.reqPageNum,
      total: truteeshipList.total
    };

    /***点击索引获取行的ID** */
    // let rowSelection = rowSelectionFunc.call(this);

    /**表格信息**/
    const columns = [...setColumns(trusteeshipColumn)];
    let cloumsCode = cloumsFunc.call(this, 'FieldList1');
    this.props.setCloumsCode('FieldList1', this.state.FieldList1);
    return (
      <div>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: truteeshipList.dataSource,
            // rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: 450,
            rowSelection: {
              selectedRowKeys: this.props.trusteeshipRow.map(item => item.id),
              onChange: (selectedRowKeys, selectedRows) => {
                let ids = selectedRows.map(item => {
                  return item;
                });
                trusteeshipRowSet({ rowed: ids });
              }
            }
          })}
        />
      </div>
    );
  }

  // // 模糊查询
  // query = () => {
  //   const { asyncHttpGetList } = this.props;
  //   asyncHttpGetList({ type: 'tsv_queryElement' });
  // };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({
      elementType: 'tsv_queryElement',
      element: ele,
      value: value
    });
    asyncHttpGetList({ type: 'tsv_queryElement' });
  };
}
