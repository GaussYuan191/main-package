/***合同Vo** */

import { page } from 'yss-biz/utils/util/constant';
export default {
  /****托管合同table表头 */
  contractColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '合同编号',
      dataIndex: 'contractCode',
      width: 200
    },
    {
      title: '附件名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '委托人',
      dataIndex: 'createUserName',
      width: 150
    },
    {
      title: '文档类型',
      dataIndex: 'typeName',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'useStatus',
      width: 150
    },
    {
      title: '生效日期',
      width: 150,
      dataIndex: 'effectiveDate'
    },
    {
      title: '失效日期',
      width: 200,
      dataIndex: 'expiryDate'
    },
    {
      title: '文档来源',
      dataIndex: 'sourceName',
      width: 150
    },
    {
      title: '附件编码',
      dataIndex: 'code',
      width: 200
    },

    {
      title: '创建人',
      width: 200,
      dataIndex: 'createUserName'
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150
    },
    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 150
    }
  ],

  /**委托人合同列表*/
  contractList: [],

  queryContracElement: {
    contractCode: '', //合同编码
    contractStatus: '', //合同状态 1有效 2无效
    subjectType: 2, //委托人合同
    type: 7, //文档全部
    ...page
  },

  /**合同状态列表*/
  contractStatusList: [
    {
      code: 1,
      name: '有效'
    },
    {
      code: 2,
      name: '无效'
    }
  ]
};
