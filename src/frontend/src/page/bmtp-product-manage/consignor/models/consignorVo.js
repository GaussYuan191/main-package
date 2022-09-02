/***管理人Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /***管理人列表** */
  consignorList: [],
  /****管理人表格区域列配置信息 */
  consignorColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '管理人名称',
      dataIndex: 'fullNameCn',
      width: 200
    },
    {
      title: '机构简称',
      dataIndex: 'shortNameCn',
      width: 150
    },
    {
      title: '英文简称',
      dataIndex: 'shortNameEn',
      width: 150
    },

    {
      title: '机构代码',
      width: 200,
      dataIndex: 'code'
    },
    {
      title: '机构类型',
      dataIndex: 'publisherTypeName',
      width: 150
    },
    {
      title: '成立日期',
      width: 200,
      dataIndex: 'foundDate'
    },
    {
      title: '准入日期',
      width: 150,
      dataIndex: 'admittanceDate'
    },
    {
      title: '人行备案日期',
      dataIndex: 'pbcRecordDate',
      width: 150
    },
    {
      title: '母公司名称',
      dataIndex: 'parentName',
      width: 150
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'unifiedSocialCreditCode',
      width: 200
    },

    {
      title: '注册资本',
      dataIndex: 'registerCapital',
      width: 150
    },

    {
      title: '资本币种',
      width: 200,
      dataIndex: 'assetsCurrencyCodeName'
    },
    {
      title: '注册地址',
      dataIndex: 'registerAddress',
      width: 150
    },
    {
      title: '法人代表',
      dataIndex: 'legalPerson',
      width: 150
    },
    {
      title: '法人代表证件类型',
      dataIndex: 'legalPersonCertTypeName',
      width: 150
    },
    {
      title: '法人代表证件号码',
      dataIndex: 'legalPersonCertId',
      width: 200
    },

    {
      title: '联系人',
      dataIndex: 'linkman',
      width: 150
    },
    {
      title: '联系电话',
      dataIndex: 'officePhone',
      width: 150
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      width: 150
    },

    {
      title: '手机号码',
      dataIndex: 'mobilePhone',
      width: 150
    },

    {
      title: '传真地址',
      dataIndex: 'faxAddress',
      width: 150
    },

    {
      title: '办公地址',
      dataIndex: 'officeAddress',
      width: 150
    },

    {
      title: '备注',
      dataIndex: 'remark',
      width: 150
    },

    {
      title: '审核状态 ',
      dataIndex: 'checkStatusName',
      width: 150
    },
    {
      title: '创建者',
      dataIndex: 'createUserName',
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 250
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
    },
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 150
    }
  ],

  /**保存选择委托人的行信息*/
  consignored: {},

  /**主题ID用来获取关联的文档和合同*/
  subjectId: '',

  activePan: 'enclosure', //默认是文档

  /**机构名称列表*/
  organizationNamelList: [],

  /**查询条件列表*/
  queryConsignorElement: {
    code: '', //管理人代码
    checkStatus: '', //审核状态
    ...page
  },

  /***管理人下拉列表***/
  consignorDownList: [],

  /***关联管理人其他属性属性如机构代码等（即通过管理code 获取出新增时需要自动加载的机构代码，机构简称 英文简称 机构类型的等值）***/
  consignorDownRelation: {},

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false
  }
};
