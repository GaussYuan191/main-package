/**
 * 机构管理 table columns
 */

import React from 'react';
import { Button } from 'antd';
import { filterWithAuth } from 'yss-biz';
export const getOrgTablecols = function (view) {
  return [
    {
      title: '机构代码',
      dataIndex: 'orgCode',
      key: 'orgCode',
      width: 200,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '机构名称',
      dataIndex: 'orgName',
      key: 'orgName',
      width: 200,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '上级机构代码',
      dataIndex: 'parentOrgCode',
      key: 'parentOrgCode',
      width: 200,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '上级机构名称',
      dataIndex: 'parentOrgName',
      key: 'parentOrgName',
      width: 200,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 200,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) => {
        const buttonList = [
          <Button
            type="link"
            size="small"
            icon="edit"
            onClick={() => view.handleShowModal(record, false)}
          >
            修改
          </Button>,
          <Button type="link" size="small" icon="delete" onClick={() => view.handleRemove(record)}>
            删除
          </Button>
        ];
        return (
          <div className="table-btn" key={record.key}>
            {filterWithAuth(buttonList, view.state.btnAuth)}
          </div>
        );
      }
    }
  ];
};
