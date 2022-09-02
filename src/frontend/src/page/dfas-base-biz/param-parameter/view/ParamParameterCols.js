/**
 * 参数表 table columns
 */

import React from 'react';
import { Button, Switch } from 'antd';

export const getParamParameterCols = function (view) {
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      ellipsis: true
    },
    {
      title: '参数类型',
      dataIndex: 'paramTypeName',
      key: 'paramTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '参数编码',
      dataIndex: 'paramCode',
      key: 'paramCode',
      width: 150,
      ellipsis: true
    },
    {
      title: '参数名称',
      dataIndex: 'paramName',
      key: 'paramName',
      width: 150,
      ellipsis: true
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      key: 'paramValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '参数描述',
      dataIndex: 'paramExplain',
      key: 'paramExplain',
      width: 150,
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'enableFlag',
      key: 'enableFlag',
      width: 90,
      render: (text, record) => {
        return (
          <Switch
            key={record.key}
            className="table-status-switch"
            checkedChildren="启用"
            unCheckedChildren="停用"
            checked={record.enableFlag === '1'}
            onChange={() =>
              record.enableFlag === '1'
                ? view.handleUnEnable(record.id)
                : view.handleEnable(record.id)
            }
          />
        );
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 245,
      render: (text, record) => {
        return (
          <div className="table-btn" key={record.key}>
            <Button
              type="link"
              size="small"
              icon="edit"
              disabled={record.auditStatus === '2'}
              onClick={() => view.$paramParameterModal.handleModify(record)}
            >
              修改
            </Button>
            <Button
              type="link"
              size="small"
              icon="edit"
              disabled={record.auditStatus === '2'}
              onClick={() => view.openLog(record)}
            >
              日志
            </Button>
          </div>
        );
      }
    }
  ];
};

export const productColumns = [];
