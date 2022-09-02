/**
 * 参数操作日志表 table columns
 */
import React from 'react';

export const getParamParameterLogCols = function (view) {
  return [
    {
      title: '参数名称',
      dataIndex: 'paramName',
      key: 'paramName',
      width: 100,
      ellipsis: true
    },
    {
      title: '操作类型',
      dataIndex: 'operationTypeName',
      key: 'operationTypeName',
      width: 100,
      ellipsis: true
    },
    {
      title: '操作描述',
      dataIndex: 'operationExplain',
      key: 'operationExplain',
      width: 300,
      ellipsis: true
    },
    {
      title: '操作人',
      dataIndex: 'createUserId',
      key: 'createUserId',
      width: 100,
      ellipsis: true,
      render: (text, record) => {
        return (
          <div key="record.key">
            {record.createUserName ? record.createUserName : record.createUserId}
          </div>
        );
      }
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      ellipsis: true
    }
  ];
};

export const productColumns = [];
