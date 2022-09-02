import React from 'react';
import { Radio } from 'antd';
import { merge } from 'yss-biz';
export default props => {
  let TypeItem;
  let resProps = {};
  Object.keys(props).forEach(key => {
    if (key !== 'options') {
      resProps[key] = props[key];
    }
  });
  let options = merge(props.options);
  switch (props.type) {
    case 'Button':
      TypeItem = Radio.Button;
      break;
    default:
      TypeItem = Radio;
  }
  return (
    <Radio.Group {...resProps} style={{ width: '100%' }}>
      {(options || []).map((item, index) => {
        return (
          <TypeItem value={item.value} key={index}>
            {item.label}
          </TypeItem>
        );
      })}
    </Radio.Group>
  );
};
