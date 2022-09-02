/*
 * @Author: lzx
 * @Date: 2020-01-19 11:37:52
 * v 0.90
 */

/*
 * props 参数
 * children -必须 有且左右一个根节点
 * switch -非必须 是否有开关控制开启或关闭拖拽（默认 false ）
 */

import React, { PureComponent } from 'react';
export default class DragDom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { dragDmos: [] };
    this.childrenList = [];
    this.setDragMoveStyle = this.setDragMoveStyle.bind(this);
    this.mapChildren = this.mapChildren.bind(this);
  }
  getDragProps = (theChildren, index, push) => {
    let me = this;
    return {
      draggable: me.props.switch ? true : false,
      onMouseDown(e) {
        me.dragTarget = e.currentTarget || e.target;
        me.dragStart(index);
      },
      onMouseUp() {
        me.dragTarget.style.opacity = '';
      },
      onDragEnter() {
        me.overIndexs = index;
      },
      onDragOver(e) {
        if (!me.dragTarget) return false;
        e.preventDefault();
        me.setDragMoveStyle(e, true);
      },
      onDragLeave(e) {
        me.setDragMoveStyle(e);
      },
      onDrop(e) {
        push && (theChildren = me.childrenList = [...me.childrenList, ...theChildren]);
        me.dropDown(theChildren);
        me.setDragMoveStyle(e, false);
        me.children = theChildren;
        me.setState({ dragDmos: me.children });
      }
    };
  };
  componentWillMount() {
    this.createChildrenDom();
  }
  render() {
    return this.cloneDreagDom(this.mapChildren(this.children));
  }
  // 根据传入的children创建拖拽节点
  createChildrenDom() {
    let me = this;
    me.parent = me.props.children;
    if (Array.isArray(me.parent)) {
      return console.error('props.children 有且只能有一个根节点');
    }
    me.children = me.parent.props.children;
  }
  setDragMoveStyle(e, bool) {
    if (!this.props.switch) return false;
    let target = e.currentTarget || e.target;
    let lineNode = this.props.effectOnChild ? target.childNodes[0] : target;
    lineNode.style.outline = bool ? '#FF900D dotted 1px' : '';
  }
  cloneDreagDom(children) {
    return this.parent !== undefined ? React.cloneElement(this.parent, { children }) : children;
  }
  dragStart(index) {
    let me = this;
    if (!me.props.switch) return false;
    me.dragTarget.style.opacity = '.5';
    me.dragTarget.index = index;
  }
  dropDown(theChildren) {
    let me = this;
    if (!me.dragTarget) return false;
    if (!me.props.switch) return false;
    me.dragTarget.style.opacity = '';
    const downDom = theChildren[me.overIndexs];
    theChildren[me.overIndexs] = theChildren[me.dragTarget.index];
    theChildren[me.dragTarget.index] = downDom;
  }
  mapChildren(childrenList, resetIndex, push) {
    let me = this;
    let theChildren = [...childrenList];
    return React.Children.map(theChildren, (child, index) => {
      index = resetIndex || index;
      return React.cloneElement(child, me.getDragProps(theChildren, index, push));
    });
  }
  getDragList() {
    return this.parent;
  }
}
