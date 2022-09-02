/*eslint-disable*/
/**
 * @lzx
 * 自带样式的表单组件（可自动 换行 插入分割线 等 具体使用可参考文档）
 *  - mapOption 遍历 数据转换成 options 的方法
 */
import React, { PureComponent, Fragment } from 'react';
// import { FormValidItem } from 'bmtp-trade-base';
import FormValidItem from './FormValidItem';
import {
  Form,
  Input,
  TreeSelect,
  Cascader,
  InputNumber,
  DatePicker,
  TimePicker,
  Rate,
  Radio,
  Checkbox,
  Switch,
  Slider
} from 'antd';
import Select from '../select-normal';
import SelectMapDics from '../select-map-dics';
import SelectRequest from '../select-request';
import SelectPage from '../select-page';
import TreeSelectRequest from '../tree-select-request';
import InputPart from '../input-part';
import InputRange from '../input-range';

const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const itemList = {
  Input,
  InputPart,
  InputNumber,
  InputRange,
  SelectMapDics,
  Select,
  SelectRequest,
  SelectPage,
  TreeSelect,
  TreeSelectRequest,
  Cascader,
  TextArea,
  DatePicker,
  MonthPicker,
  RangePicker,
  WeekPicker,
  TimePicker,
  Rate,
  Radio,
  Checkbox,
  Switch,
  Slider
};
// import { formLayout_fir } from 'yss-biz/utils/util/constant';
import './index.less';
class NormForm extends PureComponent {
  constructor(props) {
    super(props);
    this.props.refs && this.props.refs(this);
    this.getValues = this.getValues.bind(this);
    this.onReset = this.onReset.bind(this);
    this.dis = 0;
    this.state = {};
    this.formSectionDomRef = React.createRef();
  }
  getValues = () => {
    const { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    return values;
  };
  setValues = (values, fn) => {
    const { setFieldsValue } = this.props.form;
    let newValues = this.getValues();
    Object.keys(newValues).forEach(key => {
      values[key] !== undefined && (newValues[key] = values[key]);
    });
    setFieldsValue({ ...newValues });
    typeof fn === 'function' && fn.call(this, this.getValues());
  };
  // names string[] 需要重置的表单字段名数组
  onReset(names) {
    const { resetFields } = this.props.form;
    names ? resetFields(names) : resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const lineOf = this.props.lineOf;
    const allData = this.props.formItem || [];
    this.dis = 0;
    return (
      <Form autoComplete="off" className="searchForm rowStyle">
        <section className="f-clearfix norm-from-section" ref={this.formSectionDomRef}>
          {allData.map((item, index) => {
            if (
              !!item.props &&
              item.type === 'Select' &&
              !!item.props.getDics &&
              !isNaN(item.props.getDics)
            ) {
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
            (item.isLine || !!item.hidden) && (this.dis = -index - 1);
            let newIndex = index + this.dis;
            let itemSize = item.itemSize || this.props.itemSize || '200px';
            let labelSize = item.labelSize || this.props.labelSize || '4em';
            let nextLine = !isNaN(lineOf) ? newIndex % lineOf === 0 || newIndex === 0 : false;
            let marginRight = item.marginRight || this.props.marginRight || '30px';
            let noMargin = !isNaN(lineOf) ? (newIndex + 1) % lineOf === 0 : false;
            const rulesList = item.rules;
            const fieldDecoratorOption = {
              ...item.props
            };
            delete (item.props || {}).initialValue;
            !!rulesList && (fieldDecoratorOption.rules = rulesList);
            return (
              <Fragment key={item.name || index}>
                {!item.isLine && (
                  <div
                    className="f-left"
                    style={{
                      display: item.hidden ? 'none' : '',
                      width: `calc(${itemSize} + ${labelSize})`,
                      clear: nextLine ? 'both' : '',
                      marginRight: noMargin ? '' : marginRight
                    }}
                  >
                    <ul className="f-clearfix">
                      <li
                        className={
                          ((!!rulesList && rulesList[0]) || {}).required
                            ? 'ant-form-item-required f-left f-mr10 f-text-right'
                            : 'f-left f-mr10 f-text-right'
                        }
                        style={{ width: labelSize, marginTop: '5px' }}
                      >
                        {item.label}
                      </li>
                      <li className="f-block-hide">
                        <FormValidItem
                          renderElemt={this.formSectionDomRef.current}
                          style={{ marginBottom: item.itemMargin || '8px' }}
                        >
                          {item.unBind ? (
                            <ItemType {...item.props} options={item.options} />
                          ) : item.type !== 'InputRange' ? (
                            getFieldDecorator(item.name, { ...fieldDecoratorOption })(
                              <ItemType {...item.props} options={item.options} />
                            )
                          ) : (
                            <ItemType {...item} {...this.props} />
                          )}
                        </FormValidItem>
                        {this.props.render || item.render}
                      </li>
                    </ul>
                  </div>
                )}
                {item.isLine && (
                  <div
                    className={!item.hidden ? 'u-hr' : ''}
                    style={{
                      float: 'left',
                      width: item.width || '100%',
                      clear: 'both',
                      borderBottomWidth: item.height,
                      marginBottom: !item.hidden ? item.itemMargin || '8px' : ''
                    }}
                  >
                    {this.props.render || item.render}
                  </div>
                )}
              </Fragment>
            );
          })}
        </section>
      </Form>
    );
  }
}

const NormFormCreate = Form.create()(NormForm);
NormFormCreate.mapOption = (list, name, value) => {
  if (Array.isArray(list)) {
    return list.map(item => {
      if (value !== undefined) {
        return {
          label: item[name],
          value: item[value]
        };
      }
    });
  }
};
export default NormFormCreate;
