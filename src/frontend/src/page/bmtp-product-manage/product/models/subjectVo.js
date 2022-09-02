/***关联主体Vo** */
import { page } from 'yss-biz/utils/util/constant';
export default {
  /****关联主体table表头 */
  subjectList: [],
  subjectColumn: [
    {
      title: '序号',
      dataIndex: 'serialNumber'
    },
    {
      title: '主体代码',
      dataIndex: 'publisherCode',
      width: 150
    },
    {
      title: '主体名称',
      dataIndex: 'publisherFullName',
      width: 150
    },
    {
      title: '主体简称',
      dataIndex: 'publisherName',
      width: 150
    },
    {
      title: '主体资质',
      dataIndex: 'companyRoleName',
      width: 150
    },
    {
      title: '主体类型',
      width: 100,
      dataIndex: 'companyCategoryName'
    },
    {
      title: '成立时间',
      width: 200,
      dataIndex: 'foundDate'
    },
    {
      title: '联系人',
      dataIndex: 'linkMan',
      width: 150
    },
    {
      title: '联系方式',
      dataIndex: 'linkContact',
      width: 150
    },
    // TODO: 后端缺少这个字段
    {
      title: '审核状态',
      dataIndex: 'checkStatus',
      width: 150
    },
    // TODO: 后端缺少这个字段
    {
      title: '审核人',
      dataIndex: 'checkUserName',
      width: 150
    },
    // TODO: 后端缺少这个字段
    {
      title: '审核时间',
      dataIndex: 'checkTime',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 150
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

  /**主体机构下拉列表*/
  subjectMechanismDownList: [
    {
      code: 0,
      name: '111'
    }
  ],

  /**管理人下拉列表*/
  subjectDownList: [
    {
      companyCategoryName: '1',
      code: '111'
    }
  ],

  /**查询条件列表*/
  querySubjectElement: {
    ...page,
    companyRoleName: '', //主体资质
    subordinateProducts: '' //所属产品
  },
  /**点击主体表格行对改行进行保存*/
  subjected: {},

  /***主体资质列表** */
  companyRoleNameList: [
    {
      code: 0,
      name: 'companyRoleNameList1'
    },
    {
      code: 1,
      name: 'companyRoleNameList2'
    }
  ],

  /***主体类型列表** */
  companyCategoryList: [
    {
      code: 0,
      name: 'companyCategoryList1'
    },
    {
      code: 1,
      name: 'companyCategoryList2'
    }
  ],

  /***主体下拉列表**/

  subjectListDown: [],

  /***主体机构关联**/
  consignorDownRelation: {}
};
