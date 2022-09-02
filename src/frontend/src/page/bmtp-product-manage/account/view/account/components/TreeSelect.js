import React, { Component } from 'react';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;

class TreeSelects extends Component {
  state = {
    value: [],
    ids: []
  };
  render() {
    const tProps = {
      treeData: this.props.treeList,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      treeCheckStrictly: true,
      showCheckedStrategy: SHOW_PARENT,
      maxTagCount: 1,
      searchPlaceholder: '请选择主体',
      style: {
        width: '100%'
      }
    };
    return <TreeSelect {...tProps} />;
  }

  onChange = (value, label, extra) => {
    // const {changeRelatedSubjectCodes,types}=this.props;
    // this.setState({ value });
    // this.setState(()=>{
    //  return  {
    //     ids:[...this.state.ids,extra.allCheckedNodes[0].props.code]
    //   }
    // },()=>{ changeRelatedSubjectCodes({type:types,value:this.state.ids})})
  };
}

export default TreeSelects;
