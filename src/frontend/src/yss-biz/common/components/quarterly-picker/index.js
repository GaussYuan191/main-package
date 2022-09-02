/**
 * @author dsy
 * @desc 季度日期选择框
 * @param {Function} [onChange] 下拉选中项变化的事件回调 返回所选季度的字符串日期，例如：'2022-Q2'
 * @param {String} [value] 设置value，则为受控组件
 * @param {String} [defaultValue] 设置非受控组件时设置默认值
 */

import React, { Component } from 'react';
import { Icon, Select } from 'antd';
import moment from 'moment';
import './index.less';
/**季度信息 */
const quarterData = [
  {
    value: 'Q1',
    label: '一季度'
  },
  {
    value: 'Q2',
    label: '二季度'
  },
  {
    value: 'Q3',
    label: '三季度'
  },
  {
    value: 'Q4',
    label: '四季度'
  }
];

class QuarterPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '', // 选择年份
      selectTime: `${moment().format('YYYY')}-${moment().quarter()}`.replace('-', '-Q'), // 默认选中当前的季度， "2022-Q1"， "Q1" 代表第一季度
      selectionTime: undefined, // 确定后需要返回的时间
      clear: false, //清除选中值标志
      selectType: 'quarter', //当前面板的模式 'quarter' 当前面板选择季度 'year' 当前面板选择年份
      selectYear: '', // 年份面板中选择的年份
      yearNum: 12, // 年份面板展示年份的数量
      yearData: [] //年份信息
    };
    this.toggleContainer = React.createRef();
  }

  componentDidMount() {
    const { value, defaultValue } = this.props;
    let { year, selectTime } = this.state;
    // 设置默认值
    if (defaultValue && typeof defaultValue == 'string' && defaultValue.includes('-Q')) {
      year = defaultValue.split('-')[0];
      this.setState({ selectTime: defaultValue, selectionTime: defaultValue, year });
    } else {
      year = value && typeof value === 'string' ? value.split('-')[0] : selectTime.split('-')[0];
      this.setState({
        selectTime: value ? value : selectTime,
        selectionTime: value ? value : undefined,
        year
      });
    }
    // 生成年份信息
    this.getYearData(year);
  }

  // 更新值
  static getDerivedStateFromProps(nextProps, prevState) {
    // 受控更新值
    const { value } = nextProps;
    // 清除选中的日期
    if (prevState.clear) {
      return {
        clear: !prevState.clear
      };
    }
    if (value && value !== prevState.selectionTime) {
      // 通过对比nextProps和prevState，返回一个用于更新状态的对象
      const year = value && value.split('-')[0];
      return {
        selectTime: value,
        selectionTime: value,
        year
      };
    }
    // 不需要更新状态，返回null
    return null;
  }

  /**年份减*/
  iconLeftClick = () => {
    let { year, selectType } = this.state;
    year = parseInt(year);
    if (selectType == 'quarter') {
      // 季度面板
      this.setState({
        year: (year - 1).toString()
      });
    } else {
      // 年份面板
      this.getYearData(year - 10);
      this.setState({ year: (year - 10).toString() });
    }
  };
  /**年份加*/
  iconRightClick = () => {
    let { year, selectType } = this.state;
    year = parseInt(year);
    if (selectType == 'quarter') {
      // 季度面板
      this.setState({
        year: (year + 1).toString()
      });
    } else {
      // 年份面板
      this.getYearData(year + 10);
      this.setState({ year: (year + 10).toString() });
    }
  };
  /**切换面板模式 */
  changeType = type => {
    this.setState({ selectType: type });
    this.getYearData(this.state.year);
  };
  /**记录选择的时间 */
  changeQuarter = item => {
    if (!item) {
      this.props.onChange && this.props.onChange('');
    } else {
      this.setState({ selectionTime: `${this.state.year}-${item.value}` });
      this.props.onChange && this.props.onChange(`${this.state.year}-${item.value}`);
    }
    // 收起面板
    this.toggleContainer.current.blur();
  };
  /**记录选择的年份 */
  changeYear = item => {
    if (!item) return;
    this.setState({ year: item.value.toString(), selectType: 'quarter' });
  };
  /**生成年份信息 */
  getYearData = year => {
    let startYear = parseInt(parseInt(year) / 10) * 10;
    let { yearNum } = this.state;
    let newYearData = [];
    for (let i = 0; i < yearNum; i++) {
      let obj = {
        value: startYear + i - 1,
        label: startYear + i - 1
      };
      newYearData.push(obj);
    }
    this.setState({ yearData: newYearData, selectYear: `${startYear}-${startYear + 9}` });
  };

  /**重置控件 */
  onReset = () => {
    // 清空所选项
    this.changeQuarter('');
    this.setState({
      selectionTime: undefined,
      selectTime: undefined,
      clear: true,
      year: moment().format('YYYY')
    });
  };
  render() {
    const { year, selectionTime, selectType, selectYear, yearData } = this.state;
    const renderNode = () => {
      return (
        //防止点击分页区后面板自动收起
        <div className="quarterly-picker" onMouseDown={e => e.preventDefault()}>
          <div className="picker-header">
            <button
              className="picker-header-super-prev-btn"
              onClick={this.iconLeftClick}
              style={{ display: 'block' }}
            >
              <span className="picker-super-prev-icon"></span>
            </button>
            <div className="picker-header-view">
              <button className="picker-year-btn" onClick={() => this.changeType('year')}>
                {selectType == 'quarter' ? year : selectYear}
              </button>
            </div>
            <button
              className="picker-header-super-next-btn"
              onClick={this.iconRightClick}
              style={{ display: 'block' }}
            >
              <span className="picker-super-next-icon"></span>
            </button>
          </div>
          <div className="picker-body">
            <ul className="picker-content">
              {selectType == 'quarter'
                ? (quarterData || []).map(item => {
                    return (
                      <li
                        key={item.value}
                        className={`picker-cell ${
                          typeof selectionTime == 'string' && selectionTime.includes(item.value)
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          this.changeQuarter(item);
                        }}
                      >
                        {item.label}
                      </li>
                    );
                  })
                : (yearData || []).map((item, index) => {
                    return (
                      <li
                        key={item.value}
                        className={`picker-cell ${
                          typeof selectionTime == 'string' && selectionTime.includes(item.value)
                            ? 'active'
                            : ''
                        } ${
                          index == 0 || index == yearData.length - 1 ? 'picker-cell-in-view' : ''
                        }`}
                        onClick={() => {
                          this.changeYear(item);
                        }}
                      >
                        {item.label}
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      );
    };
    return (
      <Select
        {...this.props}
        ref={this.toggleContainer}
        dropdownRender={renderNode}
        value={selectionTime}
        onChange={value => {
          this.onReset();
        }}
        style={{ minWidth: '190px' }}
        placeholder={this.props.placeholder || '请选择季度'}
        allowClear={this.props.allowClear}
        suffixIcon={<Icon type="schedule" />}
      ></Select>
    );
  }
}

export default QuarterPicker;
