import React from 'react';
// import { Table } from 'antd';
import { ConfigableTable, setTableInfo, setColumns } from 'yss-biz';

const expandedRowRender = (props, row) => {
  // console.log(props)
  // console.log(row)
  // const { } = props;
  let { detailList = [] } = row;
  // detailList.map((item, idx) => (item.index = Number(idx + 1)))
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },

    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 120,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 120,
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
      title: '数据来源',
      dataIndex: 'dataSourceName',
      key: 'dataSourceName',
      width: 120,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 120,
      ellipsis: true
    },
    {
      title: '券面总额合计',
      dataIndex: 'sumTotalFaceValue',
      key: 'sumTotalFaceValue',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '回购利率',
      dataIndex: 'repoRate',
      key: 'repoRate',
      width: 120,
      ellipsis: true
    },

    {
      title: '交易品种',
      dataIndex: 'tradingProduct',
      key: 'tradingProduct',
      width: 120,
      ellipsis: true
    },
    {
      title: '首次结算日',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期结算日',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 120,
      ellipsis: true
    },
    {
      title: '首次结算方式',
      dataIndex: 'firstSettleMethodName',
      key: 'firstSettleMethodName',
      width: 120,
      ellipsis: true
    },
    {
      title: '应计利息总额',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '实际占款天数',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'firstSettleMethodName',
      key: 'firstSettleMethodName',
      width: 120,
      ellipsis: true
    },
    {
      title: '清算方式',
      dataIndex: 'clearingMethodName',
      key: 'clearingMethodName',
      width: 120,
      ellipsis: true
    },
    {
      title: '续作标识',
      dataIndex: 'sequelIndicatorName',
      key: 'sequelIndicatorName',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期结算金额',
      dataIndex: 'secondSettleAmount',
      key: 'secondSettleAmount',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '交易金额',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '回购期限',
      dataIndex: 'repoTerm',
      key: 'repoTerm',
      width: 120,
      ellipsis: true
    },
    {
      title: '成交时间',
      dataIndex: 'execTime',
      key: 'execTime',
      width: 120,
      ellipsis: true
    },
    {
      title: '买入方',

      children: [
        {
          title: '交易员名称',
          dataIndex: 'repoTraderName',
          key: 'repoTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金清算账户',
          dataIndex: 'repoClearingAccount',
          key: 'repoClearingAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金账户户名',
          dataIndex: 'repoAssetAccountName',
          key: 'repoAssetAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管机构名称',
          dataIndex: 'repoCustodianName',
          key: 'repoCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管账户',
          dataIndex: 'repoCustodianAccount',
          key: 'repoCustodianAccount',
          width: 200,
          ellipsis: true
        }
      ]
    },
    {
      title: '卖出方',
      children: [
        {
          title: '交易员名称',
          dataIndex: 'reverseTraderName',
          key: 'reverseTraderName',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金清算账户',
          dataIndex: 'reverseClearingAccount',
          key: 'reverseClearingAccount',
          width: 200,
          ellipsis: true
        },
        {
          title: '资金账户户名',
          dataIndex: 'reverseAssetAccountName',
          key: 'reverseAssetAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管机构名称',
          dataIndex: 'reverseCustodianName',
          key: 'reverseCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '证券托管账户',
          dataIndex: 'reverseCustodianAccount',
          key: 'reverseCustodianAccount',
          width: 200,
          ellipsis: true
        }
      ]
    }
  ];

  const col = setColumns(columns);

  return (
    <ConfigableTable
      {...setTableInfo({
        columns: col,
        dataSource: detailList,
        rowKey: 'id'
      })}
    />
  );
};

export default expandedRowRender;
