/**
 * 用户管理 table columns
 */

import React from 'react';
import { Button } from 'antd';
import { filterWithAuth } from 'yss-biz';
export const getUserTablecols = function (view) {
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 60,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '用户编码',
      dataIndex: 'userCode',
      key: 'userCode',
      width: 150,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '用户类型',
      dataIndex: 'userTypeName',
      key: 'userTypeName',
      width: 100,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 100,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '在职状态',
      dataIndex: 'userStatusName',
      key: 'userStatusName',
      width: 100,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 100,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '所属机构',
      dataIndex: 'orgList',
      key: 'orgList',
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
      },
      render: (text, record) => {
        const orgStr = record.orgList
          .map(item => {
            return item.orgName || item.orgCode;
          })
          .join('，');

        return (
          <span key={record.key} title={orgStr}>
            {orgStr}
          </span>
        );
      }
    },
    {
      title: '联系方式',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
      width: 150,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      }
    },
    {
      title: ' 备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
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
      width: 480,
      render: (text, record) => {
        const buttonList = [
          <Button
            type="link"
            size="small"
            funcname="修改"
            icon="edit"
            onClick={() => view.handleShowModal(record, false)}
          >
            修改
          </Button>,
          <Button
            type="link"
            size="small"
            funcname="修改"
            icon="reload"
            onClick={() => view.handleResetPwd(record)}
          >
            重置密码
          </Button>,
          <Button
            type="link"
            size="small"
            funcname="修改"
            icon={record.lockStatus === '0' ? 'lock' : 'unlock'}
            onClick={() => view[record.lockStatus === '0' ? 'lockUser' : 'unlockUser'](record)}
          >
            {record.lockStatus === '0' ? '锁定' : '解锁'}
          </Button>,
          <Button
            type="link"
            size="small"
            funcname="删除"
            icon="delete"
            onClick={() => view.handleRemove(record)}
          >
            删除
          </Button>,
          <Button
            type="link"
            size="small"
            funcname="修改"
            icon="poweroff"
            onClick={() => view.handleLogOff(record)}
            disabled={record.userStatus === '2'}
          >
            注销
          </Button>,
          <Button
            type="link"
            size="small"
            funcname="修改"
            icon="undo"
            onClick={() => view.handRefreshAuth(record)}
          >
            刷新权限
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
