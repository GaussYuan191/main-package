/**
 * 关联信息组件
 */
import React, { PureComponent, Fragment } from 'react';
import { Icon } from 'antd';
import { CSSTransition } from 'react-transition-group';
// import { isFunc } from 'yss-biz';
import './styles.less';
class TransfromDown extends PureComponent {
  state = {
    isSHow: true,
    tableHight: 450
  };
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {React.cloneElement(children[0][`props`]['children'], {
          tableHight: this.state.tableHight
        })}
        <CSSTransition in={!this.state.isSHow} timeout={300} classNames="fade">
          <div className="fade-layout" style={{ position: this.props.position }}>
            <div className="fade-button">
              <span className="fade-button-inner" onClick={this.toggleMore}>
                关联信息
                <Icon type={this.state.isSHow ? 'caret-up' : 'caret-down'} />
              </span>
            </div>
            {children[1]}
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
  toggleMore = () => {
    const availHeight = document.body.clientHeight;
    let tableHight;
    if (availHeight > 900) {
      tableHight = 330;
    } else if (availHeight < 900) {
      tableHight = 250;
    }
    this.setState({
      isSHow: !this.state.isSHow,
      tableHight: this.state.isSHow ? tableHight : 450
    });
  };
}

export default TransfromDown;
