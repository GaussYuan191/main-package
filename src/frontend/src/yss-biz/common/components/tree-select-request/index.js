/**
 * @lzx
 * 自动返回数据字典的下拉框
 * 接收参数 urls params type (type 对应的 urls中的地址)
 */
import React, { PureComponent } from 'react';
import { $ajax } from 'yss-biz';
import { TreeSelect } from 'antd';
export default class TreeSelectRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.config = this.props.config || {};
    this.state = {
      treeDatas: []
    };
  }

  handleOptionList = props => {
    let { type, params = {} } = props;
    let { url, method = 'get', join = false } = this.config[type];
    params = { ...this.config[type].params, ...params };
    if (!!join) {
      url = url + '/' + params;
      params = method;
    }
    $ajax(url, params, method).then(res => {
      let { data = [] } = res;
      this.setState({
        treeDatas: data
      });
    });
  };
  componentWillMount() {
    this.handleOptionList(this.props);
  }
  // componentWillReceiveProps(nextProps) {
  //     const newProps = JSON.stringify(nextProps);
  //     const oldProps = JSON.stringify(this.props);
  //     if (newProps !== oldProps) {
  //         this.handleOptionList(nextProps)
  //     }
  // }

  render() {
    return <TreeSelect allowClear {...this.props} treeData={this.state.treeDatas} />;
  }
}
