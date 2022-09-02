import React from 'react';
// import { Checkbox } from 'antd';

/**** 流程管理：按钮组件 ****/
export const withProcessButton = (ButtonType = []) => {
  // let btns = roleButton(ButtonType, authData);
  let btns = ButtonType;

  // return row => {
  //   return btns.map(item => {
  //     return (
  //       <Checkbox
  //         onChange={e => {
  //           onChange(e, item, row);
  //         }}
  //       >
  //         {item.flowName}
  //       </Checkbox>
  //     );
  //   });
  // };

  return row => {
    return btns.map(item => {
      return <span className="flow_node">{item.flowName}</span>;
    });
  };
};
