import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.less';
class FadeDown extends Component {
  render() {
    const { children, isSHow } = this.props;
    return (
      <CSSTransition in={isSHow} timeout={300} classNames="down" unmountOnExit>
        <div className="transfrom">{children}</div>
      </CSSTransition>
    );
  }
}
export default FadeDown;
