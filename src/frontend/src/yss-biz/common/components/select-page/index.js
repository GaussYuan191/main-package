/**
 * @author txf
 * @desc 自动返回数据字典的具有分页功能的下拉框
 * @param {{[type]:config} | config} configDics  下拉请求配置或总配置, 配置config格式为:
 * interface config {
    url: string, // 下拉组件请求的接口地址
    params?: object, // 请求时附带的参数
    option?: {
      value: string, // 下拉框value取值域
      label: string // 下拉框label取值域
    },
    fieldCode?: string, // 查询时输入值对应请求参数中的参数名
    fullLabel?: boolean | [string, string] | string, // 标签拼接全值
    labelRender?: (object,string): string, // 标签render函数, 优先fullLabel生效
    method?: 'post'|'get' // 接口请求方式
  }
 * @param {String} [type] 若存在则组件配置取 configDics[type]
 * @param {[String|Number] | String | Number} [value] 下拉框的值
 * @param {Function} [onChange] 下拉选中项变化的事件回调
 * @param {Object} [extrParam] 请求分页时附加额外参数(post请求参数)
 * @param {Boolean} [refreshOnDropdown] 是否每次展开下拉时重新请求下拉数据
 * @param ... antd中Select组件参数
 */
import React from 'react';
import { $ajax, filterNullElement } from 'yss-biz';
import { Select, Pagination } from 'antd';
import { PaginationWrap } from './index-css.js';
const { Option } = Select;
export default class SelectPage extends React.Component {
  constructor(props) {
    super(props);
    const { configDics, type } = this.props;
    this.config = configDics ? (type ? configDics[type] || {} : configDics) : {};
    this.keyword = ''; // 用户键入的查询关键字
    this.typeSearched = false; // 标记用户是否输入搜素过
    this.tempValue = undefined; // value的临时量
    this.state = {
      value: undefined,
      dataSource: [], // 下拉数据
      reqPageNum: 1,
      reqPageSize: this.props.pageSize || 20,
      total: 0,
      loading: false
    };
    this.pagiRef = React.createRef(); // 分页器dom实例
  }

  componentDidMount() {
    this.handleSearch('');
  }

  /**处理value更新 */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!hasValue(nextProps)) {
      // 组件不受控, value使用自身state
      return;
    }
    // 组件受控, 处理 1.表单回显 2.表单重置 3.带有初始值 等情景
    const { value: nextValue } = nextProps;
    if (nextValue !== this.tempValue) {
      // 外部修改value值的情况, 若是经过组件自身onChange的话是相等的
      this.setState({ reqPageNum: 1 }, () => {
        this.getQueryItem(nextValue);
        this.tempValue = nextValue;
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**输入查询 */
  handleSearch = str => {
    let reg = new RegExp('^' + (this.keyword ? this.keyword : '') + '\\s$', 'g');
    if (reg.test(str)) {
      // 某些输入法弹出中文输入面板时会向输入框插入一个空格, 此处减少该无用请求
      return;
    }
    this.keyword = str;
    if (this.keyword !== '') {
      this.typeSearched = true;
    }
    this.setState({ reqPageNum: 1 }, () => {
      this.setState({ loading: true }, () => {
        this.doSearch();
      });
    });
  };

  /**切换分页查询 */
  handlePageSearch = (page, pageSize) => {
    this.setState({ reqPageNum: page }, () => {
      // 做两次set,利用两次render保证分页器宽度变化后,列表宽度同时变化
      this.setState({ loading: true }, () => {
        this.doSearch();
      });
    });
  };

  /**查询动作(防抖) */
  doSearch = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.getSearchPageList();
      this.timer = null;
    }, 500);
  };

  /**查询某条数据缓存 */
  getQueryItem = async value => {
    if (!!value) {
      this.keyword = value;
      await this.getSearchPageList(); // 获取缓存
    }
    this.handleSearch(''); // 刷新列表
  };

  /**查询数据 */
  getSearchPageList = async () => {
    let { extrParam = {} } = this.props;
    const { reqPageNum, reqPageSize } = this.state;
    let { url, method = 'post', fieldCode = 'keyword', params = {} } = this.config;
    // 处理查询参数
    let queryParams = {
      reqPageNum: reqPageNum,
      reqPageSize: reqPageSize,
      ...params,
      ...extrParam
    };
    queryParams[fieldCode] = this.keyword;
    queryParams = filterNullElement(queryParams);
    await $ajax(url, queryParams, method, { mask: false }).then(res => {
      let { list, total = 0 } = res?.data || {};
      this.setState({
        dataSource: this.mapOption(list),
        total,
        loading: false
      });
    });
  };

  mapOption = list => {
    const { fullLabel = false, option = {}, labelRender } = this.config;
    let { label = 'name', value = 'code' } = option;

    return (list || []).map(item => {
      let itemValue = Array.isArray(value) ? item[value[0]][value[1]] : item[value];
      let itemName = Array.isArray(label) ? item[label[0]][label[1]] : item[label];
      if (typeof labelRender === 'function') {
        itemName = labelRender(item, itemValue);
      } else if (!!fullLabel) {
        if (fullLabel === true) {
          itemName = itemValue + ' - ' + itemName;
        } else {
          // 处理展示值与组件实际value取值不同的需求场景
          let displayValue = Array.isArray(fullLabel)
            ? item[fullLabel[0]][fullLabel[1]]
            : item[fullLabel];
          itemName = displayValue + ' - ' + itemName;
        }
      }

      return {
        label: itemName,
        value: itemValue,
        ...item
      };
    });
  };

  onChange = (value, options) => {
    const { onChange } = this.props;
    this.tempValue = value;
    this.setState({ value }, () => {
      onChange && onChange(value, options);
    });
  };

  onDropdownChange = open => {
    const { onDropdownVisibleChange, refreshOnDropdown } = this.props;
    if (!open && this.typeSearched) {
      // 搜索后, 关闭面板, 重置搜索
      this.handleSearch('');
      this.typeSearched = false;
    }
    if (open && refreshOnDropdown) {
      this.handleSearch('');
    }
    onDropdownVisibleChange && onDropdownVisibleChange(open);
  };

  renderPagination = () => {
    const { total, reqPageNum, reqPageSize } = this.state;
    return menu => (
      <div>
        {menu}
        <PaginationWrap minWidth={this.props.dropdownWidth || 250}>
          <div
            ref={this.pagiRef}
            onMouseDown={e => e.preventDefault()} // 防止点击分页区后面板自动收起
          >
            <Pagination
              size="small"
              showLessItems={true}
              showSizeChanger={false}
              showTotal={(total, range) => `共${total}条`}
              current={reqPageNum}
              pageSize={reqPageSize}
              total={total}
              onChange={this.handlePageSearch}
            />
          </div>
        </PaginationWrap>
      </div>
    );
  };

  render() {
    const { dataSource, loading, value } = this.state;
    const { dropdownWidth = 250 } = this.props;
    // 下拉列表保证随分页器宽度变化
    const width = this.pagiRef.current?.clientWidth || dropdownWidth;
    return (
      <Select
        dropdownStyle={{
          minWidth: dropdownWidth,
          width: width
        }}
        dropdownMatchSelectWidth={false}
        filterOption={false}
        allowClear={true}
        showSearch={true}
        showArrow={true}
        loading={loading}
        value={value}
        {...this.props} // props有value则会覆盖
        onSearch={this.handleSearch}
        onChange={this.onChange}
        onDropdownVisibleChange={this.onDropdownChange}
        dropdownRender={this.renderPagination()}
      >
        {dataSource &&
          dataSource.length &&
          dataSource.map(item => (
            <Option key={item.value} title={item.label} value={item.value} origindata={item}>
              {item.label}
            </Option>
          ))}
      </Select>
    );
  }
}

/**校验组件是否受控 */
function hasValue(props = {}) {
  return props.hasOwnProperty('value');
}
