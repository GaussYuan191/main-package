import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
let dragingRowIndex = -1;
class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      rowDraggable,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    if (!rowDraggable) {
      return <tr {...restProps} />;
    }
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingRowIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingRowIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />)
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingRowIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow && props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

export default DragableBodyRow;
