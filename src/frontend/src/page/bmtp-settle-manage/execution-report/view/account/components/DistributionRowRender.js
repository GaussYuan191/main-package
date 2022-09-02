import React from 'react';
// import { Table } from 'antd';
import { ConfigableTable, setTableInfo, setColumns } from 'yss-biz';

const expandedRowRender = (props, row) => {
  // const { } = props;
  let { onlineInstructList = [] } = row;
  // detailList.map((item, idx) => (item.index = Number(idx + 1)))
  const columns = [
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 120,
      ellipsis: true
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 120,
      ellipsis: true
    },
    {
      title: '资产单元',
      dataIndex: 'assetUnitName',
      key: 'assetUnitName',
      width: 120,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategory',
      key: 'bizCategory',
      width: 180,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 120,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 120,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'boneName',
      key: 'boneName',
      width: 180,
      ellipsis: true
    },
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '分销价格(元)',
      dataIndex: 'distributionPrice',
      key: 'distributionPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '分销面额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '交割日期',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '结算方式',
      dataIndex: 'settleType',
      key: 'settleType',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '对手方名称',
      dataIndex: 'sellerSettleBankCode',
      key: 'sellerSettleBankCode',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '对手方债券账号',
      dataIndex: 'sellerCustodianAccount',
      key: 'sellerCustodianAccount',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '对手方资金账号',
      dataIndex: 'sellerAssetAccount',
      key: 'sellerAssetAccount',
      width: 120,
      ellipsis: true
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      key: 'createUser',
      width: 120,
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      ellipsis: true
    }
  ];

  const col = setColumns(columns);

  return (
    <ConfigableTable
      {...setTableInfo({
        columns: col,
        dataSource: onlineInstructList,
        rowKey: 'id'
      })}
    />
  );
};

export default expandedRowRender;
