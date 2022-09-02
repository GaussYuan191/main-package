// 划款指令信息
import React, { Component } from 'react';
import { setColumns, ConfigableTable, DrapTable, setTableInfo, fontColor } from 'yss-biz';
import moment from 'moment';
export default class RunningWater extends Component {
  render() {
    const { dataSource, columns, allData } = this.props;
    const col = [
      ...setColumns(columns),
      {
        title: '生成时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160,
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160,
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '指令来源',
        dataIndex: 'orginName',
        key: 'orginName',
        width: 150,
        ellipsis: true
      }
    ];
    return (
      // 去除表格中的横向滚动条
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <DrapTable
          style={{
            marginTop: '10px',
            width: col.reduce((sumWidth, item) => sumWidth + (item.width || 0), 20)
          }}
          {...setTableInfo({
            dataSource: dataSource || [],
            columns: col,
            pagination: { hideOnSinglePage: true }
          })}
          scroll={{ x: 0, y: 200 }}
          footer={!allData ? () => fontColor('包含未授权产品数据，请检查！', '#f5222d') : null}
        />
      </div>
    );
  }
}
