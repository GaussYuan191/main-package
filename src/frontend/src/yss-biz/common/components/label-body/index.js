import React from 'react';
import './style.less';
export default props => (
  <div
    className={props.className + ' formContanierBody'}
    style={{ width: props.width, margin: props.margin }}
  >
    <div className="title">{props.title}</div>
    {props.children}
  </div>
);
