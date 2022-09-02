import React, { Component } from 'react';
import NormalForm from '../normal-form';

export default class ListDetail extends Component {
  render() {
    const { column, fromData } = this.props;
    let formItems = [];
    column.forEach((item, idx) => {
      if (item.title != '序号') {
        if (!item.children) {
          const renderValue = this.getRenderValue(item, fromData);
          if (renderValue === undefined) {
            return;
          }
          formItems.push({
            name: item.dataIndex || `item_${idx}`,
            label: item.title,
            type: 'Input',
            props: {
              disabled: true,
              initialValue: renderValue,
              title: renderValue
            }
          });
        } else {
          // 使用了分组表头的情况
          let title = item.title;
          item.children.map((val, i) => {
            const renderValue = this.getRenderValue(val, fromData);
            if (renderValue === undefined) {
              return;
            }
            formItems.push({
              name: val.dataIndex || `item_${idx}_${i}`,
              label: `(${title})${val.title}`,
              type: 'Input',
              props: {
                disabled: true,
                initialValue: renderValue,
                title: renderValue
              }
            });
          });
        }
      }
    });
    return (
      <div>
        <NormalForm
          refs={ref => (this.showForm = ref)}
          labelSize="10em"
          lineOf={3}
          formItem={formItems}
        />
      </div>
    );
  }

  /**
   * 根据表格渲染值处理表单的展示
   * @param {object} formItem 表格column列的单个配置项
   * @param {object} rowData 表格该行的数据
   * @returns {string | number | null | undefined} 返回渲染的值或者undefined,undefinded的数据不做展示
   */
  getRenderValue(formItem, rowData) {
    let renderValue = null;
    if (formItem.render) {
      // 使用了render
      if (formItem.dataIndex) {
        // 配置了原始值
        renderValue = formItem.render(rowData[formItem.dataIndex], rowData);
        if (
          typeof renderValue !== 'string' &&
          typeof renderValue !== 'number' &&
          renderValue !== null
        ) {
          // 复杂渲染,则展示原始值
          renderValue = rowData[formItem.dataIndex];
          if (
            renderValue !== null &&
            (typeof renderValue === 'object' || renderValue === undefined)
          ) {
            // 原始值为复杂数据类型、原始值(后端返回的字段)不存在的不展示
            return;
          }
        }
      } else {
        // 没配置原始值
        renderValue = formItem.render(rowData, rowData);
        if (
          typeof renderValue !== 'string' &&
          typeof renderValue !== 'number' &&
          renderValue !== null
        ) {
          // 复杂渲染,不展示
          return;
        }
      }
    } else {
      // 未使用render
      renderValue = rowData[formItem.dataIndex];
      if (renderValue === undefined) {
        // 原始值(后端返回的字段)不存在,依旧展示
        renderValue = null;
      }
    }
    return renderValue;
  }
}
