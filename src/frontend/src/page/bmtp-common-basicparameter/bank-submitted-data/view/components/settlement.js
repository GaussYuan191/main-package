/** 结算明细数据 **/
import React, { PureComponent } from 'react';
import { ConfigableTable, setColumns, setTableInfo, cloumsFunc } from 'yss-biz';

export default class Settlement extends PureComponent {
  state = {
    FieldList2: []
  };
  render() {
    const { settlementList, settlementColumn, stv_queryElement, settlementRowSet } = this.props;

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
      pageSize: stv_queryElement.reqPageSize,
      current: stv_queryElement.reqPageNum,
      total: settlementList.total
    };

    /***点击索引获取行的ID** */
    // let rowSelection = rowSelectionFunc.call(this);

    /**表格信息**/
    const columns = [...setColumns(settlementColumn)];
    let cloumsCode = cloumsFunc.call(this, 'FieldList2');
    this.props.setCloumsCode('FieldList2', this.state.FieldList2);

    return (
      <div>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: settlementList.dataSource,
            // rowSelection,
            rowKey: 'id',
            cloumsCode,
            pagination: pagination,
            height: 450,
            rowSelection: {
              selectedRowKeys: this.props.settlementRow.map(item => item.id),
              onChange: (selectedRowKeys, selectedRows) => {
                let ids = selectedRows.map(item => {
                  return item;
                });
                settlementRowSet({ rowed: ids });
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
  //   asyncHttpGetList({ type: 'stv_queryElement' });
  // };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({
      elementType: 'stv_queryElement',
      element: ele,
      value: value
    });
    asyncHttpGetList({ type: 'stv_queryElement' });
  };
}
