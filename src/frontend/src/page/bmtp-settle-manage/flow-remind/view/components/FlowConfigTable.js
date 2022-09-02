/** 流程配置勾选表格组件
 * by txf
 * dataSource: 勾选表格的数据渲染源, 后端给的双层层 对象数组 结构
 * 一层数据配置, 配置表头标题以及数据来源
 * tableConfig: {parentKeyField: string, parentField: string, parentTitle: string, childrenField: string, childrenTitle: string}
 * childrenConfig:{labelField: string, valueField: string} 二层, checkbox组配置
 * value: {[parentKeyField]:string[]}
 * TODO 做成公共组件
 */
import React, { Component } from 'react';
import { ConfigableTable } from 'yss-biz';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
class FlowConfigTable extends Component {
  constructor(props) {
    super(props);
    typeof this.props.refs === 'function' && this.props.refs(this);
    this.state = {
      value: {}
    };
  }
  componentDidMount() {
    // 初始化勾选总数据
    if (this.hasValue()) {
      this.setState({ data: this.props.value });
    } else {
      this.setState({ data: this.props.initialValue || {} });
    }
  }
  render() {
    const { dataSource, tableConfig = {}, childrenConfig, disabled } = this.props;
    let tableColumns;
    try {
      const { parentKeyField, parentField, parentTitle, childrenField, childrenTitle } =
        tableConfig;
      const { labelField, valueField } = childrenConfig;
      tableColumns = [
        {
          title: parentTitle,
          dataIndex: parentField,
          width: 200,
          ellipsis: true,
          onCell: (record, rowIndex) => {
            return {
              style: { cursor: 'pointer' },
              onClick: () => {
                if (disabled) {
                  return;
                }
                this.switchGroupCheck(record[parentKeyField], record[childrenField]);
              }
            };
          }
        },
        {
          title: childrenTitle,
          dataIndex: childrenField,
          render: (text, record, index) => {
            let nodeList = text || [];
            const value = this.hasValue()
              ? this.props.value[record[parentKeyField]] || []
              : this.state.value[record[parentKeyField]] || [];
            const options = nodeList.map(item => {
              return { label: item[labelField], value: item[valueField] };
            });
            return (
              <CheckboxGroup
                options={options}
                value={value}
                onChange={checkedValue => {
                  this.onCheckboxClick(record[parentKeyField], checkedValue);
                }}
                disabled={disabled}
              />
            );
          }
        }
      ];
    } catch (error) {
      console.error(this.props);
      return <h3 style={{ color: 'red' }}>数据格式错误, 请联系管理员</h3>;
    }
    return (
      <ConfigableTable
        columns={tableColumns}
        dataSource={dataSource}
        sorter={false}
        bordered={true}
        pagination={false}
        onRow={() => ({ onDoubleClick: false })} // 取消双击显示详情
        scroll={{
          x: true,
          y: 350
        }}
      />
    );
  }

  // 勾选处理
  onCheckboxClick = (key, checkedValue) => {
    const { onChange } = this.props;
    const newValue = {
      ...(this.hasValue() ? this.props.value : this.state.value),
      [key]: checkedValue
    };
    if (!this.hasValue()) {
      this.setState({ value: newValue });
    }
    typeof onChange === 'function' && onChange(newValue);
  };

  // 点击首列切换整组勾选
  switchGroupCheck = (key, nodeList) => {
    try {
      const { childrenConfig } = this.props;
      const maxCount = nodeList.length;
      const maxCountList = nodeList.map(item => item[childrenConfig.valueField]);
      const preValue = this.hasValue() ? this.props.value : this.state.value;
      if (preValue[key] && preValue[key].length >= maxCount) {
        this.onCheckboxClick(key, []);
      } else {
        this.onCheckboxClick(key, maxCountList);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // 全选操作(可暴露方法)
  switchAllCheck = all => {
    const {
      dataSource,
      tableConfig: { parentKeyField, childrenField },
      childrenConfig: { valueField },
      onChange
    } = this.props;
    let toCheckAll = true,
      newValue = {};
    if (typeof all === 'boolean') {
      // 有参数则根据参数切换全选状态
      toCheckAll = all;
    }
    if (toCheckAll) {
      (dataSource || []).forEach(item => {
        newValue[item[parentKeyField]] = (item[childrenField] || []).map(node => node[valueField]);
      });
    };
    if (!this.hasValue()) {
      this.setState({ value: newValue });
    }
    typeof onChange === 'function' && onChange(newValue);
  };

  // 判断组件值是否受控
  hasValue = () => {
    if (this.props.value && typeof this.props.value === 'object') {
      return true;
    }
    return false;
  };
}
export default FlowConfigTable;
