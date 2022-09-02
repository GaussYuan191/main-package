/**
 * 参数缓存 table columns
 */

import React from 'react';
import { Button, Tooltip } from 'antd';

export const getParamCachecols = function (view) {
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      ellipsis: true
    },
    {
      title: '缓存类型',
      dataIndex: 'cacheType',
      key: 'cacheType',
      width: 200,
      ellipsis: true
    },
    {
      title: '缓存名称',
      dataIndex: 'cacheName',
      key: 'cacheName',
      width: 200,
      ellipsis: true
    },
    {
      title: '缓存结果',
      dataIndex: 'cacheResult',
      key: 'cacheResult',
      width: 100,
      render: (text, record) => {
        return record.cacheResult + '' === '0' ? (
          <span key={record.key} style={{ color: 'green' }} title="成功">
            成功
          </span>
        ) : (
          <span key={record.key} style={{ color: 'red' }} title="失败">
            失败
          </span>
        );
      }
    },
    {
      title: '缓存时间',
      dataIndex: 'cacheTime',
      key: 'cacheTime',
      width: 180,
      ellipsis: true
    },
    {
      title: '缓存条数',
      dataIndex: 'cacheRow',
      key: 'cacheRow',
      width: 150,
      ellipsis: true
    },
    {
      title: '缓存耗时（毫秒）',
      dataIndex: 'cacheCostTime',
      key: 'cacheCostTime',
      width: 150,
      ellipsis: true
    },
    {
      title: '缓存SQL',
      dataIndex: 'cacheSql',
      key: 'cacheSql',
      width: 500,
      render: (text, record) => {
        return (
          <Tooltip
            placement="top"
            title={text}
            overlayStyle={{
              maxWidth: '500px'
            }}
            key={record.key}
          >
            <div className="table-cache-sql">{text}</div>
          </Tooltip>
        );
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <div className="table-btn" key={record.key}>
            <Button
              type="link"
              size="small"
              icon="sync"
              onClick={() => view.refreshCache([record.cacheType])}
            >
              刷新缓存
            </Button>
          </div>
        );
      }
    }
  ];
};
