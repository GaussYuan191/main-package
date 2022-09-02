/**
 * 标准费用设置 table columns
 */

import React from 'react';

export const getMenuTablecols = function (view) {
  return [
    {
      title: '菜单编号',
      dataIndex: 'menuCode',
      key: 'menuCode',
      width: 150,
      ellipsis: true
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: 150,
      ellipsis: true
    },
    {
      title: '菜单URL',
      dataIndex: 'menuAddress',
      key: 'menuAddress',
      width: 400,
      ellipsis: true
    },
    {
      title: '菜单图标',
      dataIndex: 'menuIcon',
      key: 'menuIcon',
      width: 80,
      render: (text, record) => {
        if (!['1', '3'].includes(record.menuLevel)) {
          return (
            <span key={record.key} title={text}>
              {text}
            </span>
          );
        }

        text = text || '默认图标';
        return <i key={record.key} className={'win-icon ' + text} title={text} />;
      }
    },
    {
      title: '菜单属性',
      dataIndex: 'tabFlagName',
      key: 'tabFlagName',
      width: 80,
      ellipsis: true
    },
    {
      title: '菜单描述',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      ellipsis: true
    }
    // {
    //   title: "操作",
    //   key: "operation",
    //   fixed: "right",
    //   width: 180,
    //   render: (text, record) => {
    // return (
    //     <div className="table-btn" key={record.key}>
    //         <Button
    //             type="link"
    //             size="small"
    //             icon="edit"
    //             onClick={() => view.handleShowMenuModal(record, false)}
    //         >修改</Button>
    //         <Button
    //             type="link"
    //             size="small"
    //             icon="delete"
    //             onClick={() => view.handleMenuRemove(record)}
    //         >删除</Button>
    //     </div>
    // );
    //   },
    // },
  ];
};

export const getMenuFuncTablecols = function (view) {
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      ellipsis: true
    },
    {
      title: '功能名称',
      dataIndex: 'funcName',
      key: 'funcName',
      width: 100,
      ellipsis: true
    },
    {
      title: '功能类型',
      dataIndex: 'funcTypeName',
      key: 'funcTypeName',
      width: 100,
      ellipsis: true
    },
    {
      title: '功能请求地址',
      dataIndex: 'funcUrl',
      key: 'funcUrl',
      width: 400,
      ellipsis: true
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 180,
      render: (text, record) => {
        // return (
        //   <div className="table-btn" key={record.key}>
        //     <Button
        //       type="link"
        //       size="small"
        //       icon="edit"
        //       disabled={record.auditStatus === "2"}
        //       onClick={() => view.handleShowMenuFuncModal(record, false)}
        //     >
        //       修改
        //     </Button>
        //     <Button
        //       type="link"
        //       size="small"
        //       icon="delete"
        //       disabled={record.auditStatus === "2"}
        //       onClick={() => view.handleMenuFuncRemove(record)}
        //     >
        //       删除
        //     </Button>
        //   </div>
        // );
      }
    }
  ];
};
