/*eslint-disable*/
/**
 * @lzx
 * 自带样式的查询表单组件（可设置两种不同的展开方式 具体使用可参考文档）
 *  - mapOption 遍历 数据转换成 options 的方法
 */
import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Icon,
  TreeSelect,
  DatePicker,
  TimePicker,
  Cascader,
  Radio,
  Checkbox,
  Switch,
  Slider
} from 'antd';

import Select from '../select-normal';
import SelectMapDics from '../select-map-dics';
import InputPart from '../input-part';
import SelectRequest from '../select-request';
import TreeSelectRequest from '../tree-select-request';
import SelectPage from '../select-page';

import { isFunc } from 'yss-biz';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const selectTil = {
  // 给select选择框添加下拉时的title属性
  dropdownClassName: 'showTitle',
  onDropdownVisibleChange(open) {
    if (open) {
      setTimeout(() => {
        let dom = document.getElementsByClassName('showTitle')[0];
        let x = dom.ownerDocument.getElementsByTagName('li');
        for (let n of x) {
          if (n.innerText) {
            n.title = n.innerText;
          }
        }
      }, 50);
    }
  }
};

const itemList = {
  Input,
  InputNumber,
  InputPart,
  Select,
  SelectMapDics,
  SelectRequest,
  SelectPage,
  TreeSelectRequest,
  TreeSelect,
  DatePicker,
  MonthPicker,
  RangePicker,
  WeekPicker,
  TimePicker,
  Cascader,
  Radio,
  Checkbox,
  Switch,
  Slider
};
import { formLayout_fir } from 'yss-biz/utils/util/constant';
class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showToggle:
        this.props.formItem && this.props.formItem.length > (this.props.lineOf || 4) ? true : false,
      toggle: false
    };
    this.props.refs && this.props.refs(this);
    this.onSearch = this.onSearch.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  changeToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  onSearch(more) {
    const { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    more === 'more' &&
      !this.props.moreFullSearch &&
      Object.keys(values).forEach((key, index) => {
        if (index < (this.props.lineOf || 4)) {
          delete values[key];
        } else {
          return false;
        }
      });
    isFunc(this.props.handleSearch) && this.props.handleSearch(values);
  }

  onReset() {
    const { resetFields } = this.props.form;
    const { handleReset } = this.props;
    let theBreak = true;
    isFunc(this.props.afterReset) && (theBreak = this.props.handleBeforeReset());
    if (theBreak === false) return false;
    resetFields();
    // let values = getFieldsValue();
    handleReset && handleReset();
    this.props.handleReset && this.props.handleReset();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { toggle, showToggle } = this.state;
    let btnSize = this.props.btnSize || this.props.size;
    this.firstData = [];
    this.otherData = [];
    if ((this.props.formItem && this.props.formItem.length > this.props.lineOf) || 4) {
      this.allData = this.props.formItem;
      this.firstData = this.allData.slice(0, this.props.lineOf || 4);
      this.otherData = this.allData.slice(this.props.lineOf || 4, this.allData.length);
    } else {
      this.firstData = this.props.formItem || [];
    }
    return (
      <Fragment>
        <Form {...formLayout_fir} autoComplete="off" className="searchForm rowStyle">
          <section className="f-clearfix">
            <div className="f-left">
              {this.firstData.map((item, index) => {
                let unitSize = (item.props || {}).size || this.props.size;
                let itemSize = item.itemSize || this.props.itemSize || '200px';
                let labelSize = item.labelSize || this.props.labelSize || '4em';
                let marginRight = item.marginRight || this.props.marginRight || '30px';
                if (item.type === 'Select' && !!item.props.getDics && !isNaN(item.props.getDics)) {
                  item.type = 'SelectMapDics';
                  item.props.code = item.props.getDics;
                }

                if (item.type === 'Select' && !!item.props.config) {
                  item.type = 'SelectRequest';
                }
                if (item.type === 'Select' && !!item.props.configDics) {
                  item.type = 'SelectPage';
                }
                if (item.type === 'TreeSelect' && !!item.props.config) {
                  item.type = 'TreeSelectRequest';
                }

                switch (item.type) {
                  case 'TreeSelec':
                  case 'Select':
                  case 'SelectMapDics':
                  case 'SelectRequest':
                  case 'SelectPage':
                  case 'TreeSelectRequest':
                    item.props.showSearch = true;
                    break;
                  default:
                    break;
                }
                let ItemType = itemList[item.type];
                // 解决多选框 取消最先选中的选项的勾选时, 框被撑开的问题
                if (item.props.mode && item.props.mode == 'multiple') {
                  item.props.style = {
                    height: '32px',
                    overflowY: 'hidden'
                  };
                }
                let newProps = { ...item.props };
                delete (item.props || {}).initialValue;
                let titles;
                if (item.type == 'SelectMapDics') {
                  titles = selectTil;
                } else {
                  titles = {};
                }
                return (
                  <div
                    key={item.name}
                    className="f-left"
                    style={{ width: `calc(${itemSize} + ${labelSize})`, marginRight }}
                  >
                    <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: item.itemMargin }}>
                      <ul className="f-clearfix">
                        {item.label && (
                          <li className="f-left f-mr10 f-text-right" style={{ width: labelSize }}>
                            {item.label}
                          </li>
                        )}
                        <li className="f-block-hide">
                          {getFieldDecorator(
                            item.name,
                            newProps
                          )(
                            <ItemType
                              {...item.props}
                              size={unitSize}
                              options={item.options}
                              {...titles}
                            />
                          )}
                          {/* 添加备注remark */}
                          {item.remark && (
                            <Icon
                              className="remark-icon"
                              type="question-circle"
                              title={item.remark}
                            />
                          )}
                        </li>
                      </ul>
                    </Form.Item>
                  </div>
                );
              })}
            </div>
            <div className="searchBox f-left">
              <ul className="f-flex-center" style={{ marginTop: btnSize === 'small' ? '3px' : '' }}>
                {showToggle && !this.props.showAll && (
                  <li
                    onClick={() => {
                      this.changeToggle();
                      this.props.hasMorModal && !this.props.keepValues && this.onReset();
                    }}
                  >
                    <div className="inputSearch">
                      <span>更多查询</span>
                      {!this.props.moreTypeModal && (
                        <Icon
                          style={{ verticalAlign: '-2px' }}
                          type={toggle ? 'caret-up' : 'caret-down'}
                          className="getMoreIcon"
                        />
                      )}
                    </div>
                  </li>
                )}
                <li className="f-mr10">
                  <Button size={btnSize} type="primary" onClick={this.onSearch}>
                    查询
                  </Button>
                </li>
                <li>
                  <Button size={btnSize} onClick={this.onReset}>
                    重置
                  </Button>
                </li>
              </ul>
            </div>
          </section>
          {!this.props.moreTypeModal ? (
            <section
              className="f-clearfix"
              style={{ display: toggle || this.props.showAll ? 'block' : 'none' }}
            >
              {this.nomalMoreForm(getFieldDecorator)}
            </section>
          ) : (
            <Drawer
              className="darkStyle"
              title="更多查询"
              placement="right"
              closable={false}
              onClose={this.changeToggle}
              visible={toggle}
              width={400}
            >
              {this.modelMoreForm(getFieldDecorator)}
            </Drawer>
          )}
        </Form>
      </Fragment>
    );
  }

  nomalMoreForm(getFieldDecorator) {
    return this.otherData.map((item, index) => {
      let nextLine = index % (!!this.props.lineOf ? this.props.lineOf : 4) === 0;
      let unitSize = (item.props || {}).size || this.props.size;
      let itemSize = item.itemSize || this.props.itemSize || '200px';
      let labelSize = item.labelSize || this.props.labelSize || '4em';
      if (item.type === 'Select' && !!item.props.getDics && !isNaN(item.props.getDics)) {
        item.type = 'SelectMapDics';
        item.props.code = item.props.getDics;
      }
      if (item.type === 'Select' && !!item.props.config) {
        item.type = 'SelectRequest';
      }
      if (item.type === 'Select' && !!item.props.configDics) {
        item.type = 'SelectPage';
      }
      if (item.type === 'TreeSelect' && !!item.props.config) {
        item.type = 'TreeSelectRequest';
      }
      switch (item.type) {
        case 'TreeSelec':
        case 'Select':
        case 'SelectMapDics':
        case 'SelectRequest':
        case 'SelectPage':
        case 'TreeSelectRequest':
          item.props.showSearch = true;
          break;
        default:
          break;
      }
      let ItemType = itemList[item.type];
      let newProps = { ...item.props };
      delete (item.props || {}).initialValue;
      return (
        <div
          key={item.name}
          className="f-left f-mr30"
          style={{ width: `calc(${labelSize} + ${itemSize})`, clear: nextLine ? 'both' : 'none' }}
        >
          <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: item.itemMargin }}>
            <ul className="f-clearfix">
              {item.label && (
                <li className="f-left f-mr10 f-text-right" style={{ width: labelSize }}>
                  {item.label}
                </li>
              )}
              <li className="f-block-hide">
                {getFieldDecorator(
                  item.name,
                  newProps
                )(<ItemType {...item.props} size={unitSize} options={item.options} />)}
                {/* 添加备注remark */}
                {item.remark && (
                  <Icon className="remark-icon" type="question-circle" title={item.remark} />
                )}
              </li>
            </ul>
          </Form.Item>
        </div>
      );
    });
  }
  modelMoreForm(getFieldDecorator) {
    let btnSize = this.props.btnSize || this.props.size;
    return (
      <Form layout="horizontal" {...formLayout_fir} className="rowStyle">
        <section className="f-clearfix">
          {this.otherData.map((item, index) => {
            let unitSize = (item.props || {}).size || this.props.size;
            let labelSize = item.labelSize || this.props.labelSize || '4em';
            if (item.type === 'Select' && !!item.props.getDics && !isNaN(item.props.getDics)) {
              item.type = 'SelectMapDics';
              item.props.code = item.props.getDics;
            }
            if (item.type === 'Select' && !!item.props.config) {
              item.type = 'SelectRequest';
            }
            if (item.type === 'Select' && !!item.props.configDics) {
              item.type = 'SelectPage';
            }
            if (item.type === 'TreeSelect' && !!item.props.config) {
              item.type = 'TreeSelectRequest';
            }
            switch (item.type) {
              case 'TreeSelec':
              case 'Select':
              case 'SelectMapDics':
              case 'SelectRequest':
              case 'SelectPage':
              case 'TreeSelectRequest':
                item.props.showSearch = true;
                break;
              default:
                break;
            }
            let ItemType = itemList[item.type];
            let newProps = { ...item.props };
            delete (item.props || {}).initialValue;
            return (
              <div key={item.name}>
                <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: item.itemMargin }}>
                  <ul className="f-clearfix">
                    {item.label && (
                      <li className="f-left f-mr10 f-text-right" style={{ width: labelSize }}>
                        {item.label}
                      </li>
                    )}
                    <li className="f-block-hide">
                      {getFieldDecorator(
                        item.name,
                        newProps
                      )(<ItemType {...item.props} size={unitSize} options={item.options} />)}
                      {/* 添加备注remark */}
                      {item.remark && (
                        <Icon className="remark-icon" type="question-circle" title={item.remark} />
                      )}
                    </li>
                  </ul>
                </Form.Item>
              </div>
            );
          })}
          <div className="searchBox">
            <ul className="f-flex-center f-mt10">
              <li className="f-mr10">
                <Button type="primary" size={btnSize} onClick={() => this.onSearch('more')}>
                  查询
                </Button>
              </li>
              <li>
                <Button size={btnSize} onClick={this.onReset}>
                  重置
                </Button>
              </li>
            </ul>
          </div>
        </section>
      </Form>
    );
  }
}

const SearchFormCreate = Form.create()(SearchForm);
SearchFormCreate.mapOption = (list, name, value) => {
  return (list || []).map((item, index) => {
    return {
      label: item[name],
      value: item[value]
    };
  });
};

SearchFormCreate.mapOptionWithNameCode = (list, name, value) => {
  return (list || []).map((item, index) => {
    return {
      label: `${item[value]}-${item[name]}`,
      value: item[value]
    };
  });
};

export default SearchFormCreate;
