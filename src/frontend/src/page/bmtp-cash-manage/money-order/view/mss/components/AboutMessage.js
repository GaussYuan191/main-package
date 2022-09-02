import React, { Component } from 'react';
import { ConfigableTable } from 'yss-biz';

class AboutMessage extends Component {
  render() {
    const { aboutTable } = this.props;

    const columns = [
      {
        title: '批次号',
        dataIndex: 'batchNo',
        key: 'batchNo',
        width: 230,
        ellipsis: true
      },
      {
        title: '流水号',
        dataIndex: 'seqNo',
        key: 'seqNo',
        width: 230,
        ellipsis: true
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
        width: 100,
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 230,
        ellipsis: true
      }
    ];
    return (
      <ConfigableTable
        columns={columns}
        dataSource={aboutTable}
        pagination={false}
        scroll={{ y: 250 }}
      />
    );
  }
}
export default AboutMessage;
