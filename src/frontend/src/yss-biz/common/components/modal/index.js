/**
 * @dsy
 * @desc 具有拖动功能的Modal
 * @props
 * move: boolean 是否开启拖动 默认为false
 * formRule: ref实例, 如果绑定了实例，则用handleSubmit触发提交，没有则用onOk触发提交
 * ... antd中Modal组件参数
 */
import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { modalInfo } from 'yss-biz/utils/util/constant';
import 'yss-biz/common/style/customAntd.less';
export default class NewModal extends PureComponent {
  constructor(props) {
    super(props); // Modal 的初始值
    this.state = {
      styleTop: 100,
      styleLeft: 0
    };
  }

  // 计算是否超出屏幕;超出后停止移动监听
  inWindow = (left, top, startPosX, startPosY) => {
    const H = document.body.clientHeight;
    const W = document.body.clientWidth;
    if (
      (left < 20 && startPosX > left) ||
      (left > W - 20 && startPosX < left) ||
      (top < 20 && startPosY > top) ||
      (top > H - 20 && startPosY < top)
    ) {
      document.body.onmousemove = null;
      document.body.onmouseup = null;
      return false;
    }
    return true;
  };
  // 鼠标拖动
  onMouseDown = e => {
    e.preventDefault(); // 记录初始移动的鼠标位置
    const startPosX = e.clientX;
    const startPosY = e.clientY;
    const { styleLeft, styleTop } = this.state; // 添加鼠标移动事件
    document.body.onmousemove = e => {
      const left = e.clientX - startPosX + styleLeft;
      const top = e.clientY - startPosY + styleTop;
      if (this.inWindow(e.clientX, e.clientY, startPosX, startPosY)) {
        this.setState({
          styleLeft: left,
          styleTop: top
        });
      }
    }; // 鼠标放开时去掉移动事件
    document.body.onmouseup = function () {
      document.body.onmousemove = null;
    };
  };

  render() {
    const { styleLeft, styleTop } = this.state;
    const style = { left: styleLeft, top: styleTop };
    return (
      <Modal
        {...modalInfo}
        {...this.props}
        onOk={e => {
          this.onClose();
          this.submission(e);
        }}
        onCancel={() => {
          this.onClose();
          this.props.onCancel();
        }}
        style={{ ...this.props.style, ...style }}
        title={
          <div
            style={this.props.move ? { width: '100%', cursor: 'move' } : { width: '100%' }}
            onMouseDown={this.props.move ? this.onMouseDown : () => {}}
          >
            {this.props.title}
          </div>
        }
      >
        <div className="darkStyle">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              onRef: ref => {
                this.formRule = ref;
              }
            });
          })}
        </div>
      </Modal>
    );
  }
  // 关闭modal，复原位置
  onClose = () => {
    this.setState({
      styleTop: 100,
      styleLeft: 0
    });
  };
  // 提交
  submission = e => {
    !!this.formRule ? this.formRule.handleSubmit(e) : this.props.onOk(e);
  };
}
