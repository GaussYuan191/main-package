/**
 * @lzx
 * 自动返回数据字典的下拉框
 * 接收参数 urls params type (type 对应的 urls中的地址)
 */
import React, { PureComponent } from 'react';
import { $ajax, isObject, filterNullElement } from 'yss-biz';
import { Select } from 'antd';
export default class SelectRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.config = this.props.config || {};
    this.reqPageNum = 1;
    this.reqPageSize = 100;
    this.state = {
      optionsDatas: [],
      showData: [],
      searchData: [], //搜索出来总结果
      pageSize: 100,
      scrollPage: 1,
      keyWords: '',
      isMoreData: true
    };
  }
  handleSearch = value => {
    let { type } = this.props;
    const { resName } = this.config[type];
    this.reqPageNum = 1;
    if (!!resName) {
      let newProps = { ...this.props };
      newProps.params = newProps.params || {};
      newProps.params[resName] = value;
    } else {
      // 300ms更新一次
      if (type == 'bond') {
        if (!this.timer) {
          this.timer = setTimeout(() => {
            let newParams = {
              ...this.props,
              params: {
                reqPageNum: this.reqPageNum,
                reqPageSize: this.reqPageSize,
                securityCode: value
              }
            };
            this.setState({ keyWords: value });
            this.handleOptionList(filterNullElement(newParams));
            this.timer = null;
          }, 300);
        }
      }
    }
  };
  searchValue = value => {
    const { optionsDatas } = this.state;
    let datas = optionsDatas.filter(item => item.label.indexOf(value) > -1),
      arr = [];
    this.setState({
      searchData: datas
    });
    if (datas.length > 100 || value === '') {
      arr = datas.slice(0, 100);
    } else {
      arr = datas;
    }
    // 然后只显示符合搜索条件的所有数据中的前100条
    this.setState({ showData: arr });
  };

  handleScroll = e => {
    if (this.props.type != 'bond') {
      return;
    }
    e.persist();
    const { target } = e;
    const rmHeight = target.scrollHeight - target.scrollTop;
    const clHeight = target.clientHeight;
    if (rmHeight < clHeight + 5) {
      if (this.state.isMoreData) {
        if (!this.timer) {
          this.timer = setTimeout(() => {
            let newParams = {
              ...this.props,
              params: {
                reqPageNum: this.reqPageNum,
                reqPageSize: this.reqPageSize,
                securityCode: this.keyWords
              }
            };
            this.handleOptionList(filterNullElement(newParams));
            this.timer = null;
          }, 300);
        }
      }
    }
  };
  handleOptionList = props => {
    let { type, params = {} } = props;
    let { url, method = 'get', join = false, option = {} } = this.config[type];
    params = { ...this.config[type].params, ...params };
    const { label = 'name', value = 'code' } = option;
    if (!!join) {
      url = url + '/' + params;
      params = method;
    }
    $ajax(url, params, method, { mask: false }).then(res => {
      let list = res.data || [];
      if (isObject(list)) {
        list = list.list || [];
      }
      // if (type == 'bond') {
      // if (list.length < this.state.reqPageSize) {
      //   this.setState({
      //     isMoreData: false
      //   });
      // } else {
      //   this.reqPageNum++;
      // }
      // let dataArr = [...this.state.optionsDatas];
      // dataArr.push(...this.mapOption(list, label, value));
      this.setState({
        optionsDatas: this.mapOption(list, label, value)
      });
      // } else {
      //   this.setState({
      //     optionsDatas: this.mapOption(list, label, value)
      //   });
      // }
    });
  };
  componentWillMount() {
    if (this.props.type == 'bond') {
      this.handleOptionList({
        ...this.props,
        params: { reqPageNum: this.reqPageNum, reqPageSize: this.reqPageSize }
      });
    } else {
      this.handleOptionList(this.props);
    }
  }
  // componentWillReceiveProps(nextProps) {
  //     const newProps = JSON.stringify(nextProps);
  //     const oldProps = JSON.stringify(this.props);
  //     if (newProps !== oldProps) {
  //         this.handleOptionList(nextProps)
  //     }
  // }
  mapOption = (list, name, value) => {
    let { type } = this.props;
    const { fullLabel = false } = this.config[type];

    return (list || []).map(item => {
      let itemValue = Array.isArray(value) ? item[value[0]][value[1]] : item[value];
      // let itemName = Array.isArray(name) ? item[name[1]] : item[name];
      let itemName = Array.isArray(name) ? item[name[0]][name[1]] : item[name];
      let label = !!fullLabel ? itemValue + ' - ' + itemName : itemName;
      return {
        label,
        value: itemValue,
        ...item
      };
    });
  };
  isObject = value => {
    let keys = Object.keys(value);
    // if (keys.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
    return keys.length > 0 ? true : false;
  };
  handleOnBlur = () => {
    // this.setState({
    //   showData: this.state.optionsDatas.slice(0, 100),
    //   searchData: []
    // });
  };

  render() {
    let arr = [],
      datas = [];
    this.state.optionsDatas.map(item => {
      if (arr.indexOf(item.value) == -1) {
        arr.push(item.value);
        datas.push(item);
      }
    });
    const options = datas.map((item, idx) => (
      <Select.Option key={`${idx}-${item.value}`} title={item.label} value={item.value}>
        {item.label}
      </Select.Option>
    ));
    return (
      <Select
        {...this.props}
        // getPopupContainer={triggerNode => triggerNode.parentNode}
        allowClear
        showSearch
        // onPopupScroll={this.handleScroll}
        // onBlur={this.handleOnBlur}
        onSearch={this.handleSearch}
        filterOption={(input, option) => {
          // option.value.toLowerCase().indexOf(input.toLowerCase()) > 0 ||
          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {options}
      </Select>
    );
  }
}
