import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.less';
class Drag {
  //构造函数
  constructor(el, _that, remark, zIndex) {
    let formBody = el.getElementsByClassName('formBody')[0];
    let headContent = el.getElementsByClassName('headContent')[0];
    let changeSmall = el.getElementsByClassName('operateItem')[0];
    let changebig = el.getElementsByClassName('operateItem')[1];
    // let height = el.offsetHeight;
    let width = el.offsetWidth;
    el.style.left = `calc(10% + ${zIndex * 20}px)`;
    el.style.top = `calc(20% + ${zIndex * 20}px)`;
    this.el = el;
    //鼠标摁下时的元素位置
    this.startOffset = {};
    //鼠标摁下时的鼠标位置
    this.startPoint = {};
    let move = e => {
      this.move(e);
    };
    this.width = width;
    let end = e => {
      const { modalList } = _that.state;
      for (let i = 0; i < modalList.length; i++) {
        if (modalList[i].modalRef !== remark) {
          let box = _that[modalList[i].modalRef];
          box.style.zIndex = i + 1;
        }
      }
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
    };
    headContent.addEventListener('mousedown', e => {
      this.start(e);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', end);
    });
    changeSmall.addEventListener('click', e => {
      el.style.width = '200px';
      el.style.left = `${20 + zIndex * 20}px`;
      el.style.top = `calc(95% - ${zIndex * 40}px)`;
      formBody.style.display = 'none';
      changebig.style.display = 'inline-block';
      changeSmall.style.display = 'none';
    });
    changebig.addEventListener('click', e => {
      el.style.width = `${this.width}px`;
      el.style.left = `calc(10% - ${zIndex * 20}px)`;
      el.style.top = `calc(20% - ${zIndex * 20}px)`;
      formBody.style.display = 'block';
      changeSmall.style.display = 'inline-block';
      changebig.style.display = 'none';
    });
  }
  //摁下时的处理函数
  start(e) {
    let { el } = this;
    this.startOffset = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    this.startPoint = {
      x: e.clientX,
      y: e.clientY
    };
    el.style.zIndex = 999;
  }
  //鼠标移动时的处理函数
  move(e) {
    let { el, startOffset, startPoint } = this;
    let newPoint = {
      x: e.clientX,
      y: e.clientY
    };
    let dis = {
      x: newPoint.x - startPoint.x,
      y: newPoint.y - startPoint.y
    };
    el.style.left = dis.x + startOffset.x + 'px';
    el.style.top = dis.y + startOffset.y + 'px';
  }
}

class MultipleModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalList: this.props.modalList
    };
    this.props.classRef && this.props.classRef(this);
  }
  componentDidMount() {
    const { modalList } = this.state;
    for (let i = 0; i < modalList.length; i++) {
      // let box = this[modalList[i].modalRef];
      (() => {
        // let dragbox = new Drag(box, this, modalList[i].modalRef, i);
      })();
    }
  }
  refresh = (modalList, modalRef) => {
    this.setState(
      {
        modalList: modalList
      },
      () => {
        // let box = this[modalRef];
        (() => {
          // let dragbox = new Drag(box, this, modalRef, modalList.length - 1);
        })();
        for (let i = 0; i < modalList.length; i++) {
          let box = this[modalList[i].modalRef];
          box.style.zIndex = i + 1;
        }
      }
    );
  };
  closeModal = modalRef => {
    const { modalList } = this.state;
    let params = modalList.filter(item => {
      return item.modalRef !== modalRef;
    });
    this.setState(
      {
        modalList: params
      },
      () => {
        if (this.props.closeModal && typeof this.props.closeModal === 'function') {
          this.props.closeModal(params);
        }
      }
    );
  };
  render() {
    const { modalList } = this.state;
    return (
      <div>
        {modalList.map(item => {
          const style = { width: `${item.width || 800}px` };
          return (
            <div
              style={style}
              className="flexModal"
              key={item.key}
              ref={classRef => {
                this[item.modalRef] = classRef;
              }}
            >
              <div className="headContent">
                <div>{item.title || null}</div>
                <div className="headOperate">
                  <span className="operateItem">
                    <Icon type="minus" />
                  </span>
                  <span className="operateItem" style={{ display: 'none' }}>
                    <Icon type="border" />
                  </span>
                  <span
                    className="operateItem"
                    onClick={() => {
                      this.closeModal(item.modalRef);
                    }}
                  >
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="formBody">{(item.component && <item.component />) || null}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default MultipleModals;
