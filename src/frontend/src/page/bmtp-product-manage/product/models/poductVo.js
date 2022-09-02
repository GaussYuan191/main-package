import { page } from 'yss-biz/utils/util/constant';
/***产品Vo** */
export default {
  /***产品列表** */
  poductList: [],
  /***产品表格头部信息 */
  tableListColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      width: 150
    },
    {
      title: '产品全称',
      dataIndex: 'productName',
      width: 150
    },
    {
      title: '产品简称',
      dataIndex: 'productShortName',
      width: 150
    },

    {
      title: '产品类型',
      width: 200,
      dataIndex: 'productTypeName'
    },
    {
      title: '资产类型',
      dataIndex: 'assetTypeName',
      width: 150
    },
    {
      title: '运作方式',
      width: 200,
      dataIndex: 'operatingModeName'
    },
    {
      title: '产品币种',
      width: 100,
      dataIndex: 'productCurrencyTypeName'
    },
    {
      title: '产品状态',
      dataIndex: 'productStatusName',
      width: 150
    },
    {
      title: '所属管理人',
      dataIndex: 'refManagerName',
      width: 150
    },
    {
      title: '所属托管人',
      dataIndex: 'refTrusteeName',
      width: 150
    },
    {
      title: '审核状态 ',
      width: 200,
      dataIndex: 'checkStatusName'
    },
    {
      title: '成立日期',
      dataIndex: 'establishDate',
      width: 150
    },
    {
      title: '到期日期',
      dataIndex: 'expireDate',
      width: 150
    },
    {
      title: '清算日期',
      dataIndex: 'clearDate',
      width: 150
    },
    {
      title: '关账日期',
      dataIndex: 'closeAccountDate',
      width: 150
    },

    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 160
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160
    },

    {
      title: '修改人',
      dataIndex: 'updateUserName',
      width: 150
    },

    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 160
    }
  ],

  /**保存选择产品的行信息*/
  changeProductRowed: {},

  /**所属产品列表*/
  subordinateProductsList: [],

  /**管理人列表*/
  administratorList: [
    {
      name: '管理人1',
      code: '1'
    },
    {
      name: '管理人2',
      code: '2'
    }
  ],

  /**查询条件列表*/
  queryProductElement: {
    ...page,
    refManagerCode: '', //所属管理人
    productStatus: '', //产品状态
    productId: '' //所属产品
  },

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false,
    sign: ''
  },

  /***弹框modal*/

  /**所属管理人**/
  refManagerNameList: [
    {
      name: 'refManagerNameList1',
      code: 0
    },
    {
      name: 'refManagerNameList2',
      code: 2
    }
  ],

  /**所属托管人**/
  // refTrusteeNameList: [
  //   {
  //     name: 'refTrusteeNameList1',
  //     code: 0
  //   },
  //   {
  //     name: 'refTrusteeNameList2',
  //     code: 2
  //   }
  // ],
  refTrusteeNameObj: {
    name: '',
    value: ''
  },

  /***法人代表证件类列表***/
  legalPersonTypeList: [
    {
      name: '法人代表1',
      code: 0
    },
    {
      name: '法人代表2',
      code: 2
    }
  ],
  /***法人代表证件号码列表***/
  legalPersonNumberList: [
    {
      name: '法人代表号码1',
      code: 0
    },
    {
      name: '法人代表号码2',
      code: 2
    }
  ],
  /***母公司列表***/
  parentCompanyList: [
    {
      name: '母公司1',
      code: 0
    },
    {
      name: '母公司2',
      code: 2
    }
  ],
  /***选择的产品 */
  productInfo: {},
  /***选择tab 面板  */
  activePan: '1'
};
