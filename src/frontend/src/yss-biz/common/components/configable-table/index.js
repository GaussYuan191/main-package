import React from 'react';
import { Table } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BodyRow from './BodyRow';
import HeaderCell from './HeaderCell';
import propTypes from 'prop-types';
import ListDetail from './listDetail';
import { Modal } from 'yss-biz';
import './index.less';

class ConfigableTable extends React.Component {
  static propTypes = {
    resizable: propTypes.bool,
    colDraggable: propTypes.bool,
    rowDraggable: propTypes.bool,
    onRowMove: propTypes.func,
    onResize: propTypes.func,
    onHeaderCellMove: propTypes.func,
    components: propTypes.object,
    selection: propTypes.object
  };
  state = {
    isVisible: false,
    rowInfo: {}
  };
  components = {
    table: (this.props.components || {}).table,
    header: {
      cell: HeaderCell,
      ...(this.props.components || {}).header
    },
    body: {
      row: BodyRow,
      ...(this.props.components || {}).body
    }
  };
  handleSetRowProps = (record, index) => {
    const { onRow, onRowMove, rowDraggable } = this.props;
    const props = onRow && onRow(record, index);
    const rowProps = {
      ...props,
      moveRow: onRowMove,
      index,
      rowDraggable,
      onDoubleClick: event => {
        event.stopPropagation();
        this.setState({
          isVisible: true,
          rowInfo: record
        });
      }
    };
    return rowProps;
  };
  render() {
    const {
      columns,
      onRowMove,
      onHeaderCellMove,
      resizable,
      colDraggable,
      onResize,
      className,
      ...restProps
    } = this.props;
    const newColumns = (columns || []).map(({ onHeaderCell, ...resProps }, index) => ({
      ...resProps,
      onHeaderCell: column => ({
        ...(onHeaderCell && onHeaderCell(column)),
        index,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        width: column.width,
        onResize: typeof onResize === 'function' ? onResize.bind(null, index) : null,
        moveHeaderCell: onHeaderCellMove,
        resizable,
        colDraggable
      })
    }));
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          className={'yss-configable-table stripe-table' + (className ? ` ${className}` : '')}
          columns={newColumns}
          {...restProps}
          onRow={this.handleSetRowProps}
          components={this.components}
        />
        <Modal
          width={1200}
          title={'列表详情'}
          destroyOnClose={true}
          visible={this.state.isVisible}
          onCancel={() => {
            this.setState({ isVisible: false });
          }}
          onOk={() => {
            this.setState({ isVisible: false });
          }}
          move={true}
        >
          <ListDetail column={newColumns} fromData={this.state.rowInfo} />
        </Modal>
      </DndProvider>
    );
  }
}

export default ConfigableTable;
