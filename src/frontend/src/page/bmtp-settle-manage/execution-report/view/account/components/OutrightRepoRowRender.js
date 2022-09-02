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
      title: '管理人名称',
      dataIndex: 'managerName',
      key: 'managerName',
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
      dataIndex: 'totalFaceValue',
      key: 'totalFaceValue',
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
      dataIndex: 'firstSettleMethod',
      key: 'firstSettleMethod',
      width: 120,
      ellipsis: true
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
      title: '有无保证品',
      dataIndex: 'collateralIndicatorName',
      key: 'collateralIndicatorName',
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
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 120,
      ellipsis: true
    },

    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 120,
      ellipsis: true
    },

    {
      title: '单个券券面总额',
      dataIndex: 'singleFaceValue',
      key: 'singleFaceValue',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '首次净价',
      dataIndex: 'firstCleanPrice',
      key: 'firstCleanPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },
    {
      title: '到期净价',
      dataIndex: 'secondCleanPrice',
      key: 'secondCleanPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '待偿期',
      dataIndex: 'termToMaturity',
      key: 'termToMaturity',
      width: 120,
      ellipsis: true
    },

    {
      title: '首次应计利息',
      dataIndex: 'firstAccuredInterest',
      key: 'firstAccuredInterest',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '到期应计利息',
      dataIndex: 'secondAccuredInterest',
      key: 'secondAccuredInterest',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '首次全价',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '到期全价',
      dataIndex: 'firstDirtyPrice',
      key: 'firstDirtyPrice',
      width: 120,
      ellipsis: true,
      align: 'right'
    },

    {
      title: '首次收益率',
      dataIndex: 'firstYield',
      key: 'firstYield',
      width: 120,
      ellipsis: true
    },
    {
      title: '到期收益率',
      dataIndex: 'secondYield',
      key: 'secondYield',
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
          title: '资金账户',
          dataIndex: 'repoAssetAccount',
          key: 'repoAssetAccount',
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
          title: '托管账户户名',
          dataIndex: 'repoBondAccountName',
          key: 'repoBondAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管机构',
          dataIndex: 'repoCustodianName',
          key: 'repoCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管账号',
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
          title: '资金账户',
          dataIndex: 'reverseAssetAccount',
          key: 'reverseAssetAccount',
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
          title: '托管账户户名',
          dataIndex: 'reverseBondAccountName',
          key: 'reverseBondAccountName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管机构',
          dataIndex: 'reverseCustodianName',
          key: 'reverseCustodianName',
          width: 200,
          ellipsis: true
        },
        {
          title: '托管账号',
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
