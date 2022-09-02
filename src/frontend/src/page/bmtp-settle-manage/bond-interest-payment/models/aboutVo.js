/**关联*/
import { page } from 'yss-biz/utils/util/constant';
export default {
  aboutColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      width: 150
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      width: 150
    },
    {
      title: '所属管理人',
      dataIndex: 'refManagerCode',
      width: 150
    },
    {
      title: '所属产品',
      dataIndex: 'refProductId',
      width: 150
    },
    // {
    //   title: '所属资产单元',
    //   dataIndex: 'parentAssetUnitId',
    //   width: 150
    // },
    {
      title: '债券账号',
      dataIndex: 'bondAccount',
      width: 150
    },
    {
      title: '债券账户名称',
      dataIndex: 'bondAccountName',
      width: 150
    },
    {
      title: '付息兑付日期',
      dataIndex: 'tradeDate',
      width: 150
    },
    {
      title: '批次号',
      dataIndex: 'batchNo',
      width: 200
    },
    {
      title: '划款指令状态',
      dataIndex: 'transComStatusName',
      width: 150
    },
    {
      title: '债券余额(万元)',
      dataIndex: 'proCarryBal',
      width: 150
    },
    {
      title: '实际划付利息(元)',
      dataIndex: 'realInterVal',
      width: 150
    },
    {
      title: '融入券应付利息(元)',
      dataIndex: 'meltInBondInterest',
      width: 150
    },
    {
      title: '实际划付本金(元)',
      dataIndex: 'realCaptialVal',
      width: 150
    },
    {
      title: '实际划付本息合计(元)',
      dataIndex: 'realCapinterTotal',
      width: 150
    },
    {
      title: '暂不划付利息(元)',
      dataIndex: 'tempInterVal',
      width: 150
    },
    {
      title: '暂不划付本金(元)',
      dataIndex: 'tempCaptialVal',
      width: 150
    },
    {
      title: '暂不划付本息合计(元)',
      dataIndex: 'tempCapinterTotal',
      width: 150
    },
    {
      title: '手续费(元)',
      dataIndex: 'fee',
      width: 150
    },
    {
      title: '人工调整备注',
      dataIndex: 'remark',
      width: 200
    },
    {
      title: '调整人',
      dataIndex: 'updateUserName',
      width: 150
    },
    {
      title: '调整时间',
      dataIndex: 'updateTime',
      width: 200
    }
  ],

  aboutList: {
    list: [],
    // isAllData: true,
    total: 0
  },

  readjustingColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },

    {
      title: '所属管理人',
      dataIndex: 'refManagerCode',
      width: 150
    },
    {
      title: '所属产品',
      dataIndex: 'refProductId',
      width: 150
    },
    {
      title: '所属资产单元',
      dataIndex: 'parentAssetUnitId',
      width: 150
    },
    {
      title: '债券账户号码',
      dataIndex: 'bondAccount',
      width: 150
    },
    {
      title: '债券账户名称',
      dataIndex: 'bondAccountName',
      width: 150
    }
  ],

  // readjustingList: [],

  queryAboutElement: {
    ...page
  }
};
