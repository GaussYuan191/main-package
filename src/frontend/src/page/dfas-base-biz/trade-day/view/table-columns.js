/**
 *  交易日类型 table columns
 */
import React from 'react';
import { Button } from 'antd';

export const getInfocols = function (view) {
  return [
    {
      title: '交易日类型',
      dataIndex: 'tradeDayType',
      key: 'tradeDayType',
      width: 120,
      ellipsis: true,
      render: text => {
        if (text == '2') {
          return '银行间';
        }
      }
    },
    {
      title: '交易日名称',
      dataIndex: 'tradeDayName',
      key: 'tradeDayName',
      width: 150,
      ellipsis: true
    },
    {
      title: '是否有效',
      dataIndex: 'validFlag',
      key: 'validFlag',
      width: 150,
      ellipsis: true
    },
    {
      title: '所属类别',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
      ellipsis: true
    },
    {
      title: '操作人',
      dataIndex: 'updateUserName',
      key: 'updateUserName',
      width: 150,
      ellipsis: true
    },
    {
      title: '操作时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
      ellipsis: true
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        return (
          <div className="table-btn" key={record.key}>
            {/* <Button type="link" size="small" icon="edit" onClick={() => view.handleModify(record)}>
                            修改
                        </Button> */}

            <Button type="link" size="small" icon="search" onClick={() => view.handleView(record)}>
              查看
            </Button>
          </div>
        );
      }
    }
  ];
};
