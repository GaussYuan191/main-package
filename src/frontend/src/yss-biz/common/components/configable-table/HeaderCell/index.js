import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Resizable } from 'react-resizable';

class HeaderCell extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveHeaderCell,
      colDraggable,
      ...restProps
    } = this.props;
    if (!colDraggable) {
      return <th {...restProps} />;
    }
    const style = { ...restProps.style, cursor: 'move' };
    let { className } = restProps;
    if (isOver) {
      className += ' drop-over-border';
    }

    return connectDragSource(
      connectDropTarget(<th {...restProps} style={style} className={className} />)
    );
  }
}

class ResizableHeaderCell extends React.Component {
  render() {
    const { resizable, width, minWidth, maxWidth, onResize, ...restProps } = this.props;
    if (!resizable || !width) {
      return <HeaderCell {...restProps} />;
    }
    return (
      <Resizable
        width={width}
        height={0}
        onResize={onResize}
        minConstraints={[minWidth || 50, 0]}
        maxConstraints={[maxWidth || Infinity]}
        onResizeStart={e => e.preventDefault()}
        draggableOpts={{ enableUserSelectHack: false, allowAnyClick: false }}
      >
        <HeaderCell {...restProps} />
      </Resizable>
    );
  }
}

const cellSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const cellTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveHeaderCell && props.moveHeaderCell(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const DragableHeaderCell = DropTarget('cell', cellTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource('cell', cellSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  }))(ResizableHeaderCell)
);

export default DragableHeaderCell;
