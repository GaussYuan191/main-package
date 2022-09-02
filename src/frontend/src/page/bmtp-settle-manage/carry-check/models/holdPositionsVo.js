import { page } from 'yss-biz/utils/util/constant';

export default {
  /**持仓核对List*/
  tableCol: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },

    {
      title: '核对日期',
      dataIndex: 'checkDate',
      key: 'checkDate',
      width: 160,
      ellipsis: true
    },
    {
      title: '债券托管账号',
      dataIndex: 'bondTrusteeshipAccount',
      key: 'bondTrusteeshipAccount',
      width: 140,
      ellipsis: true
    },
    {
      title: '债券托管账户名称',
      dataIndex: 'assetAccountTypeName',
      key: 'assetAccountTypeName',
      width: 180,
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
      title: '债券简称',
      dataIndex: 'bondShortName',
      key: 'bondShortName',
      width: 120,
      ellipsis: true
    },

    {
      title: '可用+待付',

      children: [
        {
          title: '差值(万元)',
          dataIndex: 'difUsableAccruedSubject',
          key: 'difUsableAccruedSubject01',
          width: 200,
          ellipsis: true
        },
        {
          title: '系统可用+待付金额(万元)',
          dataIndex: 'sysUsableAccruedSubject',
          key: 'sysUsableAccruedSubject01',
          width: 200,
          ellipsis: true
        },
        {
          title: '结算机构可用+待付金额(万元)',
          dataIndex: 'orgUsableAccruedSubject',
          key: 'orgUsableAccruedSubject01',
          width: 240,
          align: 'right',
          ellipsis: true
        }
      ]
    },

    // {
    //   title: '待付',

    //   children: [
    //     {
    //       title: '差值',
    //       dataIndex: 'difUsableAccruedSubject',
    //       key: 'difUsableAccruedSubject02',
    //       width: 200,
    //       ellipsis: true
    //     },
    //     {
    //       title: '系统',
    //       dataIndex: 'sysUsableAccruedSubject',
    //       key: 'sysUsableAccruedSubject02',
    //       width: 200,
    //       ellipsis: true
    //     },
    //     {
    //       title: '结算机构待付金额',
    //       dataIndex: 'orgUsableAccruedSubject',
    //       key: 'orgUsableAccruedSubject02',
    //       width: 200,
    //       align: 'right',
    //       ellipsis: true
    //     }
    //   ]
    // },

    {
      title: '待购回',

      children: [
        {
          title: '差值(万元)',
          dataIndex: 'difBuyBackSubject',
          key: 'difBuyBackSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '系统待购回(万元)',
          dataIndex: 'sysBuyBackSubject',
          key: 'sysBuyBackSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '结算机构待购回(万元)',
          dataIndex: 'orgBuyBackSubject',
          key: 'orgBuyBackSubject',
          width: 200,
          align: 'right',
          ellipsis: true
        }
      ]
    },

    {
      title: '质押',

      children: [
        {
          title: '差值(万元)',
          dataIndex: 'difPledgeSubject',
          key: 'difPledgeSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '系统质押(万元)',
          dataIndex: 'sysPledgeSubject',
          key: 'sysPledgeSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '结算机构质押(万元)',
          dataIndex: 'orgPledgeSubject',
          key: 'orgPledgeSubject',
          width: 200,
          ellipsis: true
        }
      ]
    },

    {
      title: '冻结',

      children: [
        {
          title: '差值(万元)',
          dataIndex: 'difFreezeSubject',
          key: 'difFreezeSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '系统冻结(万元)',
          dataIndex: 'sysFreezeSubject',
          key: 'sysFreezeSubject',
          width: 200,
          ellipsis: true
        },
        {
          title: '结算机构冻结(万元)',
          dataIndex: 'orgFreezeSubject',
          key: 'orgFreezeSubject',
          width: 200,
          ellipsis: true
        }
      ]
    },

    {
      title: '调整状态',
      dataIndex: 'adjustStatusName',
      key: 'adjustStatusName',
      width: 120,
      ellipsis: true
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      key: 'createUserName',
      width: 120,
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime02',
      width: 160,
      ellipsis: true
    }
  ],
  tableList: {
    list: [],
    total: 0
  },

  /**关联*/
  aboutList: [],
  aboutCol: [
    {
      title: '发生时间',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200
    },
    {
      title: '债券托管账号',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200
    },
    {
      title: '债券托管账户名称',
      dataIndex: 'totalFaceValue',
      key: 'totalFaceValue',
      width: 200,
      align: 'right'
    },
    {
      title: '债券代码',
      dataIndex: 'conversionProportion',
      key: 'conversionProportion',
      width: 200
    },
    {
      title: '债券简称',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    },
    {
      title: '发送科目',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    },
    {
      title: '发生金额(元)',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    },
    {
      title: '创建人',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    }
  ],

  // 账户类型
  accountType: [],

  /**持仓核对查询条件*/
  queryElement: {
    ...page,
    assetAccountType: '', //账户类型
    bondCode: '', //债券代码
    adjustStatus: '' //调整状态状态（(1.无需调整 2.已调整 3.未调整 4.调整失败 5.导入失败）
  },
  // 当前系统交易日期
  currentTradeDate: ''
};
