/***关联账户Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /**关联账户表头*/
  accountColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '所属产品',
      width: 150,
      dataIndex: 'relatedSubjectName'
    },
    {
      title: '产品编码',
      dataIndex: 'relatedSubjectCode',
      width: 200
    },
    {
      title: '账户编码',
      width: 200,
      dataIndex: 'accountSn'
    },
    {
      title: '账号',
      dataIndex: 'account',
      width: 200
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      width: 150
    },
    {
      title: '币种',
      dataIndex: 'moneyType',
      width: 150
    },
    {
      title: '账户类型',
      dataIndex: 'accountTypeName',
      width: 150
    },
    {
      title: '账户性质',
      dataIndex: 'accountNature',
      width: 150
    },
    {
      title: '交易市场',
      dataIndex: 'tradeMarketName',
      width: 150
    },
    {
      title: '开户机构',
      dataIndex: 'openingInstitutionName',
      width: 150
    },
    {
      title: '开户行',
      dataIndex: 'openingBankName',
      width: 150
    },
    {
      title: '支付系统行号',
      dataIndex: 'paymentSystemBankNumber',
      width: 200
    },
    {
      title: '开户日期',
      dataIndex: 'openingDate',
      width: 150
    },
    {
      title: '限额(万元)',
      dataIndex: 'limitMoney',
      width: 150
    },
    // TODO 此处缺少关联字段, 和后端确认暂时不要该列
    // {
    //   title: '交易账户业务权限',
    //   dataIndex: '',
    //   width: 150
    // },
    {
      title: '到期日期',
      dataIndex: 'expireDate',
      width: 150
    },
    {
      title: '退市日期',
      dataIndex: 'delistingDate',
      width: 150
    }
  ],
  /****附件列表 */
  accountList: [
    {
      id: '1111s',
      accountSn: '曾华智',
      updateTime: '2012-1-1',
      checkStatus: '1',
      accountStatus: '0',
      openingDate: '2010-10-1'
    },
    {
      id: '1d1211',
      accountSn: '曾华智2',
      updateTime: '2012-1-3',
      checkStatus: '1',
      accountStatus: '1',
      openingDate: '2010-10-1'
    },
    {
      id: '112311',
      accountSn: '曾华智3',
      updateTime: '2012-1-4',
      checkStatus: '0',
      accountStatus: '0',
      openingDate: '2010-10-2'
    },
    {
      id: '1123111',
      accountSn: '曾华智4',
      updateTime: '2012-1-5',
      checkStatus: '0',
      accountStatus: '1',
      openingDate: '2010-10-12'
    }
  ],
  /****账户类型 */

  accountTypeList: [
    {
      name: '账户类1',
      code: '0'
    },
    {
      name: '账户类2',
      code: '1'
    }
  ],

  /****账户状态 */

  accountStatueList: [
    {
      name: '停用',
      code: '0'
    },
    {
      name: '启用',
      code: '1'
    },
    {
      name: '注销',
      code: '2'
    }
  ],

  /**查询条件列表*/
  queryAccountElement: {
    ...page,
    accountType: '', //账户类型
    accountStatus: '', //账户状态
    subordinateProducts: '' //所属产品？
  },
  /**点击账户行，进行保存当前行*/
  accounted: {},

  /**账户性质列表*/
  accountNatureList: [
    {
      name: '账户性质1',
      code: '0'
    },
    {
      name: '账户性质12',
      code: '1'
    }
  ],

  /**交易市场列表*/
  tradeMarketNameList: [
    {
      name: '交易市场1',
      code: '0'
    },
    {
      name: '交易市场2',
      code: '1'
    }
  ],

  /**开户机构列表*/
  openingInstitutionNameList: [
    {
      name: 'openingInstitutionNameList',
      code: '0'
    },
    {
      name: 'openingInstitutionNameList',
      code: '1'
    }
  ],

  /**币种列表*/
  moneyTypeList: [
    {
      name: 'moneyTypeList1',
      code: '1'
    },
    {
      name: 'moneyTypeList2',
      code: '0'
    }
  ]
};
