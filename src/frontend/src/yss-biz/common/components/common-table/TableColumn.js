/**
 * 组件api解析
 * resizable--是否支持拉动改变列宽--bool(默认true);注：头部每一项需要配置width
 * colDraggable--是否表格头部支持拖拽改变排序--bool(默认true)
 * rowDraggable--表格行是否支持拖拽改变--bool(默认true)
 *
 * **/
import React, { useState, useEffect } from 'react';
import { DrapTable } from 'yss-biz';
import { message } from 'antd';

function CommonTable(props) {
  const [dataSource, setDataSource] = useState(props.dataSource);
  const [columns, setColumns] = useState(props.columns);
  useEffect(() => {
    setDataSource(props.dataSource);
    setColumns(props.columns);
  }, [props.dataSource, props.columns]);

  /**拉动改变列宽**/
  const handleResize = (index, _, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = { ...nextColumns[index], width: size.width };
    setColumns(nextColumns);
  };

  /**拖拽改变列头排序**/
  const handleMoveCol = (dragIndex, hoverIndex) => {
    const dragColumn = columns[dragIndex];
    const hoverColumn = columns[hoverIndex];
    if (dragColumn.hasOwnProperty('fixed') || hoverColumn.hasOwnProperty('fixed')) {
      return message.warning('靠左/右固定栏不支持拖拽改变排序');
    }
    let nextColumns = [...columns];
    nextColumns[dragIndex] = hoverColumn;
    nextColumns[hoverIndex] = dragColumn;
    setColumns(nextColumns);
  };

  /**修改表格数据行排序**/
  const handleMoveRow = (index1, index2) => {
    const index1Data = dataSource[index1];
    const index2Data = dataSource[index2];
    let newDataSource = [...dataSource];
    newDataSource[index1] = index2Data;
    newDataSource[index2] = index1Data;
    setDataSource(newDataSource);
  };
  return (
    <DrapTable
      {...{ ...props, dataSource, columns }}
      onResize={handleResize}
      onHeaderCellMove={handleMoveCol}
      onRowMove={handleMoveRow}
      resizable={props.hasOwnProperty('resizable') ? props.resizable : true}
      colDraggable={props.hasOwnProperty('colDraggable') ? props.colDraggable : false}
      rowDraggable={props.hasOwnProperty('rowDraggable') ? props.rowDraggable : false}
    />
  );
}
export default CommonTable;
