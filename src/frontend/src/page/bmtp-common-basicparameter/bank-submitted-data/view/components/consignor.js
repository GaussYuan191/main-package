/** 委托人明细数据 **/
import React, { PureComponent } from 'react';
import { ConfigableTable, setColumns, setTableInfo, cloumsFunc } from 'yss-biz';

export default class Consignor extends PureComponent {
  state = {
    FieldList3: []
  };
  render() {
    const { consignorList, consignorColumn, csv_queryElement, consignorRowSet } = this.props;

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
      pageSize: csv_queryElement.reqPageSize,
      current: csv_queryElement.reqPageNum,
      total: consignorList.total
    };

    /***点击索引获取行的ID** */
    // let rowSelection = rowSelectionFunc.call(this);

    /**表格信息**/
    const columns = [...setColumns(consignorColumn)];
    let cloumsCode = cloumsFunc.call(this, 'FieldList3');
    this.props.setCloumsCode('FieldList3', this.state.FieldList3);

    return (
      <div>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: consignorList.dataSource,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: 450,
            rowSelection: {
              selectedRowKeys: this.props.consignorRow.map(item => item.id),
              onChange: (selectedRowKeys, selectedRows) => {
                let ids = selectedRows.map(item => {
                  return item;
                });
                consignorRowSet({ rowed: ids });
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
  //   asyncHttpGetList({ type: 'csv_queryElement' });
  // };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({
      elementType: 'csv_queryElement',
      element: ele,
      value: value
    });
    asyncHttpGetList({ type: 'csv_queryElement' });
  };
}
