import { page } from 'yss-biz';

// 合同管理-数据
export default {
  isMaskShow: false,

  // 合同表格
  contractTable: {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 100
      },
      {
        title: '管理人',
        dataIndex: 'consignorName',
        key: 'consignorName',
        width: 150
      },
      {
        title: '产品',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },

      {
        title: '结算日期',
        dataIndex: 'settleDate',
        key: 'settleDate',
        width: 150
      },
      {
        title: '结算合同编号',
        dataIndex: 'contractId',
        key: 'contractId',
        width: 200
      },
      {
        title: '结算指令编号',
        dataIndex: 'instrId',
        key: 'instrId',
        width: 200
      },
      {
        title: '成交编号',
        dataIndex: 'execCode',
        key: 'execCode',
        width: 200
      },

      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        key: 'bizCategoryName',
        width: 120
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '结算对手简称',
        dataIndex: 'counterAccountName',
        key: 'counterAccountName',
        width: 160
      },
      {
        title: '系统合同状态',
        dataIndex: 'sysStatusName',
        key: 'sysStatusName',
        width: 160
      },
      {
        title: '合同处理状态',
        dataIndex: 'contractStatusName',
        key: 'contractStatusName',
        width: 120
      },
      {
        title: '合同债券状态',
        dataIndex: 'bondStatusName',
        key: 'bondStatusName',
        width: 160
      },
      {
        title: '合同金额状态',
        dataIndex: 'amountStatusName',
        key: 'amountStatusName',
        width: 160
      },
      // {
      //   title: '合同冻结状态',
      //   dataIndex: 'frozenStatusName',
      //   key: 'frozenStatusName',
      //   width: 160
      // },
      {
        title: '合同冻结状态',
        dataIndex: 'frozenStatusName',
        key: 'frozenStatusName',
        width: 120
      },
      {
        title: '券面总额（万元)',
        dataIndex: 'bondAmount',
        key: 'bondAmount',
        width: 160
      },

      {
        title: '结算方式',
        dataIndex: 'settleTypeName',
        key: 'settleTypeName',
        width: 160
      },

      // {
      //   title: '原结算合同编号',
      //   dataIndex: 'orgContractId',
      //   key: 'orgContractId',
      //   width: 200
      // },
      // {
      //   title: '原结算指令编号',
      //   dataIndex: 'orgInstructId',
      //   key: 'orgInstructId',
      //   width: 200
      // },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        width: 120
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 200
      }
    ],
    data: [],
    total: 0
  },

  /**合同模糊查询条件*/

  contractQueryForm: {
    ...page
    // contractId: '', //结算合同编号
    // instrId: '', //结算指令编号

    // bizCategory: '', //业务类型

    // entrustSide: '', //交易方向

    // sysStatus: '', //系统交割状态
    // contractStatus: '', //合同处理状态

    // bondStatus: '', //合同债券状态

    // amountStatus: '', //合同金额状态
    // settleType: '', //结算方式

    // execCode: '', //成交编码
    // createTime: '', //确认时间

    // settleDate: '' //结算日期
  },
  // 对手方
  // jshtCounterAccount: [],
  selectRows: []
};
