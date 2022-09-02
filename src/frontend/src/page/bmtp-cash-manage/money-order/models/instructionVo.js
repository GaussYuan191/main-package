// 划款指令
import { page } from 'yss-biz/utils/util/constant';
export default {
  // 指令表格
  instructionData: {},

  instructionTable: {
    columns: [
      {
        title: '批次号',
        dataIndex: 'batchNo',
        key: 'batchNo',
        width: 200
      },
      {
        title: '划款指令编号',
        dataIndex: 'transferInstructCode',
        key: 'transferInstructCode',
        width: 200
      },
      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200
      },
      {
        title: '结算机构指令编号',
        dataIndex: 'instrId',
        key: 'instrId',
        width: 200
      },
      {
        title: '交易指令编号',
        dataIndex: 'tradeOrderNo',
        key: 'tradeOrderNo',
        width: 200
      },
      {
        title: '费用编号',
        dataIndex: 'chargeId',
        key: 'chargeId',
        width: 180
      },
      {
        title: '划款金额(元)',
        dataIndex: 'transferAmount',
        key: 'transferAmount',
        width: 150
      },
      {
        title: '管理人',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 100
      },
      {
        title: '划款状态',
        dataIndex: 'transferStateName',
        key: 'transferStateName',
        width: 180
      },
      {
        title: '划款指令状态',
        dataIndex: 'transferCommandStateName',
        key: 'transferCommandStateName',
        width: 120
      },
      {
        title: '指令类型',
        dataIndex: 'transferTypeName',
        key: 'transferTypeName',
        width: 100
      },

      {
        title: '币种代码',
        dataIndex: 'currency',
        key: 'currency',
        width: 160
      },
      {
        title: '划款日期',
        dataIndex: 'transferDate',
        key: 'transferDate',
        width: 150
      },
      {
        title: '划款事由',
        dataIndex: 'transferCauseName',
        key: 'transferCauseName',
        width: 160
      }
    ],
    data: []
  },

  // 选种行指令
  rowed: {},

  /***弹框status*/
  isOpenFormModal: {
    status: false
  },
  /***划款指令详情*/
  instructionInfoColumn: [
    {
      title: '付款方',
      children: [
        {
          title: '产品名称',
          dataIndex: 'productName',
          key: 'productName',
          width: 150
        },
        {
          title: '账户类型',
          dataIndex: 'accountTypeName',
          key: 'accountTypeName',
          width: 150
        },
        {
          title: '付款账号',
          dataIndex: 'paymentAccount',
          key: 'paymentAccount',
          width: 150
        },
        {
          title: '付款账号名称',
          dataIndex: 'paymentAccountName',
          key: 'paymentAccountName',
          width: 150
        },
        {
          title: '付款账号开户行名称',
          dataIndex: 'paymentBankName',
          key: 'paymentBankName',
          width: 150
        }
      ]
    }
  ],

  // instructionInfoList: [
  //   {
  //     age1: "产品1",
  //     age2: "账户类型1",
  //     age3: "000232321",
  //     age4: "付款账号名称1",
  //     age6: "付款账号开户行名称1"
  //   }
  // ],

  /**查询条件列表*/
  queryElement: {
    ...page
  },

  // 关联信息表格数据
  aboutTable: []
};
